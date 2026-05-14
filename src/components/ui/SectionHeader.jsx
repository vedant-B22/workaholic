import React from 'react'
import { motion } from 'framer-motion'

export default function SectionHeader({ tag, title, subtitle, action }) {
  return (
    <motion.div
      className="flex items-end justify-between mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        {tag && (
          <div className="text-[9px] tracking-[0.4em] text-azure/60 uppercase mb-1.5 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-azure animate-pulse" />
            {tag}
          </div>
        )}
        <h2 className="text-xl font-bold text-pure tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-silver/50 mt-0.5">{subtitle}</p>}
      </div>
      {action && (
        <button className="text-[10px] tracking-[0.2em] uppercase text-azure/70 hover:text-azure border border-azure/20 hover:border-azure/40 px-3 py-1.5 rounded-lg transition-all">
          {action}
        </button>
      )}
    </motion.div>
  )
}
