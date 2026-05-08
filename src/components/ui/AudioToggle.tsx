'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // In a real build, you'd load an actual ambient jungle audio file.
  // We create an AudioContext-based ambient tone for the demo.
  const audioCtxRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const oscillatorsRef = useRef<OscillatorNode[]>([])

  const startAmbient = useCallback(() => {
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0, ctx.currentTime)
    masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2)
    masterGain.connect(ctx.destination)
    gainNodeRef.current = masterGain

    // Create layered ambient tones simulating jungle ambience
    const frequencies = [60, 80, 120, 180, 240]
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const oscGain = ctx.createGain()
      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      // Subtle frequency drift for organic feel
      osc.frequency.linearRampToValueAtTime(freq * 1.02, ctx.currentTime + 8)
      osc.frequency.linearRampToValueAtTime(freq, ctx.currentTime + 16)
      oscGain.gain.setValueAtTime(0.1 / (i + 1), ctx.currentTime)
      osc.connect(oscGain)
      oscGain.connect(masterGain)
      osc.start()
      oscillatorsRef.current.push(osc)
    })
  }, [])

  const stopAmbient = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.5)
      setTimeout(() => {
        oscillatorsRef.current.forEach(osc => {
          try { osc.stop() } catch {}
        })
        oscillatorsRef.current = []
        audioCtxRef.current?.close()
        audioCtxRef.current = null
      }, 1600)
    }
  }, [])

  const toggle = () => {
    if (!isPlaying) {
      startAmbient()
    } else {
      stopAmbient()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <motion.button
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3"
      onClick={toggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
    >
      {/* Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: 'rgba(201,168,76,0.8)' }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            {isPlaying ? 'Mute' : 'Ambience'}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Button circle */}
      <div
        className="relative w-11 h-11 rounded-full flex items-center justify-center"
        style={{
          background: isPlaying ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isPlaying ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.1)'}`,
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Ripple rings when playing */}
        {isPlaying && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid rgba(201,168,76,0.3)' }}
                animate={{ scale: [1, 2], opacity: [0.6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeOut',
                }}
              />
            ))}
          </>
        )}

        {/* Icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {isPlaying ? (
            // Sound waves icon
            <>
              <path d="M6 4 L6 12 M4 6 L4 10" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 2 Q12 8 8 14" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <path d="M10.5 4.5 Q13.5 8 10.5 11.5" stroke="rgba(201,168,76,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Muted/silent icon
            <>
              <path d="M4 6 L4 10 M6 4 L6 12 M8 6 L8 10" stroke="rgba(240,237,232,0.4)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 6 L14 10 M14 6 L11 10" stroke="rgba(240,237,232,0.3)" strokeWidth="1.2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </div>
    </motion.button>
  )
}
