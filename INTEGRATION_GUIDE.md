# SEO System Integration Guide

This guide shows how to integrate the new individual page SEO functionality with existing admin pages while maintaining compatibility with the central SEO management system.

## Overview

The new SEO system provides:

1. **Individual Page SEO Management** - Context-aware SEO editing for specific pages
2. **Central SEO Management** - Global settings and templates that remain the master system
3. **Data Synchronization** - Automatic sync between individual and central systems
4. **Scalable Components** - Reusable across different page types
5. **Validation & Optimization** - Built-in SEO analysis and suggestions

## Quick Integration

### Step 1: Import Required Components

```typescript
import SEOSection from '@/components/admin/SEOSection'
import { usePageSEO } from '@/hooks/usePageSEO'
import type { PageType, SEOData } from '@/types/seo'
```

### Step 2: Add SEO Section to Your Admin Page

```typescript
// In your existing admin page component (e.g., EditSolution)
export default function EditSolution() {
  const [formData, setFormData] = useState<SolutionFormData>({
    // ... existing form data
  })

  const handleSEOSave = (seoData: Partial<SEOData>) => {
    // Update your form data with SEO changes
    setFormData(prev => ({
      ...prev,
      ...seoData
    }))
  }

  return (
    <div>
      {/* ... existing form sections ... */}
      
      {/* Add SEO Section */}
      <SEOSection
        pageType="solution"
        pagePath={`/solutions/${formData.slug}`}
        contentId={formData.id}
        contentData={formData}
        onSEOSave={handleSEOSave}
        className="mt-6"
      />
      
      {/* ... rest of your form ... */}
    </div>
  )
}
```

### Step 3: Update Your Save Handler

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // ... existing validation and save logic ...
  
  try {
    // Save main content
    const { error } = await supabase
      .from('solutions')
      .update(formData)
      .eq('id', formData.id)

    if (error) throw error

    // SEO data is automatically saved by the SEOSection component
    // No additional save logic needed!
    
    alert('Solution updated successfully!')
  } catch (error) {
    alert('Error updating solution')
  }
}
```

## Advanced Integration

### Using the Hook Directly

For more control, use the `usePageSEO` hook directly:

```typescript
import { usePageSEO } from '@/hooks/usePageSEO'

export default function CustomAdminPage() {
  const {
    seoData,
    validationStatus,
    updateField,
    save,
    getOptimizationScore
  } = usePageSEO({
    pageType: 'solution',
    pagePath: '/solutions/office-buildings',
    contentId: 'uuid-here',
    autoSave: true,
    onSave: (data) => console.log('SEO saved:', data)
  })

  const optimizationScore = getOptimizationScore()

  return (
    <div>
      <h3>SEO Score: {optimizationScore}%</h3>
      
      <input
        value={seoData.seo_title || ''}
        onChange={(e) => updateField('seo_title', e.target.value)}
        placeholder="SEO Title"
      />
      
      {validationStatus?.issues.map(issue => (
        <div key={issue.field} className="text-red-600">
          {issue.message}
        </div>
      ))}
    </div>
  )
}
```

### Custom SEO Component

Create your own SEO component using the underlying utilities:

```typescript
import { IndividualPageSEO } from '@/components/seo/IndividualPageSEO'

export function MySEOComponent() {
  return (
    <IndividualPageSEO
      pageType="industry"
      pagePath="/industries/healthcare"
      contentId="industry-uuid"
      fallbackTitle="Healthcare Modular Buildings"
      fallbackDescription="Professional healthcare modular buildings..."
      fallbackImage="/images/healthcare-building.jpg"
      autoSave={false}
      showPreview={true}
      onSave={(data) => {
        // Handle save
      }}
      onValidationChange={(status) => {
        // Handle validation changes
      }}
    />
  )
}
```

## Page Type Configuration

The system supports various page types. Configure them based on your content:

```typescript
type PageType = 
  | 'solution'     // /solutions/office-buildings
  | 'industry'     // /industries/healthcare
  | 'location'     // /locations/los-angeles
  | 'homepage'     // /
  | 'about'        // /about
  | 'contact'      // /contact
  | 'resources'    // /resources
  | 'news'         // /news/article-slug
  | 'page'         // Generic pages

// Usage examples:
<SEOSection pageType="solution" ... />
<SEOSection pageType="industry" ... />
<SEOSection pageType="location" ... />
```

## Database Integration

### Automatic Content Sync

SEO data is automatically synchronized with your content tables. The system:

1. Reads SEO fields from your content tables (solutions, industries, etc.)
2. Merges with central settings and templates
3. Saves individual overrides to the `seo_pages` table
4. Updates content tables with SEO changes

### Migration

Run the provided SQL migration to set up the required tables:

```bash
# Apply the migration
psql -f database/migrations/seo_system_enhancement.sql
```

## Metadata Generation

### Server-Side (App Router)

```typescript
// app/solutions/[slug]/page.tsx
import { generateSEOMetadata } from '@/components/seo/SEOMetadata'

export async function generateMetadata({ params }) {
  return await generateSEOMetadata({
    pageType: 'solution',
    pagePath: `/solutions/${params.slug}`,
    contentId: 'solution-uuid',
    fallbackTitle: 'Office Buildings',
    fallbackDescription: 'Professional office buildings...'
  })
}
```

### Client-Side

```typescript
import { SEOHead } from '@/components/seo/SEOMetadata'

export default function ClientPage() {
  return (
    <div>
      <SEOHead
        pageType="solution"
        pagePath="/solutions/office-buildings"
        contentId="uuid"
        fallbackTitle="Office Buildings"
      />
      {/* Your page content */}
    </div>
  )
}
```

## Central Management Integration

The new system works seamlessly with the existing central SEO management:

1. **Global Settings** remain in `/admin/seo`
2. **Individual Pages** can override specific fields
3. **Templates** provide defaults for new content
4. **Synchronization** keeps everything in sync

### Template Management

Create templates for consistent SEO across page types:

```sql
INSERT INTO seo_templates (
  page_type,
  template_name,
  seo_title_template,
  seo_description_template,
  is_default
) VALUES (
  'solution',
  'Standard Solution Template',
  '{name} - Professional Modular Buildings',
  'Professional {name} for rent and sale. {description}',
  true
);
```

## Validation & Optimization

The system includes built-in validation:

```typescript
// Automatic validation
const validationStatus = validateSEO(seoData)

// Custom validation rules
const customRules = {
  title: { min_length: 40, max_length: 65 },
  description: { min_length: 140, max_length: 155 }
}
const status = seoSyncManager.validateSEOData(seoData, customRules)

// Optimization score
const score = getOptimizationScore() // 0-100
```

## Best Practices

### 1. Use Appropriate Page Types
Choose the correct page type for accurate templates and structured data:
- `solution` for product/service pages
- `industry` for industry-specific content
- `location` for location-based pages
- `page` for generic content

### 2. Provide Good Fallbacks
Always provide fallback data from your content:

```typescript
<SEOSection
  pageType="solution"
  pagePath={`/solutions/${solution.slug}`}
  contentId={solution.id}
  contentData={solution}
  fallbackTitle={solution.name}
  fallbackDescription={solution.description}
  fallbackImage={solution.image_url}
/>
```

### 3. Monitor SEO Health
Use the built-in validation and optimization scoring:

```typescript
const { validationStatus, getOptimizationScore } = usePageSEO({...})

// Show issues to users
if (validationStatus?.overall === 'error') {
  // Show critical issues
}

// Track optimization scores
const score = getOptimizationScore()
```

### 4. Leverage Auto-Save
Enable auto-save for better user experience:

```typescript
const seo = usePageSEO({
  autoSave: true, // Saves after 2 seconds of inactivity
  onSave: (data) => {
    // Optional: update your local state
  }
})
```

## Troubleshooting

### Common Issues

1. **SEO data not loading**
   - Check that the page path is correct
   - Ensure content ID exists in the database
   - Verify database permissions

2. **Validation errors**
   - Check that all required fields have values
   - Verify character limits for title/description
   - Ensure structured data type is valid

3. **Save failures**
   - Check database connectivity
   - Verify user permissions
   - Check for validation errors

### Debug Mode

Enable debug logging:

```typescript
// In your component
console.log('SEO Data:', seoData)
console.log('Validation:', validationStatus)
console.log('Merged Data:', mergedData)
```

## Migration from Existing System

### Step 1: Backup Current SEO Data
```sql
-- Backup existing SEO fields from content tables
CREATE TABLE seo_backup AS
SELECT id, seo_title, seo_description, seo_keywords
FROM solutions WHERE seo_title IS NOT NULL;
```

### Step 2: Run the Migration
```bash
psql -f database/migrations/seo_system_enhancement.sql
```

### Step 3: Migrate Data to New System
```typescript
// Migration script example
const migrateExistingSEO = async () => {
  const solutions = await supabase.from('solutions').select('*')
  
  for (const solution of solutions.data) {
    if (solution.seo_title) {
      await seoSyncManager.saveIndividualSEO(
        'solution',
        `/solutions/${solution.slug}`,
        {
          seo_title: solution.seo_title,
          seo_description: solution.seo_description,
          seo_keywords: solution.seo_keywords,
          // ... other fields
        },
        solution.id
      )
    }
  }
}
```

### Step 4: Update Admin Pages
Replace existing SEO form sections with the new components as shown in the integration examples above.

## Support

For questions or issues with the SEO system:

1. Check the validation status for specific error messages
2. Review the database logs for sync issues
3. Verify that all required migrations have been applied
4. Check component props and configuration

The system is designed to be backward-compatible and should work alongside your existing SEO implementation.