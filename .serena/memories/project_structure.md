# Project Structure

## Key Directories

### `/src/app/` - Next.js App Router Pages
- **Pages**: Each folder = route (page.tsx files)
- **API Routes**: `/api/` folder contains backend endpoints
- **Layout**: layout.tsx files for shared layouts
- **Special Files**: loading.tsx, error.tsx, not-found.tsx

### `/src/components/` - React Components
- **ui/**: Basic UI components (buttons, inputs, etc.)
- **admin/**: Admin panel specific components
- **seo/**: SEO related components
- **layout/**: Layout components (headers, footers)
- **inventory/**: Inventory management components

### `/src/lib/` - Utility Functions
- **supabase/**: Database client configurations
- **utils.ts**: General utility functions
- **seo.ts**: SEO related utilities
- **auth-utils.ts**: Authentication helpers

### `/src/data/` - Static Data & Types
- **demo-data.ts**: Sample/demo data
- **industry-data.ts**: Industry specific data
- **faq-data.ts**: FAQ content

### `/src/hooks/` - Custom React Hooks
- **useSEO.ts**: SEO data management
- **usePageSEO.ts**: Page-specific SEO
- **useSolutions.ts**: Solutions data handling

## Important Files
- **middleware.ts**: Request middleware
- **tailwind.config.ts**: Styling configuration
- **next.config.js**: Next.js configuration