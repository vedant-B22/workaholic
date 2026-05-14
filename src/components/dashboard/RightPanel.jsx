import React from 'react'
import { motion } from 'framer-motion'
import { Check, X, Clock, User, TrendingUp, MessageSquare, AlertCircle } from 'lucide-react'

const notifications = [
  { id: 1, type: 'approval', user: 'Marcus Webb', action: 'Leave request — 3 days', time: '2m ago', avatar: 'MW', urgent: true },
  { id: 2, type: 'activity', user: 'Sarah Kim', action: 'Submitted Q3 report', time: '18m ago', avatar: 'SK', urgent: false },
  { id: 3, type: 'message', user: 'Dev Team', action: 'Sprint review at 3PM', time: '1h ago', avatar: 'DT', urgent: false },
  { id: 4, type: 'approval', user: 'James Okafor', action: 'Overtime approval', time: '2h ago', avatar: 'JO', urgent: false },
  { id: 5, type: 'activity', user: 'Priya Nair', action: 'Completed onboarding', time: '3h ago', avatar: 'PN', urgent: false },
]

const insights = [
  { label: 'Present Today', value: '284', change: '+4', positive: true },
  { label: 'On Leave', value: '12', change: '-2', positive: true },
  { label: 'Pending Tasks', value: '47', change: '+8', positive: false },
  { label: 'Open Tickets', value: '9', change: '-3', positive: true },
]

const announcements = [
  { title: 'Q3 Performance Reviews', body: 'Annual reviews begin Oct 14. Managers to submit feedback by Oct 10.', tag: 'HR', color: 'azure' },
  { title: 'System Maintenance', body: 'Planned downtime Sunday 02:00–04:00 UTC. Services may be intermittent.', tag: 'IT', color: 'amber' },
]

function TypeIcon({ type }) {
  if (type === 'approval') return <Clock size={11} className="text-amber-400" />
  if (type === 'message') return <MessageSquare size={11} className="text-azure" />
  return <User size={11} className="text-emerald-400" />
}

export default function RightPanel() {
  return (
    <motion.div
      className="hidden xl:flex w-72 h-full flex-col shrink-0 scrollable-panel overflow-y-auto"
      style={{
        background: 'rgba(8,10,15,0.9)',
        borderLeft: '1px solid rgba(56,139,253,0.07)',
        backdropFilter: 'blur(20px)',
      }}
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      <div className="p-4 space-y-5">
        {/* Quick Insights */}
        <div>
          <div className="text-[9px] tracking-[0.35em] text-silver/40 uppercase mb-3 flex items-center gap-2">
            <TrendingUp size={9} />
            Live Snapshot
          </div>
          <div className="grid grid-cols-2 gap-2">
            {insights.map((item, i) => (
              <motion.div
                key={i}
                className="glass-card rounded-xl p-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-xl font-bold text-pure">{item.value}</div>
                <div className="text-[9px] text-silver/50 leading-tight mt-0.5">{item.label}</div>
                <div className={`text-[9px] mt-1.5 font-medium ${item.positive ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {item.change} today
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-mist/20 to-transparent" />

        {/* Pending Approvals */}
        <div>
          <div className="text-[9px] tracking-[0.35em] text-silver/40 uppercase mb-3 flex items-center gap-2">
            <AlertCircle size={9} />
            Pending Approvals
          </div>
          {notifications.filter(n => n.type === 'approval').map((n, i) => (
            <motion.div
              key={n.id}
              className="glass-card rounded-xl p-3 mb-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold text-azure shrink-0 mt-0.5"
                  style={{ background: 'rgba(56,139,253,0.1)', border: '1px solid rgba(56,139,253,0.2)' }}
                >
                  {n.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-ghost truncate">{n.user}</div>
                  <div className="text-[10px] text-silver/50 truncate">{n.action}</div>
                  <div className="text-[9px] text-silver/30 mt-0.5">{n.time}</div>
                </div>
              </div>
              <div className="flex gap-1.5 mt-2.5">
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-medium text-emerald-400 bg-emerald-400/8 hover:bg-emerald-400/15 border border-emerald-400/15 transition-all">
                  <Check size={10} /> Approve
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg text-[10px] font-medium text-rose-400 bg-rose-400/8 hover:bg-rose-400/15 border border-rose-400/15 transition-all">
                  <X size={10} /> Decline
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-mist/20 to-transparent" />

        {/* Activity Feed */}
        <div>
          <div className="text-[9px] tracking-[0.35em] text-silver/40 uppercase mb-3">Activity</div>
          <div className="space-y-2">
            {notifications.filter(n => n.type !== 'approval').map((n, i) => (
              <motion.div
                key={n.id}
                className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-white/[0.02] transition-colors cursor-pointer"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.07 }}
              >
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-[8px] font-bold text-silver/70 shrink-0 mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {n.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <TypeIcon type={n.type} />
                    <span className="text-[10px] font-medium text-ghost truncate">{n.user}</span>
                  </div>
                  <div className="text-[9px] text-silver/40 mt-0.5 leading-tight">{n.action}</div>
                </div>
                <div className="text-[9px] text-silver/25 shrink-0">{n.time}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-mist/20 to-transparent" />

        {/* Announcements */}
        <div>
          <div className="text-[9px] tracking-[0.35em] text-silver/40 uppercase mb-3">Announcements</div>
          <div className="space-y-2">
            {announcements.map((a, i) => (
              <motion.div
                key={i}
                className="glass-card rounded-xl p-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[8px] tracking-widest px-1.5 py-0.5 rounded font-bold uppercase"
                    style={{
                      background: a.color === 'azure' ? 'rgba(56,139,253,0.12)' : 'rgba(251,191,36,0.12)',
                      color: a.color === 'azure' ? '#388bfd' : '#fbbf24',
                      border: a.color === 'azure' ? '1px solid rgba(56,139,253,0.2)' : '1px solid rgba(251,191,36,0.2)',
                    }}
                  >
                    {a.tag}
                  </span>
                  <span className="text-[10px] font-semibold text-ghost">{a.title}</span>
                </div>
                <p className="text-[9px] text-silver/50 leading-relaxed">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
