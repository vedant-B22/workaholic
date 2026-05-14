import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Fingerprint, Shield } from 'lucide-react'

export default function LoginPanel({ onLogin, onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [step, setStep] = useState('form') // form | biometric | success

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) return
    setStep('biometric')
    setScanning(true)
    setTimeout(() => {
      setScanComplete(true)
      setScanning(false)
    }, 1800)
    setTimeout(() => {
      setStep('success')
      setTimeout(onLogin, 600)
    }, 2600)
  }

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-void/40 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        className="relative glass-card rounded-2xl w-full max-w-md mx-4 overflow-hidden"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ type: 'spring', damping: 24, stiffness: 200 }}
        style={{ boxShadow: '0 0 0 1px rgba(56,139,253,0.2), 0 0 80px rgba(56,139,253,0.08), 0 40px 80px rgba(0,0,0,0.6)' }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure to-transparent" />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 shimmer pointer-events-none rounded-2xl" />

        <div className="relative p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-[9px] tracking-[0.4em] text-azure/60 uppercase mb-1.5 flex items-center gap-2">
                <Shield size={8} className="text-azure" />
                Secure Authentication
              </div>
              <h2 className="text-xl font-bold text-pure tracking-tight">System Access</h2>
              <p className="text-silver/60 text-xs mt-1 tracking-wide">WORKAHOLIC Corporate OS</p>
            </div>
            <button
              onClick={onClose}
              className="text-silver/40 hover:text-silver transition-colors p-1"
            >
              <X size={16} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 'form' && (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-4"
              >
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-[0.25em] text-silver/60 uppercase">Identity</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="executive@workaholic.co"
                      className="w-full bg-charcoal/60 border border-mist/20 rounded-lg px-4 py-3 text-sm text-ghost placeholder-silver/30 focus:outline-none focus:border-azure/50 focus:bg-charcoal/80 transition-all tracking-wide"
                      style={{ fontFamily: 'Inter, monospace' }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-azure/60 animate-pulse" />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] tracking-[0.25em] text-silver/60 uppercase">Passkey</label>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-charcoal/60 border border-mist/20 rounded-lg px-4 py-3 text-sm text-ghost placeholder-silver/30 focus:outline-none focus:border-azure/50 focus:bg-charcoal/80 transition-all pr-10 tracking-widest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-silver/40 hover:text-silver/70 transition-colors"
                    >
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 h-px bg-mist/20" />
                  <span className="text-[9px] tracking-[0.3em] text-silver/30 uppercase">or use</span>
                  <div className="flex-1 h-px bg-mist/20" />
                </div>

                {/* Biometric button */}
                <button
                  type="button"
                  onClick={() => { setStep('biometric'); setScanning(true); setTimeout(() => { setScanComplete(true); setScanning(false); }, 1800); setTimeout(() => { setStep('success'); setTimeout(onLogin, 600); }, 2600); }}
                  className="w-full flex items-center justify-center gap-2.5 bg-charcoal/60 border border-mist/20 rounded-lg py-2.5 text-xs text-silver/70 hover:text-silver hover:border-azure/30 transition-all group"
                >
                  <Fingerprint size={15} className="group-hover:text-azure transition-colors" />
                  <span className="tracking-[0.15em] uppercase text-[10px]">Biometric Authentication</span>
                </button>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="w-full relative overflow-hidden bg-azure/10 border border-azure/30 hover:bg-azure/20 hover:border-azure/50 rounded-lg py-3.5 text-sm font-semibold text-azure tracking-[0.15em] uppercase transition-all mt-2"
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="relative z-10">Authenticate</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-azure/5 to-transparent" />
                </motion.button>

                <p className="text-center text-[10px] text-silver/30 tracking-wider">
                  Protected by WORKAHOLIC Security Protocol
                </p>
              </motion.form>
            )}

            {step === 'biometric' && (
              <motion.div
                key="biometric"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-8 gap-6"
              >
                <div className="relative">
                  {/* Scan rings */}
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border border-azure/30"
                      animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
                    />
                  ))}

                  {/* Biometric face scan visual */}
                  <div className="relative w-32 h-32 rounded-full border border-azure/30 flex items-center justify-center overflow-hidden"
                    style={{ background: 'radial-gradient(circle, rgba(56,139,253,0.08) 0%, transparent 70%)' }}
                  >
                    {/* Face outline SVG */}
                    <svg width="70" height="80" viewBox="0 0 70 80" fill="none" className="opacity-60">
                      <ellipse cx="35" cy="32" rx="22" ry="28" stroke="#388bfd" strokeWidth="0.8" />
                      <circle cx="26" cy="28" r="3.5" stroke="#388bfd" strokeWidth="0.8" />
                      <circle cx="44" cy="28" r="3.5" stroke="#388bfd" strokeWidth="0.8" />
                      <path d="M27 43 Q35 50 43 43" stroke="#388bfd" strokeWidth="0.8" strokeLinecap="round" />
                      <line x1="35" y1="4" x2="35" y2="12" stroke="#388bfd" strokeWidth="0.8" />
                      <line x1="13" y1="32" x2="5" y2="32" stroke="#388bfd" strokeWidth="0.8" />
                      <line x1="65" y1="32" x2="57" y2="32" stroke="#388bfd" strokeWidth="0.8" />
                      {/* Corner brackets */}
                      <path d="M5 5 L5 18 M5 5 L18 5" stroke="#79c0ff" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M65 5 L65 18 M65 5 L52 5" stroke="#79c0ff" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M5 75 L5 62 M5 75 L18 75" stroke="#79c0ff" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M65 75 L65 62 M65 75 L52 75" stroke="#79c0ff" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>

                    {/* Scan line */}
                    {scanning && (
                      <motion.div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-azure to-transparent"
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                    )}

                    {scanComplete && (
                      <motion.div
                        className="absolute inset-0 bg-azure/10 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      />
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-azure/70 mb-1">
                    {scanning ? 'Scanning Biometrics' : scanComplete ? 'Identity Verified' : 'Initializing'}
                  </p>
                  <p className="text-silver/40 text-xs">
                    {scanComplete ? 'Authentication successful' : 'Hold still for facial recognition'}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full h-0.5 bg-mist/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-azure via-cyan to-azure"
                    animate={{ width: scanComplete ? '100%' : '65%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-10 gap-4"
              >
                <motion.div
                  className="w-16 h-16 rounded-full border border-azure/50 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.6 }}
                  style={{ background: 'radial-gradient(circle, rgba(56,139,253,0.15) 0%, transparent 70%)' }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <motion.path
                      d="M5 13l4 4L19 7"
                      stroke="#388bfd"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </motion.div>
                <div className="text-center">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-azure mb-1">Access Granted</p>
                  <p className="text-silver/50 text-xs">Initializing workspace...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure/30 to-transparent" />
      </motion.div>
    </motion.div>
  )
}
