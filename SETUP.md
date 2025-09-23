# 🤖 AI Prompt Generator - Setup Guide

## Quick Setup

### 1. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Add your OpenAI API key to `.env.local`:
   ```env
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### 2. Alternative: In-App Configuration

If you don't want to use environment variables, you can configure the API key through the app:

1. Start the development server: `pnpm dev`
2. Open http://localhost:3000
3. Click the **Settings** icon in the top-right corner
4. Enter your OpenAI API key
5. Click **Save**

## Features

### ✅ Current Features
- **Real AI Analysis**: Uses OpenAI GPT-4 Vision to analyze uploaded images
- **Smart Fallback**: Intelligent fallback prompts when AI is not configured
- **Multiple Project Types**: Supports UI designs, architecture diagrams, dashboards, and mobile apps
- **Structured Output**: Generates comprehensive, actionable coding prompts
- **Modern UI**: Sleek, dark-themed interface with smooth animations
- **Export Options**: Copy to clipboard or download as text file

### 🚀 How It Works

1. **Upload Design**: Drag & drop or click to upload design images
2. **AI Analysis**: GPT-4 Vision analyzes the image content
3. **Smart Generation**: Creates structured prompts with:
   - Project overview and analysis
   - Recommended tech stack
   - Technical requirements
   - Step-by-step implementation guide
   - Best practices and testing strategies

### 📋 Supported Image Types

- UI/UX Design mockups
- System architecture diagrams
- Dashboard and admin panel designs
- Mobile app wireframes
- Data flow diagrams
- Any design or technical diagram

### 🔧 Technical Details

- **Framework**: Next.js 15 with Turbopack
- **AI SDK**: Vercel AI SDK with OpenAI integration
- **Styling**: Tailwind CSS with Framer Motion animations
- **Type Safety**: Full TypeScript implementation
- **Schema Validation**: Zod for structured AI responses

### 🛠️ Troubleshooting

**Issue**: "Failed to generate prompt" error
- **Solution**: Check your OpenAI API key in settings or `.env.local`

**Issue**: App shows fallback prompts
- **Solution**: The app is working but using mock data. Add your API key for real AI analysis.

**Issue**: Build or development errors
- **Solution**: Run `pnpm install` to ensure all dependencies are installed

### 💡 Usage Tips

1. **Better Images = Better Prompts**: Higher resolution images generate more detailed analysis
2. **Descriptive Filenames**: Name your files descriptively (e.g., `dashboard-ui.png`, `mobile-app-wireframe.jpg`)
3. **Multiple Views**: Upload different views or sections for comprehensive analysis
4. **Export & Edit**: Use the copy feature to paste into your favorite AI coding assistant

---

**Ready to generate amazing prompts? Start by uploading your first design!** 🎨