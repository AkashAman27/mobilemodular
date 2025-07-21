# Aman Modular Website

A modern Next.js website for Aman Modular Buildings, built with TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional design based on WillScot.com patterns
- **Responsive**: Mobile-first approach with responsive design
- **Performance**: Optimized with Next.js 14 and modern web practices
- **Animations**: Smooth animations with Framer Motion
- **SEO Optimized**: Built-in SEO with metadata and structured data

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui components
- **Animations**: Framer Motion
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design System

### Colors
- **Primary**: Deep Navy Blue (#1B365D)
- **Secondary**: Steel Blue (#4A90B8)
- **Background**: Clean White (#FFFFFF)
- **Accent**: Success Green (#10B981), Warning Orange (#F59E0B)

### Typography
- **Primary**: Inter (sans-serif)
- **Secondary**: Roboto Slab (serif)
- **Body text**: 16-18px minimum for readability

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # Basic UI components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Hero section
│   ├── SolutionsGrid.tsx # Solutions showcase
│   └── ...
├── data/               # Demo data and types
├── lib/                # Utility functions
└── styles/             # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project can be deployed on Vercel, Netlify, or any platform that supports Next.js.

For Vercel deployment:
```bash
npm run build
```

## License

© 2024 Aman Modular. All rights reserved.