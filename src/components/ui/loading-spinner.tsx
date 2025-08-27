"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  text = "Loading...", 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center gap-3 ${className}`}
    >
      <div 
        className={`${sizeClasses[size]} border-2 border-emerald-500 border-t-transparent rounded-full animate-spin`} 
      />
      {text && (
        <span className={`${textSizes[size]} text-white font-medium`}>
          {text}
        </span>
      )}
    </motion.div>
  )
}

export default LoadingSpinner
