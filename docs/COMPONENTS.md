# Component Documentation

This document provides detailed documentation for all reusable components in the Lagna Sohalaa demo website.

---

## Layout Components

### `<Layout />`

The main layout wrapper that includes Header, Footer, and page content.

**File**: `src/components/Layout.tsx`

**Props**: None (uses children)

**Usage**:
```tsx
<Layout>
  <YourPageContent />
</Layout>
```

---

### `<Header />`

Global navigation header with logo, navigation links, theme toggle, and language switcher.

**File**: `src/components/Header.tsx`

**Features**:
- Responsive hamburger menu for mobile
- Dark mode toggle
- Language switcher (EN/MR)
- Sticky header on scroll
- Active link highlighting

**Props**: None

**CSS Classes**:
- `.header` - Main header container
- `.nav-links` - Navigation link list
- `.nav-link.active` - Active navigation state
- `.mobile-menu-toggle` - Hamburger button
- `.header-actions` - Theme/language buttons container

---

### `<Footer />`

Global footer with company info, quick links, social links, and newsletter signup.

**File**: `src/components/Footer.tsx`

**Sections**:
- Company info and description
- Quick Links
- Services
- Contact Information
- Social Media Links
- Newsletter Subscription
- Copyright

**Props**: None

---

## Card Components

### `<ProfileCard />`

Displays a matrimonial profile preview.

**File**: `src/components/ProfileCard.tsx`

**Props**:
```typescript
interface ProfileCardProps {
  profile: Profile;
}

interface Profile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  religion: string;
  community: string;
  education: string;
  occupation: string;
  location: string;
  photo: string;
  verified: boolean;
  premium: boolean;
  about: string;
  interests: string[];
}
```

**Usage**:
```tsx
<ProfileCard profile={profileData} />
```

**Features**:
- Verified badge indicator
- Premium badge indicator
- Profile photo with hover effects
- Quick info display
- Interest tags
- View Profile button

---

### `<ServiceCard />`

Displays a wedding service preview.

**File**: `src/components/ServiceCard.tsx`

**Props**:
```typescript
interface ServiceCardProps {
  service: WeddingService;
}

interface WeddingService {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  priceRange: string;
  location: string;
  featured: boolean;
}
```

**Usage**:
```tsx
<ServiceCard service={serviceData} />
```

**Features**:
- Featured badge
- Service image
- Rating with star icons
- Price range display
- Location indicator
- View Details button

---

## Context Providers

### `ThemeProvider`

Provides dark/light mode toggle functionality.

**File**: `src/context/ThemeContext.tsx`

**Context Value**:
```typescript
interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}
```

**Usage**:
```tsx
// In App.tsx
<ThemeProvider>
  <App />
</ThemeProvider>

// In any component
const { isDark, toggleTheme } = useTheme();
```

**Features**:
- Persists theme preference to localStorage
- Applies `data-theme="dark"` attribute to document

---

### `LanguageProvider`

Provides multi-language support (English/Marathi).

**File**: `src/context/LanguageContext.tsx`

**Context Value**:
```typescript
interface LanguageContextType {
  language: 'en' | 'mr';
  setLanguage: (lang: 'en' | 'mr') => void;
  t: (key: string) => string;
}
```

**Usage**:
```tsx
// Get current language and translate
const { language, setLanguage, t } = useLanguage();

// Use translation
<h1>{t('hero.title')}</h1>

// Switch language
<button onClick={() => setLanguage('mr')}>मराठी</button>
```

**Adding Translations**:
Add entries to the `translations` object:
```typescript
export const translations = {
  'new.key': { en: 'English', mr: 'मराठी' },
};
```

---

## Page Components

### `HomePage`

Landing page with hero, trust indicators, featured content, and CTAs.

**Sections**:
- Hero with search
- Trust Badges
- How It Works
- Featured Profiles
- Wedding Services
- Success Stories
- CTA Banner

---

### `AboutPage`

Company information page.

**Sections**:
- About Hero
- Mission/Vision
- Stats/Milestones
- Core Values
- Team Members
- CTA

---

### `MatrimonyPage`

Profile search and listing page with filters.

**Features**:
- Advanced filter sidebar
- Search by name
- Filter by: age range, religion, community, location, education, occupation
- Grid/List view toggle
- Sort options
- Pagination

---

### `ServicesPage`

Wedding services listing with category filters.

**Features**:
- Category filter tabs
- Search functionality
- Service cards grid
- Category icons

---

### `PricingPage`

Pricing plans comparison page.

**Features**:
- 3 pricing tiers (Free, Premium, Business)
- Feature comparison
- Popular plan highlight
- CTA buttons

---

### `SuccessStoriesPage`

Customer testimonials and success stories.

**Features**:
- Story cards with photos
- Quote highlights
- Wedding date display
- CTA section

---

### `ContactPage`

Contact form and company contact information.

**Features**:
- Contact form with validation
- Office address
- Phone/Email/Hours
- Social links
- Map placeholder

---

### `BlogPage`

Blog articles listing with sidebar.

**Features**:
- Article cards with images
- Author and date
- Category badges
- Sidebar with categories
- Recent posts widget

---

### `LoginPage`

User login form.

**Features**:
- Email/password validation
- Remember me checkbox
- Social login buttons (Google, Facebook)
- Forgot password link
- Register link

---

### `RegisterPage`

Multi-step user registration.

**Features**:
- 2-step registration process
- Step 1: Basic Info (name, email, phone)
- Step 2: Account Setup (gender, DOB, password, terms)
- Progress indicator
- Password visibility toggle
- Form validation

---

## Utility Classes

Available in `src/styles/index.css`:

### Containers
- `.container` - Max-width centered container

### Buttons
- `.btn` - Base button
- `.btn-primary` - Primary red button
- `.btn-secondary` - Outline button
- `.btn-gold` - Gold accent button
- `.btn-icon` - Icon-only button

### Text
- `.text-center` - Center text
- `.text-primary` - Primary color text
- `.text-gold` - Gold color text

### Spacing
- `.section` - Standard section padding
- `.section-title` - Section heading style
- `.section-subtitle` - Section subheading

### Grid
- `.grid` - CSS Grid container
- `.grid-2`, `.grid-3`, `.grid-4` - Column variants

---

## Animation Classes

- `.fade-in` - Fade in animation
- `.slide-up` - Slide up animation
- `.pulse` - Pulse effect

---

## Best Practices

1. **Always use TypeScript interfaces** for component props
2. **Use the translation function `t()`** for all user-facing text
3. **Respect dark mode** by using CSS variables
4. **Test responsive behavior** on all breakpoints
5. **Add aria-labels** for accessibility
6. **Keep components focused** and single-responsibility

---

## Adding New Components

1. Create component file in `src/components/`
2. Create corresponding CSS file
3. Export from component file
4. Add TypeScript interface for props
5. Document in this file

Example:
```tsx
// src/components/MyComponent.tsx
import './MyComponent.css';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className="my-component" onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};
```
