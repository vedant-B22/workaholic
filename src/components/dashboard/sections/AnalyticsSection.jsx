import React from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'
import SectionHeader from '../../ui/SectionHeader'
import StatCard from '../../ui/StatCard'
import { TrendingUp, Award, Users, Zap } from 'lucide-react'

const revenueData = [
  { month: 'Jan', revenue: 4.2, target: 4.0 },
  { month: 'Feb', revenue: 4.8, target: 4.5 },
  { month: 'Mar', revenue: 5.1, target: 4.8 },
  { month: 'Apr', revenue: 4.6, target: 5.0 },
  { month: 'May', revenue: 5.8, target: 5.2 },
  { month: 'Jun', revenue: 6.2, target: 5.5 },
  { month: 'Jul', revenue: 6.8, target: 6.0 },
  { month: 'Aug', revenue: 7.1, target: 6.5 },
  { month: 'Sep', revenue: 6.9, target: 7.0 },
  { month: 'Oct', revenue: 7.8, target: 7.2 },
]

const deptPerformance = [
  { dept: 'Engineering', score: 94 },
  { dept: 'Design', score: 88 },
  { dept: 'Sales', score: 91 },
  { dept: 'HR', score: 86 },
  { dept: 'Finance', score: 92 },
  { dept: 'Operations', score: 89 },
]

const radarData = [
  { metric: 'Attendance', value: 96 },
  { metric: 'Productivity', value: 88 },
  { metric: 'Satisfaction', value: 82 },
  { metric: 'Retention', value: 94 },
  { metric: 'Growth', value: 78 },
  { metric: 'Collaboration', value: 91 },
]

const headcountData = [
  { quarter: 'Q1 23', count: 218 },
  { quarter: 'Q2 23', count: 241 },
  { quarter: 'Q3 23', count: 263 },
  { quarter: 'Q4 23', count: 271 },
  { quarter: 'Q1 24', count: 278 },
  { quarter: 'Q2 24', count: 285 },
  { quarter: 'Q3 24', count: 291 },
  { quarter: 'Q4 24', count: 296 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card rounded-xl px-3 py-2 text-xs">
      <div className="text-silver/60 mb-1">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color || p.fill || p.stroke }} />
          <span className="text-ghost capitalize">{p.name}: {p.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsSection() {
  return (
    <div className="p-6 space-y-5">
      <SectionHeader tag="Intelligence" title="Analytics & Reports" subtitle="Deep-dive workforce metrics and performance intelligence" action="Full Report" />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Avg Productivity" value="94.2%" icon={TrendingUp} trend="6.8%" trendUp color="azure" delay={0.1} />
        <StatCard label="Top Performer Dept" value="Engineering" icon={Award} sub="Score: 94" color="violet" delay={0.15} />
        <StatCard label="Headcount Growth" value="+35.7%" sub="Year over year" icon={Users} trend="12.4%" trendUp color="emerald" delay={0.2} />
        <StatCard label="Efficiency Index" value="0.91" sub="Industry avg: 0.76" icon={Zap} trend="19.7%" trendUp color="amber" delay={0.25} />
      </div>

      {/* Revenue vs Target */}
      <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">2024 YTD</div>
            <div className="text-sm font-semibold text-ghost">Revenue vs Target ($M)</div>
          </div>
          <div className="flex items-center gap-4 text-[9px] text-silver/50">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-azure rounded" /> Actual</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-mist/60 rounded" /> Target</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#388bfd" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#388bfd" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="month" tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8b949e', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="revenue" name="Actual" stroke="#388bfd" strokeWidth={2} fill="url(#revGrad)" dot={false} />
            <Line type="monotone" dataKey="target" name="Target" stroke="rgba(139,148,158,0.4)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Dept performance + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Departments</div>
          <div className="text-sm font-semibold text-ghost mb-4">Performance Score</div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={deptPerformance} layout="vertical" barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
              <XAxis type="number" domain={[70, 100]} tick={{ fill: '#8b949e', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="dept" tick={{ fill: '#8b949e', fontSize: 9 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(56,139,253,0.04)' }} />
              <Bar dataKey="score" fill="#388bfd" radius={[0, 4, 4, 0]} fillOpacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Workforce Health</div>
          <div className="text-sm font-semibold text-ghost mb-4">Metric Radar</div>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.05)" />
              <PolarAngleAxis dataKey="metric" tick={{ fill: '#8b949e', fontSize: 9 }} />
              <Radar name="Score" dataKey="value" stroke="#388bfd" fill="#388bfd" fillOpacity={0.15} strokeWidth={1.5} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Headcount growth */}
      <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <div className="text-[9px] tracking-[0.3em] text-azure/60 uppercase mb-1">Growth</div>
        <div className="text-sm font-semibold text-ghost mb-4">Headcount Trend (8 Quarters)</div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={headcountData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="quarter" tick={{ fill: '#8b949e', fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis domain={[200, 310]} tick={{ fill: '#8b949e', fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="count" name="Headcount" stroke="#79c0ff" strokeWidth={2} dot={{ fill: '#79c0ff', r: 3, strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
