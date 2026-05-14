import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GateScene from './components/auth/GateScene'
import LoginPanel from './components/auth/LoginPanel'
import VaultTransition from './components/transitions/VaultTransition'
import Dashboard from './components/dashboard/Dashboard'
import VesaBadge from './components/ui/VesaBadge'

export const AppContext = React.createContext(null)

const STAGES = {
  GATE: 'gate',
  LOGIN: 'login',
  UNLOCKING: 'unlocking',
  TRANSITIONING: 'transitioning',
  DASHBOARD: 'dashboard',
}

export default function App() {
  const [stage, setStage] = useState(STAGES.GATE)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [user] = useState({ name: 'Alexandra Chen', role: 'Chief Operations Officer', avatar: 'AC' })

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const handleGateClick = () => setStage(STAGES.LOGIN)
  const handleLogin = () => {
    setStage(STAGES.UNLOCKING)
    setTimeout(() => setStage(STAGES.TRANSITIONING), 2200)
    setTimeout(() => setStage(STAGES.DASHBOARD), 4000)
  }
  const handleLoginClose = () => setStage(STAGES.GATE)

  return (
    <AppContext.Provider value={{ mousePos, user, stage }}>
      <div className="relative w-full h-full overflow-hidden bg-void">
        <VesaBadge />
        <AnimatePresence mode="wait">
          {(stage === STAGES.GATE || stage === STAGES.LOGIN || stage === STAGES.UNLOCKING) && (
            <motion.div
              key="gate-screen"
              className="absolute inset-0"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GateScene
                onGateClick={handleGateClick}
                showLogin={stage === STAGES.LOGIN || stage === STAGES.UNLOCKING}
                isUnlocking={stage === STAGES.UNLOCKING}
                mousePos={mousePos}
              />
              <AnimatePresence>
                {stage === STAGES.LOGIN && (
                  <LoginPanel onLogin={handleLogin} onClose={handleLoginClose} />
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {stage === STAGES.TRANSITIONING && (
            <motion.div key="vault-transition" className="absolute inset-0">
              <VaultTransition />
            </motion.div>
          )}

          {stage === STAGES.DASHBOARD && (
            <motion.div
              key="dashboard"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Dashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  )
}
