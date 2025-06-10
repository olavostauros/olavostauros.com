# Personal Website for Olavo Stauros

Create a modern, single-page personal website for olavostauros.com using Astro framework with pure CSS styling and vanilla JavaScript. This is a static portfolio website without any forms or interactive elements beyond navigation and visual effects.

## Design Requirements

Build a clean, professional website with these sections:

### Header
Fixed navigation bar with smooth scrolling links to: Home, About, Projects, Contact

### Hero Section  
Full-width introduction with:
- Bold headline: "Olavo Stauros"
- Tagline: "Systems Analysis Student & Aspiring Tech Professional"

### About Section
Brief bio with profile picture placeholder:
"Second-semester Systems Analysis student from Vila Velha, Espírito Santo. Passionate about web development and problem-solving, with experience in administrative roles managing data and communication strategies. Skilled in Astro, Git, and Neovim."

### Projects Section
Grid layout with 3 project cards:
- **Personal Website**: This site built with Astro and pure CSS, hosted on Vercel
- **Fitness Landing Page**: Static site for a personal trainer, built with Astro  
- **Portfolio Project**: Placeholder for future web development project, built with Astro

Each card needs a title, description, and placeholder image.

### Contact Footer
Include:
- Email: olavostauros@gmail.com
- GitHub: https://github.com/olavostauros
- LinkedIn: https://www.linkedin.com/in/olavostauros/
- WhatsApp button: https://wa.me/+5527981218258 (with CSS icon)
- Copyright notice

*Note: This is a static website with no contact forms - visitors can reach out via the provided social links and email.*

## Color Palette
- **Dark**: #121212 (backgrounds/text)
- **Red Accent**: #8C030E (hover effects)  
- **Light**: #FFF4ED (light backgrounds/text)
- **Bright Red**: #D90404 (buttons/highlights)
- **Gray**: #312C2D (secondary backgrounds/borders)

## Technical Requirements

- Use Astro framework with static output
- Pure CSS (no frameworks) with Inter font
- Vanilla JavaScript only (no TypeScript) - minimal JS for smooth scrolling navigation
- Responsive design with modern CSS (flexbox/grid)
- Smooth transitions and hover effects
- Professional accessibility standards
- Modular component structure
- **No forms or interactive elements** - purely static content with navigation

## File Structure Needed
- `index.astro` (main page)
- Header and Footer components  
- `src/styles/styles.css`
- `src/scripts/` for any JavaScript
- `astro.config.mjs` configured for static output

## Deployment
Configure for Vercel deployment with proper build settings and domain setup at olavostauros.com.
