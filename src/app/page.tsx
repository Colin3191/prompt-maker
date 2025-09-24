"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { GithubIcon } from "@/components/icons/GithubIcon"
import ImageUploader from "@/components/ImageUploader"
import PromptDisplay from "@/components/PromptDisplay"
import SettingsPanel from "@/components/SettingsPanel"

export default function Home() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handlePromptGenerated = (prompt: string) => {
    setGeneratedPrompt(prompt)
  }

  const handleApiKeyChange = (provider: string, apiKey: string) => {
    // Store API key in localStorage for client-side use
    if (apiKey) {
      localStorage.setItem(`${provider}_api_key`, apiKey)
    } else {
      localStorage.removeItem(`${provider}_api_key`)
    }
  }

  const handleProviderChange = (provider: string) => {
    localStorage.setItem('ai_provider', provider)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* GitHub Link */}
      <motion.a
        href="https://github.com/Colin3191/prompt-maker"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-6 left-6 z-50 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <GithubIcon className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
      </motion.a>

      {/* Settings Panel */}
      <SettingsPanel
        onApiKeyChange={handleApiKeyChange}
        onProviderChange={handleProviderChange}
      />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-gray-300 font-medium">AI-Powered • Real-time</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Prompt Generator
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform your designs into professional AI coding prompts.
              <br />
              <span className="text-blue-400">Upload • Analyze • Generate</span>
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex items-center justify-center gap-8 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-500">Prompts Generated</div>
              </motion.div>
              <div className="w-px h-12 bg-gray-700" />
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-white">99%</div>
                <div className="text-sm text-gray-500">Accuracy Rate</div>
              </motion.div>
              <div className="w-px h-12 bg-gray-700" />
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold text-white">AI</div>
                <div className="text-sm text-gray-500">Powered</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Left Side - Image Upload */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <ImageUploader
                onPromptGenerated={handlePromptGenerated}
                setIsLoading={setIsLoading}
              />
            </motion.div>

            {/* Right Side - Generated Prompt */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <PromptDisplay
                prompt={generatedPrompt}
                isLoading={isLoading}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
