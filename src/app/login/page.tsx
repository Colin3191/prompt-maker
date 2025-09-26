"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { signIn } from "next-auth/react"
import { GithubIcon } from "@/components/icons/GithubIcon"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn("github", { callbackUrl: "/" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl"
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center shadow-2xl"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
          <GithubIcon className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Sign in with GitHub</h1>
        <p className="mt-3 text-gray-400">
          Connect your GitHub account to generate prompts, sync preferences, and access your workspace across devices.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignIn}
          disabled={isLoading}
          className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white text-black px-6 py-4 text-lg font-medium transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <GithubIcon className="h-5 w-5" />
          {isLoading ? "Redirecting..." : "Continue with GitHub"}
        </motion.button>

        <p className="mt-6 text-sm text-gray-500">
          By continuing, you agree to our terms of service and privacy policy.
        </p>
      </motion.div>
    </div>
  )
}
