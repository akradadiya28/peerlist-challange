"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Sparkles,
  Bot,
  CheckCircle,
  Globe,
  Code,
  Users,
  Star,
  Github,
  Search,
  AlertCircle,
  Link,
} from "lucide-react"

interface ProjectData {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  collaborators: string[]
  tags: string[]
  status: "draft" | "published" | "archived"
  stars?: number
  forks?: number
  language?: string
  license?: string
  size?: number
  lastUpdated?: string
}

interface AIStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  duration: number
}

interface GitHubRepo {
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  license: { name: string } | null
  size: number
  updated_at: string
  topics: string[]
  owner: {
    login: string
    avatar_url: string
  }
  contributors_url: string
}

interface GitHubContributor {
  login: string
  avatar_url: string
  contributions: number
}

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  [key: string]: unknown
}

interface GitHubFileResponse {
  content: string
  encoding: string
  [key: string]: unknown
}

const AIAutofillForm = () => {
  const [isAIActive, setIsAIActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [formData, setFormData] = useState<Partial<ProjectData>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [particleCount, setParticleCount] = useState(0)
  const [githubUrl, setGithubUrl] = useState("")
  const [error, setError] = useState("")

  const aiSteps: AIStep[] = [
    {
      id: "validate",
      title: "Validating GitHub URL",
      description: "Checking if the provided GitHub URL is valid and accessible",
      icon: <Link className="h-5 w-5" />,
      color: "from-blue-400 to-cyan-500",
      duration: 1000,
    },
    {
      id: "analyze",
      title: "Analyzing Repository",
      description: "Fetching repository metadata and project information",
      icon: <Code className="h-5 w-5" />,
      color: "from-purple-400 to-pink-500",
      duration: 2000,
    },
    {
      id: "extract",
      title: "Extracting Technologies",
      description: "Detecting languages, frameworks, and dependencies",
      icon: <Search className="h-5 w-5" />,
      color: "from-emerald-400 to-green-500",
      duration: 2500,
    },
    {
      id: "research",
      title: "Gathering Contributors",
      description: "Collecting collaborator information and project statistics",
      icon: <Users className="h-5 w-5" />,
      color: "from-yellow-400 to-orange-500",
      duration: 2000,
    },
    {
      id: "optimize",
      title: "Optimizing & Finalizing",
      description: "Processing and formatting the collected data",
      icon: <Sparkles className="h-5 w-5" />,
      color: "from-red-400 to-pink-500",
      duration: 1500,
    },
  ]

  // Extract owner and repo from GitHub URL
  const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/
    const match = url.match(regex)
    if (match) {
      return { owner: match[1], repo: match[2] }
    }
    return null
  }

  // Fetch repository data from GitHub API
  const fetchRepoData = async (owner: string, repo: string): Promise<GitHubRepo> => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }
    return response.json()
  }

  // Fetch contributors data
  const fetchContributors = async (owner: string, repo: string): Promise<GitHubContributor[]> => {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=5`)
      if (!response.ok) return []
      return response.json()
    } catch (error) {
      console.error("Error fetching contributors:", error)
      return []
    }
  }

  // Fetch package.json to extract technologies
  const fetchPackageJson = async (owner: string, repo: string): Promise<PackageJson | null> => {
    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/package.json`)
      if (!response.ok) return null
      const data: GitHubFileResponse = await response.json()
      if (data.content) {
        const content = atob(data.content)
        return JSON.parse(content) as PackageJson
      }
    } catch (error) {
      console.error("Error fetching package.json:", error)
      return null
    }
    return null
  }

  // Extract technologies from package.json
  const extractTechnologies = (packageJson: PackageJson | null, language: string): string[] => {
    const technologies = new Set<string>()
    
    // Add primary language
    if (language) {
      technologies.add(language)
    }

    if (packageJson) {
      // Add dependencies
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies }
      Object.keys(deps).forEach(dep => {
        // Common frameworks and libraries
        const commonTechs = [
          'react', 'vue', 'angular', 'next', 'nuxt', 'express', 'fastify',
          'typescript', 'babel', 'webpack', 'vite', 'tailwindcss', 'bootstrap',
          'mongodb', 'mongoose', 'prisma', 'sequelize', 'graphql', 'apollo',
          'jest', 'cypress', 'vitest', 'playwright', 'storybook'
        ]
        
        if (commonTechs.some(tech => dep.toLowerCase().includes(tech))) {
          technologies.add(dep)
        }
      })
    }

    return Array.from(technologies).slice(0, 8) // Limit to 8 technologies
  }

  // Generate project tags based on repo data
  const generateTags = (repoData: GitHubRepo, technologies: string[]): string[] => {
    const tags = new Set<string>()
    
    // Add topics from GitHub
    repoData.topics?.forEach(topic => tags.add(topic))
    
    // Add language-based tags
    if (repoData.language) {
      tags.add(repoData.language.toLowerCase())
    }
    
    // Add common tags based on technologies
    technologies.forEach(tech => {
      if (tech.toLowerCase().includes('react')) tags.add('frontend')
      if (tech.toLowerCase().includes('node')) tags.add('backend')
      if (tech.toLowerCase().includes('typescript')) tags.add('typescript')
      if (tech.toLowerCase().includes('api')) tags.add('api')
    })
    
    // Add generic tags
    if (repoData.description) {
      const desc = repoData.description.toLowerCase()
      if (desc.includes('web')) tags.add('web')
      if (desc.includes('app')) tags.add('application')
      if (desc.includes('tool')) tags.add('tool')
      if (desc.includes('library')) tags.add('library')
      if (desc.includes('framework')) tags.add('framework')
    }

    return Array.from(tags).slice(0, 6) // Limit to 6 tags
  }

  const startAIAutofill = useCallback(async () => {
    if (!githubUrl.trim()) {
      setError("Please enter a GitHub repository URL")
      return
    }

    const parsedUrl = parseGitHubUrl(githubUrl)
    if (!parsedUrl) {
      setError("Invalid GitHub URL format. Please use: https://github.com/owner/repo")
      return
    }

    setError("")
    setIsAIActive(true)
    setCurrentStep(0)
    setProgress(0)
    setFormData({})
    setShowSuccess(false)
    setParticleCount(12)

    try {
      // Step 1: Validate URL
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCurrentStep(1)

      // Step 2: Fetch repo data
      const repoData = await fetchRepoData(parsedUrl.owner, parsedUrl.repo)
      setCurrentStep(2)

      // Step 3: Extract technologies
      const packageJson = await fetchPackageJson(parsedUrl.owner, parsedUrl.repo)
      const technologies = extractTechnologies(packageJson, repoData.language)
      setCurrentStep(3)

      // Step 4: Fetch contributors
      const contributors = await fetchContributors(parsedUrl.owner, parsedUrl.repo)
      setCurrentStep(4)

      // Step 5: Process and format data
      const tags = generateTags(repoData, technologies)
      
      const projectData: Partial<ProjectData> = {
        title: repoData.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: repoData.description || `A ${repoData.language || 'software'} project hosted on GitHub`,
        technologies: technologies,
        githubUrl: repoData.html_url,
        liveUrl: repoData.homepage || "",
        collaborators: contributors.map(c => `@${c.login}`),
        tags: tags,
        status: "published",
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        language: repoData.language,
        license: repoData.license?.name,
        size: repoData.size,
        lastUpdated: new Date(repoData.updated_at).toLocaleDateString()
      }

      setFormData(projectData)
      setCurrentStep(5)
      
      // Complete the animation
      await new Promise(resolve => setTimeout(resolve, 1000))
      setShowSuccess(true)
      setIsAIActive(false)

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(`Failed to fetch repository data: ${errorMessage}`)
      setIsAIActive(false)
    }
  }, [githubUrl])

  useEffect(() => {
    if (!isAIActive) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const stepProgress = (currentStep / aiSteps.length) * 100
        return Math.min(100, stepProgress + (prev % (100 / aiSteps.length)))
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isAIActive, currentStep, aiSteps.length])

  useEffect(() => {
    if (particleCount > 0) {
      const timer = setTimeout(() => setParticleCount(0), 2000)
      return () => clearTimeout(timer)
    }
  }, [particleCount])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Peerlist Autofill w/ AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Paste any GitHub repository URL and watch AI intelligently extract and populate all project details automatically.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Bot className="h-7 w-7 text-purple-400" />
                AI Control Panel
              </h2>
              
              {/* GitHub URL Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  GitHub Repository URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username/repository"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    disabled={isAIActive}
                  />
                  <Github className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <span className="text-red-300 text-sm">{error}</span>
                  </motion.div>
                )}
              </div>
              
              <button
                onClick={startAIAutofill}
                disabled={isAIActive || !githubUrl.trim()}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isAIActive || !githubUrl.trim()
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white transform hover:scale-105 active:scale-95"
                }`}
              >
                {isAIActive ? "🤖 AI is Analyzing..." : "🚀 Start AI Autofill"}
              </button>

              {isAIActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-6 space-y-4"
                >
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>AI Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Current Step */}
                  <AnimatePresence mode="wait">
                    {currentStep < aiSteps.length && (
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${aiSteps[currentStep].color}`}>
                            {aiSteps[currentStep].icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">
                              {aiSteps[currentStep].title}
                            </h3>
                            <p className="text-sm text-gray-300">
                              {aiSteps[currentStep].description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* AI Features */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">AI Capabilities</h3>
              <div className="space-y-3">
                {[
                  "🔍 Real GitHub repository analysis",
                  "📝 Intelligent content extraction",
                  "🏷️ Automatic technology detection",
                  "👥 Contributor identification",
                  "📊 Repository statistics parsing",
                  "✨ Smart tag generation"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    {feature}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Code className="h-7 w-7 text-emerald-400" />
                Project Details
              </h2>

              <div className="space-y-4">
                {/* Project Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter project title..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    {formData.title && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Technologies
                  </label>
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {formData.technologies?.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-full"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Repository Stats */}
                {(formData.stars !== undefined || formData.forks !== undefined || formData.language) && (
                  <div className="grid grid-cols-3 gap-4">
                    {formData.stars !== undefined && (
                      <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                        <Star className="h-4 w-4 text-yellow-400 mx-auto mb-1" />
                        <div className="text-lg font-semibold text-white">{formData.stars}</div>
                        <div className="text-xs text-gray-400">Stars</div>
                      </div>
                    )}
                    {formData.forks !== undefined && (
                      <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                        <Code className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                        <div className="text-lg font-semibold text-white">{formData.forks}</div>
                        <div className="text-xs text-gray-400">Forks</div>
                      </div>
                    )}
                    {formData.language && (
                      <div className="bg-gray-800/30 rounded-lg p-3 text-center">
                        <Globe className="h-4 w-4 text-emerald-400 mx-auto mb-1" />
                        <div className="text-sm font-semibold text-white">{formData.language}</div>
                        <div className="text-xs text-gray-400">Language</div>
                      </div>
                    )}
                  </div>
                )}

                {/* URLs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Live URL
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, liveUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {formData.tags?.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm rounded-full"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Collaborators */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Collaborators
                  </label>
                  <div className="flex flex-wrap gap-2 min-h-[32px]">
                    {formData.collaborators?.map((collab, index) => (
                      <motion.span
                        key={index}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full"
                      >
                        {collab}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status || "draft"}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ProjectData['status'] }))}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-center text-white max-w-md mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="h-12 w-12 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-3">Repository Analyzed! 🎉</h3>
                <p className="text-purple-100 mb-6">
                  AI successfully extracted all project details from the GitHub repository. 
                  Review and customize the auto-filled information as needed!
                </p>
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span>Technologies detected:</span>
                    <span className="font-semibold">{formData.technologies?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contributors found:</span>
                    <span className="font-semibold">{formData.collaborators?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tags generated:</span>
                    <span className="font-semibold">{formData.tags?.length || 0}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-colors"
                >
                  Continue Editing
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Particles */}
        <AnimatePresence>
          {particleCount > 0 && (
            <>
              {Array.from({ length: particleCount }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.cos((i / particleCount) * Math.PI * 2) * 200,
                    y: Math.sin((i / particleCount) * Math.PI * 2) * 200,
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    delay: i * 0.1,
                  }}
                  className="fixed top-1/2 left-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-40"
                  style={{
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AIAutofillForm
