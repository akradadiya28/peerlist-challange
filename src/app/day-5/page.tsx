"use client"

import React, { useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Zap,
} from "lucide-react"

interface FormData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  location: {
    city: string
    country: string
    timezone: string
  }
  professional: {
    company: string
    role: string
    experience: string
    skills: string[]
  }
  education: {
    degree: string
    institution: string
    graduationYear: string
    achievements: string[]
  }
}

interface Step {
  id: "personal" | "location" | "professional" | "education"
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  progress: number
}

type UpdateSection = (section: keyof FormData, data: Partial<FormData[keyof FormData]>) => void

const ProgressiveInputStack: React.FC = () => {
  const prefersReduced = useReducedMotion()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: { firstName: "", lastName: "", email: "", phone: "" },
    location: { city: "", country: "", timezone: "" },
    professional: { company: "", role: "", experience: "", skills: [] },
    education: { degree: "", institution: "", graduationYear: "", achievements: [] },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const steps: Step[] = useMemo(
    () => [
      {
        id: "personal",
        title: "Personal Information",
        subtitle: "Tell us about yourself",
        icon: <User className="h-6 w-6" />,
        color: "from-emerald-400 to-green-500",
        progress: 25,
      },
      {
        id: "location",
        title: "Location Details",
        subtitle: "Where are you based?",
        icon: <MapPin className="h-6 w-6" />,
        color: "from-blue-400 to-cyan-500",
        progress: 50,
      },
      {
        id: "professional",
        title: "Professional Background",
        subtitle: "Your work experience",
        icon: <Briefcase className="h-6 w-6" />,
        color: "from-purple-400 to-pink-500",
        progress: 75,
      },
      {
        id: "education",
        title: "Education & Skills",
        subtitle: "Your academic journey",
        icon: <GraduationCap className="h-6 w-6" />,
        color: "from-purple-400 to-pink-500",
        progress: 100,
      },
    ],
    [],
  )

  const updateFormData: UpdateSection = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data } as FormData[keyof FormData],
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(s => s + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setShowSuccess(true)
  }

  const canProceed = () => {
    const currentStepData = steps[currentStep]
    switch (currentStepData.id) {
      case "personal":
        return Boolean(formData.personalInfo.firstName && formData.personalInfo.lastName && formData.personalInfo.email)
      case "location":
        return Boolean(formData.location.city && formData.location.country)
      case "professional":
        return Boolean(formData.professional.company && formData.professional.role)
      case "education":
        return Boolean(formData.education.degree && formData.education.institution)
      default:
        return false
    }
  }

  const getStepContent = () => {
    const step = steps[currentStep]
    switch (step.id) {
      case "personal":
        return <PersonalInfoStep data={formData.personalInfo} updateData={updateFormData} />
      case "location":
        return <LocationStep data={formData.location} updateData={updateFormData} />
      case "professional":
        return <ProfessionalStep data={formData.professional} updateData={updateFormData} />
      case "education":
        return <EducationStep data={formData.education} updateData={updateFormData} />
      default:
        return null
    }
  }

  if (showSuccess) {
    return <SuccessView formData={formData} onReset={() => setShowSuccess(false)} />
  }

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
            Progressive Input Stack
          </h1>
          <p className="mx-auto max-w-2xl text-base text-zinc-400 md:text-lg">
            Seamlessly guide users through multi-step processes with fluid transitions and engaging visual feedback.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Progress Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className="relative flex flex-1 flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    {/* Step Icon */}
                    <motion.div
                      className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 ${
                        index <= currentStep
                          ? `bg-gradient-to-r ${step.color} border-transparent text-white shadow-lg`
                          : "border-zinc-700 bg-zinc-800 text-zinc-400"
                      }`}
                      whileHover={!prefersReduced ? { scale: 1.1 } : undefined}
                      whileTap={!prefersReduced ? { scale: 0.95 } : undefined}
                    >
                      {index < currentStep ? <CheckCircle className="h-8 w-8" /> : step.icon}
                    </motion.div>

                    {/* Step Info */}
                    <div className="mt-3 text-center">
                      <h3 className={`text-sm font-semibold ${index <= currentStep ? "text-white" : "text-zinc-500"}`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs ${index <= currentStep ? "text-zinc-300" : "text-zinc-600"}`}>
                        {step.subtitle}
                      </p>
                    </div>

                    {/* Progress Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-1/2 top-8 h-0.5 w-full bg-zinc-700">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${step.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: index < currentStep ? "100%" : "0%" }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
              className="relative"
            >
              {/* Step Header */}
              <motion.div
                className="mb-8 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h2 className="mb-2 text-2xl font-bold text-white">{steps[currentStep].title}</h2>
                <p className="text-zinc-400">{steps[currentStep].subtitle}</p>
              </motion.div>

              {/* Step Content */}
              <div className="mb-8">{getStepContent()}</div>

              {/* Navigation */}
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <motion.button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                    currentStep === 0
                      ? "cursor-not-allowed bg-zinc-800 text-zinc-600"
                      : "bg-zinc-800 text-white hover:scale-105 hover:bg-zinc-700"
                  }`}
                  whileHover={currentStep > 0 && !prefersReduced ? { scale: 1.05 } : undefined}
                  whileTap={currentStep > 0 && !prefersReduced ? { scale: 0.95 } : undefined}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </motion.button>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-zinc-400">
                    Step {currentStep + 1} of {steps.length}
                  </span>

                  {currentStep === steps.length - 1 ? (
                    <motion.button
                      onClick={handleSubmit}
                      disabled={!canProceed() || isSubmitting}
                      className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                        canProceed() && !isSubmitting
                          ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:scale-105 hover:shadow-lg"
                          : "cursor-not-allowed bg-zinc-800 text-zinc-600"
                      }`}
                      whileHover={canProceed() && !isSubmitting && !prefersReduced ? { scale: 1.05 } : undefined}
                      whileTap={canProceed() && !isSubmitting && !prefersReduced ? { scale: 0.95 } : undefined}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Zap className="h-4 w-4" />
                          Complete Profile
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                        canProceed()
                          ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:scale-105 hover:shadow-lg"
                          : "cursor-not-allowed bg-zinc-800 text-zinc-600"
                      }`}
                      whileHover={canProceed() && !prefersReduced ? { scale: 1.05 } : undefined}
                      whileTap={canProceed() && !prefersReduced ? { scale: 0.95 } : undefined}
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Step Components

const PersonalInfoStep: React.FC<{
  data: FormData["personalInfo"]
  updateData: UpdateSection
}> = ({ data, updateData }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <InputField
        label="First Name"
        value={data.firstName}
        onChange={value => updateData("personalInfo", { firstName: value })}
        placeholder="Enter your first name"
        icon={<User className="h-4 w-4" />}
        required
      />
      <InputField
        label="Last Name"
        value={data.lastName}
        onChange={value => updateData("personalInfo", { lastName: value })}
        placeholder="Enter your last name"
        icon={<User className="h-4 w-4" />}
        required
      />
      <InputField
        label="Email Address"
        value={data.email}
        onChange={value => updateData("personalInfo", { email: value })}
        placeholder="Enter your email"
        icon={<Mail className="h-4 w-4" />}
        type="email"
        required
      />
      <InputField
        label="Phone Number"
        value={data.phone}
        onChange={value => updateData("personalInfo", { phone: value })}
        placeholder="Enter your phone number"
        icon={<Phone className="h-4 w-4" />}
        type="tel"
      />
    </div>
  )
}

const LocationStep: React.FC<{
  data: FormData["location"]
  updateData: UpdateSection
}> = ({ data, updateData }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <InputField
        label="City"
        value={data.city}
        onChange={value => updateData("location", { city: value })}
        placeholder="Enter your city"
        icon={<MapPin className="h-4 w-4" />}
        required
      />
      <InputField
        label="Country"
        value={data.country}
        onChange={value => updateData("location", { country: value })}
        placeholder="Enter your country"
        icon={<MapPin className="h-4 w-4" />}
        required
      />
      <InputField
        label="Timezone"
        value={data.timezone}
        onChange={value => updateData("location", { timezone: value })}
        placeholder="e.g., UTC+5:30"
        icon={<MapPin className="h-4 w-4" />}
      />
    </div>
  )
}

const ProfessionalStep: React.FC<{
  data: FormData["professional"]
  updateData: UpdateSection
}> = ({ data, updateData }) => {
  const [skillInput, setSkillInput] = useState("")

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !data.skills.includes(s)) {
      updateData("professional", { skills: [...data.skills, s] })
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    updateData("professional", { skills: data.skills.filter(s => s !== skill) })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <InputField
          label="Company"
          value={data.company}
          onChange={value => updateData("professional", { company: value })}
          placeholder="Enter your company name"
          icon={<Building className="h-4 w-4" />}
          required
        />
        <InputField
          label="Role/Position"
          value={data.role}
          onChange={value => updateData("professional", { role: value })}
          placeholder="Enter your job title"
          icon={<Briefcase className="h-4 w-4" />}
          required
        />
      </div>

      <InputField
        label="Years of Experience"
        value={data.experience}
        onChange={value => updateData("professional", { experience: value })}
        placeholder="e.g., 5+ years"
        icon={<Briefcase className="h-4 w-4" />}
      />

      <div className="space-y-3">
        <label className="block text-sm font-medium text-white">Skills</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill and press Enter"
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button onClick={addSkill} className="rounded-lg bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700">
            Add
          </button>
        </div>

        {data.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.skills.map(skill => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 rounded-full bg-emerald-600/20 px-3 py-1 text-sm text-emerald-300"
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="text-emerald-400 hover:text-emerald-2 00">
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const EducationStep: React.FC<{
  data: FormData["education"]
  updateData: UpdateSection
}> = ({ data, updateData }) => {
  const [achievementInput, setAchievementInput] = useState("")

  const addAchievement = () => {
    const a = achievementInput.trim()
    if (a && !data.achievements.includes(a)) {
      updateData("education", { achievements: [...data.achievements, a] })
      setAchievementInput("")
    }
  }

  const removeAchievement = (achievement: string) => {
    updateData("education", { achievements: data.achievements.filter(x => x !== achievement) })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === "Enter") {
      e.preventDefault()
      addAchievement()
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <InputField
          label="Degree"
          value={data.degree}
          onChange={value => updateData("education", { degree: value })}
          placeholder="e.g., Bachelor of Science"
          icon={<GraduationCap className="h-4 w-4" />}
          required
        />
        <InputField
          label="Institution"
          value={data.institution}
          onChange={value => updateData("education", { institution: value })}
          placeholder="Enter your university/college"
          icon={<GraduationCap className="h-4 w-4" />}
          required
        />
      </div>

      <InputField
        label="Graduation Year"
        value={data.graduationYear}
        onChange={value => updateData("education", { graduationYear: value })}
        placeholder="e.g., 2020"
        icon={<GraduationCap className="h-4 w-4" />}
      />

      <div className="space-y-3">
        <label className="block text-sm font-medium text-white">Achievements</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={achievementInput}
            onChange={e => setAchievementInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add an achievement and press Enter"
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
          <button onClick={addAchievement} className="rounded-lg bg-emerald-600 px-4 py-3 text-white hover:bg-emerald-700">
            Add
          </button>
        </div>

        {data.achievements.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.achievements.map(achievement => (
              <motion.span
                key={achievement}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 rounded-full bg-purple-600/20 px-3 py-1 text-sm text-purple-300"
              >
                <Star className="h-3 w-3" />
                {achievement}
                <button onClick={() => removeAchievement(achievement)} className="text-purple-400 hover:text-purple-200">
                  ×
                </button>
              </motion.span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const InputField: React.FC<{
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  icon: React.ReactNode
  type?: string
  required?: boolean
}> = ({ label, value, onChange, placeholder, icon, type = "text", required = false }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">{icon}</div>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-3 pl-10 pr-4 text-white placeholder-zinc-400 transition-all duration-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>
    </div>
  )
}

const SuccessView: React.FC<{ formData: FormData; onReset: () => void }> = ({ formData, onReset }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10" />

      <div className="relative mx-auto max-w-4xl p-6 md:p-10">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, type: "spring" }} className="text-center">
          {/* Success Icon */}
          <motion.div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          >
            <CheckCircle className="h-12 w-12 text-white" />
          </motion.div>

          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Profile Complete! 🎉</h1>
          <p className="mb-8 text-xl text-zinc-300">Thank you for providing your information. Your profile has been successfully created.</p>

          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 rounded-2xl border border-zinc-700/50 bg-zinc-900/50 p-6 backdrop-blur-sm"
          >
            <h2 className="mb-4 text-xl font-semibold text-white">Profile Summary</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Name</p>
                <p className="font-medium text-white">
                  {formData.personalInfo.firstName} {formData.personalInfo.lastName}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Email</p>
                <p className="font-medium text-white">{formData.personalInfo.email}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Location</p>
                <p className="font-medium text-white">
                  {formData.location.city}, {formData.location.country}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Role</p>
                <p className="font-medium text-white">{formData.professional.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <button onClick={onReset} className="rounded-lg bg-zinc-800 px-6 py-3 font-medium text-white transition-colors hover:bg-zinc-700">
              Create Another Profile
            </button>
            <button className="rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3 font-medium text-white transition-all hover:shadow-lg">
              View Profile
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProgressiveInputStack
