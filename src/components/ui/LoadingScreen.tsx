'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { LogoStacked } from '@/components/ui/Logo'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Natural-feeling non-linear progress
        const increment = prev < 60 ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5
        return Math.min(prev + increment, 100)
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: 'blur(10px)',
      }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #0a0500 0%, #030303 100%)',
        }}
      />

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <LogoStacked scale={0.9} />
        </motion.div>

        {/* Progress section */}
        <motion.div
          className="w-64 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Progress bar */}
          <div
            className="h-px w-full"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <motion.div
              className="h-full"
              style={{
                background: 'linear-gradient(90deg, #C9A84C, #E8C87A)',
                width: `${progress}%`,
                boxShadow: '0 0 10px rgba(201,168,76,0.5)',
                transition: 'width 0.1s ease-out',
              }}
            />
          </div>

          {/* Status text */}
          <div className="flex justify-between items-center">
            <p className="font-mono text-xs" style={{ color: 'rgba(201,168,76,0.4)' }}>
              {progress < 30 && 'Entering the wild...'}
              {progress >= 30 && progress < 60 && 'Loading cinematic assets...'}
              {progress >= 60 && progress < 90 && 'Preparing the journey...'}
              {progress >= 90 && 'Ready to explore...'}
            </p>
            <p className="font-mono text-xs" style={{ color: 'rgba(201,168,76,0.4)' }}>
              {Math.round(progress)}%
            </p>
          </div>
        </motion.div>

        {/* Decorative dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{ background: '#C9A84C' }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
