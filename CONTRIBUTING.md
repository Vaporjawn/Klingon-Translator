# Contributing to Klingon Universal Translator 🖖

Thank you for your interest in contributing to the Klingon Universal Translator! This project is a passion project for Star Trek fans who want to learn and use Klingon in an authentic, immersive way. Every contribution helps make this translator more accurate and useful for the Star Trek community.

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **Git** for version control
- **TypeScript** familiarity (we use strict mode)
- **React** experience helpful but not required
- **Star Trek knowledge** appreciated! 🚀

### Quick Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/klingon-translator.git
   cd klingon-translator
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Open your browser**: Navigate to http://localhost:5173
6. **Make your changes** and see them live!

### Project Structure Overview

```
src/
├── components/          # React components
├── data/               # Klingon dictionary and language data
├── hooks/              # Custom React hooks
├── i18n/               # Internationalization files
├── services/           # Translation and speech services
├── theme/              # Star Trek themed Material-UI styling
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎯 Ways to Contribute

### 🌍 Dictionary Expansion (HIGH PRIORITY)

The heart of our translator is the Klingon dictionary. We need more entries!

**What we need:**

- Basic vocabulary (colors, numbers, common objects)
- Klingon phrases and expressions
- Technical/scientific terms
- Cultural and ceremonial language
- Curse words and exclamations (this is Klingon after all! 😄)

**How to add entries to [`src/data/klingonDictionary.ts`](src/data/klingonDictionary.ts):**

```typescript
// Follow this format for new entries
{
  klingon: "nuqneH",
  english: "hello",
  partOfSpeech: "exclamation",
  usage: "casual greeting",
  pronunciation: "nook-NEKH",
  examples: [
    {
      klingon: "nuqneH teywI'",
      english: "Hello visitor"
    }
  ]
}
```

**Dictionary Guidelines:**

- Use canonical Klingon from official sources (TKD, KGT, etc.)
- Include pronunciation using English phonetics
- Add usage context when relevant
- Provide example sentences when possible
- Reference source material in comments

### 🎨 Theme Development

Create new Star Trek series themes for different shows and eras!

**Current themes:** TOS, TNG, DS9, VOY, ENT
**Needed themes:** Discovery, Lower Decks, Strange New Worlds, Prodigy, Picard

**Theme structure in [`src/theme/palettes/`](src/theme/palettes/):**

```typescript
export const lowerDecksTheme = {
  primary: {
    main: "#FF6B35", // Lower Decks orange
    light: "#FF9A70",
    dark: "#CC5529",
  },
  secondary: {
    main: "#4ECDC4", // Teal accent
    light: "#7ED4CE",
    dark: "#3BA39C",
  },
  // ... accessibility compliant colors
};
```

**Theme requirements:**

- Must pass WCAG 2.1 AA contrast ratios
- Include dark and light variants
- Maintain Star Trek authenticity
- Test with color blindness simulators

### 🔧 Feature Development

**High Priority Features:**

- **Mobile accessibility improvements** - better touch interfaces
- **Safari speech synthesis fixes** - Web Speech API compatibility
- **Translation confidence scoring** - show certainty levels
- **Offline mode support** - service worker implementation
- **Translation history** - localStorage persistence
- **Keyboard shortcuts** - power user efficiency

**Medium Priority Features:**

- **Audio enhancements** - authentic Klingon pronunciation
- **Extended search** - fuzzy matching in dictionary
- **Favorites system** - bookmarked translations
- **Export functionality** - save translations as text/audio

**Low Priority Features:**

- **Additional languages** - Federation Standard, Vulcan, etc.
- **Advanced animations** - more immersive transitions
- **Plugin system** - extensible architecture

### 🐛 Bug Fixes

Before fixing a bug:

1. **Check existing issues** to avoid duplication
2. **Reproduce the issue** in multiple browsers if possible
3. **Include detailed reproduction steps** in your PR
4. **Add tests** to prevent regression when possible

**Common areas needing attention:**

- Mobile responsiveness edge cases
- Speech synthesis cross-browser compatibility
- Translation edge cases with punctuation
- Theme switching persistence
- Performance optimization

### 🧪 Testing

We use **Vitest** for testing. Help us improve coverage!

**Types of tests needed:**

- **Translation service tests** - accuracy and edge cases
- **Component tests** - UI interaction and accessibility
- **Integration tests** - full translation workflow
- **Performance tests** - large dictionary handling

## 📝 Coding Standards

### TypeScript Best Practices

```typescript
// ✅ Good: Descriptive names and strict typing
const translateKlingonToEnglish = (text: string): TranslationResult => {
  // Implementation with proper error handling
  if (!text.trim()) {
    throw new TranslationError("Empty input text");
  }
  // ...
};

// ✅ Good: Const assertions for readonly data
const KLINGON_HONORIFICS = ["torgh", "be'etor", "gowron"] as const;

// ✅ Good: Proper interface definitions
interface KlingonDictionaryEntry {
  readonly klingon: string;
  readonly english: string;
  readonly partOfSpeech: PartOfSpeech;
  readonly pronunciation?: string;
  readonly usage?: string;
  readonly examples?: readonly TranslationExample[];
}
```

### React Component Standards

```tsx
// ✅ Standard component template
interface TranslatorProps {
  /** The initial text to translate */
  initialText?: string;
  /** Whether to auto-play audio on translation */
  autoPlay?: boolean;
  /** Callback when translation completes */
  onTranslationComplete?: (result: TranslationResult) => void;
}

const KlingonTranslator: React.FC<TranslatorProps> = ({
  initialText = "",
  autoPlay = false,
  onTranslationComplete,
}) => {
  // Use custom hooks for complex logic
  const { translate, isLoading, error } = useTranslation();

  // Implement proper error boundaries
  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <Box
      sx={
        {
          /* theme-based styling */
        }
      }
    >
      {/* Component JSX */}
    </Box>
  );
};

export default KlingonTranslator;
```

### Material-UI Theming

```tsx
// ✅ Use theme consistently
const useStyles = () => {
  const theme = useTheme();

  return {
    translatorPanel: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      padding: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
      // Use theme breakpoints for responsiveness
      [theme.breakpoints.down("md")]: {
        padding: theme.spacing(2),
      },
    },
  };
};
```

### File Organization

- **Components**: One component per file, named exports
- **Hooks**: Start with `use`, include comprehensive JSDoc
- **Services**: Pure functions when possible, clear error handling
- **Types**: Comprehensive interfaces, avoid `any`
- **Tests**: Co-located with source files (`.test.ts` suffix)

## 🧪 Testing Guidelines

### Running Tests

```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage report
npm run test:ui           # Interactive UI for debugging tests
```

### Writing Tests

```typescript
// Example component test
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TranslateButton from './TranslateButton';

describe('TranslateButton', () => {
  it('calls onTranslate when clicked with valid text', async () => {
    const mockOnTranslate = vi.fn();

    render(
      <TranslateButton
        text="nuqneH"
        onTranslate={mockOnTranslate}
        disabled={false}
      />
    );

    const button = screen.getByRole('button', { name: /translate/i });
    fireEvent.click(button);

    expect(mockOnTranslate).toHaveBeenCalledWith('nuqneH');
  });

  it('is disabled when text is empty', () => {
    render(<TranslateButton text="" onTranslate={vi.fn()} />);

    const button = screen.getByRole('button', { name: /translate/i });
    expect(button).toBeDisabled();
  });
});
```

### Accessibility Testing

```typescript
// Test keyboard navigation
it('supports keyboard navigation', () => {
  render(<LanguageSelector />);

  const select = screen.getByRole('combobox');
  fireEvent.keyDown(select, { key: 'ArrowDown' });

  expect(screen.getByRole('option', { name: /klingon/i })).toBeVisible();
});

// Test screen reader compatibility
it('has proper ARIA labels', () => {
  render(<TranslationPanel />);

  expect(screen.getByLabelText('Source text')).toBeInTheDocument();
  expect(screen.getByLabelText('Translation result')).toBeInTheDocument();
});
```

## 📦 Pull Request Process

### 1. Prepare Your Changes

```bash
# Create feature branch
git checkout -b feature/add-klingon-emotions

# Make your changes
# ...

# Run quality checks
npm run lint:fix            # Fix linting issues
npm run type-check          # Verify TypeScript
npm run test               # Run test suite
npm run format             # Format code
```

### 2. Commit Messages

Use **conventional commits** for clear history:

```
feat(dictionary): add emotional expressions and feelings
fix(speech): resolve Safari speech synthesis timing issue
docs(readme): update installation instructions for Node 18
test(translation): add edge case tests for punctuation
style(theme): improve contrast ratios for accessibility
refactor(hooks): simplify useTranslation hook logic
perf(dictionary): optimize search algorithm for large datasets
```

### 3. PR Description Template

```markdown
## 📝 Description

Brief description of changes and motivation.

## 🔄 Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## 🧪 Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility testing completed

## 📸 Screenshots

Include before/after screenshots for UI changes.

## 🔍 Review Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated if needed
- [ ] No breaking changes or clearly documented
```

### 4. Review Process

1. **Automated checks** must pass (linting, tests, type checking)
2. **Maintainer review** for code quality and project alignment
3. **Community feedback** on significant features
4. **Final approval** and merge by maintainers

## 🎯 Priority Areas for Contributors

### 🔥 High Priority (Help Needed!)

- [ ] **Expand dictionary to 200+ entries** (currently ~50)
- [ ] **Fix Safari speech synthesis** (Web Speech API compatibility)
- [ ] **Mobile accessibility improvements** (touch, zoom, keyboard)
- [ ] **Translation confidence algorithm** (show certainty scores)
- [ ] **Performance optimization** (faster search, better caching)

### ⚡ Medium Priority

- [ ] **New Star Trek themes** (Lower Decks, Strange New Worlds, Prodigy)
- [ ] **Offline mode support** (service worker, cached translations)
- [ ] **Translation history persistence** (localStorage integration)
- [ ] **Keyboard shortcuts** (Ctrl+Enter to translate, etc.)
- [ ] **Enhanced audio features** (pronunciation guides, effects)

### 🌟 Low Priority (Future Enhancements)

- [ ] **Additional languages** (Vulcan, Romulan, Cardassian)
- [ ] **Advanced animations** (particle effects, warp transitions)
- [ ] **Translation favorites** (bookmark common phrases)
- [ ] **Export functionality** (PDF, audio files)
- [ ] **Plugin architecture** (extensible dictionary system)

## 🐛 Issue Templates and Bug Reports

When reporting bugs, please include:

- **Browser and version** (Chrome 91, Safari 14, Firefox 89)
- **Operating system** (macOS 12, Windows 11, iOS 15)
- **Device type** (Desktop, mobile, tablet)
- **Steps to reproduce** (detailed, numbered list)
- **Expected behavior** vs **actual behavior**
- **Screenshots or video** (especially for UI issues)
- **Console errors** (open DevTools → Console)
- **Translation text** (what were you trying to translate?)

### Example Bug Report

```
**Bug**: Speech synthesis doesn't work on Safari mobile

**Environment**:
- Safari 15.6 on iOS 16.1
- iPhone 13 Pro

**Steps to Reproduce**:
1. Open translator on Safari mobile
2. Enter "nuqneH" in Klingon field
3. Click play audio button
4. No sound plays, no error message

**Expected**: Should play Klingon pronunciation
**Actual**: Silent, button shows loading briefly then returns to normal

**Console Errors**:
"NotSupportedError: The operation is not supported."
```

## 💡 Feature Request Guidelines

For new features, please include:

- **Use case description** - Who needs this and why?
- **User story** - "As a [user type], I want [goal] so that [benefit]"
- **Acceptance criteria** - How do we know when it's complete?
- **Design considerations** - Any UI/UX thoughts?
- **Technical complexity** - Simple/medium/complex estimate
- **Star Trek authenticity** - How does this fit the theme?

### Example Feature Request

```
**Feature**: Translation confidence scoring

**User Story**: As a Klingon learner, I want to see how confident the translator is about each translation so that I know which results to trust more.

**Use Case**: When translating complex phrases or rare words, users need to know if the translation is reliable or just a best guess.

**Acceptance Criteria**:
- [ ] Show confidence percentage (0-100%) next to each translation
- [ ] Use color coding (green=high, yellow=medium, red=low confidence)
- [ ] Include tooltip explaining what affects confidence
- [ ] Store confidence data in translation history

**Design**: Small confidence indicator next to translation result, similar to Google Translate's confidence indicators.
```

## 📞 Community and Support

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions, ideas, and community chat
- **Pull Requests** - Code contributions and reviews

### Getting Help

- **Check existing issues** first
- **Search documentation** in README and code comments
- **Ask questions** in GitHub Discussions
- **Join the conversation** in PR reviews

### Code of Conduct

We follow the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md).
Please be respectful, inclusive, and constructive in all interactions.

## 🏆 Recognition

Contributors are recognized in several ways:

- **All Contributors** section in README
- **Release notes** credit for significant contributions
- **GitHub achievements** and contribution graphs
- **Community shoutouts** for exceptional contributions

### Hall of Fame

_Coming soon - first contributors will be featured here!_

## 🗺️ Roadmap

### Version 1.1 (Q4 2025)

- [ ] Dictionary expansion to 150+ entries
- [ ] Safari speech synthesis support
- [ ] Mobile accessibility improvements
- [ ] Translation confidence scoring
- [ ] Performance optimizations

### Version 1.2 (Q1 2026)

- [ ] Offline mode support
- [ ] New Star Trek themes (3+ series)
- [ ] Translation history and favorites
- [ ] Keyboard shortcuts
- [ ] Enhanced audio features

### Version 2.0 (Q2 2026)

- [ ] Community dictionary contributions
- [ ] Plugin architecture for extensibility
- [ ] Multiple Klingon dialects support
- [ ] Advanced search and filtering
- [ ] Progressive Web App features

## 📚 Resources for Contributors

### Klingon Language Resources

- **The Klingon Dictionary (TKD)** - Marc Okrand (canonical source)
- **Klingon for the Galactic Traveler (KGT)** - Cultural context
- **Klingon Language Institute** - Community and updates
- **Memory Alpha** - Star Trek canon reference

### Development Resources

- **React Documentation** - https://react.dev/
- **Material-UI** - https://mui.com/
- **TypeScript Handbook** - https://www.typescriptlang.org/docs/
- **Web Speech API** - https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **Vitest Testing** - https://vitest.dev/

### Star Trek References

- **Memory Alpha** - Canon database
- **Memory Beta** - Expanded universe
- **Star Trek Database** - Episode and character references

---

## Thank You! 🖖

Your contributions help keep the Star Trek spirit alive and make Klingon more accessible to fans worldwide. Whether you're adding a single word to the dictionary or building major features, every contribution matters.

**Qapla'!** (Success!)

_Live long and prosper._ 🖖

---

**Questions?** Open an issue or start a discussion. We're here to help!
