const fs = require('fs')
const path = require('path')

async function setupLocalImages() {
  console.log('🚀 Setting up local images...')
  
  const outputDir = path.join(__dirname, '..', 'output')
  const publicImagesDir = path.join(__dirname, '..', 'public', 'images', 'generated')
  
  // Create public images directory if it doesn't exist
  if (!fs.existsSync(publicImagesDir)) {
    fs.mkdirSync(publicImagesDir, { recursive: true })
    console.log('📁 Created public/images/generated directory')
  }
  
  if (!fs.existsSync(outputDir)) {
    console.error('❌ Output directory not found:', outputDir)
    process.exit(1)
  }

  // Get all WebP files from output directory
  const files = fs.readdirSync(outputDir).filter(file => file.endsWith('.webp'))
  console.log(`📁 Found ${files.length} WebP images to copy`)

  let copiedCount = 0
  const imageMapping = {}

  for (const filename of files) {
    try {
      const sourcePath = path.join(outputDir, filename)
      
      // Extract the clean name (remove timestamp suffix)
      const cleanName = filename.replace(/_\d{8}_\d{6}\.webp$/, '.webp')
      const destPath = path.join(publicImagesDir, cleanName)
      
      // Copy file
      fs.copyFileSync(sourcePath, destPath)
      
      // Create mapping
      const keyName = cleanName.replace('.webp', '')
      imageMapping[keyName] = `/images/generated/${cleanName}`
      
      console.log(`📋 Copied: ${filename} -> ${cleanName}`)
      copiedCount++

    } catch (err) {
      console.error(`❌ Error copying ${filename}:`, err.message)
    }
  }

  // Write image mapping to a JSON file
  const mappingPath = path.join(__dirname, '..', 'src', 'data', 'image-mapping.json')
  fs.writeFileSync(mappingPath, JSON.stringify(imageMapping, null, 2))
  
  console.log(`\n📊 Setup Summary:`)
  console.log(`   ✅ Images copied: ${copiedCount}`)
  console.log(`   📁 Total files: ${files.length}`)
  console.log(`   🗂️  Mapping file: ${mappingPath}`)
  
  console.log(`\n🌐 Images are now accessible at:`)
  console.log(`   http://localhost:3000/images/generated/[filename].webp`)
  
  return imageMapping
}

setupLocalImages().catch(console.error)