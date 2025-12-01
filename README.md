# Prodyo Frontend

Sistema de gestão de projetos e produtividade com foco em iterações, tarefas e indicadores de desempenho.

## 🛠️ Tecnologias

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router e Turbopack
- **[React 18](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Radix UI](https://www.radix-ui.com/)** - Componentes acessíveis e sem estilo
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones
- **[TanStack Query](https://tanstack.com/query)** - Gerenciamento de estado assíncrono
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas

## 🚀 Quickstart

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

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `pnpm build` | Gera a build de produção |
| `pnpm start` | Inicia o servidor de produção |
| `pnpm lint` | Executa o ESLint |
| `pnpm swagger` | Gera tipos TypeScript a partir da API Swagger |

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (páginas e rotas)
│   ├── (access)/           # Grupo de rotas de acesso (login, registro)
│   └── (dashboard)/        # Grupo de rotas do dashboard
│       └── projects/       # Páginas de projetos
├── components/             # Componentes React
│   ├── dashboard/          # Componentes do dashboard
│   └── ui/                 # Componentes base (shadcn/ui)
├── data/                   # Dados mock
├── lib/                    # Utilitários
└── types/                  # Tipos TypeScript
```
