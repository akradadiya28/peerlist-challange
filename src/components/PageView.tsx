"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles, Play, Heart } from "lucide-react"


interface PageViewProps {
  item: {
    id: string
    title: string
    description: string
    image: string
    category: string
    content: string
    detailTitle: string
    detailImage: string
  }
  onBack: () => void
  isLoading?: boolean
}

const PageView: React.FC<PageViewProps> = ({ item, onBack, isLoading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="min-h-screen p-4 md:p-8"
    >
      <div className="relative max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-6 mb-12"
        >
          <motion.button
            onClick={onBack}
            disabled={isLoading}
            className={`group relative p-3 rounded-2xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 transition-all duration-300 ${
              isLoading 
                ? 'cursor-not-allowed opacity-60' 
                : 'hover:border-zinc-600/80 hover:shadow-lg hover:shadow-emerald-500/10'
            }`}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
            )}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <div>
            <span className="text-sm text-zinc-500 block">Back to {item?.title}</span>
            <motion.div
              className="flex items-center gap-2 mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">Tools by Peerlist</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative overflow-hidden rounded-3xl border border-zinc-700/50 bg-zinc-800/30 backdrop-blur-xl">
                <img
                  src={item.detailImage || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Image overlay with play button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                <div className="absolute top-6 left-6">
                  <span className="text-sm font-semibold text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {item.title}
              </motion.h1>

              <motion.p
                className="text-lg text-zinc-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {item.description}
              </motion.p>
            </div>

            {/* Enhanced Content Card */}
            <motion.div
              className="relative p-8 rounded-3xl bg-zinc-800/30 backdrop-blur-xl border border-zinc-700/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                {item.detailTitle}
              </h3>

              <p className="text-zinc-300 leading-relaxed text-lg">{item.content}</p>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 relative group py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Get Started
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-2xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 hover:border-zinc-600/80 text-zinc-400 hover:text-white transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default PageView
