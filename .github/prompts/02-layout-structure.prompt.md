# Layout & Base Structure

Create the foundational layout system and main page structure for the personal website.

## Tasks

1. **Update `src/layouts/Layout.astro`**:
   - HTML5 semantic structure
   - Meta tags for SEO (title, description, viewport)
   - Inter font from Google Fonts
   - Link to main CSS file
   - Proper accessibility attributes

2. **Create main page structure in `src/pages/index.astro`**:
   - Import Layout component
   - Define page sections as semantic HTML
   - Add navigation structure
   - Create content placeholders for all sections

## Required Sections
- **Header**: Fixed navigation with smooth scroll links
- **Hero**: Full-width introduction area
- **About**: Personal bio section
- **Projects**: Portfolio grid layout
- **Contact**: Footer with social links

## HTML Structure
```html
<header>
  <nav> <!-- Fixed navigation --> </nav>
</header>
<main>
  <section id="hero"> <!-- Hero section --> </section>
  <section id="about"> <!-- About section --> </section>
  <section id="projects"> <!-- Projects grid --> </section>
</main>
<footer id="contact"> <!-- Contact footer --> </footer>
```

## SEO Meta Tags
- Title: "Olavo Stauros - Systems Analysis Student"
- Description: "Personal website of Olavo Stauros, Systems Analysis student from Vila Velha, ES"
- Viewport: responsive
- Lang: pt-BR (Portuguese Brazil)
