import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import SectionHeader from '../../ui/SectionHeader'
import StatCard from '../../ui/StatCard'

const weeklyData = [
  { day: 'Mon', onTime: 265, late: 13, absent: 18 },
  { day: 'Tue', onTime: 278, late: 13, absent: 5 },
  { day: 'Wed', onTime: 270, late: 14, absent: 12 },
  { day: 'Thu', onTime: 285, late: 11, absent: 0 },
  { day: 'Fri', onTime: 258, late: 12, absent: 26 },
]

const hourlyData = Array.from({ length: 9 }, (_, i) => ({
  time: `${8 + i}:00`,
  checkins: Math.floor(Math.random() * 60 + 10),
}))

const recentCheckins = [
  { name: 'Sarah Kim', time: '08:54', status: 'on-time', dept: 'Design' },
  { name: 'Marcus Webb', time: '09:02', status: 'late', dept: 'Engineering' },
  { name: 'Priya Nair', time: '08:47', status: 'on-time', dept: 'HR' },
  { name: 'David Liu', time: '09:15', status: 'late', dept: 'Finance' },
  { name: 'Emma Torres', time: '08:30', status: 'early', dept: 'Engineering' },
  { name: 'James Okafor', time: '—', status: 'absent', dept: 'Sales' },
  { name: 'Ryan Patel', time: '09:00', status: 'on-time', dept: 'Operations' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl px-3 py-2 text-xs">
      <div className="text-silver/60 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color || p.fill }} />
          <span className="text-ghost capitalize">{p.name}: {p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function AttendanceSection() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader tag="Workforce" title="Attendance Tracking" subtitle="Live check-in data for today" action="Download CSV" />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Present" value="284" icon={CheckCircle} trend="1.4%" trendUp color="emerald" delay={0.1} />
        <StatCard label="On Time" value="271" sub="95.4% of present" icon={Clock} trend="0.8%" trendUp color="azure" delay={0.15} />
        <StatCard label="Late" value="13" sub="4.6% of present" icon={AlertCircle} trend="1.2%" trendUp={false} color="amber" delay={0.2} />
        <StatCard label="Absent" value="12" icon={XCircle} trend="2.3%" trendUp color="rose" delay={0.25} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Weekly</div>
          <div className="text-sm font-semibold text-ghost mb-4">Attendance Breakdown</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyData} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="day" tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(56,139,253,0.04)' }} />
              <Bar dataKey="onTime" fill="#34d399" radius={[3, 3, 0, 0]} />
              <Bar dataKey="late" fill="#fbbf24" radius={[3, 3, 0, 0]} />
              <Bar dataKey="absent" fill="rgba(251,113,133,0.6)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Today</div>
          <div className="text-sm font-semibold text-ghost mb-4">Hourly Check-ins</div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={hourlyData}>
              <defs>
                <linearGradient id="checkinGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#388bfd" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#388bfd" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="time" tick={{ fill: '#8b949e', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="checkins" stroke="#388bfd" strokeWidth={2} fill="url(#checkinGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent checkins */}
      <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Real-Time</div>
        <div className="text-sm font-semibold text-ghost mb-4">Today's Check-In Log</div>
        <div className="space-y-1">
          {recentCheckins.map((r, i) => {
            const s = {
              'on-time': { label: 'On Time', color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
              late: { label: 'Late', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
              early: { label: 'Early', color: '#388bfd', bg: 'rgba(56,139,253,0.08)' },
              absent: { label: 'Absent', color: '#fb7185', bg: 'rgba(251,113,133,0.08)' },
            }[r.status]
            return (
              <motion.div
                key={i}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.02] transition-colors"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{ background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}25` }}
                >
                  {r.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-ghost">{r.name}</div>
                  <div className="text-[9px] text-silver/40">{r.dept}</div>
                </div>
                <div className="text-xs font-mono text-silver/60">{r.time}</div>
                <div
                  className="text-[9px] px-2 py-0.5 rounded-full font-medium border"
                  style={{ background: s.bg, color: s.color, borderColor: `${s.color}30` }}
                >
                  {s.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
