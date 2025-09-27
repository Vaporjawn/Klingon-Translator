# 🖖 Klingon Universal Translator

A fully functional **Star Trek-themed Klingon ⇄ English translator** built with modern web technologies. This application provides a Google Translate-inspired interface with authentic Star Trek visual design and comprehensive translation capabilities.

[![CI/CD Pipeline](https://github.com/vaporjawn/klingon-translator/actions/workflows/ci.yml/badge.svg)](https://github.com/vaporjawn/klingon-translator/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](CONTRIBUTING.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

![Star Trek Theme](https://img.shields.io/badge/Theme-Star%20Trek-red?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFE62E)
![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)

> **⭐ Star this repository if you find it useful!** Help us reach more Star Trek fans and developers.

## 📈 Project Status

- ✅ **Active Development** - Regularly maintained and updated
- 🚀 **Production Ready** - Stable release with comprehensive testing
- 🎯 **Open Source** - MIT License, contributions welcome
- 🌍 **Live Demo** - [klingon-translator.pages.dev](https://klingon-translator.pages.dev) (Coming Soon)
- 📊 **GitHub Pages** - Automated deployment via GitHub Actions

## ✨ Features

### 🌟 Core Translation Features

- **Bidirectional Translation**: English ⇄ Klingon with intelligent fuzzy matching
- **Real-time Translation**: Auto-translate with 500ms delay for smooth UX
- **Phonetic Pronunciations**: Authentic Klingon pronunciations for all translations
- **Confidence Scoring**: Translation confidence indicators based on similarity algorithms
- **Translation History**: Maintains last 20 translations for reference

### 🎨 Star Trek-Themed UI

- **5 Authentic Star Trek Themes**: TOS, TNG, DS9, Voyager, and Discovery color schemes
- **Google Translate-Inspired Layout**: Familiar, intuitive interface design
- **Smooth Animations**: Framer Motion animations with Star Trek-inspired effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Gradient Effects**: Subtle Star Trek-inspired background gradients and glowing elements

### 🔊 Audio Features

- **Text-to-Speech**: Native browser speech synthesis for both languages
- **Star Trek Sound Effects**: Authentic beeps and chimes during translation
- **Voice Customization**: Deeper, slower voice settings for Klingon pronunciation
- **Audio Controls**: Play, pause, and control audio output

### 🎯 Technical Excellence

- **Enterprise-Grade Architecture**: Modular, maintainable TypeScript codebase
- **Type Safety**: 100% TypeScript with strict mode enabled
- **Modern React Patterns**: Hooks, custom hooks, and functional components
- **Performance Optimized**: Lazy loading, memoization, and efficient re-renders
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern browser with Speech Synthesis API support

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/klingon-translator.git
   cd klingon-translator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 🛠️ Technology Stack

### Core Technologies

- **⚛️ React 19.1.1** - Modern React with latest features
- **📘 TypeScript** - Type-safe development with strict mode
- **⚡ Vite 7.1.12** - Lightning-fast build tool with experimental rolldown
- **🎨 Material-UI v6** - Complete Material Design component library
- **🎬 Framer Motion** - Smooth, performant animations

### Architecture Highlights

- **🏗️ Enterprise Project Structure** - Organized by feature modules
- **🎯 Custom Hooks** - Reusable translation and speech logic
- **🎨 Theme System** - 5 Star Trek variant themes with complete customization
- **📊 Translation Engine** - Advanced fuzzy matching with Levenshtein distance
- **🔊 Audio Services** - Web Speech API integration with Star Trek effects

## 📖 Usage Guide

### Basic Translation

1. **Select Languages**: Choose source and target languages from dropdowns
2. **Enter Text**: Type or paste text in the input area
3. **Auto-Translate**: Translation appears automatically after 500ms
4. **Manual Translate**: Use the floating action button for immediate translation

### Language Swapping

- Click the **swap icon** (🔄) between language selectors
- Instantly reverses translation direction and swaps text

### Audio Features

- **🔊 Listen**: Click volume icons to hear pronunciations
- **🎵 Sound Effects**: Enjoy Star Trek-inspired translation sounds
- **⏸️ Control**: Audio stops automatically or can be manually controlled

### Advanced Features

- **📱 Mobile Responsive**: Works seamlessly on all device sizes
- **⌨️ Keyboard Shortcuts**: Efficient keyboard navigation
- **🎨 Theme Variants**: Experience different Star Trek eras (TNG default)
- **📝 Translation History**: Access your recent translations

## 📚 Klingon Dictionary

Our translator includes **50+ authentic Klingon words and phrases**:

### Essential Phrases

- **Qapla'** - Success! / Goodbye
- **nuqneH** - What do you want? (greeting)
- **yIjah** - Beam me up
- **Heghlu'meH QaQ jajvam** - Today is a good day to die

### Common Words

- **jup** - friend
- **jagh** - enemy
- **nugh** - society
- **wo'** - empire
- **DIch** - true/certain

### Battle Terms

- **yoDlu'** - battle stations
- **HIv** - attack
- **Hub** - defend
- **SeHwI'** - controller

_And many more! The dictionary includes phonetic pronunciations, parts of speech, and example usage for each entry._

## 🎨 Star Trek Theme Variants

### 🌟 Available Themes

1. **TOS (The Original Series)** - Classic 1960s gold and red
2. **TNG (The Next Generation)** - Modern blue and gold (default)
3. **DS9 (Deep Space Nine)** - Deep space purples and teals
4. **VOY (Voyager)** - Exploration blues and silvers
5. **DISCO (Discovery)** - Contemporary copper and blue

### Theme Features

- **Authentic Color Palettes** - Based on actual Star Trek UI designs
- **Component Overrides** - Custom Material-UI styling for each theme
- **Gradient Backgrounds** - Subtle animated backgrounds
- **Glow Effects** - Futuristic lighting effects on interactive elements

## 🏗️ Project Architecture

```
src/
├── components/           # React components
│   └── TranslatorInterface.tsx
├── hooks/               # Custom React hooks
│   └── useTranslation.ts
├── services/            # Business logic services
│   ├── translationService.ts
│   └── speechService.ts
├── theme/               # Star Trek theme system
│   └── starTrekTheme.ts
├── data/                # Static data
│   └── klingonDictionary.ts
├── types/               # TypeScript definitions
│   └── index.ts
└── utils/               # Utility functions
```

### Key Components

- **TranslatorInterface**: Main UI component with Google Translate-like layout
- **useTranslation**: Hook managing translation state and logic
- **useSpeech**: Hook handling audio synthesis and playback
- **TranslationService**: Core translation engine with fuzzy matching
- **SpeechService**: Text-to-speech with Star Trek sound effects
- **StarTrekTheme**: Complete theme system with 5 variant themes

## 🔧 Development

### Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

### Code Quality

- **ESLint + Prettier** - Consistent code formatting
- **TypeScript Strict Mode** - Maximum type safety
- **Performance Monitoring** - Bundle size analysis
- **Modern React Patterns** - Hooks, functional components

## 🗺️ Project Roadmap

### 🚀 Version 1.0 (Current)

- ✅ Core translation functionality
- ✅ Star Trek themed UI with 5 theme variants
- ✅ Text-to-Speech with pronunciation
- ✅ Google Translate-inspired interface
- ✅ Responsive design for all devices
- ✅ Translation confidence scoring
- ✅ Sound effects and animations

### 🎯 Version 1.1 (Next Release)

- 🔄 **Enhanced Dictionary** - Expand to 100+ Klingon terms
- 🔄 **Grammar Analysis** - Basic Klingon grammar checking
- 🔄 **Phrase Builder** - Common phrase construction assistant
- 🔄 **Voice Recognition** - Speech-to-text for both languages
- 🔄 **Offline Mode** - Progressive Web App capabilities
- 🔄 **Keyboard Shortcuts** - Advanced accessibility features

### 🌟 Version 1.2 (Future)

- 📋 **Translation History** - Persistent storage and export
- 🎨 **Custom Themes** - User-created theme variants
- 📱 **Mobile App** - React Native companion app
- 🤖 **AI Translation** - Machine learning improvements
- 🌐 **Multi-Language** - Support for additional alien languages
- 👥 **Community Dictionary** - User-contributed translations

### 🔮 Long Term Vision

- 🎮 **Language Learning Game** - Interactive Klingon lessons
- 🗣️ **Conversation Mode** - Real-time voice translation
- 📚 **Cultural Context** - Star Trek universe integration
- 🎭 **Character Voices** - Voice synthesis with Star Trek characters
- 🌍 **Federation Languages** - Vulcan, Romulan, and more

## 🤝 Contributing

We welcome contributions from Star Trek fans and developers alike! Here's how to get started:

### 🚀 Quick Contribution Guide

1. **⭐ Star this repository** to show your support
2. **🍴 Fork the repository**
3. **🌿 Create a feature branch**: `git checkout -b feature/amazing-feature`
4. **📝 Read our [Contributing Guidelines](CONTRIBUTING.md)** for detailed instructions
5. **✨ Make your changes** following our coding standards
6. **🧪 Add tests** for new functionality
7. **💾 Commit changes**: `git commit -m 'Add amazing feature'`
8. **📤 Push to branch**: `git push origin feature/amazing-feature`
9. **🔃 Open a Pull Request** using our PR template

### 🎯 What We're Looking For

- **🌟 Dictionary Contributions** - Add new Klingon words and phrases
- **🎨 UI/UX Improvements** - Enhance the Star Trek experience
- **🔊 Audio Enhancements** - Better pronunciation and sound effects
- **📱 Accessibility Features** - Make it work for everyone
- **🧪 Testing** - Unit tests, integration tests, E2E tests
- **📖 Documentation** - Code comments, README improvements
- **🐛 Bug Fixes** - Help us maintain quality
- **🔧 Performance Optimizations** - Keep it fast and smooth

### 👥 Recognition

All contributors are recognized in our [Contributors Hall of Fame](CONTRIBUTORS.md) and in release notes!

### 🛡️ Code of Conduct

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). We're committed to making this a welcoming space for all Star Trek fans and developers.

### 📋 Contribution Guidelines

- **📘 TypeScript Required** - Follow strict mode requirements
- **🎨 Code Style** - Maintain existing patterns and use Prettier
- **🧪 Testing** - Add appropriate tests for new features
- **📝 Documentation** - Update docs for significant changes
- **✅ Quality Gates** - Ensure all builds pass before submitting
- **🔍 Security** - Follow our security policy for vulnerabilities

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## �‍💻 Author

**Created by [vaporjawn](https://github.com/vaporjawn)**

This project was built with passion for Star Trek and modern web development technologies. Feel free to reach out for questions, suggestions, or collaboration opportunities!

## �🖖 Acknowledgments

- **Star Trek Universe** - For inspiring this project and the Klingon language
- **Klingon Language Institute** - For maintaining authentic Klingon linguistics
- **Material-UI Team** - For the excellent component library
- **React Community** - For the amazing ecosystem and tools
- **Vite Team** - For the incredibly fast development experience

---

**Live Long and Prosper** 🖖

_May this translator serve you well on your journey through the final frontier._

**Copyright © 2025 vaporjawn. All rights reserved.**
