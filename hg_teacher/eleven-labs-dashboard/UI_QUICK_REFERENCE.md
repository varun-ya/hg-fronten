# UI Analysis - Quick Reference Guide

## 🎨 Global Color Palette

### Primary Colors
```css
--primary-black: #111
--primary-orange: #F97316
--pure-white: #FFFFFF
--background-gray: #FAFAFA
```

### Border Colors
```css
--border-light: #EBEBEB
--border-subtle: #F5F5F5
--border-medium: #E5E7EB
--border-dark: #DDD
```

### Text Colors
```css
--text-primary: #111
--text-secondary: #888
--text-tertiary: #AAA
--text-muted: #BBB
--text-disabled: #CCC
```

### Status Colors
```css
--success-green: #10B981
--error-red: #EF4444
--warning-orange: #FFF7ED
--info-blue: rgba(59, 130, 246, 0.3)
```

---

## 📏 Typography Scale

```css
--text-hero: 36px
--text-title: 17-20px
--text-heading: 15-18px
--text-body: 13-16px
--text-small: 11-12px
--text-tiny: 9-10px
```

### Font Weights
- **Bold**: 700 (headers, emphasis)
- **Semibold**: 600 (subheaders)
- **Medium**: 500 (labels, buttons)
- **Regular**: 400 (body text)
- **Light**: 300 (large numbers)

---

## 📐 Spacing System

```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
```

---

## 🔲 Border Radius Scale

```css
--radius-sm: 8px
--radius-md: 10-14px
--radius-lg: 16-20px
--radius-full: 9999px
```

---

## 🎯 Component Specifications

### Cards
- **Background**: #FFFFFF
- **Border**: 1px solid #EBEBEB
- **Border Radius**: 14px
- **Padding**: 16-20px
- **Hover**: Background #FAFAFA

### Buttons
- **Primary**: Black bg (#111), white text
- **Secondary**: White bg, border, black text
- **Accent**: Orange bg (#F97316), white text
- **Border Radius**: 8-10px
- **Padding**: 8-12px horizontal, 6-10px vertical

### Input Fields
- **Border**: 1px solid #EBEBEB
- **Border Radius**: 10px
- **Padding**: 10-12px
- **Focus**: Border #DDD
- **Placeholder**: #CCC

### Avatars
- **Small**: 22-32px
- **Medium**: 44-48px
- **Large**: 88px
- **Border**: 2px solid #EBEBEB
- **Border Radius**: Full circle

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 1023px) {
  /* Single column, hide sidebars */
}

/* Tablet */
@media (min-width: 1024px) {
  /* Two columns, show right sidebar */
}

/* Desktop */
@media (min-width: 1280px) {
  /* Three columns, show all sidebars */
}
```

---

## 🎭 Animation Timings

```css
--transition-fast: 150ms
--transition-normal: 200-300ms
--transition-slow: 500ms

--easing-default: ease
--easing-smooth: cubic-bezier(0.16, 1, 0.3, 1)
```

---

## 📊 Page-Specific Elements

### Profile Page
- **Cover Height**: 200px
- **Avatar Overlap**: -44px margin-top
- **Tab Underline**: 3px height, 40px width
- **Sidebar Width**: 300px (right), 320px (calendar)

### Schedule Page
- **Timeline Line**: 76px from left, 2px width
- **Hour Row Height**: Dynamic based on classes
- **Class Card**: Min 80px height
- **Sidebar Width**: 280px
- **Live Indicator**: 14px dot with 4px ring

### Feed Page
- **Story Avatar**: 56px diameter
- **Story Ring**: 2.5px gradient border
- **Blog Card**: 14px radius, 16px padding
- **Modal Width**: 680px (editor), full-screen (detail)
- **Sidebar Width**: 280px

### Students Page
- **Stats Strip**: 4 columns, equal width
- **Student Card**: 44px avatar, 20px padding
- **Unread Badge**: 18px circle on avatar
- **Search Height**: 40px
- **Sidebar Width**: 280px

---

## 🎨 Special Color Schemes

### Tag Colors (Feed)
```css
Mathematics: bg #F5F5F8, accent #6366F1
Physics: bg #F7F5F3, accent #F97316
Study Tips: bg #F4F6F4, accent #22C55E
Personal: bg #F6F4F6, accent #EC4899
JEE Prep: bg #F6F4F4, accent #EF4444
Teaching: bg #F3F6F5, accent #10B981
EdTech: bg #F4F5F8, accent #3B82F6
```

### Status Colors (Schedule)
```css
Live: rgba(59, 130, 246, 0.3) border
Completed: #10B981
Missed: #EF4444
Upcoming: Default
```

---

## 🔧 Common Patterns

### Sticky Headers
```css
position: sticky
top: 0
z-index: 40
background: #FAFAFA
border-bottom: 1px solid #EBEBEB
```

### Hover States
```css
background: #FAFAFA
transition: all 200ms ease
cursor: pointer
```

### Section Headers
```css
font-size: 11px
font-weight: 600
text-transform: uppercase
letter-spacing: 0.1em
color: #AAA
```

### Dividers
```css
border-bottom: 1px solid #F5F5F5
```

---

## 📦 Icon Specifications

### Library
- **Phosphor Icons** (React)

### Sizes
- **Small**: 12-14px
- **Medium**: 15-18px
- **Large**: 20-24px

### Weights
- **Regular**: Default
- **Bold**: Emphasis
- **Fill**: Active states

---

## ✅ Accessibility Checklist

- [ ] Semantic HTML elements
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation support
- [ ] Focus visible states
- [ ] Color contrast ratio ≥ 4.5:1
- [ ] Touch targets ≥ 44px
- [ ] Alt text on images
- [ ] Screen reader friendly

---

## 🚀 Performance Best Practices

1. **Lazy load images** with loading="lazy"
2. **Use skeleton screens** during loading
3. **Debounce search inputs** (300ms)
4. **Memoize expensive computations**
5. **Implement infinite scroll** with intersection observer
6. **Optimize animations** with transform and opacity
7. **Use CSS containment** for isolated components

---

## 📝 Design Principles

1. **Consistency**: Same patterns across all pages
2. **Clarity**: Clear visual hierarchy
3. **Simplicity**: Minimal, clean design
4. **Feedback**: Immediate response to interactions
5. **Accessibility**: Inclusive design for all users
6. **Performance**: Fast, smooth experience

---

**Last Updated**: January 2025
**Version**: 1.0

