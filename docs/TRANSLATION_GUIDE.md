# Translation Guide for SeftecHub

This guide explains how to implement and maintain translations in the SeftecHub platform.

## 🌍 Overview

SeftecHub supports 8 languages:
- English (EN) - Primary
- Arabic (AR) - RTL support
- Spanish (ES)
- French (FR)
- German (DE)
- Portuguese (PT)
- Japanese (JA)
- Chinese (ZH)

## 🚀 Quick Start

### 1. Using Translations in Components

```tsx
import { useTranslation } from '@/hooks/useTranslation';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('page.title', 'Default Title')}</h1>
      <p>{t('page.description', 'Default description text')}</p>
    </div>
  );
};
```

### 2. Translation Key Structure

Use dot notation for nested keys:
```
section.subsection.key
```

Examples:
- `nav.home` → "Home"
- `problems.lack_of_trust.title` → "Lack of Trust"
- `auth.sign_in` → "Sign In"

### 3. Adding New Translation Keys

1. **Add to English file first** (`locales/en.json`):
```json
{
  "new_section": {
    "title": "New Section Title",
    "description": "Description text here"
  }
}
```

2. **Add to all other language files** with appropriate translations.

3. **Use in component**:
```tsx
const title = t('new_section.title', 'New Section Title');
```

## 📁 File Structure

```
locales/
├── en.json     # English (primary)
├── ar.json     # Arabic
├── es.json     # Spanish
├── fr.json     # French
├── de.json     # German
├── pt.json     # Portuguese
├── ja.json     # Japanese
└── zh.json     # Chinese
```

## 🔧 Translation System Components

### Core Files
- `src/lib/translations.ts` - Translation loader and utilities
- `src/components/ui/language-toggle.tsx` - Language switcher and i18n context
- `src/hooks/useTranslation.ts` - Convenience hook for translations

### Helper Utilities
- `src/utils/translation-helper.ts` - Development utilities and common patterns

## 📝 Best Practices

### 1. Always Provide Fallbacks
```tsx
// ✅ Good - with fallback
const text = t('key.path', 'Default English text');

// ❌ Bad - no fallback
const text = t('key.path');
```

### 2. Use Descriptive Keys
```tsx
// ✅ Good - descriptive
t('dashboard.revenue.title', 'Total Revenue')

// ❌ Bad - generic
t('title1', 'Total Revenue')
```

### 3. Group Related Keys
```json
{
  "dashboard": {
    "revenue": {
      "title": "Total Revenue",
      "subtitle": "Last 30 days",
      "growth": "Growth Rate"
    }
  }
}
```

### 4. Handle Pluralization
For complex pluralization, use separate keys:
```json
{
  "items": {
    "zero": "No items",
    "one": "1 item",
    "other": "{{count}} items"
  }
}
```

### 5. RTL Support for Arabic
The system automatically handles RTL layout for Arabic:
```tsx
// Automatically applied when Arabic is selected
document.documentElement.dir = 'rtl';
```

## 🛠️ Development Tools

### Finding Hardcoded Text
Run the script to find components with hardcoded text:
```bash
node scripts/find-hardcoded-text.js
```

### Translation Helper Hook
Use the enhanced hook for complex scenarios:
```tsx
import { useT } from '@/utils/translation-helper';

const { t, tObj, tArray } = useT();

// Translate object properties
const buttons = tObj('common.buttons', {
  save: 'Save',
  cancel: 'Cancel',
  delete: 'Delete'
});

// Translate arrays
const menuItems = tArray('nav.items', ['Home', 'About', 'Contact']);
```

## 🔄 Language Switching

The language toggle component handles:
- Language persistence in localStorage
- Document language and direction updates
- Component re-rendering
- Event broadcasting for updates

```tsx
import { LanguageToggle } from '@/components/ui/language-toggle';

// Use in navigation
<LanguageToggle variant="compact" />
```

## 📊 Translation Status

### ✅ Fully Translated Components
- HeroSlider
- ProblemsSection
- SolutionsSection
- TestimonialsSection
- PerformanceMetrics
- NotificationSorter
- Desktop Navigation

### 🔄 Partially Translated
- ValuePropositionsSection
- RegionsCoveredSection
- Footer components

### ❌ Need Translation
- Most form components
- Error messages
- Toast notifications
- Modal dialogs
- Admin interfaces

## 🚨 Common Issues

### 1. Component Not Re-rendering on Language Change
Ensure you're listening for language change events:
```tsx
React.useEffect(() => {
  const handleLanguageChange = () => {
    setForceUpdate(prev => prev + 1);
  };

  window.addEventListener('language-changed', handleLanguageChange);
  return () => window.removeEventListener('language-changed', handleLanguageChange);
}, []);
```

### 2. Missing Translation Keys
Check browser console for warnings about missing keys in development mode.

### 3. Translation Not Loading
Verify the key exists in the JSON file and the fallback is provided.

## 📋 Translation Checklist

When adding new components:

- [ ] Import `useTranslation` hook
- [ ] Replace hardcoded strings with `t()` calls
- [ ] Add translation keys to all language files
- [ ] Test language switching
- [ ] Verify RTL layout for Arabic
- [ ] Check for text overflow in different languages
- [ ] Update this documentation if needed

## 🎯 Priority Translation Areas

1. **Navigation & Menus** - High visibility
2. **Hero Sections** - First impression
3. **Form Labels & Buttons** - User interaction
4. **Error Messages** - User experience
5. **Footer & Legal** - Compliance
6. **Admin Interfaces** - Internal tools

## 📞 Support

For translation questions or issues:
1. Check this guide first
2. Look at existing translated components for examples
3. Use the development tools to identify missing translations
4. Follow the established patterns and conventions

---

**Remember**: Always test your translations across different languages and screen sizes to ensure a consistent user experience.