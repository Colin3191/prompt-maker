# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application called "prompt-maker" bootstrapped with `create-next-app` using TypeScript, React 19, and Tailwind CSS 4. The project uses the App Router architecture with the source code located in the `src/app/` directory.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Architecture

- **Framework**: Next.js 15 with App Router
- **UI**: React 19 with Tailwind CSS 4
- **TypeScript**: Fully configured with strict typing
- **Build Tool**: Turbopack for faster builds and development
- **Styling**: Tailwind CSS with PostCSS configuration

## Key Files and Structure

- `src/app/page.tsx` - Main homepage component
- `src/app/layout.tsx` - Root layout component
- `src/app/globals.css` - Global styles with Tailwind directives
- `eslint.config.mjs` - ESLint configuration extending Next.js rules
- `next.config.ts` - Next.js configuration (minimal setup)

## Development Notes

- The project uses modern React 19 features
- Turbopack is enabled for both development and build processes
- ESLint is configured with Next.js recommended rules and TypeScript support
- The application follows Next.js App Router conventions