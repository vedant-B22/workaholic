import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function VesaBadge({ position = 'fixed' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href="https://vesastudios.site"
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      style={{
        position,
        bottom: '18px',
        right: '20px',
        zIndex: 9999,
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px 6px 8px',
          borderRadius: '999px',
          background: hovered
            ? 'rgba(13, 17, 23, 0.95)'
            : 'rgba(8, 10, 15, 0.80)',
          border: hovered
            ? '1px solid rgba(56, 139, 253, 0.35)'
            : '1px solid rgba(56, 139, 253, 0.12)',
          backdropFilter: 'blur(20px)',
          boxShadow: hovered
            ? '0 0 20px rgba(56,139,253,0.15), 0 4px 20px rgba(0,0,0,0.5)'
            : '0 4px 16px rgba(0,0,0,0.4)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
        }}
      >
        {/* VS Monogram */}
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '6px',
            background: hovered
              ? 'linear-gradient(135deg, rgba(56,139,253,0.25) 0%, rgba(56,139,253,0.08) 100%)'
              : 'rgba(56,139,253,0.10)',
            border: '1px solid rgba(56,139,253,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.25s ease',
          }}
        >
          {/* Animated shimmer on hover */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  width: '50%',
                }}
              />
            )}
          </AnimatePresence>
          <span
            style={{
              fontSize: '8px',
              fontWeight: '900',
              letterSpacing: '0.05em',
              color: hovered ? 'rgba(56,139,253,1)' : 'rgba(56,139,253,0.75)',
              fontFamily: 'system-ui, sans-serif',
              userSelect: 'none',
              position: 'relative',
              zIndex: 1,
              transition: 'color 0.25s ease',
              filter: hovered ? 'drop-shadow(0 0 4px rgba(56,139,253,0.8))' : 'none',
            }}
          >
            VS
          </span>
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <span
            style={{
              fontSize: '8px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(120,130,155,0.5)',
              fontFamily: 'system-ui, sans-serif',
              userSelect: 'none',
              lineHeight: 1,
            }}
          >
            Powered by
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: hovered ? 'rgba(240,246,252,0.95)' : 'rgba(200,210,225,0.7)',
              fontFamily: 'system-ui, sans-serif',
              userSelect: 'none',
              lineHeight: 1,
              transition: 'color 0.25s ease',
            }}
          >
            Vesa Studios
          </span>
        </div>

        {/* Pulse dot on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'rgba(56,139,253,0.9)',
                boxShadow: '0 0 6px rgba(56,139,253,0.8)',
                flexShrink: 0,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.a>
  )
}
