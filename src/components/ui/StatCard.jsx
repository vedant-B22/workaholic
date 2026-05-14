import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function StatCard({ label, value, sub, icon: Icon, trend, trendUp, color = 'azure', delay = 0, children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], ['6deg', '-6deg'])
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-6deg', '6deg'])

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => { x.set(0); y.set(0) }

  const colorMap = {
    azure: { text: 'text-azure', glow: 'rgba(56,139,253,0.12)', border: 'rgba(56,139,253,0.18)', accent: '#388bfd' },
    emerald: { text: 'text-emerald-400', glow: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.15)', accent: '#34d399' },
    amber: { text: 'text-amber-400', glow: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.15)', accent: '#fbbf24' },
    rose: { text: 'text-rose-400', glow: 'rgba(251,113,133,0.08)', border: 'rgba(251,113,133,0.15)', accent: '#fb7185' },
    violet: { text: 'text-violet-400', glow: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.15)', accent: '#a78bfa' },
  }

  const c = colorMap[color] || colorMap.azure

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl p-5 cursor-default overflow-hidden"
      style={{
        background: `rgba(13,17,23,0.9)`,
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 40px ${c.glow}, 0 20px 60px rgba(0,0,0,0.4)`,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-4 right-4 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${c.accent}40, transparent)` }}
      />

      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)` }}
      />

      {children ? (
        children
      ) : (
        <>
          <div className="flex items-start justify-between mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: c.glow, border: `1px solid ${c.border}` }}
            >
              {Icon && <Icon size={16} style={{ color: c.accent }} />}
            </div>
            {trend && (
              <div className={`text-[10px] font-semibold flex items-center gap-1 ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trendUp ? '↑' : '↓'} {trend}
              </div>
            )}
          </div>
          <div className="text-2xl font-bold text-pure tracking-tight mb-1">{value}</div>
          <div className="text-[11px] text-silver/60 font-medium">{label}</div>
          {sub && <div className="text-[10px] text-silver/35 mt-0.5">{sub}</div>}
        </>
      )}
    </motion.div>
  )
}
