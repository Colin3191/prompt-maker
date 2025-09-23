"use client"

import { useState, useCallback } from "react"
import { Upload, Image as ImageIcon, X, Zap, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onPromptGenerated: (prompt: string) => void
  setIsLoading: (loading: boolean) => void
}

export default function ImageUploader({ onPromptGenerated, setIsLoading }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }, [])

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setUploadedImage(result)
      setFileName(file.name)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setUploadedImage(null)
    setFileName("")
  }

  const generatePrompt = async () => {
    if (!uploadedImage) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage,
          fileName: fileName
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate prompt')
      }

      const data = await response.json()

      // Check if this is using fallback mode
      if (data.fallback) {
        console.warn('Using fallback prompt generation (OpenAI API not configured)')
      }

      onPromptGenerated(data.prompt)
    } catch (error) {
      console.error('Error generating prompt:', error)

      // Show user-friendly error message
      const errorMessage = error instanceof Error
        ? error.message
        : 'Error generating prompt, please try again'

      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Upload className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Upload Design
            </h2>
            <p className="text-sm text-gray-400">
              Drop your design files here
            </p>
          </div>
        </div>

        {!uploadedImage ? (
          <div
            className={cn(
              "relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 group",
              dragActive
                ? "border-blue-400 bg-blue-500/10 scale-105"
                : "border-white/20 hover:border-white/40 hover:bg-white/5"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                <Upload className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>

              <div>
                <p className="text-lg font-medium text-white mb-2">
                  Drop your design here
                </p>
                <p className="text-gray-400 text-sm">
                  or <span className="text-blue-400 underline">browse files</span>
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                <span className="bg-white/5 px-2 py-1 rounded">PNG</span>
                <span className="bg-white/5 px-2 py-1 rounded">JPG</span>
                <span className="bg-white/5 px-2 py-1 rounded">SVG</span>
                <span className="bg-white/5 px-2 py-1 rounded">GIF</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Info */}
            <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <button
                onClick={removeImage}
                className="absolute top-3 right-3 p-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <ImageIcon className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{fileName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-green-400">Upload complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="relative rounded-lg overflow-hidden bg-black/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadedImage}
                  alt="Preview"
                  className="w-full h-auto max-h-80 object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generatePrompt}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-blue-500/25 hover:scale-105 group"
            >
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Generate AI Prompt</span>
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>

            {/* Tips */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <p className="text-sm text-blue-300 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <strong>Pro tip:</strong> Higher resolution images generate more detailed prompts
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}