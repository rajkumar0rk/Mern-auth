# MERN Auth

A full-stack authentication system built with the MERN stack (MongoDB, Express, React, Node.js) and TypeScript end-to-end. It implements secure, session-based authentication from scratch — no third-party auth provider — including email verification, password reset, and multi-device session management.

> Built as a portfolio project to demonstrate production-style patterns for authentication: hashed passwords, JWT access/refresh tokens, HTTP-only cookies, and per-device session tracking.

## Features

- **User registration & login** with hashed passwords (bcrypt)
- **Access & refresh token** auth using JWT, delivered via HTTP-only cookies
- **Automatic token refresh** — refresh tokens are validated and rotated when close to expiry
- **Email verification** flow via a time-limited verification code
- **Forgot / reset password** flow with rate limiting (max 2 requests per 5 minutes)
- **Session management** — every login creates a session tied to the user's device (user agent), viewable and revocable individually
- **Centralized error handling** with typed application errors and Zod-based request validation
- **Type-safe** codebase — strict TypeScript on both frontend and backend

## Tech Stack

**Backend**
- Node.js + Express 5
- TypeScript
- MongoDB + Mongoose
- JWT (`jsonwebtoken`) for access/refresh tokens
- Zod for schema validation
- bcrypt for password hashing

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui (Radix primitives)
- React Router
- TanStack Query for server state
- Zustand for client state
- React Hook Form + Zod for form validation
- Axios

**Tooling**
- ESLint + Prettier
- Husky + lint-staged (pre-commit checks)
- GitHub Actions CI (lint, format, type-check)
- Docker (backend)

## Project Structure

```
Mern-auth/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection
│   │   ├── constants/       # env, HTTP status codes, error codes
│   │   ├── controllers/     # route handlers (auth, session, user)
│   │   ├── middlewares/     # auth guard, error handler
│   │   ├── models/          # Mongoose schemas (User, Session, VerificationCode)
│   │   ├── routes/          # Express routers
│   │   ├── schemas/         # Zod validation schemas
│   │   ├── services/        # business logic (auth service)
│   │   ├── utils/           # JWT, bcrypt, cookies, date helpers, error helpers
│   │   └── server.ts        # app entrypoint
│   └── Dockerfile
└── frontend/
    ├── src/
    │   ├── components/      # shared UI + shadcn/ui components
    │   ├── hooks/           # useAuth, useLogin, useRegister
    │   ├── Layouts/         # AppLayout, AuthLayout
    │   ├── pages/           # Home, Login, Register, Profile, Settings
    │   ├── providers/       # Theme, Navigation
    │   ├── routers/         # route definitions
    │   ├── schemas/         # form validation schemas
    │   └── store/           # Zustand stores
    └── vite.config.ts
```

## API Overview

| Method | Endpoint                       | Description                          |
|--------|--------------------------------|---------------------------------------|
| POST   | `/auth/register`               | Create a new account                  |
| POST   | `/auth/login`                  | Log in and start a session            |
| GET    | `/auth/logout`                 | Log out and clear tokens              |
| GET    | `/auth/refresh`                | Refresh the access token               |
| GET    | `/auth/email/verify/:code`     | Verify an email using a code          |
| POST   | `/auth/password/forget`        | Request a password reset link         |
| POST   | `/auth/password/reset`         | Reset password using a valid code     |
| GET    | `/user`                        | Get the current authenticated user    |
| GET    | `/sessions`                    | List active sessions for the user     |
| DELETE | `/sessions/:id`                | Revoke a specific session              |

## Getting Started

### Prerequisites

- Node.js (version pinned in `.nvmrc`)
- A running MongoDB instance (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/rajkumar0rk/Mern-auth.git
cd Mern-auth
```

### 2. Backend setup

```bash
cd backend
npm install
cp sample.env .env
```

Fill in `.env`:

```env
NODE_ENV=development
APP_ORIGIN=https://auth.localhost
MONGO_URI=mongodb://localhost:27017/authdb
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
EMAIL_SENDER=
RESEND_API_KEY=
```

Run the API:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
cp sample.env .env
```

Fill in `.env`:

```env
VITE_API_URL=http://localhost:3000
```

Run the app:

```bash
npm run dev
```

### 4. Docker (backend only)

```bash
cd backend
docker build -t mern-auth-backend .
docker run -p 3000:3000 --env-file .env mern-auth-backend
```

## Available Scripts

**Backend** (`backend/package.json`)
| Script | Description |
|---|---|
| `npm run dev` | Start the API in watch mode |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server |
| `npm run type-check` | Type-check without emitting files |
| `npm run lint` / `lint:fix` | Lint the codebase |
| `npm run format` / `format:check` | Format with Prettier |

**Frontend** (`frontend/package.json`)
| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Lint the codebase |

## Continuous Integration

Every push to `main` runs through GitHub Actions (`.github/workflows/ci.yml`): dependency install, tests, TypeScript type-checking, ESLint, and Prettier formatting checks.

## Roadmap / Ideas for Extension

- Wire up transactional email sending (Resend) for verification and password reset links
- Add automated backend tests
- Add rate limiting middleware at the app level
- Add OAuth providers (Google/GitHub) alongside email/password auth

## License

Licensed under the MIT License — see [LICENSE](./LICENSE) for details.

## Author

**Rajkumar** — [GitHub](https://github.com/rajkumar0rk)
