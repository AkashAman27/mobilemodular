# Suggested Commands

## Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Database Commands
```bash
# Setup database tables (via API)
curl http://localhost:3000/api/setup-database

# Test database connection
curl http://localhost:3000/api/test-db

# Populate demo data
curl http://localhost:3000/api/populate-database
```

## Testing Commands
```bash
# Test FAQ system
curl http://localhost:3000/api/test-faq-fix

# Test canonical tags
curl http://localhost:3000/api/test-canonical-tags

# Test inventory system
curl http://localhost:3000/api/test-inventory-save
```

## Utility Commands (Darwin/macOS)
```bash
# File operations
ls -la          # List files with details
find . -name    # Find files by pattern
grep -r         # Search in files recursively

# Git operations
git status      # Check repository status
git add .       # Stage all changes
git commit -m   # Commit with message
git push        # Push to remote
```