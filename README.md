# Prodyo Frontend

Sistema de gestão de projetos e produtividade em desenvolvimento de software com foco em iterações, tarefas e indicadores de desempenho.

## Tecnologias

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router e Turbopack
- **[React 18](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e sem estilo
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado assíncrono
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas

## Quickstart

### Pré-requisitos

- Node.js 18+ 
- pnpm (recomendado) ou npm/yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd prodyo-frontend
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

4. Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `pnpm build` | Gera a build de produção |
| `pnpm start` | Inicia o servidor de produção |
| `pnpm lint` | Executa o ESLint |
| `pnpm swagger` | Gera tipos TypeScript a partir da API Swagger |

## Estrutura do Projeto

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
