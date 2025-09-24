import { QwenClient } from "./qwen";
import { OpenAIClient } from "./openai";
import { ClaudeClient } from "./claude";

export type AIProvider = "qwen" | "openai" | "anthropic";

interface AIClientConfig {
  provider: AIProvider;
  apiKey: string;
}

const DEFAULT_PROMPT_TEMPLATE = {
  qwen: `作为一名资深的软件架构师和全栈开发工程师，请仔细分析这张图片，它可能是：
1. UI/UX 设计稿
2. 系统架构图
3. 数据流程图
4. 移动应用界面
5. 仪表板设计

请按照以下格式生成详细的开发提示词：

# 项目分析与开发指南

## 项目概述
[详细描述图片展示的项目类型、主要功能和设计特点]

## 推荐技术栈
- **前端框架**: [根据项目特点推荐合适的前端技术]
- **后端技术**: [如果需要后端，推荐合适的技术栈]
- **数据库**: [根据数据需求推荐数据库方案]
- **样式方案**: [推荐合适的CSS解决方案]

## 技术要求
[列出具体的技术实现要求，每项一行，用"-"开头]

## 实现步骤
[提供详细的分步实现指南，包含：]
### 1. [步骤标题]
[详细的实施说明]

### 2. [步骤标题]
[详细的实施说明]

[继续其他步骤...]

## 最佳实践
[列出开发过程中应该遵循的最佳实践]

## 测试策略
[提供完整的测试方案]

请确保内容专业、详细且可执行。`,

  openai: `Analyze this design/architecture image and generate a comprehensive coding prompt.

Instructions:
1. Identify the type of project (UI design, system architecture, dashboard, mobile app, or data flow)
2. Suggest appropriate tech stack based on what you see
3. Create detailed implementation steps
4. Include best practices and testing strategies

Please provide a professional, detailed, and actionable development guide.`,

  anthropic: `Analyze this design/architecture image and generate a comprehensive coding prompt.

Instructions:
1. Identify the type of project (UI design, system architecture, dashboard, mobile app, or data flow)
2. Suggest appropriate tech stack based on what you see
3. Create detailed implementation steps
4. Include best practices and testing strategies

Please provide a professional, detailed, and actionable development guide.`,
};

export class AIService {
  static async analyzeImage(
    config: AIClientConfig,
    imageBase64: string,
    fileName?: string
  ): Promise<string> {
    const { provider, apiKey } = config;

    if (!apiKey) {
      throw new Error(`API key not configured for ${provider}`);
    }

    const prompt = DEFAULT_PROMPT_TEMPLATE[provider] + (fileName ? `\n\n文件名提示：${fileName}` : '');

    let client;
    switch (provider) {
      case "qwen":
        client = new QwenClient(apiKey);
        break;
      case "openai":
        client = new OpenAIClient(apiKey);
        break;
      case "anthropic":
        client = new ClaudeClient(apiKey);
        break;
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }

    return await client.analyzeImage(imageBase64, prompt);
  }

  static getStoredConfig(): AIClientConfig | null {
    if (typeof window === "undefined") {
      return null;
    }

    const provider = (localStorage.getItem("ai_provider") as AIProvider) || "qwen";
    const apiKey = localStorage.getItem(`${provider}_api_key`) || "";

    if (!apiKey) {
      return null;
    }

    return { provider, apiKey };
  }
}