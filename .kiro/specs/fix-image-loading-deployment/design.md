# Design Document

## Overview

The image loading issue stems from using hardcoded relative paths instead of leveraging Vite's asset processing system. The solution involves converting all image references to proper ES6 imports, which allows Vite to process, optimize, and correctly reference assets in the built application.

## Architecture

### Current Problem
- Images are referenced as hardcoded strings: `"assets/logo.png"`
- Vite cannot process these paths during build
- Relative paths break when deployed to different directory structures
- No asset optimization or cache busting

### Proposed Solution
- Convert to ES6 imports: `import logoImg from '../assets/logo.png'`
- Vite processes imports during build, generating optimized assets with hashed filenames
- Import paths resolve correctly regardless of deployment location
- Automatic asset optimization and cache busting

## Components and Interfaces

### Image Import Pattern
```typescript
// Before (problematic)
<img src="assets/logo.png" alt="Logo" />

// After (correct)
import logoImg from '../assets/logo.png'
<img src={logoImg} alt="Logo" />
```

### Data File Pattern
```typescript
// Before (problematic)
export const products = [
  {
    images: ['assets/stylus1.png', 'assets/stylus2.png']
  }
]

// After (correct)
import stylus1Img from '../assets/stylus1.png'
import stylus2Img from '../assets/stylus2.png'

export const products = [
  {
    images: [stylus1Img, stylus2Img]
  }
]
```

## Data Models

### Asset Reference Model
- **Import Statement**: ES6 import at component/file top
- **Variable Name**: Descriptive camelCase ending with 'Img'
- **Usage**: Reference imported variable in JSX/data structures
- **Build Output**: Vite generates optimized asset with hash in filename

### File Organization
- Source images remain in `/assets` directory
- Components import relative to their location
- Data files import relative to their location
- Build process outputs to `/dist/assets` with processed names

## Error Handling

### Build-Time Validation
- Missing image imports will cause TypeScript/build errors
- Broken import paths fail at build time, not runtime
- Unused imports can be detected by linting tools

### Runtime Considerations
- Imported images always resolve to valid URLs
- No need for runtime path validation
- Fallback images can be imported and used conditionally

## Testing Strategy

### Build Verification
1. Verify all images import without errors
2. Check that build process completes successfully
3. Inspect dist folder for properly processed assets
4. Validate that generated HTML references correct asset paths

### Deployment Testing
1. Deploy to htdocs subdirectory
2. Verify all images load correctly in browser
3. Check browser network tab for 404 errors
4. Test on different deployment paths/subdirectories

### Cross-Browser Testing
1. Test image loading in major browsers
2. Verify responsive image behavior
3. Check image optimization effectiveness
4. Validate cache headers and performance

## Implementation Approach

### Phase 1: Core Components
- Update App.tsx logo references
- Convert navigation and footer images
- Test basic image loading

### Phase 2: Product Data
- Update products.ts with proper imports
- Modify product components to use imported images
- Test product image carousels

### Phase 3: Additional Assets
- Convert any remaining hardcoded image paths
- Update carousel and modal components
- Verify all image references work

### Phase 4: Build Optimization
- Configure Vite for optimal asset processing
- Test deployment scenarios
- Validate performance improvements