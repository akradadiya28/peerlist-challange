"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Calendar, Trophy, Zap } from "lucide-react";
import Link from "next/link";

const challengeDays = [
  {
    id: 1,
    title: "Animated Avatar Stack",
    description: "Design and build an animated avatar stack that goes beyond the basics. Think of how avatars can come alive through shapes, colors, gradients, transitions, and motion.",
    status: "completed",
    difficulty: "Beginner",
    icon: "👥",
    path: "/day-1",
    features: ["Hover animations", "Gradient effects", "Smooth transitions", "Interactive elements"]
  },
  {
    id: 2,
    title: "Interactive OTP Input",
    description: "Design an OTP input that clearly distinguishes default, active, correct, and incorrect states with rich interactions and feedback.",
    status: "completed",
    difficulty: "Intermediate",
    icon: "🔐",
    path: "/day-2",
    features: ["State management", "Keyboard navigation", "Validation feedback", "Accessibility"]
  },
  {
    id: 3,
    title: "Card to Page Transition",
    description: "Design a transition that seamlessly blends from one page to another with smooth animations and comprehensive loading states.",
    status: "completed",
    difficulty: "Advanced",
    icon: "🔄",
    path: "/day-3",
    features: ["Smooth transitions", "Loading states", "Hover effects", "Responsive design"]
  },
  {
    id: 4,
    title: "Coming Soon",
    description: "The next challenge awaits! Stay tuned for more interactive design challenges.",
    status: "upcoming",
    difficulty: "TBD",
    icon: "🚀",
    path: "#",
    features: ["Coming soon", "Stay tuned", "More challenges", "Interactive design"]
  },
  {
    id: 5,
    title: "Coming Soon",
    description: "The next challenge awaits! Stay tuned for more interactive design challenges.",
    status: "upcoming",
    difficulty: "TBD",
    icon: "🎨",
    path: "#",
    features: ["Coming soon", "Stay tuned", "More challenges", "Interactive design"]
  },
  {
    id: 6,
    title: "Coming Soon",
    description: "The next challenge awaits! Stay tuned for more interactive design challenges.",
    status: "upcoming",
    difficulty: "TBD",
    icon: "⚡",
    path: "#",
    features: ["Coming soon", "Stay tuned", "More challenges", "Interactive design"]
  },
  {
    id: 7,
    title: "Coming Soon",
    description: "The next challenge awaits! Stay tuned for more interactive design challenges.",
    status: "upcoming",
    difficulty: "TBD",
    icon: "🏆",
    path: "#",
    features: ["Coming soon", "Stay tuned", "More challenges", "Interactive design"]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "upcoming":
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    default:
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-500/10 text-green-400 border-green-500/20";
    case "Intermediate":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    case "Advanced":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.5,
        }}
      />

      {/* Vignette Effect */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 45%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 min-h-screen p-4 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <img
              src="https://dqy38fnwh4fqs.cloudfront.net/website/peerlist-logo-full-dark.svg"
              alt="Peerlist Logo"
              className="w-64 h-24 object-contain"
            />
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Interaction Design
            <motion.span
              className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 ml-0 md:ml-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Challenge
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-zinc-400 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            A 7-day journey through interactive design challenges. Each day brings new opportunities to explore animations, 
            transitions, and user interactions that make digital experiences come alive.
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2 text-emerald-400">
              <Trophy className="w-5 h-5" />
              <span className="text-sm font-medium">3 Completed</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">7 Days Total</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">Interactive</span>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center gap-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Challenge Cards Grid */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challengeDays.map((day, index) => (
              <motion.div
                key={day.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
                className="group relative"
              >
                {day.status === "completed" ? (
                  <Link href={day.path} className="block">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 backdrop-blur-xl border border-zinc-700/50 cursor-pointer transition-all duration-500 hover:border-zinc-600/80 hover:shadow-2xl hover:shadow-emerald-500/10">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-teal-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-transparent to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

                      <div className="relative p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-2xl ${day.icon}`} />
                          <div className="flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(day.status)}`}>
                              {day.status === "completed" ? "Completed" : "Upcoming"}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(day.difficulty)}`}>
                              {day.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                          Day {day.id}: {day.title}
                        </h3>

                        <p className="text-sm text-zinc-400 leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors duration-300">
                          {day.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2 mb-4">
                          {day.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-zinc-500">
                              <Sparkles className="w-3 h-3 text-emerald-400" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action */}
                        <div className="flex items-center gap-2 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">
                          <span className="text-sm font-medium">View Challenge</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>

                        {/* Bottom accent line */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/50 to-zinc-800/50 backdrop-blur-xl border border-zinc-600/30 cursor-not-allowed opacity-60">
                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-2xl ${day.icon}`} />
                        <div className="flex gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(day.status)}`}>
                            Coming Soon
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(day.difficulty)}`}>
                            TBD
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-zinc-500 mb-3">
                        Day {day.id}: {day.title}
                      </h3>

                      <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                        {day.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-4">
                        {day.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-zinc-600">
                            <Sparkles className="w-3 h-3 text-zinc-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action */}
                      <div className="flex items-center gap-2 text-zinc-500">
                        <span className="text-sm font-medium">Stay Tuned</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-20 text-zinc-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <p className="text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS • 
            <span className="text-emerald-400 ml-1">Peerlist Interaction Design Challenge</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
