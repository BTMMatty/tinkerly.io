#!/bin/bash
# Tink.io Project Scaffolder 🚀

echo "🚀 Setting up Tink.io platform..."

# Create directory structure
mkdir -p frontend/src/{app,components,lib,styles}
mkdir -p backend/src/{routes,services,middleware,config,types}
mkdir -p database
mkdir -p .github/workflows
mkdir -p docs

# Frontend package.json
cat > frontend/package.json << 'EOF'
{
  "name": "tink-io-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.2.2",
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "lucide-react": "^0.290.0",
    "framer-motion": "^10.16.0",
    "@stripe/stripe-js": "^2.1.0",
    "@stripe/react-stripe-js": "^2.4.0",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.7.0"
  },
  "devDependencies": {
    "eslint": "^8.52.0",
    "eslint-config-next": "14.0.0"
  }
}
EOF

# Backend package.json
cat > backend/package.json << 'EOF'
{
  "name": "tink-io-backend",
  "version": "1.0.0",
  "main": "dist/app.js",
  "scripts": {
    "dev": "nodemon src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "compression": "^1.7.4",
    "dotenv": "^16.3.1",
    "@anthropic-ai/sdk": "^0.9.0",
    "stripe": "^14.7.0",
    "pg": "^8.11.0",
    "ioredis": "^5.3.0",
    "socket.io": "^4.7.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/cors": "^2.8.0",
    "@types/node": "^20.8.0",
    "typescript": "^5.2.0",
    "nodemon": "^3.0.0",
    "ts-node": "^10.9.0"
  }
}
EOF

# Root package.json
cat > package.json << 'EOF'
{
  "name": "tink-io-platform",
  "version": "1.0.0",
  "description": "Revolutionary Ethical Automated Software Development Platform",
  "private": true,
  "workspaces": ["frontend", "backend"],
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "install:all": "npm install && cd frontend && npm install && cd ../backend && npm install"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
EOF

# Environment files
cat > frontend/.env.example << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
EOF

cat > backend/.env.example << 'EOF'
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://tinkio:password@localhost:5432/tinkio_db
ANTHROPIC_API_KEY=your_claude_api_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret
JWT_SECRET=your_super_secret_jwt_key
EOF

# Create placeholder files
touch frontend/src/app/page.tsx
touch frontend/src/components/TinkioPlatform.tsx
touch backend/src/app.ts
touch backend/src/routes/ai.ts
touch database/schema.sql

echo "✅ Project structure created!"
echo "🎯 Next: Open in VS Code and fill in the component files"
echo "🚀 Run: code . (to open in VS Code)"