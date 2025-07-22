// Script to add SEO fields to all admin pages
// Run this script to automatically add SEO components to existing admin pages

const fs = require('fs').promises;
const path = require('path');

const adminPages = [
  {
    path: 'src/app/admin/solutions/page.tsx',
    pagePath: '/solutions',
    pageTitle: 'Modular Building Solutions'
  },
  {
    path: 'src/app/admin/industries/page.tsx', 
    pagePath: '/industries',
    pageTitle: 'Industries We Serve'
  },
  {
    path: 'src/app/admin/locations/page.tsx',
    pagePath: '/locations', 
    pageTitle: 'Service Locations'
  },
  {
    path: 'src/app/admin/testimonials/page.tsx',
    pagePath: '/testimonials',
    pageTitle: 'Customer Testimonials'
  },
  {
    path: 'src/app/admin/news-insights/page.tsx',
    pagePath: '/resources/insights',
    pageTitle: 'News & Insights'
  },
  {
    path: 'src/app/admin/faqs/page.tsx',
    pagePath: '/faqs',
    pageTitle: 'Frequently Asked Questions'
  },
  {
    path: 'src/app/admin/homepage/page.tsx',
    pagePath: '/',
    pageTitle: 'Home'
  }
];

const seoImportStatement = `import SEOFields from '@/components/admin/SEOFields'`;

const seoStateHook = `
  // SEO State
  const [seoData, setSeoData] = useState({})
  const [seoLoading, setSeoLoading] = useState(true)

  const fetchSEOData = async () => {
    try {
      setSeoLoading(true)
      const response = await fetch(\`/api/seo?path=PAGE_PATH\`)
      if (response.ok) {
        const data = await response.json()
        setSeoData(data)
      } else {
        setSeoData({})
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error)
    } finally {
      setSeoLoading(false)
    }
  }

  const handleSEODataChange = async (newSeoData) => {
    setSeoData(newSeoData)
    
    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_path: 'PAGE_PATH',
          page_title: 'PAGE_TITLE',
          ...newSeoData
        }),
      })

      if (!response.ok) {
        console.error('Failed to save SEO data')
      }
    } catch (error) {
      console.error('Error saving SEO data:', error)
    }
  }
`;

const seoComponent = `
        {/* SEO Configuration Section */}
        <div className="mt-8">
          <SEOFields
            data={seoData}
            onChange={handleSEODataChange}
            pagePath="PAGE_PATH"
            pageTitle="PAGE_TITLE"
          />
        </div>`;

async function addSEOToPage(pageInfo) {
  try {
    const filePath = path.join(__dirname, '..', pageInfo.path);
    let content = await fs.readFile(filePath, 'utf8');
    
    // Check if SEO is already added
    if (content.includes('SEOFields')) {
      console.log(`✅ SEO already added to ${pageInfo.path}`);
      return;
    }
    
    // Add import statement
    if (!content.includes(seoImportStatement)) {
      const reactImportRegex = /import React[^;]+;/;
      content = content.replace(reactImportRegex, (match) => `${match}\n${seoImportStatement}`);
    }
    
    // Add state and functions
    const stateCode = seoStateHook
      .replace(/PAGE_PATH/g, pageInfo.pagePath)
      .replace(/PAGE_TITLE/g, pageInfo.pageTitle);
    
    // Find the component function and add SEO state
    const functionRegex = /export default function \w+\(\) \{/;
    content = content.replace(functionRegex, (match) => `${match}\n${stateCode}`);
    
    // Add fetchSEOData to useEffect
    const useEffectRegex = /useEffect\(\(\) => \{([^}]+)\}, \[\]\)/;
    if (useEffectRegex.test(content)) {
      content = content.replace(useEffectRegex, (match, existingCode) => 
        match.replace(existingCode, `${existingCode.trim()}\n    fetchSEOData()`)
      );
    } else {
      // Add new useEffect if none exists
      const functionBodyRegex = /(export default function \w+\(\) \{[^{]*?\{[^}]*)/;
      content = content.replace(functionBodyRegex, (match) => 
        `${match}\n\n  useEffect(() => {\n    fetchSEOData()\n  }, [])`
      );
    }
    
    // Add SEO component before closing div
    const componentCode = seoComponent
      .replace(/PAGE_PATH/g, pageInfo.pagePath)
      .replace(/PAGE_TITLE/g, pageInfo.pageTitle);
    
    // Find the last closing div before the component closes
    const lastDivRegex = /(\s*<\/div>\s*<\/div>\s*)(\s*\}\s*)$/;
    if (lastDivRegex.test(content)) {
      content = content.replace(lastDivRegex, (match, divs, ending) => 
        `${componentCode}\n${divs}${ending}`
      );
    }
    
    await fs.writeFile(filePath, content);
    console.log(`✅ Added SEO to ${pageInfo.path}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${pageInfo.path}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Adding SEO fields to admin pages...\n');
  
  for (const pageInfo of adminPages) {
    await addSEOToPage(pageInfo);
  }
  
  console.log('\n✨ SEO setup complete!');
  console.log('\n📝 Manual steps needed:');
  console.log('1. Check each file for proper React imports (useState, useEffect)');
  console.log('2. Verify the component placement looks correct');
  console.log('3. Test each admin page to ensure SEO fields work');
  console.log('4. Add corresponding SEOMetaTags to frontend pages');
}

if (require.main === module) {
  main();
}

module.exports = { addSEOToPage, adminPages };