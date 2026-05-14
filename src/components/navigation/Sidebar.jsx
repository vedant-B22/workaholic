import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Users, Clock, CalendarOff, CheckSquare,
  BarChart3, FileText, Settings, LogOut, Zap,
} from 'lucide-react'
import { AppContext } from '../../App'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'attendance', label: 'Attendance', icon: Clock },
  { id: 'leave', label: 'Leave Requests', icon: CalendarOff },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activeSection, onNavigate }) {
  const { user } = useContext(AppContext)

  return (
    <motion.div
      className="relative flex flex-col w-16 lg:w-56 h-full shrink-0 z-10"
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      style={{
        background: 'rgba(8,10,15,0.95)',
        borderRight: '1px solid rgba(56,139,253,0.08)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <div className="px-3 lg:px-5 pt-6 pb-6 border-b border-mist/10">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 shrink-0">
            <div className="absolute inset-0 rounded-lg bg-azure/10 border border-azure/20 flex items-center justify-center">
              <Zap size={14} className="text-azure" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-lg border border-azure/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
          <div className="hidden lg:block overflow-hidden">
            <div className="text-[10px] tracking-[0.35em] text-azure/70 uppercase leading-none mb-0.5">System</div>
            <div className="text-sm font-black tracking-[0.15em] text-pure uppercase">WORKAHOLIC</div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-2 lg:px-3 py-4 space-y-0.5 overflow-y-auto scrollable-panel">
        <div className="hidden lg:block text-[9px] tracking-[0.35em] text-silver/30 uppercase px-2 mb-3">
          Navigation
        </div>
        {navItems.map((item, i) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative w-full flex items-center gap-3 px-2 lg:px-3 py-2.5 rounded-lg text-left transition-all group ${
                isActive
                  ? 'text-azure'
                  : 'text-silver/50 hover:text-silver hover:bg-white/[0.02]'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              whileHover={{ x: 2 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  layoutId="nav-active"
                  style={{
                    background: 'rgba(56,139,253,0.07)',
                    border: '1px solid rgba(56,139,253,0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-azure rounded-r-full" />
              )}

              <Icon
                size={15}
                className={`relative shrink-0 transition-colors ${
                  isActive ? 'text-azure' : 'text-silver/40 group-hover:text-silver/70'
                }`}
                style={isActive ? { filter: 'drop-shadow(0 0 6px rgba(56,139,253,0.6))' } : {}}
              />
              <span className="hidden lg:block relative text-xs font-medium tracking-wide">
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </nav>

      {/* User profile */}
      <div className="p-2 lg:p-3 border-t border-mist/10">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.02] transition-colors cursor-pointer group">
          <div className="relative w-7 h-7 shrink-0">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-azure"
              style={{ background: 'rgba(56,139,253,0.12)', border: '1px solid rgba(56,139,253,0.25)' }}
            >
              AC
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-void" />
          </div>
          <div className="hidden lg:block flex-1 min-w-0">
            <div className="text-xs font-semibold text-ghost truncate">Alexandra Chen</div>
            <div className="text-[9px] text-silver/40 truncate">Chief Operations</div>
          </div>
          <LogOut size={12} className="hidden lg:block text-silver/30 group-hover:text-silver/60 transition-colors shrink-0" />
        </div>
      </div>

      {/* Ambient left glow */}
      <div
        className="absolute top-0 right-0 bottom-0 w-px pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(56,139,253,0.15), transparent)' }}
      />
    </motion.div>
  )
}
