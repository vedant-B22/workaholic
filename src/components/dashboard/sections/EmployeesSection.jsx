import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Plus, Mail, Phone, MoreHorizontal, Star } from 'lucide-react'
import SectionHeader from '../../ui/SectionHeader'

const employees = [
  { id: 1, name: 'Alexandra Chen', role: 'Chief Operations Officer', dept: 'Operations', status: 'active', avatar: 'AC', rating: 4.9, joined: 'Mar 2019', location: 'New York', email: 'a.chen@workaholic.co', starred: true },
  { id: 2, name: 'Marcus Webb', role: 'Senior Engineer', dept: 'Engineering', status: 'active', avatar: 'MW', rating: 4.7, joined: 'Jun 2021', location: 'San Francisco', email: 'm.webb@workaholic.co', starred: false },
  { id: 3, name: 'Sarah Kim', role: 'Lead Designer', dept: 'Design', status: 'active', avatar: 'SK', rating: 4.8, joined: 'Jan 2022', location: 'Austin', email: 's.kim@workaholic.co', starred: true },
  { id: 4, name: 'James Okafor', role: 'Sales Director', dept: 'Sales', status: 'leave', avatar: 'JO', rating: 4.6, joined: 'Sep 2020', location: 'Chicago', email: 'j.okafor@workaholic.co', starred: false },
  { id: 5, name: 'Priya Nair', role: 'HR Specialist', dept: 'HR', status: 'active', avatar: 'PN', rating: 4.5, joined: 'Nov 2023', location: 'Remote', email: 'p.nair@workaholic.co', starred: false },
  { id: 6, name: 'David Liu', role: 'Finance Analyst', dept: 'Finance', status: 'active', avatar: 'DL', rating: 4.7, joined: 'Feb 2021', location: 'Boston', email: 'd.liu@workaholic.co', starred: false },
  { id: 7, name: 'Emma Torres', role: 'Product Manager', dept: 'Engineering', status: 'active', avatar: 'ET', rating: 4.9, joined: 'Apr 2020', location: 'Seattle', email: 'e.torres@workaholic.co', starred: true },
  { id: 8, name: 'Ryan Patel', role: 'DevOps Engineer', dept: 'Operations', status: 'inactive', avatar: 'RP', rating: 4.4, joined: 'Jul 2022', location: 'Remote', email: 'r.patel@workaholic.co', starred: false },
]

const statusStyle = {
  active: { label: 'Active', bg: 'bg-emerald-400/8', text: 'text-emerald-400', border: 'border-emerald-400/20' },
  leave: { label: 'On Leave', bg: 'bg-amber-400/8', text: 'text-amber-400', border: 'border-amber-400/20' },
  inactive: { label: 'Inactive', bg: 'bg-silver/8', text: 'text-silver/50', border: 'border-silver/15' },
}

const deptColors = {
  Engineering: '#388bfd',
  Design: '#a78bfa',
  Sales: '#34d399',
  HR: '#fb7185',
  Finance: '#fbbf24',
  Operations: '#79c0ff',
}

export default function EmployeesSection() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const filtered = employees.filter(e => {
    const q = search.toLowerCase()
    const matchSearch = e.name.toLowerCase().includes(q) || e.dept.toLowerCase().includes(q) || e.role.toLowerCase().includes(q)
    const matchFilter = filter === 'all' || e.status === filter || e.dept.toLowerCase() === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="p-6 space-y-5">
      <SectionHeader tag="Workforce" title="Employee Directory" subtitle={`${employees.length} total employees across 6 departments`} action="Add Employee" />

      {/* Filters bar */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative flex-1 max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/30" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-charcoal/40 border border-mist/15 rounded-lg text-ghost placeholder-silver/30 focus:outline-none focus:border-azure/30 transition-all"
          />
        </div>
        {['all', 'active', 'leave'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wide uppercase font-medium transition-all border ${
              filter === f
                ? 'bg-azure/10 text-azure border-azure/25'
                : 'text-silver/50 border-mist/15 hover:text-silver hover:border-mist/30'
            }`}
          >
            {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'On Leave'}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wide text-silver/50 border border-mist/15 hover:border-mist/30 hover:text-silver transition-all">
          <Filter size={11} /> Filter
        </button>
      </motion.div>

      {/* Employee grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((emp, i) => {
          const s = statusStyle[emp.status]
          const deptColor = deptColors[emp.dept] || '#388bfd'
          const isSelected = selected === emp.id
          return (
            <motion.div
              key={emp.id}
              className="glass-card rounded-2xl p-4 cursor-pointer group"
              style={{ borderColor: isSelected ? `${deptColor}40` : undefined }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              onClick={() => setSelected(isSelected ? null : emp.id)}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{
                      background: `${deptColor}18`,
                      border: `1px solid ${deptColor}30`,
                      color: deptColor,
                    }}
                  >
                    {emp.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-charcoal ${
                    emp.status === 'active' ? 'bg-emerald-400' : emp.status === 'leave' ? 'bg-amber-400' : 'bg-silver/40'
                  }`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="text-sm font-semibold text-ghost truncate">{emp.name}</div>
                    {emp.starred && <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />}
                  </div>
                  <div className="text-[10px] text-silver/55 truncate">{emp.role}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-[9px] px-2 py-0.5 rounded-full font-medium border"
                      style={{ background: `${deptColor}12`, color: deptColor, borderColor: `${deptColor}25` }}
                    >
                      {emp.dept}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium border ${s.bg} ${s.text} ${s.border}`}>
                      {s.label}
                    </span>
                  </div>
                </div>

                {/* Rating + actions */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1">
                    <Star size={9} className="text-amber-400 fill-amber-400" />
                    <span className="text-[10px] font-semibold text-ghost">{emp.rating}</span>
                  </div>
                  <button className="text-silver/25 hover:text-silver/60 transition-colors">
                    <MoreHorizontal size={13} />
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-mist/15 grid grid-cols-2 gap-3"
                >
                  {[
                    { label: 'Location', value: emp.location },
                    { label: 'Joined', value: emp.joined },
                    { label: 'Email', value: emp.email, span: true },
                  ].map((f, j) => (
                    <div key={j} className={f.span ? 'col-span-2' : ''}>
                      <div className="text-[9px] tracking-wide text-silver/35 uppercase mb-0.5">{f.label}</div>
                      <div className="text-[10px] text-silver/70">{f.value}</div>
                    </div>
                  ))}
                  <div className="col-span-2 flex gap-2 mt-1">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] text-azure border border-azure/20 rounded-lg hover:bg-azure/8 transition-all">
                      <Mail size={10} /> Message
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] text-silver/60 border border-mist/20 rounded-lg hover:bg-white/[0.02] transition-all">
                      <Phone size={10} /> Contact
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
