# Code Style & Conventions

## File Naming
- **Components**: PascalCase (e.g., `HeroSection.tsx`, `AdminLayout.tsx`)
- **Pages**: lowercase with kebab-case for folders (e.g., `news-insights/page.tsx`)
- **Utilities**: camelCase (e.g., `seo-utils.ts`, `auth-utils.ts`)
- **Types**: PascalCase interfaces (e.g., `SEOData`, `InventoryItem`)

## Component Structure
```typescript
// Standard component pattern
interface ComponentProps {
  // Props with proper typing
}

const Component: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX with Tailwind classes
  )
}

export default Component
```

## Styling Conventions
- **Tailwind CSS**: Utility-first approach
- **Custom Colors**: navy-600, steel-500, gradient-blue, gradient-orange
- **Responsive**: Mobile-first with md:, lg: breakpoints
- **Spacing**: Consistent use of p-4, p-6, p-8 for padding

## TypeScript Guidelines
- **Strict typing**: All props and data structures typed
- **Interfaces**: Preferred over types for object shapes
- **Import organization**: External libs, then internal modules
- **Default exports**: For components, named exports for utilities