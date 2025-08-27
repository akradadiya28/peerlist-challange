"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowUpRight } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"

interface TransitionCardProps {
  id: string
  title: string
  description: string
  image: string
  category: string
  onClick: (id: string) => void
  index: number
  isLoading?: boolean
}

const TransitionCard: React.FC<TransitionCardProps> = ({ id, title, description, image, category, onClick, index, isLoading = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={!isLoading ? {
        scale: 1.02,
        y: -8,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      } : {}}
      onClick={() => !isLoading && onClick(id)}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl border border-zinc-700/50 transition-all duration-500 ${
        isLoading ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:border-zinc-600/80 hover:shadow-2xl hover:shadow-emerald-500/10'
      }`}
    >
      {/* Loading overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center"
        >
          <LoadingSpinner size="md" text="Loading..." />
        </motion.div>
      )}

      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      <div className="relative p-6">
        <div className="relative overflow-hidden rounded-xl mb-6">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating sparkles */}
          <motion.div
            className="absolute top-4 right-4 text-white/80 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <motion.span
              className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-emerald-500/20"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {category}
            </motion.span>

            <motion.div
              className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors duration-300"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300">
              {title}
            </h3>

            <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
              {description}
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default TransitionCard
