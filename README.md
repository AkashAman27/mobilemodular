# Aman Modular Website

A modern Next.js website for Aman Modular Buildings, built with TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional design based on WillScot.com patterns
- **Responsive**: Mobile-first approach with responsive design
- **Performance**: Optimized with Next.js 14 and modern web practices
- **Animations**: Smooth animations with Framer Motion
- **SEO Optimized**: Built-in SEO with metadata and structured data
- **Quote System**: Functional quote request form with email notifications
- **Database Integration**: Supabase database for storing submissions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui components
- **Animations**: Framer Motion
- **TypeScript**: Full type safety
- **Database**: Supabase for data storage
- **Email**: Resend API for email notifications
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```
Then fill in your Supabase and Resend API credentials.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Quote System Setup

The quote system requires:

1. **Supabase Database**: Quote submissions are stored in the `quote_submissions` table
2. **Email Service**: Using Resend API (free tier available)

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
```

### Database Schema

The `quote_submissions` table includes:
- Contact information (name, email, phone, company)
- Project details (type, description)
- Timestamps and status tracking

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

<!-- Force Vercel redeploy -->