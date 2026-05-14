import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../../App'
import Sidebar from '../navigation/Sidebar'
import DashboardHome from './sections/DashboardHome'
import EmployeesSection from './sections/EmployeesSection'
import AttendanceSection from './sections/AttendanceSection'
import AnalyticsSection from './sections/AnalyticsSection'
import TasksSection from './sections/TasksSection'
import RightPanel from './RightPanel'
import TopBar from './TopBar'
import LeaveSection from './sections/LeaveSection'

const sectionMap = {
  dashboard: DashboardHome,
  employees: EmployeesSection,
  attendance: AttendanceSection,
  leave: LeaveSection,
  tasks: TasksSection,
  analytics: AnalyticsSection,
  reports: AnalyticsSection,
  settings: DashboardHome,
}

export default function Dashboard() {
  const { mousePos } = useContext(AppContext)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [prevSection, setPrevSection] = useState(null)

  const handleNav = (section) => {
    if (section === activeSection) return
    setPrevSection(activeSection)
    setActiveSection(section)
  }

  const ActiveComponent = sectionMap[activeSection] || DashboardHome

  return (
    <div
      className="relative w-full h-full flex overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 0%, rgba(56,139,253,0.04) 0%, transparent 60%), #050507',
      }}
    >
      {/* Ambient environment backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,139,253,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,139,253,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Cursor reactive glow */}
      <div
        className="absolute pointer-events-none transition-all duration-700 ease-out"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,139,253,0.04) 0%, transparent 70%)',
          left: `calc(${(mousePos.x + 1) * 50}% - 300px)`,
          top: `calc(${(mousePos.y + 1) * 50}% - 300px)`,
        }}
      />

      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onNavigate={handleNav} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <div className="flex-1 flex overflow-hidden">
          {/* Center content */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                className="absolute inset-0 overflow-y-auto scrollable-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel */}
          <RightPanel />
        </div>
      </div>
    </div>
  )
}
