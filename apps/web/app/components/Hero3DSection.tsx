"use client"

import { Suspense, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Stars, Float } from "@react-three/drei"
import * as THREE from "three"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Plane, MapPin, ChevronDown } from "lucide-react"

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)

  // Create procedural earth-like texture using canvas
  const earthTexture = useMemo(() => {
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext("2d")!
    // Ocean base
    ctx.fillStyle = "#1a5276"
    ctx.fillRect(0, 0, 512, 256)
    // Land masses (simplified)
    ctx.fillStyle = "#27ae60"
    // North America
    ctx.beginPath()
    ctx.ellipse(120, 80, 40, 30, 0.2, 0, Math.PI * 2)
    ctx.fill()
    // South America
    ctx.beginPath()
    ctx.ellipse(150, 140, 25, 45, 0.1, 0, Math.PI * 2)
    ctx.fill()
    // Europe/Asia
    ctx.beginPath()
    ctx.ellipse(300, 70, 70, 35, 0, 0, Math.PI * 2)
    ctx.fill()
    // Africa
    ctx.beginPath()
    ctx.ellipse(280, 130, 35, 45, 0, 0, Math.PI * 2)
    ctx.fill()
    // Australia
    ctx.beginPath()
    ctx.ellipse(420, 160, 25, 18, 0, 0, Math.PI * 2)
    ctx.fill()
    const texture = new THREE.CanvasTexture(canvas)
    return texture
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.08
    }
  })

  return (
    <group>
      {/* Main Globe */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          metalness={0.3}
          roughness={0.7}
          emissive={new THREE.Color("#059669")}
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} scale={1.15}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh scale={1.01}>
        <sphereGeometry args={[2, 32, 16]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.06}
          wireframe
        />
      </mesh>
    </group>
  )
}

function OrbitingPlanes() {
  const groupRef = useRef<THREE.Group>(null)
  const planeCount = 4

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: planeCount }).map((_, i) => {
        const angle = (i / planeCount) * Math.PI * 2
        const radius = 3.2
        return (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 0.5) * 0.5,
                Math.sin(angle) * radius,
              ]}
              rotation={[0, -angle, 0]}
            >
              <boxGeometry args={[0.12, 0.04, 0.18]} />
              <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.3} />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)
  const count = 200

  const [positions] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const r = 2.5 + Math.random() * 2
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    return [positions]
  }, [count])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="#059669" />
      <pointLight position={[0, 5, -10]} intensity={0.3} color="#D4AF37" />
      <Globe />
      <OrbitingPlanes />
      <FloatingParticles />
      <Stars radius={50} depth={50} count={1000} factor={3} saturation={0} fade speed={1} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </>
  )
}

export default function Hero3DSection() {
  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-slate-900">
      {/* Fallback Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-3d-travel.jpg)" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/60" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 opacity-60 mix-blend-screen">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-3 py-1 bg-emerald-600/30 border border-emerald-500/50 rounded-full text-emerald-300 text-sm font-medium">
              Pakistan's #1 Travel Agency
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight font-display text-shadow-lg">
            Discover the World
            <br />
            with <span className="text-emerald-400">Madni Travel</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for flights, holidays, Umrah packages, visa services,
            hotels, and bus bookings across Pakistan and beyond.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/holidays">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Explore Packages
              </Button>
            </Link>
            <Link href="/flights">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
              >
                <Plane className="w-5 h-5 mr-2" />
                Book a Flight
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>50+ Destinations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gold-500" />
              <span>10,000+ Happy Travelers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>24/7 Support</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8"
        >
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-xs">Scroll Down</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
