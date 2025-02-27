# Node.js Backend Boilerplate

A modern Node.js backend starter with TypeScript, Express, Prisma, and PostgreSQL.

## Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Run `npm install`
4. Start database: `npm run docker:up`
5. Run migrations: `npm run prisma:migrate`
6. Start dev server: `npm run dev`

## Key Features

- 🔒 TypeScript
- 📦 Express.js
- 🗄️ Prisma w PostgreSQL
- 🐳 Docker ready
- ✨ ESLint + Prettier
- 🧪 Jest testing setup
- 📚 Swagger API docs
- 🔍 Pino logging
- 👮‍♂️ Security middleware

## API Documentation

Access Swagger docs at: `http://localhost:3000/api-docs`

## Available Scripts

- `npm run dev` - Development
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run docker:up` - Start containers
- `npm run prisma:studio` - Database GUI
