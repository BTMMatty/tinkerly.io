# Tinkerly.io Platform - Monorepo Overview

## Project Structure
This is a monorepo with two main applications:
- `/frontend` - Next.js 15 client application
- `/backend` - Node.js/Express API server

## Quick Commands
```bash
# Install all dependencies
npm install

# Run both frontend and backend
npm run dev

# Run specific app
npm run dev:frontend
npm run dev:backend
```

## Active Development
Currently shipping MVP with focus on FRONTEND. Backend will be integrated after core UI is complete.

## Tech Stack Overview
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Clerk, Supabase
- **Backend**: Node.js, Express, TypeScript (PLANNED)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Clerk
- **Payments**: Stripe

## Current Sprint
SHIP FRONTEND MVP TODAY - Backend integration can wait!

## See Also
- `/frontend/CLAUDE.md` - Frontend-specific details
- `/backend/CLAUDE.md` - Backend-specific details