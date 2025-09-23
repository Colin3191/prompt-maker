# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered prompt generator application built with Next.js 15 that analyzes uploaded design images and generates professional coding prompts. The application supports multiple AI providers (Qwen, OpenAI, Claude) with a focus on visual analysis and prompt optimization.

## Development Commands

- `pnpm dev` - Start development server with Turbopack (preferred package manager)
- `pnpm build` - Build the application for production with Turbopack
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code linting

Note: Project uses pnpm as the package manager, not npm.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **UI**: React 19, Tailwind CSS 4, Framer Motion for animations
- **AI Integration**: Vercel AI SDK with multi-provider support
- **Type Safety**: TypeScript with Zod validation
- **Icons**: Lucide React

### Multi-Provider AI System

The application implements a sophisticated multi-provider AI architecture:

1. **Provider Abstraction**: `src/app/api/generate-prompt/route.ts` handles provider selection and fallback
2. **Custom Clients**:
   - `src/lib/qwen-client.ts` - Custom Qwen vision API client
   - AI SDK handles OpenAI and Anthropic providers
3. **Settings Management**: Client-side localStorage for API keys and provider preferences
4. **Fallback System**: Automatic provider switching when APIs are unavailable

### Component Architecture

- **ImageUploader** (`src/components/ImageUploader.tsx`) - Drag-and-drop image upload with preview
- **PromptDisplay** (`src/components/PromptDisplay.tsx`) - Terminal-style prompt display with copy/export
- **SettingsPanel** (`src/components/SettingsPanel.tsx`) - Modal for AI provider configuration
- **Main Page** (`src/app/page.tsx`) - Orchestrates the entire application flow

### Environment Configuration

Copy `.env.example` to `.env.local` and configure:
- `QWEN_API_KEY` - 通义千问 API key (default provider)
- `OPENAI_API_KEY` - OpenAI API key (optional)
- `ANTHROPIC_API_KEY` - Claude API key (optional)
- `DEFAULT_AI_PROVIDER` - Default provider selection

### Key Design Patterns

1. **Provider Strategy Pattern**: API route dynamically selects AI provider based on availability
2. **Client-Side Preferences**: Settings persist in localStorage for seamless user experience
3. **Optimistic UI**: Loading states and error boundaries for smooth interactions
4. **Responsive Design**: Mobile-first approach with scientific/tech aesthetic

### API Integration Details

- **Qwen Integration**: Uses compatible-mode endpoint with OpenAI-style message format
- **Image Processing**: Base64 encoding for vision API compatibility
- **Error Handling**: Comprehensive error messages and fallback mechanisms
- **Rate Limiting**: Built-in retry logic and graceful degradation

### Development Notes

- Project uses Framer Motion extensively for animations
- All components follow dark theme with gradient overlays
- Settings panel supports real-time provider switching
- Image upload supports drag-and-drop with file validation
- Prompt generation includes metadata and export functionality