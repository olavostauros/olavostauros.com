# JavaScript & Interactivity

Add minimal vanilla JavaScript for smooth scrolling navigation and any subtle interactive effects.

## Tasks

1. **Create `src/scripts/navigation.js`**:
   - Smooth scrolling for navigation links
   - Active section highlighting in navigation
   - Mobile menu toggle functionality (if needed)

2. **Smooth Scrolling Implementation**:
   ```javascript
   // Smooth scroll to sections
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
       e.preventDefault();
       // Smooth scroll logic
     });
   });
   ```

3. **Optional Interactive Features**:
   - Scroll-triggered animations (intersection observer)
   - Navigation bar background change on scroll
   - Project card subtle animations

## Requirements
- **Pure vanilla JavaScript** (no frameworks)
- **No TypeScript** - use .js files only
- Minimal JavaScript footprint
- Modern browser APIs (ES6+)
- Accessible interactions

## File Structure
```
src/scripts/
├── navigation.js (main navigation logic)
└── utils.js (optional utility functions)
```

## Integration
- Import scripts in Layout.astro
- Use client:load directive for Astro
- Ensure scripts load after DOM is ready

## Key Functions
- Smooth scroll navigation
- Active menu item highlighting  
- Responsive menu toggle
- Scroll position tracking
