#!/bin/bash

echo "🎨 Setting up Keepa Studio..."
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local..."
    touch .env.local
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server, run:"
echo "   pnpm dev"
echo ""
echo "🌐 Open http://localhost:3000 in your browser"
echo ""
echo "📁 Project structure:"
echo "   src/app/        - Next.js app directory"
echo "   src/components/ - Reusable components"
echo "   src/sections/   - Page sections"
echo "   public/images/  - Image assets"
echo ""
