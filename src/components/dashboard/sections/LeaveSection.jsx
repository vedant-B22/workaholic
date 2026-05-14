import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Clock, CalendarDays } from 'lucide-react'
import SectionHeader from '../../ui/SectionHeader'

const leaves = [
  { id: 1, name: 'Marcus Webb', dept: 'Engineering', type: 'Annual Leave', from: 'Oct 14', to: 'Oct 16', days: 3, reason: 'Family vacation', status: 'pending', avatar: 'MW', urgent: true },
  { id: 2, name: 'James Okafor', dept: 'Sales', type: 'Sick Leave', from: 'Oct 11', to: 'Oct 12', days: 2, reason: 'Medical appointment', status: 'approved', avatar: 'JO', urgent: false },
  { id: 3, name: 'Priya Nair', dept: 'HR', type: 'Annual Leave', from: 'Oct 20', to: 'Oct 25', days: 6, reason: 'Personal travel', status: 'pending', avatar: 'PN', urgent: false },
  { id: 4, name: 'Ryan Patel', dept: 'Operations', type: 'Emergency Leave', from: 'Oct 10', to: 'Oct 10', days: 1, reason: 'Family emergency', status: 'approved', avatar: 'RP', urgent: false },
  { id: 5, name: 'Emma Torres', dept: 'Engineering', type: 'Maternity Leave', from: 'Nov 1', to: 'Jan 31', days: 92, reason: 'Parental leave', status: 'approved', avatar: 'ET', urgent: false },
  { id: 6, name: 'David Liu', dept: 'Finance', type: 'Annual Leave', from: 'Oct 28', to: 'Oct 29', days: 2, reason: 'Rest', status: 'declined', avatar: 'DL', urgent: false },
]

const leaveTypes = { 'Annual Leave': '#388bfd', 'Sick Leave': '#fb7185', 'Emergency Leave': '#fbbf24', 'Maternity Leave': '#a78bfa' }
const statusStyle = {
  pending: { label: 'Pending', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
  approved: { label: 'Approved', color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
  declined: { label: 'Declined', color: '#fb7185', bg: 'rgba(251,113,133,0.08)' },
}

export default function LeaveSection() {
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState(leaves)

  const approve = (id) => setItems(prev => prev.map(l => l.id === id ? { ...l, status: 'approved' } : l))
  const decline = (id) => setItems(prev => prev.map(l => l.id === id ? { ...l, status: 'declined' } : l))

  const filtered = items.filter(l => filter === 'all' || l.status === filter)

  const summary = [
    { label: 'Pending', count: items.filter(l => l.status === 'pending').length, color: '#fbbf24' },
    { label: 'Approved', count: items.filter(l => l.status === 'approved').length, color: '#34d399' },
    { label: 'Declined', count: items.filter(l => l.status === 'declined').length, color: '#fb7185' },
    { label: 'Total Requests', count: items.length, color: '#388bfd' },
  ]

  return (
    <div className="p-6 space-y-5">
      <SectionHeader tag="HR Management" title="Leave Requests" subtitle="Review and manage employee leave applications" action="New Policy" />

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summary.map((s, i) => (
          <motion.div
            key={i}
            className="glass-card rounded-2xl p-4 text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
            <div className="text-[10px] text-silver/50 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {['all', 'pending', 'approved', 'declined'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wide uppercase font-medium transition-all border ${
              filter === f ? 'bg-azure/10 text-azure border-azure/25' : 'text-silver/50 border-mist/15 hover:text-silver hover:border-mist/30'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Leave cards */}
      <AnimatePresence>
        <div className="space-y-3">
          {filtered.map((leave, i) => {
            const ss = statusStyle[leave.status]
            const typeColor = leaveTypes[leave.type] || '#388bfd'
            return (
              <motion.div
                key={leave.id}
                className="glass-card rounded-2xl p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ delay: i * 0.06 }}
                layout
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: `${typeColor}15`, color: typeColor, border: `1px solid ${typeColor}25` }}
                    >
                      {leave.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-ghost">{leave.name}</span>
                        {leave.urgent && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-rose-400/10 text-rose-400 border border-rose-400/20 font-bold uppercase tracking-wide">Urgent</span>
                        )}
                      </div>
                      <div className="text-[10px] text-silver/50">{leave.dept}</div>
                    </div>
                  </div>

                  <div
                    className="text-[9px] px-2.5 py-1 rounded-full font-medium border shrink-0"
                    style={{ background: ss.bg, color: ss.color, borderColor: `${ss.color}30` }}
                  >
                    {ss.label}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-[9px] text-silver/35 uppercase tracking-wide mb-1">Type</div>
                    <div className="text-[11px] font-medium" style={{ color: typeColor }}>{leave.type}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-silver/35 uppercase tracking-wide mb-1">Duration</div>
                    <div className="text-[11px] font-medium text-ghost flex items-center gap-1">
                      <CalendarDays size={10} className="text-silver/40" />
                      {leave.days} day{leave.days > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-silver/35 uppercase tracking-wide mb-1">Period</div>
                    <div className="text-[11px] text-ghost">{leave.from} — {leave.to}</div>
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-white/[0.02] border border-mist/10">
                  <div className="text-[9px] text-silver/35 uppercase tracking-wide mb-0.5">Reason</div>
                  <div className="text-[11px] text-silver/60">{leave.reason}</div>
                </div>

                {leave.status === 'pending' && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => approve(leave.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium text-emerald-400 bg-emerald-400/8 hover:bg-emerald-400/15 border border-emerald-400/20 transition-all"
                    >
                      <Check size={12} /> Approve Leave
                    </button>
                    <button
                      onClick={() => decline(leave.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium text-rose-400 bg-rose-400/8 hover:bg-rose-400/15 border border-rose-400/20 transition-all"
                    >
                      <X size={12} /> Decline
                    </button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </AnimatePresence>
    </div>
  )
}
