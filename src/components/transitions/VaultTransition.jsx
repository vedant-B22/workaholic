import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

export default function VaultTransition() {
  const leftPanel = useRef()
  const rightPanel = useRef()
  const centerGlow = useRef()

  useEffect(() => {
    const tl = gsap.timeline()
    tl.to([leftPanel.current, rightPanel.current], {
      scaleX: 0,
      duration: 1.4,
      ease: 'power4.inOut',
      stagger: 0,
    })
    tl.to(centerGlow.current, { opacity: 0, duration: 0.6 }, '-=0.4')
  }, [])

  return (
    <div className="absolute inset-0 z-50 flex">
      {/* Left vault door */}
      <div
        ref={leftPanel}
        className="flex-1 origin-left"
        style={{
          background: 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
          borderRight: '1px solid rgba(56,139,253,0.3)',
        }}
      >
        {/* Metal texture lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${10 + i * 11}%`,
              width: '1px',
              background: 'rgba(56,139,253,0.05)',
            }}
          />
        ))}
        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-r from-transparent to-azure/10" />
      </div>

      {/* Center glow burst */}
      <div
        ref={centerGlow}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <motion.div
          className="w-2 h-screen"
          style={{ background: 'linear-gradient(to bottom, transparent, #388bfd, transparent)' }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 0] }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 20 + i * 120,
              height: 20 + i * 120,
              border: '1px solid rgba(56,139,253,0.4)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 1.5] }}
            transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Right vault door */}
      <div
        ref={rightPanel}
        className="flex-1 origin-right"
        style={{
          background: 'linear-gradient(225deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
          borderLeft: '1px solid rgba(56,139,253,0.3)',
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              right: `${10 + i * 11}%`,
              width: '1px',
              background: 'rgba(56,139,253,0.05)',
            }}
          />
        ))}
        <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-l from-transparent to-azure/10" />
      </div>

      {/* WORKAHOLIC reveal text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="text-center">
          <div className="text-[9px] tracking-[0.6em] text-azure/60 uppercase mb-2">Initializing</div>
          <div
            className="text-5xl font-black tracking-[0.3em] text-gradient uppercase"
            style={{ letterSpacing: '0.35em' }}
          >
            WORKAHOLIC
          </div>
        </div>
      </motion.div>

      {/* Top/bottom bars */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-azure to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-azure to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  )
}
