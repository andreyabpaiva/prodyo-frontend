# Prodyo Frontend
## Technologies

- **[Next.js 15](https://nextjs.org/)**
- **[React 18](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)** 
- **[Tailwind CSS 4](https://tailwindcss.com/)** 
- **[Shadcn](https://ui.shadcn.com/)**
- **[TanStack Query](https://tanstack.com/query)**
- **[React Hook Form](https://react-hook-form.com/)**
- **[Zod](https://zod.dev/)**

## Quickstart

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/andreyabpaiva/prodyo-frontend
cd prodyo-frontend
```

2. Install all dependencies:
```bash
pnpm install
```

3. Start project:
```bash
pnpm dev
```

## Project Structure

```
src
├── apis
├── app
│  ├── (access)
│  │  ├── create-project
│  │  ├── login
│  │  ├── register
│  ├── (dashboard)
│  │  ├── projects
│  │  │  ├── [projectId]
│  │  │  │  ├── @modal
│  │  │  │  │  ├── create-bug
│  │  │  │  │  ├── create-improvement
│  │  │  │  │  ├── create-iteration
│  │  │  │  │  ├── create-task
│  │  │  │  │  ├── delete-iteration
│  │  │  │  │  │  └── [iterationId]
│  │  │  │  ├── indicators
│  │  │  │  │  ├── @modal
│  │  │  │  │  │  ├── create-action
├── components
│  ├── dashboard
│  │  ├── board
│  │  │  ├── Indicator
│  │  │  └── Iteration
│  │  ├── grid
│  │  │  └── ProjectsGrid
│  │  ├── list
│  │  │  └── IterationList
│  │  ├── modal
│  │  │  └── CreateAction
│  ├── forms
│  │  ├── access
│  │  │  ├── resolvers
│  │  │  ├── login-form.tsx
│  │  │  └── register-form.tsx
│  │  ├── bug
│  │  ├── improv
│  │  ├── iteration
│  │  │  ├── create
│  │  │  └── delete
│  │  ├── project
│  │  └── task
│  ├── layout
│  │  ├── navbar
│  │  └── sidebar
│  ├── ui
│  └── utils
│     ├── ColorSelector
│     ├── IndicatorRange
│     ├── MemberSelect
│     ├── TypeWriter
│     └── UserSelect
├── contexts
├── lib
│  ├── mappers
│  ├── query-client.tsx
│  └── utils.ts
├── services
├── store
├── types
```
