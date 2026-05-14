import React, { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function FloatingParticles() {
  const mesh = useRef()
  const count = 120

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
    }
    return pos
  }, [])

  const speeds = useMemo(() => Array.from({ length: count }, () => Math.random() * 0.3 + 0.1), [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const pos = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += speeds[i] * 0.005
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#388bfd" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function GateDoor({ side, isUnlocking }) {
  const mesh = useRef()
  const targetX = useRef(side === 'left' ? -1.5 : 1.5)

  useFrame(() => {
    if (isUnlocking) {
      targetX.current += side === 'left' ? -0.04 : 0.04
    }
    mesh.current.position.x += (targetX.current - mesh.current.position.x) * 0.06
  })

  return (
    <mesh ref={mesh} position={[side === 'left' ? -1.5 : 1.5, 0, 0]}>
      <boxGeometry args={[3, 8, 0.15]} />
      <meshStandardMaterial
        color="#0d1117"
        metalness={0.95}
        roughness={0.05}
        envMapIntensity={1}
      />
    </mesh>
  )
}

function GateFrame() {
  return (
    <group>
      {/* Top bar */}
      <mesh position={[0, 4.1, 0]}>
        <boxGeometry args={[6.3, 0.22, 0.22]} />
        <meshStandardMaterial color="#161b22" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Left pillar */}
      <mesh position={[-3.15, 0, 0]}>
        <boxGeometry args={[0.22, 8.4, 0.22]} />
        <meshStandardMaterial color="#161b22" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Right pillar */}
      <mesh position={[3.15, 0, 0]}>
        <boxGeometry args={[0.22, 8.4, 0.22]} />
        <meshStandardMaterial color="#161b22" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Bottom bar */}
      <mesh position={[0, -4.1, 0]}>
        <boxGeometry args={[6.3, 0.22, 0.22]} />
        <meshStandardMaterial color="#161b22" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Accent lines */}
      <mesh position={[0, 4.0, 0.12]}>
        <boxGeometry args={[6.2, 0.04, 0.02]} />
        <meshStandardMaterial color="#388bfd" emissive="#388bfd" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, -4.0, 0.12]}>
        <boxGeometry args={[6.2, 0.04, 0.02]} />
        <meshStandardMaterial color="#388bfd" emissive="#388bfd" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

function LockMechanism({ isUnlocking, onClick }) {
  const group = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const core = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) ring1.current.rotation.z = t * 0.4
    if (ring2.current) ring2.current.rotation.z = -t * 0.6
    if (group.current && isUnlocking) {
      group.current.rotation.z += 0.05
      core.current.scale.setScalar(1 + Math.sin(t * 10) * 0.1)
    }
  })

  return (
    <group ref={group} position={[0, 0, 0.15]} onClick={onClick}>
      {/* Outer ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[0.55, 0.025, 8, 48]} />
        <meshStandardMaterial color="#388bfd" emissive="#388bfd" emissiveIntensity={1.5} metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Middle ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[0.38, 0.018, 8, 36]} />
        <meshStandardMaterial color="#79c0ff" emissive="#79c0ff" emissiveIntensity={1} metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Core */}
      <mesh ref={core}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="#388bfd" emissive="#388bfd" emissiveIntensity={3} transparent opacity={0.9} />
      </mesh>
      {/* Lock icon lines */}
      <mesh position={[0, -0.06, 0.01]}>
        <boxGeometry args={[0.18, 0.14, 0.01]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
      <mesh position={[0, 0.04, 0.01]}>
        <torusGeometry args={[0.075, 0.015, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
    </group>
  )
}

function AmbientEnvironment() {
  return (
    <group>
      {/* Floor reflection plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.5, -5]}>
        <planeGeometry args={[40, 30]} />
        <meshStandardMaterial color="#050507" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Back wall */}
      <mesh position={[0, 0, -12]}>
        <planeGeometry args={[50, 30]} />
        <meshStandardMaterial color="#080a0f" roughness={0.9} />
      </mesh>
      {/* Side columns */}
      {[-8, -6, 6, 8].map((x, i) => (
        <mesh key={i} position={[x, 0, -6]}>
          <boxGeometry args={[0.4, 12, 0.4]} />
          <meshStandardMaterial color="#0d1117" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      {/* Ceiling light strips */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x * 2, 5, -3]}>
          <boxGeometry args={[0.05, 0.05, 8]} />
          <meshStandardMaterial color="#388bfd" emissive="#388bfd" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

function CameraRig({ mousePos, isUnlocking }) {
  const { camera } = useThree()

  useFrame(() => {
    if (!isUnlocking) {
      camera.position.x += (mousePos.x * 0.3 - camera.position.x) * 0.05
      camera.position.y += (-mousePos.y * 0.2 - camera.position.y) * 0.05
    } else {
      camera.position.z -= 0.06
    }
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function GateScene({ onGateClick, showLogin, isUnlocking, mousePos }) {
  return (
    <div className="relative w-full h-full">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        className="absolute inset-0"
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={['#050507']} />
        <fog attach="fog" args={['#050507', 10, 35]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 3]} intensity={2} color="#388bfd" distance={8} />
        <pointLight position={[-8, 4, -4]} intensity={0.5} color="#79c0ff" distance={15} />
        <pointLight position={[8, 4, -4]} intensity={0.5} color="#388bfd" distance={15} />
        <spotLight position={[0, 8, 2]} intensity={3} color="#cae8ff" angle={0.4} penumbra={0.8} target-position={[0, 0, 0]} />

        <AmbientEnvironment />
        <GateFrame />
        <GateDoor side="left" isUnlocking={isUnlocking} />
        <GateDoor side="right" isUnlocking={isUnlocking} />
        <LockMechanism isUnlocking={isUnlocking} onClick={!showLogin ? onGateClick : undefined} />
        <FloatingParticles />
        <CameraRig mousePos={mousePos} isUnlocking={isUnlocking} />
      </Canvas>

      {/* Overlay UI */}
      {!showLogin && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end pb-16 pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {/* Brand */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center">
            <div className="text-[10px] tracking-[0.5em] text-azure/60 uppercase mb-1">System Access</div>
            <div
              className="text-4xl font-black tracking-[0.2em] text-gradient uppercase cursor-pointer"
              style={{ letterSpacing: '0.3em' }}
            >
              WORKAHOLIC
            </div>
            <div className="text-[9px] tracking-[0.35em] text-silver/40 uppercase mt-1">Corporate Operating System v4.2</div>
          </div>

          {/* Click prompt */}
          <motion.div
            className="flex flex-col items-center gap-3 pointer-events-auto cursor-pointer"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            onClick={onGateClick}
          >
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-azure to-transparent" />
            <span className="text-[10px] tracking-[0.4em] text-azure/70 uppercase">Authenticate to Enter</span>
            <div className="w-px h-8 bg-gradient-to-b from-azure via-transparent to-transparent" />
          </motion.div>
        </motion.div>
      )}

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,7,0.7) 100%)' }}
      />

      {/* Top scan line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-azure/20 to-transparent" />
    </div>
  )
}
