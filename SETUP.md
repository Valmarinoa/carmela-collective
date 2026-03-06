# Keepa Studio - Setup Guide

## Quick Start

### Option 1: Using the Setup Script (Recommended)

```bash
cd keepa-studio
./setup.sh
```

### Option 2: Manual Setup

```bash
# Navigate to project directory
cd keepa-studio

# Install dependencies with pnpm
pnpm install

# Or with npm
npm install
```

## Running the Project

### Development Server

```bash
# With pnpm
pnpm dev

# With npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# With pnpm
pnpm build

# With npm
npm run build
```

### Start Production Server

```bash
# With pnpm
pnpm start

# With npm
npm start
```

## Project Structure

```
keepa-studio/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout with fonts
│   │   └── page.tsx            # Home page composing all sections
│   │
│   ├── components/             # Reusable UI components
│   │   ├── BackToTop.tsx       # Scroll to top button
│   │   ├── KeepaLogo.tsx       # Animated KEEPA logo
│   │   ├── Marquee.tsx         # Scrolling header text
│   │   ├── OvalButton.tsx      # Oval-shaped CTA buttons
│   │   └── SocialIcons.tsx     # Instagram & LinkedIn icons
│   │
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx            # Hero with logo & intro
│   │   ├── FloatingGallery.tsx # Parallax floating images
│   │   ├── Projects.tsx        # Horizontal scroll projects
│   │   ├── Contact.tsx         # Contact form section
│   │   └── Footer.tsx          # Footer with large logo
│   │
│   ├── lib/                    # Utility functions
│   │   └── utils.ts            # Helper functions (cn, etc.)
│   │
│   ├── types/                  # TypeScript types
│   │   └── index.ts            # Project, NavItem types
│   │
│   └── styles/                 # Global styles
│       └── globals.css         # Tailwind + custom styles
│
├── public/
│   └── images/                 # Static image assets
│       ├── keepa-placeholder.png  # Main logo placeholder
│       ├── project-*.jpg       # Floating gallery images
│       └── project-*.jpg       # Project card images
│
├── package.json                # Dependencies & scripts
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── README.md                   # Full documentation
```

## Customization Guide

### 1. Replace the KEEPA Logo

The current placeholder uses the Carmela image. To replace with your animated KEEPA video:

**Option A: Video (Recommended)**
```tsx
// In src/components/KeepaLogo.tsx
// Replace the Image component with a video:
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full h-full object-contain"
>
  <source src="/videos/keepa-animation.mp4" type="video/mp4" />
</video>
```

**Option B: Lottie Animation**
```bash
pnpm add lottie-react
```
```tsx
import Lottie from 'lottie-react'
import keepaAnimation from '@/assets/keepa-animation.json'

<Lottie animationData={keepaAnimation} loop={true} />
```

### 2. Update Project Images

Replace files in `public/images/`:
- `project-1.jpg` through `project-8.jpg` - Floating gallery
- `project-oasis.jpg`, etc. - Project cards

### 3. Update Project Data

Edit `src/sections/Projects.tsx`:
```typescript
const projects = [
  {
    id: '1',
    title: 'Your Project Name',
    category: 'Category',
    description: 'Project description...',
    image: '/images/your-image.jpg',
  },
  // ...
]
```

### 4. Update Contact Info

Edit `src/sections/Hero.tsx`:
```tsx
<a href="mailto:your@email.com">your@email.com</a>
```

Edit `src/sections/Contact.tsx`:
- Update form handling logic
- Connect to your backend or form service (Formspree, Netlify Forms, etc.)

### 5. Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  cream: '#F5F5F0',        // Background
  black: '#1a1a1a',        // Text
  'accent-green': '#4ADE80', // CTA buttons
}
```

## Dependencies

### Core
- `next` - React framework
- `react` / `react-dom` - React library
- `typescript` - Type support

### Styling
- `tailwindcss` - Utility CSS
- `autoprefixer` / `postcss` - CSS processing
- `clsx` / `tailwind-merge` - Class utilities

### Animation
- `framer-motion` - React animations
- `gsap` - Advanced scroll animations
- `@gsap/react` - GSAP React integration

### Icons
- `lucide-react` - Icon library

## GitHub Repository Setup

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Keepa Studio portfolio"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/keepa-studio.git

# Push
git push -u origin main
```

## Deployment

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com)

### Netlify

```bash
# Build
pnpm build

# Deploy the 'out' folder manually
# Or connect your GitHub repo at netlify.com
```

Update `next.config.js` for static export:
```javascript
const nextConfig = {
  output: 'export',
  distDir: 'dist',
}
```

## Troubleshooting

### Build Errors

1. **TypeScript errors**: Run `pnpm tsc --noEmit` to check types
2. **Missing dependencies**: Delete `node_modules` and run `pnpm install`
3. **Cache issues**: Run `pnpm next clean` then rebuild

### Animation Issues

1. **GSAP not working**: Ensure `ScrollTrigger` is registered
2. **Scroll animations lag**: Reduce parallax elements or use `will-change` sparingly

### Image Loading

1. **Images not showing**: Check paths in `public/images/`
2. **Next.js Image optimization**: Set `unoptimized: true` in `next.config.js` for static export

## Performance Tips

1. **Optimize images**: Use WebP format, compress before adding to `public/`
2. **Lazy loading**: Already implemented for below-fold images
3. **Code splitting**: Next.js handles this automatically
4. **Font optimization**: Using `next/font` for optimal loading

## Support

For questions or issues:
- Check the [Next.js docs](https://nextjs.org/docs)
- [Framer Motion docs](https://www.framer.com/motion/)
- [GSAP docs](https://greensock.com/docs/)

---

Built with ❤️ using Next.js, Tailwind CSS, and lots of coffee.
