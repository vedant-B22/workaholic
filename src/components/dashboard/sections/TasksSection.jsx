import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckSquare, Square, Plus, Flag, User, Tag } from 'lucide-react'
import SectionHeader from '../../ui/SectionHeader'

const initialTasks = [
  { id: 1, title: 'Q4 Budget Review', desc: 'Finalize departmental budgets for next quarter', priority: 'high', dept: 'Finance', assignee: 'DL', due: 'Oct 15', done: false, tags: ['budget', 'quarterly'] },
  { id: 2, title: 'Infrastructure Upgrade', desc: 'Migrate legacy servers to cloud infrastructure', priority: 'high', dept: 'Operations', assignee: 'RP', due: 'Oct 20', done: false, tags: ['infra', 'cloud'] },
  { id: 3, title: 'Employee Onboarding — Priya Nair', desc: 'Complete onboarding checklist and system access', priority: 'medium', dept: 'HR', assignee: 'PN', due: 'Oct 12', done: true, tags: ['hr', 'onboarding'] },
  { id: 4, title: 'Brand Refresh Concepts', desc: 'Deliver first round of brand identity mockups', priority: 'medium', dept: 'Design', assignee: 'SK', due: 'Oct 25', done: false, tags: ['design', 'brand'] },
  { id: 5, title: 'Sprint 14 Code Review', desc: 'Review all PRs before merge to main branch', priority: 'high', dept: 'Engineering', assignee: 'MW', due: 'Oct 11', done: true, tags: ['code', 'review'] },
  { id: 6, title: 'Sales Pipeline Audit', desc: 'Review and clean CRM data for Q4 targets', priority: 'low', dept: 'Sales', assignee: 'JO', due: 'Nov 1', done: false, tags: ['sales', 'crm'] },
  { id: 7, title: 'Performance Review Forms', desc: 'Distribute Q3 annual performance review templates', priority: 'medium', dept: 'HR', assignee: 'PN', due: 'Oct 14', done: false, tags: ['hr', 'performance'] },
]

const priorityStyle = {
  high: { label: 'High', color: '#fb7185', bg: 'rgba(251,113,133,0.08)', border: 'rgba(251,113,133,0.2)' },
  medium: { label: 'Medium', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
  low: { label: 'Low', color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
}

const deptColors = {
  Finance: '#fbbf24', Operations: '#79c0ff', HR: '#fb7185',
  Design: '#a78bfa', Engineering: '#388bfd', Sales: '#34d399',
}

export default function TasksSection() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('all')

  const toggle = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.done
    if (filter === 'done') return t.done
    if (filter === 'high') return t.priority === 'high' && !t.done
    return true
  })

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.done).length,
    high: tasks.filter(t => t.priority === 'high' && !t.done).length,
  }

  return (
    <div className="p-6 space-y-5">
      <SectionHeader tag="Productivity" title="Task Management" subtitle="Track project and team task completion" action="New Task" />

      {/* Progress summary */}
      <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-semibold text-ghost">Overall Progress</div>
            <div className="text-[10px] text-silver/50">{stats.done} of {stats.total} tasks completed</div>
          </div>
          <div className="text-2xl font-bold text-pure">{Math.round((stats.done / stats.total) * 100)}%</div>
        </div>
        <div className="h-2 bg-mist/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(to right, #388bfd, #79c0ff)' }}
            initial={{ width: 0 }}
            animate={{ width: `${(stats.done / stats.total) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
        <div className="flex gap-4 mt-3 text-[10px]">
          <span className="text-silver/50"><span className="text-pure font-semibold">{stats.total - stats.done}</span> remaining</span>
          <span className="text-silver/50"><span className="text-rose-400 font-semibold">{stats.high}</span> high priority</span>
          <span className="text-silver/50"><span className="text-emerald-400 font-semibold">{stats.done}</span> done</span>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'high', label: 'High Priority' },
          { key: 'done', label: 'Completed' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-[10px] tracking-wide uppercase font-medium transition-all border ${
              filter === f.key ? 'bg-azure/10 text-azure border-azure/25' : 'text-silver/50 border-mist/15 hover:text-silver hover:border-mist/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      <AnimatePresence>
        <div className="space-y-2">
          {filtered.map((task, i) => {
            const p = priorityStyle[task.priority]
            const dc = deptColors[task.dept] || '#388bfd'
            return (
              <motion.div
                key={task.id}
                className={`glass-card rounded-2xl p-4 transition-all ${task.done ? 'opacity-50' : ''}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: task.done ? 0.5 : 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggle(task.id)}
                    className="shrink-0 mt-0.5 transition-colors"
                    style={{ color: task.done ? '#34d399' : 'rgba(139,148,158,0.4)' }}
                  >
                    {task.done ? <CheckSquare size={16} /> : <Square size={16} />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className={`text-sm font-medium ${task.done ? 'line-through text-silver/40' : 'text-ghost'}`}>
                        {task.title}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div
                          className="text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border"
                          style={{ background: p.bg, color: p.color, borderColor: p.border }}
                        >
                          {p.label}
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-silver/45 mb-2">{task.desc}</div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div
                        className="flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full"
                        style={{ background: `${dc}12`, color: dc, border: `1px solid ${dc}25` }}
                      >
                        <Tag size={8} /> {task.dept}
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-silver/40">
                        <User size={9} />
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#8b949e' }}
                        >
                          {task.assignee}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-silver/40">
                        <Flag size={8} /> Due {task.due}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </AnimatePresence>
    </div>
  )
}
