"use client"

import { useState, useEffect } from "react"
import { Settings, Eye, EyeOff, ExternalLink, Brain } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SettingsPanelProps {
  onApiKeyChange?: (provider: string, apiKey: string) => void
  onProviderChange?: (provider: string) => void
}

type AIProvider = 'qwen' | 'openai' | 'anthropic'

export default function SettingsPanel({ onApiKeyChange, onProviderChange }: SettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('qwen')
  const [apiKeys, setApiKeys] = useState({
    qwen: '',
    openai: '',
    anthropic: ''
  })
  const [showApiKeys, setShowApiKeys] = useState({
    qwen: false,
    openai: false,
    anthropic: false
  })

  useEffect(() => {
    // Load saved settings from localStorage
    const savedProvider = localStorage.getItem('ai_provider') as AIProvider
    const savedQwenKey = localStorage.getItem('qwen_api_key') || ''
    const savedOpenAIKey = localStorage.getItem('openai_api_key') || ''
    const savedAnthropicKey = localStorage.getItem('anthropic_api_key') || ''

    if (savedProvider) {
      setSelectedProvider(savedProvider)
    }

    setApiKeys({
      qwen: savedQwenKey,
      openai: savedOpenAIKey,
      anthropic: savedAnthropicKey
    })
  }, [])

  const providers = [
    {
      id: 'qwen' as const,
      name: '通义千问 (Qwen)',
      description: '阿里云通义千问多模态模型',
      icon: '🤖',
      keyPlaceholder: 'sk-...',
      helpUrl: 'https://help.aliyun.com/zh/dashscope/developer-reference/api-details',
      features: ['视觉理解', '中文优化', '免费额度']
    },
    {
      id: 'openai' as const,
      name: 'OpenAI GPT-4',
      description: 'OpenAI GPT-4 Vision 模型',
      icon: '🧠',
      keyPlaceholder: 'sk-...',
      helpUrl: 'https://platform.openai.com/api-keys',
      features: ['GPT-4 Vision', '高精度', '多语言']
    },
    {
      id: 'anthropic' as const,
      name: 'Claude 3',
      description: 'Anthropic Claude 3 Sonnet',
      icon: '⚡',
      keyPlaceholder: 'sk-ant-...',
      helpUrl: 'https://console.anthropic.com/',
      features: ['Claude 3 Vision', '安全对话', '长文本']
    }
  ]

  const handleSave = () => {
    const currentKey = apiKeys[selectedProvider]

    if (onApiKeyChange) {
      onApiKeyChange(selectedProvider, currentKey)
    }

    if (onProviderChange) {
      onProviderChange(selectedProvider)
    }

    // Save to localStorage
    localStorage.setItem('ai_provider', selectedProvider)
    localStorage.setItem(`${selectedProvider}_api_key`, currentKey)

    setIsOpen(false)
  }

  const updateApiKey = (provider: AIProvider, key: string) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: key
    }))
  }

  const toggleShowKey = (provider: AIProvider) => {
    setShowApiKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }))
  }

  const selectedProviderData = providers.find(p => p.id === selectedProvider)

  return (
    <>
      {/* Settings Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings className="w-5 h-5 text-white" />
      </motion.button>

      {/* Settings Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      AI 模型设置
                    </h2>
                    <p className="text-sm text-gray-400">
                      选择你的AI服务提供商
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Provider Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-4">
                      选择AI模型
                    </label>
                    <div className="grid gap-3">
                      {providers.map((provider) => (
                        <motion.div
                          key={provider.id}
                          className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                            selectedProvider === provider.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-white/20 bg-white/5 hover:border-white/30'
                          }`}
                          onClick={() => setSelectedProvider(provider.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{provider.icon}</span>
                              <div>
                                <h3 className="font-medium text-white">
                                  {provider.name}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                  {provider.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {provider.features.map((feature) => (
                                    <span
                                      key={feature}
                                      className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded"
                                    >
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {selectedProvider === provider.id && (
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* API Key Input for Selected Provider */}
                  {selectedProviderData && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {selectedProviderData.name} API 密钥
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKeys[selectedProvider] ? "text" : "password"}
                          value={apiKeys[selectedProvider]}
                          onChange={(e) => updateApiKey(selectedProvider, e.target.value)}
                          placeholder={selectedProviderData.keyPlaceholder}
                          className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => toggleShowKey(selectedProvider)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showApiKeys[selectedProvider] ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        API密钥仅本地存储，不会上传到服务器
                      </p>
                    </div>
                  )}

                  {/* Help Link */}
                  {selectedProviderData && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-blue-400 mt-0.5">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm text-blue-300 font-medium">
                            需要 {selectedProviderData.name} API 密钥？
                          </p>
                          <p className="text-xs text-blue-400 mt-1">
                            点击获取：{" "}
                            <a
                              href={selectedProviderData.helpUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline hover:no-underline"
                            >
                              {selectedProviderData.helpUrl.replace('https://', '')}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
                    >
                      保存设置
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}