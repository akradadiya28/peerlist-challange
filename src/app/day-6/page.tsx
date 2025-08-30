"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import {
  X,
  Settings,
  Play,
  Pause,
  Volume2,
  Palette,
  Music,
  Video,
  Image as ImageIcon,
  Search,
  Filter,
  Maximize2,
  Minimize2,
} from "lucide-react"

interface OverlayState {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  content: React.ReactNode
  size: "small" | "medium" | "large"
}

const WarpOverlay = () => {
  const prefersReduced = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const [currentState, setCurrentState] = useState<OverlayState | null>(null)
  const [overlaySize, setOverlaySize] = useState<"small" | "medium" | "large">("medium")
  const [isExpanding, setIsExpanding] = useState(false)
  const [particleCount, setParticleCount] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)

  const overlayStates: OverlayState[] = [
    {
      id: "media",
      title: "Media Gallery",
      description: "Browse and manage your media files",
      icon: <ImageIcon className="h-6 w-6" />,
      color: "from-blue-400 to-cyan-500",
      size: "large",
      content: <MediaGalleryContent />,
    },
    {
      id: "music",
      title: "Music Player",
      description: "Control your music playback",
      icon: <Music className="h-6 w-6" />,
      color: "from-purple-400 to-pink-500",
      size: "medium",
      content: <MusicPlayerContent />,
    },
    {
      id: "video",
      title: "Video Controls",
      description: "Advanced video playback options",
      icon: <Video className="h-6 w-6" />,
      color: "from-red-400 to-orange-500",
      size: "medium",
      content: <VideoControlsContent />,
    },
    {
      id: "settings",
      title: "Settings Panel",
      description: "Customize your experience",
      icon: <Settings className="h-6 w-6" />,
      color: "from-gray-400 to-slate-500",
      size: "small",
      content: <SettingsContent />,
    },
    {
      id: "search",
      title: "Search & Filter",
      description: "Find what you're looking for",
      icon: <Search className="h-6 w-6" />,
      color: "from-emerald-400 to-green-500",
      size: "medium",
      content: <SearchContent />,
    },
    {
      id: "creative",
      title: "Creative Tools",
      description: "Unleash your creativity",
      icon: <Palette className="h-6 w-6" />,
      color: "from-yellow-400 to-orange-500",
      size: "large",
      content: <CreativeToolsContent />,
    },
  ]

  const openOverlay = (state: OverlayState) => {
    setCurrentState(state)
    setOverlaySize(state.size)
    setIsExpanding(true)
    setIsOpen(true)
    setParticleCount(12)
  }

  const closeOverlay = () => {
    setIsExpanding(false)
    setTimeout(() => {
      setIsOpen(false)
      setCurrentState(null)
      setParticleCount(0)
    }, 300)
  }

  const toggleSize = () => {
    if (overlaySize === "small") setOverlaySize("medium")
    else if (overlaySize === "medium") setOverlaySize("large")
    else setOverlaySize("small")
  }

  const getSizeClasses = () => {
    switch (overlaySize) {
      case "small":
        return "w-80 h-64"
      case "medium":
        return "w-96 h-80"
      case "large":
        return "w-[28rem] h-96"
      default:
        return "w-96 h-80"
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeOverlay()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-zinc-950" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.18,
        }}
      />
      <div className="absolute left-1/5 top-1/4 h-[22rem] w-[22rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-1/5 right-1/6 h-[22rem] w-[22rem] rounded-full bg-teal-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl p-6 md:p-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            Warp Overlay
          </h1>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 md:text-lg">
            Interactive overlays that smoothly expand and transition between states with natural motion and responsive design.
          </p>
        </motion.div>

        {/* Trigger Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {overlayStates.map((state, index) => (
              <motion.button
                key={state.id}
                onClick={() => openOverlay(state)}
                className={`group relative overflow-hidden rounded-xl border border-zinc-700/50 bg-zinc-800/50 p-6 text-left transition-all duration-300 hover:border-zinc-600/50 hover:bg-zinc-700/50 hover:scale-105`}
                whileHover={!prefersReduced ? { y: -4 } : undefined}
                whileTap={!prefersReduced ? { scale: 0.98 } : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <div className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${state.color}`}>
                  {state.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  {state.title}
                </h3>
                <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {state.description}
                </p>
                
                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center text-zinc-400 max-w-2xl mx-auto"
        >
          <p className="mb-4">
            <span className="text-emerald-400 font-medium">Click</span> any card to open the warp overlay •{" "}
            <span className="text-blue-400 font-medium">Resize</span> the overlay dynamically •{" "}
            <span className="text-purple-400 font-medium">Press Esc</span> to close •{" "}
            <span className="text-yellow-400 font-medium">Watch</span> the smooth transitions
          </p>
        </motion.div>
      </div>

      {/* Warp Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeOverlay}
            />

            {/* Overlay */}
            <motion.div
              ref={overlayRef}
              initial={{ 
                opacity: 0, 
                scale: 0.8, 
                rotateX: -15,
                rotateY: 15,
                y: 50
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotateX: 0,
                rotateY: 0,
                y: 0
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.8, 
                rotateX: 15,
                rotateY: -15,
                y: -50
              }}
              transition={{ 
                duration: 0.5, 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
              className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 ${getSizeClasses()} overflow-hidden rounded-2xl border border-zinc-600/50 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl`}
            >
              {/* Header */}
              <div className={`relative h-16 bg-gradient-to-r ${currentState?.color} p-4 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="text-white">
                    {currentState?.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{currentState?.title}</h2>
                    <p className="text-xs text-white/80">{currentState?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={toggleSize}
                    className="rounded-lg bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Toggle size"
                  >
                    {overlaySize === "small" ? <Maximize2 className="h-4 w-4" /> : 
                     overlaySize === "medium" ? <Maximize2 className="h-4 w-4" /> : 
                     <Minimize2 className="h-4 w-4" />}
                  </motion.button>
                  
                  <motion.button
                    onClick={closeOverlay}
                    className="rounded-lg bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 h-full overflow-y-auto">
                {currentState?.content}
              </div>

              {/* Expanding Animation Effect */}
              {isExpanding && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl" />
                </motion.div>
              )}
            </motion.div>

            {/* Floating Particles */}
            <AnimatePresence>
              {particleCount > 0 && (
                <>
                  {Array.from({ length: particleCount }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="fixed z-30 w-2 h-2 bg-emerald-400 rounded-full"
                      initial={{ 
                        opacity: 0, 
                        scale: 0,
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [
                          window.innerWidth / 2,
                          window.innerWidth / 2 + Math.sin(i * 30) * 200,
                          window.innerWidth / 2 + Math.sin(i * 30) * 300
                        ],
                        y: [
                          window.innerHeight / 2,
                          window.innerHeight / 2 + Math.cos(i * 30) * 200,
                          window.innerHeight / 2 + Math.cos(i * 30) * 300
                        ]
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.1,
                        ease: "easeOut"
                      }}
                      onAnimationComplete={() => {
                        if (i === particleCount - 1) setParticleCount(0)
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Content Components
const MediaGalleryContent = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="aspect-square bg-zinc-700/50 rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ImageIcon className="h-8 w-8 text-zinc-400" />
        </motion.div>
      ))}
    </div>
    <div className="flex gap-2">
      <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
        Upload
      </button>
      <button className="flex-1 bg-zinc-700 text-white py-2 rounded-lg hover:bg-zinc-600 transition-colors">
        Browse
      </button>
    </div>
  </div>
)

const MusicPlayerContent = () => (
  <div className="space-y-4">
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center">
        <Music className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-white font-medium">Now Playing</h3>
      <p className="text-zinc-400 text-sm">Amazing Song Title</p>
    </div>
    
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button className="bg-purple-600 p-2 rounded-lg text-white hover:bg-purple-700">
          <Play className="h-4 w-4" />
        </button>
        <button className="bg-zinc-700 p-2 rounded-lg text-white hover:bg-zinc-600">
          <Pause className="h-4 w-4" />
        </button>
        <button className="bg-zinc-700 p-2 rounded-lg text-white hover:bg-zinc-600">
          <Volume2 className="h-4 w-4" />
        </button>
      </div>
      
      <div className="w-full bg-zinc-700 rounded-full h-2">
        <div className="bg-purple-500 h-2 rounded-full w-1/3" />
      </div>
    </div>
  </div>
)

const VideoControlsContent = () => (
  <div className="space-y-4">
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
        <Video className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-white font-medium">Video Controls</h3>
    </div>
    
    <div className="grid grid-cols-2 gap-3">
      <button className="bg-red-600 p-3 rounded-lg text-white hover:bg-red-700 transition-colors">
        <Play className="h-5 w-5 mx-auto" />
      </button>
      <button className="bg-zinc-700 p-3 rounded-lg text-white hover:bg-zinc-600 transition-colors">
        <Pause className="h-5 w-5 mx-auto" />
      </button>
      <button className="bg-zinc-700 p-3 rounded-lg text-white hover:bg-zinc-600 transition-colors">
        <Volume2 className="h-5 w-5 mx-auto" />
      </button>
      <button className="bg-zinc-700 p-3 rounded-lg text-white hover:bg-zinc-600 transition-colors">
        <Maximize2 className="h-5 w-5 mx-auto" />
      </button>
    </div>
  </div>
)

const SettingsContent = () => (
  <div className="space-y-4">
    <h3 className="text-white font-medium mb-3">Preferences</h3>
    
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-zinc-300 text-sm">Dark Mode</span>
        <div className="w-12 h-6 bg-zinc-700 rounded-full relative">
          <div className="w-5 h-5 bg-emerald-500 rounded-full absolute left-0.5 top-0.5" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-zinc-300 text-sm">Notifications</span>
        <div className="w-12 h-6 bg-zinc-700 rounded-full relative">
          <div className="w-5 h-5 bg-zinc-500 rounded-full absolute right-0.5 top-0.5" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-zinc-300 text-sm">Auto-save</span>
        <div className="w-12 h-6 bg-zinc-700 rounded-full relative">
          <div className="w-5 h-5 bg-emerald-500 rounded-full absolute left-0.5 top-0.5" />
        </div>
      </div>
    </div>
  </div>
)

const SearchContent = () => (
  <div className="space-y-4">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
      <input
        type="text"
        placeholder="Search anything..."
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none"
      />
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Filter className="h-4 w-4" />
        <span>Recent searches</span>
      </div>
      {["Design patterns", "React hooks", "Animation", "UI/UX"].map((term, i) => (
        <motion.div
          key={term}
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-zinc-800 cursor-pointer"
          whileHover={{ x: 4 }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Search className="h-3 w-3 text-zinc-500" />
          <span className="text-zinc-300 text-sm">{term}</span>
        </motion.div>
      ))}
    </div>
  </div>
)

const CreativeToolsContent = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-3">
      {[
        { icon: <Palette className="h-6 w-6" />, label: "Color Picker", color: "from-yellow-500 to-orange-500" },
        { icon: <Brush className="h-6 w-6" />, label: "Brush Tool", color: "from-blue-500 to-cyan-500" },
        { icon: <Shapes className="h-6 w-6" />, label: "Shapes", color: "from-purple-500 to-pink-500" },
        { icon: <Type className="h-6 w-6" />, label: "Text Tool", color: "from-emerald-500 to-green-500" },
      ].map((tool, i) => (
        <motion.button
          key={tool.label}
          className={`p-3 rounded-lg bg-gradient-to-r ${tool.color} text-white hover:scale-105 transition-transform`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="text-center">
            {tool.icon}
            <p className="text-xs mt-1">{tool.label}</p>
          </div>
        </motion.button>
      ))}
    </div>
    
    <div className="flex gap-2">
      <button className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors">
        New Project
      </button>
      <button className="flex-1 bg-zinc-700 text-white py-2 rounded-lg hover:bg-zinc-600 transition-colors">
        Templates
      </button>
    </div>
  </div>
)

const Brush = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
)

const Shapes = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
  </svg>
)

const Type = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
  </svg>
)

export default WarpOverlay
