// ============================================================
// Globe shaders — real CDN textures (day/night/spec) layered
// over canvas India mask. World-space normals throughout.
// ============================================================

export const GLOBE_VERTEX_SHADER = `
  varying vec2  vUv;
  varying vec3  vWorldNormal;
  varying vec3  vWorldPos;

  void main() {
    vUv          = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const GLOBE_FRAGMENT_SHADER = `
  uniform float      uTime;
  uniform vec3       uSunDirection;
  uniform sampler2D  uIndiaMask;  // white=India, black=rest (canvas polygon)
  uniform sampler2D  uDayMap;     // NASA/real earth day texture
  uniform sampler2D  uNightMap;   // city lights texture
  uniform sampler2D  uSpecMap;    // ocean specular mask (white=ocean)

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  // ── Noise ────────────────────────────────────────────────────
  float h21(vec2 p){p=fract(p*vec2(127.1,311.7));p+=dot(p,p+45.32);return fract(p.x*p.y);}
  float sn(vec2 p){
    vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);
  }
  float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*sn(p);p=p*2.03+vec2(4.1,1.7);a*=.5;}return v;}

  void main() {
    // ── Sample textures ─────────────────────────────────────────
    vec3  dayColor   = texture2D(uDayMap,    vUv).rgb;
    vec3  nightColor = texture2D(uNightMap,  vUv).rgb;
    float specMask   = texture2D(uSpecMap,   vUv).r;   // 1=ocean, 0=land
    float maskVal    = texture2D(uIndiaMask, vUv).r;

    // ── India mask layers ────────────────────────────────────────
    float indiaFill   = smoothstep(0.35, 0.78, maskVal);
    float indiaBorder = smoothstep(0.06, 0.35, maskVal) * (1.0 - smoothstep(0.35, 0.62, maskVal));
    float indiaGlow   = smoothstep(0.0,  0.06, maskVal) * (1.0 - smoothstep(0.06,  0.28, maskVal));

    // ── Lighting ─────────────────────────────────────────────────
    vec3  N     = normalize(vWorldNormal);
    vec3  L     = normalize(uSunDirection);
    vec3  V     = normalize(cameraPosition - vWorldPos);
    vec3  H     = normalize(L + V);
    float NdotL = dot(N, L);
    float diff  = max(NdotL, 0.0);
    // Terminator: smooth day→night blend across ~56° band
    float dusk  = smoothstep(-0.28, 0.28, NdotL);
    // Pure nightside weight
    float nightW = smoothstep(0.06, -0.15, NdotL);

    // ── Day / night surface ──────────────────────────────────────
    // Night: faint dayside outlines + vivid city lights
    vec3 nightSurf = dayColor * 0.038 + nightColor * 2.00;
    vec3 surface   = mix(nightSurf, dayColor, dusk);

    // ── India organic tint ───────────────────────────────────────
    float detail = fbm(vUv * 42.0 + vec2(2.1, 3.7));
    float lat    = 90.0 - vUv.y * 180.0;
    float latF   = clamp((lat - 8.0) / 28.0, 0.0, 1.0);

    // Forest green palette — south darker/denser, north lighter
    vec3 indiaDeep   = vec3(0.013, 0.098, 0.015);
    vec3 indiaForest = vec3(0.027, 0.182, 0.034);
    vec3 indiaMix    = mix(indiaDeep, indiaForest, 0.45 + detail * 0.55 - latF * 0.12);

    // Blend: 30% real texture shows through for organic look
    vec3 indiaDayBlend = mix(dayColor * 0.30, indiaMix, 0.70);
    // On nightside India still looks green, just much dimmer
    vec3 indiaNight    = mix(nightSurf * 0.5, indiaMix * 0.45, 0.65);
    vec3 indiaOverlay  = mix(indiaNight, indiaDayBlend, dusk);
    surface = mix(surface, indiaOverlay, indiaFill);

    // ── Apply lighting ────────────────────────────────────────────
    float ambient = 0.012;
    vec3 lit = surface * (ambient + diff * 0.88);

    // ── Ocean specular — Blinn-Phong, mask-driven ─────────────────
    float spec = pow(max(dot(N, H), 0.0), 95.0) * specMask;
    lit += vec3(0.15, 0.35, 0.92) * spec * 0.55 * step(0.001, NdotL);

    // ── India emissive — organic, not neon ────────────────────────
    float pulse     = sin(uTime * 0.76)      * 0.5 + 0.5;
    float fastPulse = sin(uTime * 3.0 + 1.1) * 0.5 + 0.5;

    // Interior: subtle self-glow — feels like satellite thermal imaging
    lit += indiaMix * indiaFill * 0.50;

    // Border: slightly HDR to drive bloom, but natural green not neon
    float bAnim = 0.72 + pulse * 0.28;
    float fAnim = 0.90 + fastPulse * 0.10;
    // Peak ~0.95 — just enough to trip bloom without cartoon look
    lit += vec3(0.08, 0.98, 0.20) * indiaBorder * 0.88 * bAnim * fAnim;

    // Outer halo: muted earth-green
    lit += vec3(0.09, 0.55, 0.14) * indiaGlow * 0.20 * bAnim;

    // ── India city lights on nightside ────────────────────────────
    lit += indiaMix * indiaFill * nightW * 0.48 * (0.55 + pulse * 0.45);

    // ── Global night haze (faint continental glow) ────────────────
    lit += dayColor * nightW * 0.032;

    // ── Atmospheric rim ───────────────────────────────────────────
    float rim     = pow(1.0 - max(dot(N, V), 0.0), 3.2);
    float sunFace = max(dot(N, L) * 0.5 + 0.5, 0.0);
    vec3  rimDay  = vec3(0.05, 0.16, 0.72);
    vec3  rimSun  = vec3(0.90, 0.50, 0.13);
    vec3  rimCol  = mix(rimDay, rimSun, pow(sunFace, 0.70));
    // India rim shifts slightly greener
    lit += mix(rimCol, vec3(0.05, 0.28, 0.10), indiaFill * 0.55) * rim * 0.30;

    // ── Thin procedural cloud wisps ───────────────────────────────
    // (complements the separate cloud mesh for added density variation)
    float cloudN = smoothstep(0.63, 0.82, fbm(vUv * 5.8 + vec2(uTime * 0.0028, 0.0)));
    lit = mix(lit, lit * 1.10 + vec3(0.022, 0.026, 0.032), cloudN * diff * (1.0 - indiaFill * 0.60));

    gl_FragColor = vec4(lit, 1.0);
  }
`

// ── Atmosphere ────────────────────────────────────────────────
export const ATMOSPHERE_VERTEX_SHADER = `
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPos    = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Mie (sun-side warm gold) + Rayleigh (shadow-side blue) at the limb.
export const ATMOSPHERE_FRAGMENT_SHADER = `
  uniform vec3 uSunDirection;

  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    vec3  viewDir  = normalize(cameraPosition - vWorldPos);
    vec3  sunDir   = normalize(uSunDirection);
    float cosA     = max(dot(vWorldNormal, viewDir), 0.0);
    float rim      = 1.0 - cosA;
    float scatter  = pow(rim, 1.4);
    float edge     = pow(rim, 5.0);
    float alpha    = (scatter * 0.22 + edge * 0.60) * 0.68;

    float sunFace  = max(dot(vWorldNormal, sunDir), 0.0);
    float mie      = pow(max(dot(viewDir, sunDir), 0.0), 7.0) * rim;

    vec3 rayleigh  = vec3(0.05, 0.20, 0.90);
    vec3 sunGlow   = vec3(1.35, 0.70, 0.16);  // HDR → bloom
    vec3 col       = mix(rayleigh, sunGlow, pow(sunFace, 0.80));
         col       = mix(col, sunGlow * 1.5, mie * 0.40);

    gl_FragColor = vec4(col, alpha);
  }
`

// ── Cloud shell ───────────────────────────────────────────────
// Separate slowly-rotating mesh. Uses globe vertex shader.
export const CLOUD_FRAGMENT_SHADER = `
  uniform sampler2D uCloudMap;
  uniform float     uTime;
  uniform vec3      uSunDirection;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  void main() {
    // Slow atmospheric drift — clouds move slightly faster than surface
    vec2 uv       = vUv + vec2(uTime * 0.0010, 0.0);
    float cloudA  = texture2D(uCloudMap, uv).r;

    vec3  N    = normalize(vWorldNormal);
    vec3  L    = normalize(uSunDirection);
    float diff = max(dot(N, L), 0.0);
    float amb  = 0.06;

    // Cool-white clouds, darker on nightside
    vec3 cloudColor = vec3(0.86, 0.89, 0.94);
    float lit = amb + diff * 0.94;

    gl_FragColor = vec4(cloudColor * lit, cloudA * 0.45);
  }
`
