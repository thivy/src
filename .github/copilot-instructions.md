# Azure Chat - AI Assistant Instructions

## Project Overview

This is a Next.js 15 chat application that integrates with Azure AI Foundry using Azure Agents for AI conversations. The app uses route groups for public/private access patterns and feature-based architecture.

## Architecture & Structure

### Route Groups Pattern

- `app/(public)/` - Unauthenticated pages (landing, login)
- `app/(private)/` - Protected routes requiring GitHub OAuth
- Authentication middleware automatically protects private routes

### Feature-Based Organization

```
features/
├── auth/           # NextAuth.5 with GitHub provider
├── chat-page/      # Core chat functionality + Azure Agents integration
├── app-sidebar/    # Navigation and theme switching
├── home/           # Dashboard/home page
└── root/           # App-wide providers and layout
```

### Component Architecture

- `components/ai/` - Reusable chat UI components (conversation, input, message, response)
- `components/ui/` - shadcn/ui components with custom styling
- Components use compound pattern (e.g., `AIInput.Textarea`, `AIInput.Submit`)

## Key Integration Points

### Azure AI Foundry

- Uses `@azure/ai-agents` with `DefaultAzureCredential` for authentication
- Environment variables: `AZURE_AI_FOUNDRY_PROJECT_ENDPOINT`, `AZURE_AI_FOUNDRY_DEFAULT_AGENT_ID`
- Real-time streaming via `createUIMessageStream` from `ai` package
- See `features/chat-page/azure-agent.ts` for stream handling patterns

### Authentication Flow

- NextAuth 5 (beta) with GitHub provider only
- JWT tokens include `isAdmin` and `loginProvider` fields
- `GuardWithAuth` component wraps private routes
- Middleware: `export { auth as middleware }`

## Development Patterns

### UI/UX Standards

- Dark theme default with `next-themes`
- Custom CSS variables using OKLCH color space
- `@hugeicons/react` for consistent iconography
- Auto-resizing textarea with min/max height constraints
- Loading skeletons for all async states

### Type Safety

- Strict TypeScript with custom type extensions in `types/`
- Extended NextAuth session types with custom user properties
- UI message types from `ai` package for chat functionality

### Styling Approach

- Tailwind CSS v4 with custom variants (`@custom-variant dark`)
- `class-variance-authority` for component variants
- `tailwind-merge` for conditional className merging
- Thin scrollbars with custom styling throughout

## Development Commands

```bash
npm run dev --turbopack    # Development with Turbopack
npm run build             # Production build
npm run lint              # ESLint checking
```

## Code Conventions

- All components use TypeScript with explicit prop types
- Feature components in `features/`, reusable UI in `components/`
- Custom hooks prefixed with `use` (e.g., `useAutoResizeTextarea`)
- Server components by default, `"use client"` only when needed
- Environment variables validated at startup (see azure-agent.ts)

## Common Tasks

- Adding new chat features: Extend `azure-agent.ts` stream handlers
- UI components: Follow compound component pattern from `ai/input.tsx`
- Authentication changes: Modify `features/auth/auth.ts` callbacks
- Styling: Use CSS variables in `globals.css` for theme consistency
