import React from 'react'
import { motion } from 'framer-motion'
import { Users, Clock, TrendingUp, CheckCircle, Briefcase, Activity } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from 'recharts'
import StatCard from '../../ui/StatCard'
import SectionHeader from '../../ui/SectionHeader'

const attendanceData = [
  { day: 'Mon', present: 278, absent: 18 },
  { day: 'Tue', present: 291, absent: 5 },
  { day: 'Wed', present: 284, absent: 12 },
  { day: 'Thu', present: 296, absent: 0 },
  { day: 'Fri', present: 270, absent: 26 },
  { day: 'Sat', present: 110, absent: 186 },
  { day: 'Sun', present: 42, absent: 254 },
]

const productivityData = [
  { month: 'Jul', score: 78 },
  { month: 'Aug', score: 82 },
  { month: 'Sep', score: 79 },
  { month: 'Oct', score: 91 },
  { month: 'Nov', score: 88 },
  { month: 'Dec', score: 94 },
]

const deptData = [
  { name: 'Engineering', value: 42, color: '#388bfd' },
  { name: 'Design', value: 18, color: '#79c0ff' },
  { name: 'Sales', value: 56, color: '#58a6ff' },
  { name: 'HR', value: 12, color: '#cae8ff' },
  { name: 'Finance', value: 24, color: '#1f6feb' },
  { name: 'Ops', value: 34, color: '#388bfd88' },
]

const taskProgress = [
  { label: 'Product Roadmap Q4', progress: 78, color: '#388bfd' },
  { label: 'Infrastructure Upgrade', progress: 54, color: '#79c0ff' },
  { label: 'Hiring Pipeline', progress: 91, color: '#34d399' },
  { label: 'Brand Refresh', progress: 33, color: '#a78bfa' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl px-3 py-2 text-xs">
      <div className="text-silver/60 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
          <span className="text-ghost">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardHome() {
  return (
    <div className="p-6 space-y-6">
      <SectionHeader
        tag="Command Center"
        title="Operational Overview"
        subtitle="Real-time workforce intelligence — updated live"
        action="Export Report"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Employees" value="296" sub="12 new this month" icon={Users} trend="4.1%" trendUp color="azure" delay={0.1} />
        <StatCard label="Present Today" value="284" sub="95.9% attendance" icon={Clock} trend="2.3%" trendUp color="emerald" delay={0.15} />
        <StatCard label="Productivity Score" value="94.2" sub="All departments" icon={TrendingUp} trend="6.8%" trendUp color="violet" delay={0.2} />
        <StatCard label="Tasks Completed" value="1,284" sub="This month" icon={CheckCircle} trend="12%" trendUp color="amber" delay={0.25} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Attendance chart */}
        <motion.div
          className="glass-card rounded-2xl p-5 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Weekly</div>
              <div className="text-sm font-semibold text-ghost">Attendance Overview</div>
            </div>
            <div className="flex items-center gap-3 text-[9px] text-silver/50">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-azure" /> Present</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm bg-mist/40" /> Absent</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attendanceData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="day" tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(56,139,253,0.04)' }} />
              <Bar dataKey="present" fill="#388bfd" radius={[4, 4, 0, 0]} fillOpacity={0.9} />
              <Bar dataKey="absent" fill="rgba(255,255,255,0.07)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department pie */}
        <motion.div
          className="glass-card rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Distribution</div>
          <div className="text-sm font-semibold text-ghost mb-4">By Department</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={deptData}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={60}
                paddingAngle={3}
                dataKey="value"
              >
                {deptData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {deptData.slice(0, 4).map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: d.color }} />
                  <span className="text-[10px] text-silver/60">{d.name}</span>
                </div>
                <span className="text-[10px] text-ghost font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Productivity trend + Task progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Productivity */}
        <motion.div
          className="glass-card rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">6 Months</div>
              <div className="text-sm font-semibold text-ghost">Productivity Trend</div>
            </div>
            <div className="text-xl font-bold text-pure">94.2<span className="text-sm text-silver/50 font-normal ml-1">avg</span></div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={productivityData}>
              <defs>
                <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#388bfd" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#388bfd" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
              <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" stroke="#388bfd" strokeWidth={2} fill="url(#prodGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Task Progress */}
        <motion.div
          className="glass-card rounded-2xl p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Active Projects</div>
          <div className="text-sm font-semibold text-ghost mb-5">Task Progress</div>
          <div className="space-y-4">
            {taskProgress.map((t, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] text-silver/70">{t.label}</span>
                  <span className="text-[11px] font-semibold text-ghost">{t.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-mist/20 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: t.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${t.progress}%` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Activity timeline */}
      <motion.div
        className="glass-card rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Timeline</div>
        <div className="text-sm font-semibold text-ghost mb-4">Recent Activity</div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollable-panel">
          {[
            { time: '09:14', event: 'Sarah K. clocked in', dept: 'Design', type: 'in' },
            { time: '09:31', event: 'Sprint review started', dept: 'Engineering', type: 'event' },
            { time: '10:05', event: 'Marcus W. leave approved', dept: 'HR', type: 'approval' },
            { time: '11:22', event: 'Q3 report submitted', dept: 'Finance', type: 'doc' },
            { time: '12:00', event: 'Lunch break — 48 employees', dept: 'All', type: 'break' },
            { time: '13:15', event: 'Priya N. onboarding complete', dept: 'HR', type: 'onboard' },
            { time: '14:30', event: 'Infra deployment started', dept: 'Ops', type: 'deploy' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0 min-w-[100px]">
              <div className="text-[9px] font-mono text-azure/60">{item.time}</div>
              <div className="w-px h-4 bg-mist/30" />
              <div className="w-2 h-2 rounded-full bg-azure shrink-0 ring-4 ring-azure/10" />
              <div className="text-center">
                <div className="text-[9px] text-silver/70 leading-tight">{item.event}</div>
                <div className="text-[8px] text-silver/35 mt-0.5">{item.dept}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
