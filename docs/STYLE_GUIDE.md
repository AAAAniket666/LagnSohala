# Lagna Sohalaa - Style Guide

This document defines the visual design system for the Lagna Sohalaa demo website.

---

## Brand Identity

### Brand Personality
- **Warm** - Approachable and friendly
- **Trustworthy** - Reliable and professional
- **Cultural** - Respects Indian traditions
- **Modern** - Contemporary and tech-forward

### Tone of Voice
- Respectful and warm
- Celebratory (weddings are joyful!)
- Clear and helpful
- Inclusive and welcoming

---

## Color Palette

### Primary Colors

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Primary | `#C41E3A` | `#E84A5F` | CTAs, links, accents |
| Primary Hover | `#A3172F` | `#F86B7D` | Hover states |
| Gold | `#D4AF37` | `#F4D03F` | Premium features, highlights |

### Background Colors

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Background | `#FFFFFF` | `#1A1A2E` | Main background |
| Surface | `#FDF8F5` | `#16213E` | Cards, sections |
| Surface Hover | `#F5EDE8` | `#1E2D4D` | Hover states |

### Text Colors

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| Text Primary | `#2D2D2D` | `#FFFFFF` | Headings, body |
| Text Secondary | `#666666` | `#B0B0B0` | Captions, meta |
| Text Muted | `#999999` | `#808080` | Disabled, hints |

### Semantic Colors

| Name | Value | Usage |
|------|-------|-------|
| Success | `#28A745` | Success messages |
| Warning | `#FFC107` | Warnings |
| Error | `#DC3545` | Errors |
| Info | `#17A2B8` | Information |

### CSS Variables

```css
:root {
  /* Primary */
  --color-primary: #C41E3A;
  --color-primary-hover: #A3172F;
  --color-gold: #D4AF37;
  
  /* Backgrounds */
  --color-background: #FFFFFF;
  --color-surface: #FDF8F5;
  
  /* Text */
  --color-text: #2D2D2D;
  --color-text-secondary: #666666;
  
  /* Borders */
  --color-border: #E5E5E5;
}

[data-theme="dark"] {
  --color-primary: #E84A5F;
  --color-primary-hover: #F86B7D;
  --color-background: #1A1A2E;
  --color-surface: #16213E;
  --color-text: #FFFFFF;
  --color-text-secondary: #B0B0B0;
  --color-border: #2D3748;
}
```

---

## Typography

### Font Families

| Category | Font | Fallback |
|----------|------|----------|
| Headings | Playfair Display | Georgia, serif |
| Body | Poppins | system-ui, sans-serif |

### Font Sizes

| Name | Size | Line Height | Usage |
|------|------|-------------|-------|
| xs | 0.75rem (12px) | 1.5 | Badges, labels |
| sm | 0.875rem (14px) | 1.5 | Captions, meta |
| base | 1rem (16px) | 1.6 | Body text |
| lg | 1.125rem (18px) | 1.6 | Lead text |
| xl | 1.25rem (20px) | 1.4 | Subheadings |
| 2xl | 1.5rem (24px) | 1.4 | H4 |
| 3xl | 2rem (32px) | 1.3 | H3 |
| 4xl | 2.5rem (40px) | 1.2 | H2 |
| 5xl | 3rem (48px) | 1.1 | H1 |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Normal | 400 | Body text |
| Medium | 500 | Emphasis |
| Semibold | 600 | Subheadings |
| Bold | 700 | Headings |

### Type Scale Example

```css
h1 {
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
}

h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

p {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}
```

---

## Spacing

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 0.25rem (4px) | Tight spacing |
| sm | 0.5rem (8px) | Component padding |
| md | 1rem (16px) | Standard gaps |
| lg | 1.5rem (24px) | Section padding |
| xl | 2rem (32px) | Large gaps |
| 2xl | 3rem (48px) | Section margins |
| 3xl | 4rem (64px) | Hero spacing |

### CSS Variables

```css
:root {
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
}
```

---

## Layout

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: 1.5rem;
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .grid-3 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .grid-4, .grid-3, .grid-2 { 
    grid-template-columns: 1fr; 
  }
}
```

### Breakpoints

| Name | Width | Target |
|------|-------|--------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
```

#### Gold Button
```css
.btn-gold {
  background: var(--color-gold);
  color: #1A1A2E;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
```

### Cards

```css
.card {
  background: var(--color-surface);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(196, 30, 58, 0.15);
}
```

### Form Inputs

```css
.input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.input.error {
  border-color: #DC3545;
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
}

.badge-primary {
  background: var(--color-primary);
  color: white;
}

.badge-gold {
  background: var(--color-gold);
  color: #1A1A2E;
}

.badge-verified {
  background: #28A745;
  color: white;
}
```

---

## Effects

### Shadows

| Name | Value | Usage |
|------|-------|-------|
| sm | `0 2px 4px rgba(0,0,0,0.1)` | Subtle lift |
| md | `0 4px 6px rgba(0,0,0,0.1)` | Cards |
| lg | `0 8px 25px rgba(0,0,0,0.15)` | Hover states |
| primary | `0 4px 15px rgba(196,30,58,0.3)` | Primary CTAs |

### Border Radius

| Name | Value | Usage |
|------|-------|-------|
| sm | 0.25rem | Small elements |
| md | 0.5rem | Buttons, inputs |
| lg | 1rem | Cards |
| xl | 1.5rem | Large cards |
| full | 9999px | Pills, avatars |

### Transitions

```css
/* Standard transition */
transition: all 0.2s ease;

/* Hover lift effect */
transition: transform 0.3s ease, box-shadow 0.3s ease;

/* Color transitions */
transition: color 0.2s ease, background-color 0.2s ease;
```

---

## Animations

### Fade In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}
```

### Slide Up

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.5s ease forwards;
}
```

### Pulse

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.pulse {
  animation: pulse 2s infinite;
}
```

---

## Icons

We use **Lucide React** for icons.

### Common Icons Used

| Icon | Usage |
|------|-------|
| Heart | Favorites, love |
| User | Profiles |
| Search | Search |
| Phone | Contact |
| Mail | Email |
| MapPin | Location |
| Calendar | Dates |
| Star | Ratings |
| Check | Verified, success |
| ChevronRight | Navigation |
| Menu | Mobile menu |
| Sun/Moon | Theme toggle |
| Globe | Language |

### Icon Sizes

| Size | Value | Usage |
|------|-------|-------|
| sm | 16px | Inline icons |
| md | 20px | Button icons |
| lg | 24px | Feature icons |
| xl | 32px | Hero icons |

---

## Accessibility

### Color Contrast

- All text meets WCAG AA standards (4.5:1 for normal text)
- Interactive elements have visible focus states
- Don't rely solely on color to convey information

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Screen Reader Support

- Use semantic HTML elements
- Add `aria-label` for icon-only buttons
- Use `sr-only` class for visually hidden text

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

---

## Dark Mode

Dark mode is toggled via `data-theme="dark"` attribute on the document root.

### Implementation

```tsx
// In ThemeContext
document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
```

### Design Principles for Dark Mode

1. **Don't just invert colors** - Use a dark blue (#1A1A2E) instead of pure black
2. **Reduce contrast slightly** - White text on dark backgrounds should be comfortable
3. **Warm up primary colors** - Make reds slightly brighter
4. **Reduce shadow intensity** - Shadows are less visible in dark mode
5. **Test all components** - Ensure nothing breaks visually

---

## Imagery

### Image Guidelines

- Use high-quality images from Unsplash
- Prefer warm, inviting tones
- Show diverse Indian couples and families
- Include both traditional and modern wedding aesthetics

### Image Aspect Ratios

| Usage | Ratio | Dimensions |
|-------|-------|------------|
| Hero | 16:9 | 1920×1080 |
| Cards | 4:3 | 400×300 |
| Profiles | 1:1 | 300×300 |
| Thumbnails | 1:1 | 80×80 |

### Image Optimization

- Use WebP format when possible
- Lazy load below-the-fold images
- Provide appropriate `alt` text

---

## Writing Guidelines

### Headlines

- Keep them short and impactful
- Use action words when possible
- Be warm and celebratory

**Good**: "Find Your Perfect Match"
**Avoid**: "Registration Form for Matrimony Services"

### Body Copy

- Use simple, clear language
- Break up long paragraphs
- Lead with benefits, not features

### CTAs

- Be specific about what happens next
- Use active voice
- Create urgency when appropriate

**Good**: "View Profiles Now", "Get Started Free"
**Avoid**: "Submit", "Click Here"

---

## Do's and Don'ts

### Do's ✅

- Use warm, inviting colors
- Maintain consistent spacing
- Ensure mobile-first design
- Test in both light and dark modes
- Use meaningful animations sparingly
- Follow accessibility guidelines

### Don'ts ❌

- Don't use pure black (#000000)
- Don't overcrowd interfaces
- Don't use small text (< 14px)
- Don't rely on color alone
- Don't use excessive animations
- Don't ignore mobile experience
