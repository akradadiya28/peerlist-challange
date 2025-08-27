"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import TransitionCard from "@/components/TransitionCard"
import PageView from "@/components/PageView"

const mockData = [
  {
    id: "1",
    title: "PeerView",
    description: "View anyone's professional details on their X profiles.",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/peerview-dark.png",
    category: "Devtools",
    content:
      "PeerView is a Chrome extension by Peerlist that lets you instantly view anyone's professional details - projects, work experience, and more, right on their X / Twitter profile. Perfect for tech professionals and recruiters.",
    detailTitle: "PeerView Chrome Extension",
    detailImage: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/peerview-image-dark.png",
  },
  {
    id: "2",
    title: "CodeShot",
    description: "Transform code snippets into shareable images",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/codeshot-dark.png",
    category: "Productivity",
    content:
      "Join us for an unforgettable mountain adventure where you'll trek through scenic trails, witness stunning vistas, and connect with nature. Perfect for both beginners and experienced hikers, this journey includes professional guides, safety equipment, and breathtaking photo opportunities.",
    detailTitle: "Code Screenshot Generator",
    detailImage: "image.png",
  },
  {
    id: "3",
    title: "Internshipp",
    description: "Discover internships at the startups you know and love!",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/internshipp-dark.png",
    category: "Hiring",
    content:
      "Elevate your coding skills with our intensive masterclass covering modern web development practices, clean architecture, and industry best practices. Learn advanced React patterns, TypeScript mastery, and scalable application design that will make you a better developer.",
    detailTitle: "Find Your Dream Internship",
    detailImage: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/internshipp-dark.png",
  },
  {
    id: "4",
    title: "Job Hunt AI",
    description: "Explore and find the perfect job for you using AI.",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/internshipp-dark.png",
    category: "AI",
    content:
      "Embark on a culinary adventure that will take your taste buds around the world. Learn authentic recipes, traditional techniques, and the stories behind iconic dishes from master chefs. Includes hands-on cooking, wine pairing, and cultural insights.",
    detailTitle: "Let's find the perfect job for you with AI job search!",
    detailImage: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/internshipp-dark.png",
  },
  {
    id: "5",
    title: "GitHub Recap",
    description: "A thousand days of code in a beautiful sharable screenshot.",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/github-recap-dark.png",
    category: "Devtools",
    content:
      "Learn to see the city with a photographer's eye. Master composition, lighting, and timing to capture stunning urban scenes that tell compelling stories about modern life. Includes equipment guidance, editing techniques, and portfolio development.",
    detailTitle: "A thousand days of code in a glance",
    detailImage: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/github-recap-dark.png",
  },
  {
    id: "6",
    title: "Resume Builder",
    description: "Create an ATS friendly resume with Peerlist or LinkedIn profile.",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/resume-builder-dark.jpg",
    category: "Productivity",
    content:
      "Discover the transformative power of mindfulness and meditation. Learn practical techniques to reduce stress, improve focus, and cultivate inner peace in your daily life. Includes breathing exercises, body awareness, and sustainable wellness practices.",
    detailTitle: "Create a beautiful resume in minutes",
    detailImage: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/resume-builder-dark.jpg",
  },
  {
    id: "7",
    title: "Peerlist Jobs Discord Bot",
    description: "Get notified as soon as a new interesting job is posted.",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/discord-bot-dark.png",
    category: "Devtools",
    content:
      "Invite the Peerlist Discord bot to your community server to receive job updates whenever a new job is posted.",
    detailTitle: "Get notified as soon as a new interesting job is posted",
    detailImage: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/discord-bot-dark.png",
  },
  {
    id: "8",
    title: "Layoffs Tracker",
    description: "Track the latest layoff news across all tech companies.",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/layoffs-tracker-dark.png",
    category: "Devtools",
    content:
      "Stay informed with real-time updates on layoffs across the tech industry. Our tracker aggregates news from reliable sources, providing insights into market trends and helping professionals navigate their careers with confidence.",
    detailTitle: "Track the latest layoff news across all tech companies",
    detailImage: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/resume-builder-dark.jpg",
  },
  {
    id: "9",
    title: "Peerlist README Badge",
    description: "Style your README.md with a Peerlist markdown badge.",
    image: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/README-dark.png",
    category: "Productivity",
    content:
      "Showcase your Peerlist profile and achievements directly in your GitHub README.md with our customizable markdown badge. Perfect for developers looking to highlight their skills and contributions.",
    detailTitle: "Get your Peerlist README badge",
    detailImage: "https://dqy38fnwh4fqs.cloudfront.net/website/tools/README-dark.png",
  },
]

const Page = () => {
  const [selectedItem, setSelectedItem] = useState<(typeof mockData)[0] | null>(null)
  const [loadingCardId, setLoadingCardId] = useState<string | null>(null)
  const [isBackLoading, setIsBackLoading] = useState(false)

  const handleCardClick = async (id: string) => {
    // Prevent multiple rapid clicks
    if (loadingCardId) return
    
    setLoadingCardId(id)
    
    // Simulate loading delay (you can remove this in production)
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const item = mockData.find((item) => item.id === id)
    if (item) {
      setSelectedItem(item)
    }
    
    setLoadingCardId(null)
  }

  const handleBackWithLoading = async () => {
    setIsBackLoading(true)
    // Simulate loading when going back
    await new Promise(resolve => setTimeout(resolve, 400))
    setSelectedItem(null)
    setIsBackLoading(false)
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!selectedItem ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-4 md:p-8 w-full"
          >
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Tools by
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
                  Peerlist
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                A growing collection of free productivity, developer tools built by the Peerlist community to help
                developers, designers, and tech professionals work smarter.
              </motion.p>

              {/* Decorative elements */}
              <motion.div
                className="flex justify-center gap-2 mt-8"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
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

            {/* Enhanced Cards Grid */}
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {mockData.map((item, index) => (
                  <TransitionCard 
                    key={item.id} 
                    {...item} 
                    onClick={handleCardClick} 
                    index={index} 
                    isLoading={loadingCardId === item.id}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="page"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <PageView item={selectedItem} onBack={handleBackWithLoading} isLoading={isBackLoading} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Page
