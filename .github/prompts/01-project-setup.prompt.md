# Project Setup - Astro Configuration

Initialize the Olavo Stauros personal website with proper Astro configuration for static deployment.

## Tasks

1. **Configure `astro.config.mjs`**:
   - Set output to 'static' 
   - Configure for production build
   - Add site URL: 'https://olavostauros.com'

2. **Update `package.json`**:
   - Add proper description and author
   - Include build scripts for production
   - Ensure dependencies are correct

3. **Create `.gitignore`**:
   - Standard Astro/Node.js patterns
   - Include dist/, node_modules/, .env files

4. **Clean up default files**:
   - Remove `Welcome.astro` component
   - Clear default content from `index.astro`
   - Remove unused assets (astro.svg, background.svg)

## File Structure After Setup
```
/
├── astro.config.mjs (configured)
├── package.json (updated)
├── .gitignore (new)
├── public/
│   └── favicon.svg
└── src/
    ├── components/ (cleaned)
    ├── layouts/
    │   └── Layout.astro
    └── pages/
        └── index.astro (cleaned)
```

## Key Configuration
- **Output**: Static site generation
- **Site URL**: https://olavostauros.com
- **Build target**: Modern browsers
- **No TypeScript**: Pure JavaScript/Astro
