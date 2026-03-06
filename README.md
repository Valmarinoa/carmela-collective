# Keepa Studio

A modern freelance graphic design portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

![Keepa Studio Preview](public/images/preview.png)

## Features

- **Smooth Animations**: Powered by Framer Motion and GSAP ScrollTrigger
- **3D Logo Animation**: Morphing KEEPA logo with scroll-based transforms
- **Floating Gallery**: Parallax scrolling project images
- **Horizontal Scroll Projects**: GSAP-powered horizontal scrolling project showcase
- **Responsive Design**: Fully responsive across all devices
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Performance Optimized**: Built with production-ready optimizations

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://greensock.com/gsap/) with ScrollTrigger
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/keepa-studio.git
cd keepa-studio
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## Project Structure

```
keepa-studio/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   ├── BackToTop.tsx
│   │   ├── KeepaLogo.tsx
│   │   ├── Marquee.tsx
│   │   ├── OvalButton.tsx
│   │   └── SocialIcons.tsx
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── FloatingGallery.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── lib/                 # Utility functions
│   │   └── utils.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   └── styles/              # Global styles
│       └── globals.css
├── public/                  # Static assets
│   └── images/              # Image assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Customization

### Adding Your Images

1. Replace the placeholder images in `public/images/` with your own:
   - `keepa-placeholder.png` - Main KEEPA logo (replace with your animated version)
   - `project-*.jpg` - Project gallery images
   - `project-oasis.jpg`, etc. - Project card images

2. Update project data in `src/sections/Projects.tsx`

3. Update floating gallery images in `src/sections/FloatingGallery.tsx`

### Changing Colors

Edit the color scheme in `tailwind.config.ts`:

```typescript
colors: {
  cream: '#F5F5F0',        // Background color
  'cream-dark': '#E8E8E3', // Darker cream
  black: '#1a1a1a',        // Text color
  'accent-green': '#4ADE80', // CTA button color
}
```

### Updating Content

- **Hero Section**: Edit `src/sections/Hero.tsx`
- **Projects**: Edit `src/sections/Projects.tsx`
- **Contact**: Edit `src/sections/Contact.tsx`
- **Footer**: Edit `src/sections/Footer.tsx`

## Animation Details

### Hero Section
- Logo scales down and fades on scroll
- Content parallax effect
- Staggered entrance animations

### Floating Gallery
- Images float with different parallax speeds
- GSAP ScrollTrigger for scroll-based animations
- Hover scale and rotation effects

### Projects Section
- Horizontal scroll with GSAP
- Pinning during scroll
- Card hover animations

### Contact Section
- Form input focus animations
- Button hover effects
- Success state animation

## Deployment

### Vercel (Recommended)

```bash
pnpm dlx vercel
```

### Netlify

```bash
pnpm build
# Deploy the 'out' folder
```

### GitHub Pages

1. Update `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  basePath: '/your-repo-name',
}
```

2. Build and push to gh-pages branch.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

- Design inspired by Keepa Studio
- Built with love using Next.js and Tailwind CSS

---

For questions or support, email hey@keepastudio
