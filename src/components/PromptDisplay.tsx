"use client"

import { useState } from "react"
import { Copy, Download, CheckCircle, Terminal, Sparkles, Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PromptDisplayProps {
  prompt: string
  isLoading: boolean
}

export default function PromptDisplay({ prompt, isLoading }: PromptDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const downloadPrompt = () => {
    const blob = new Blob([prompt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-prompt-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Generated Prompt
              </h2>
              <p className="text-sm text-gray-400">
                AI-powered coding assistant
              </p>
            </div>
          </div>

          {prompt && !isLoading && (
            <div className="flex space-x-3">
              <button
                onClick={copyToClipboard}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm border",
                  copied
                    ? "bg-green-500/20 border-green-500/40 text-green-300 shadow-lg shadow-green-500/20"
                    : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white"
                )}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={downloadPrompt}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 hover:border-blue-500/60 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-blue-500/20"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto" />
                  <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Wand2 className="w-5 h-5 text-blue-400 animate-pulse" />
                    <p className="text-blue-300 font-medium">
                      AI is analyzing your design...
                    </p>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Generating professional coding prompts
                  </p>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-300" />
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-500" />
                </div>
              </div>
            </div>
          ) : prompt ? (
            <div className="space-y-4">
              {/* Code block header */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-t-lg px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-sm text-gray-400 ml-2">prompt.md</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Sparkles className="w-3 h-3" />
                  <span>Generated by AI</span>
                </div>
              </div>

              {/* Code content */}
              <div className="bg-black/60 border-x border-b border-white/10 rounded-b-lg p-6 min-h-[400px] font-mono text-sm leading-relaxed overflow-auto">
                <pre className="text-gray-100 whitespace-pre-wrap">
                  {prompt}
                </pre>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span>{prompt.split(' ').length} words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>{prompt.split('\n').length} lines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>{prompt.length} chars</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Ready for AI coding assistant
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center min-h-[400px] flex items-center justify-center">
              <div className="text-gray-400 space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center mx-auto border border-white/10">
                  <Terminal className="w-10 h-10 text-gray-500" />
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-300">Waiting for your design</p>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Upload an image to generate professional AI coding prompts instantly
                  </p>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    <span>Smart Analysis</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span>Instant Generation</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                    <span>Professional Output</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}