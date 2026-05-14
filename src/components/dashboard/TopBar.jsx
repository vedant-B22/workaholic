import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Command } from 'lucide-react'

export default function TopBar() {
  const [time, setTime] = useState(new Date())
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (d) => d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const fmtDate = (d) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <motion.div
      className="flex items-center gap-4 px-6 py-3 shrink-0 z-10"
      style={{
        background: 'rgba(5,5,7,0.8)',
        borderBottom: '1px solid rgba(56,139,253,0.07)',
        backdropFilter: 'blur(20px)',
      }}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Search */}
      <div className={`relative flex-1 max-w-sm transition-all duration-300 ${searchFocused ? 'max-w-md' : ''}`}>
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/30" />
        <input
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          placeholder="Search employees, tasks, reports..."
          className="w-full pl-9 pr-9 py-2 text-xs bg-charcoal/40 border border-mist/10 rounded-lg text-ghost placeholder-silver/30 focus:outline-none focus:border-azure/30 focus:bg-charcoal/60 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-silver/20">
          <Command size={10} />
          <span className="text-[9px]">K</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Date/time */}
      <div className="text-right hidden md:block">
        <div className="text-xs font-mono text-azure/70 tracking-widest">{fmt(time)}</div>
        <div className="text-[9px] text-silver/30 tracking-wide">{fmtDate(time)}</div>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-mist/20" />

      {/* Notifications */}
      <button className="relative p-1.5 rounded-lg hover:bg-white/[0.03] transition-colors group">
        <Bell size={15} className="text-silver/50 group-hover:text-silver/80 transition-colors" />
        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-azure border border-void" />
      </button>

      {/* System status */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9px] tracking-[0.2em] text-emerald-400/80 uppercase font-medium">Systems Nominal</span>
      </div>
    </motion.div>
  )
}
