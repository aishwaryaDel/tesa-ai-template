# Tesa AI Hub

> A modern, enterprise-grade web application for showcasing and managing AI use cases across the Tesa organization.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E.svg)](https://supabase.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Building for Production](#building-for-production)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Database Setup](#database-setup)
- [Internationalization](#internationalization)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Support](#support)
- [License](#license)

---

## 🎯 Overview

The **Tesa AI Hub** is an internal web application designed to centralize and showcase AI use cases across all departments within Tesa SE. It provides a comprehensive platform for employees to:

- Discover existing AI implementations across the organization
- Learn from successful AI projects and best practices
- Submit new AI use case ideas
- Track the progress of AI initiatives from ideation to production
- Connect with use case owners and stakeholders
- Access related documentation and resources

### Business Value

- **Visibility**: Central repository for all AI initiatives
- **Knowledge Sharing**: Learn from successful implementations
- **Collaboration**: Connect teams working on similar challenges
- **Governance**: Track AI projects through standardized phases
- **Innovation**: Encourage new AI use case submissions

---

## ✨ Features

### Core Functionality

- **🏠 Landing Page**: Engaging entry point with modern AI-themed design
- **🔍 Search & Filter**: Find use cases by title, description, department, or status
- **📊 Use Case Catalog**: Browse all AI initiatives in a responsive grid layout
- **📝 Detailed View**: Comprehensive information about each use case including:
  - Full descriptions
  - Business impact metrics
  - Technology stack
  - Owner contact information
  - Progress through development phases
  - Links to documentation and demos
  - BITS roles and responsibilities
  - Related use cases
- **➕ Create New Use Cases**: Multi-step wizard for submitting new ideas
- **🌐 Bilingual Support**: Full English and German translations
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Features

- **Type Safety**: Full TypeScript implementation
- **Modern UI**: Tailwind CSS with custom design system
- **Performance**: Vite for lightning-fast development and builds
- **Database Integration**: Supabase for backend services
- **Scalable Architecture**: Component-based design with clear separation of concerns
- **Configuration Management**: Centralized config for all settings

---

## 🖼️ Screenshots

### Landing Page
Modern, AI-themed landing page with animated background elements and clear call-to-action.

### Use Case Overview
Filterable catalog view with search functionality and department/status filters.

### Detail Modal
Comprehensive view of individual use cases with phase tracking and related resources.

---

## 🏗️ Architecture

### Application Architecture

The application follows a modern single-page application (SPA) architecture:

```
┌─────────────────────────────────────────────────┐
│                  Client Layer                    │
│   React Components + TypeScript + Tailwind      │
│   - LandingPage                                  │
│   - UseCaseOverview                              │
│   - Modals & Cards                               │
└────────────────┬────────────────────────────────┘
                 │
                 │ HTTP/REST API
                 │
┌────────────────┴────────────────────────────────┐
│              Supabase Backend                    │
│   - PostgreSQL Database                          │
│   - REST API                                     │
│   - Row Level Security                           │
│   - Real-time Subscriptions                      │
└─────────────────────────────────────────────────┘
```

### Component Architecture

```
App (Root)
│
├─── LandingPage
│    ├─── LanguageSwitcher
│    └─── CTA Button
│
└─── UseCaseOverview
     ├─── Header
     │    ├─── Logo
     │    └─── LanguageSwitcher
     │
     ├─── SearchBar
     ├─── Filters (Department, Status)
     │
     ├─── UseCaseGrid
     │    └─── UseCaseCard (multiple)
     │         ├─── Status Badge
     │         ├─── Department Badge
     │         └─── Description
     │
     ├─── UseCaseDetailModal
     │    ├─── Hero Image
     │    ├─── Progress Tracker
     │    ├─── Business Impact
     │    ├─── Technology Stack
     │    ├─── Internal Links
     │    ├─── BITS Section
     │    └─── Related Use Cases
     │
     ├─── NewUseCaseModal (4-step wizard)
     │    ├─── Step 1: Basic Info
     │    ├─── Step 2: Classification
     │    ├─── Step 3: Contact Info
     │    └─── Step 4: Additional Info
     │
     └─── Footer
          ├─── About
          ├─── Support
          └─── Copyright
```

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI framework for building component-based interfaces |
| **TypeScript** | 5.5.3 | Static typing for improved code quality and developer experience |
| **Vite** | 5.4.2 | Next-generation build tool for fast development and optimized production builds |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS framework for rapid UI development |
| **Lucide React** | 0.344.0 | Beautiful, consistent icon library |

### Backend

| Technology | Purpose |
|------------|---------|
| **Supabase** | Backend-as-a-Service providing database, authentication, and storage |
| **PostgreSQL** | Relational database (via Supabase) |
| **REST API** | Auto-generated from database schema |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code quality and consistency |
| **PostCSS** | CSS processing and optimization |
| **Autoprefixer** | Automatic vendor prefixing for CSS |

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)
- **Git**: For version control
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest version)

### Verify Prerequisites

```bash
node --version  # Should output v18.x.x or higher
npm --version   # Should output 9.x.x or higher
git --version   # Should output git version 2.x.x or higher
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tesa-ai-hub
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages defined in `package.json`.

### 3. Environment Setup

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following environment variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**:
- Never commit the `.env` file to version control
- Get the actual values from your Supabase project dashboard
- The `.env` file is already in `.gitignore`

---

## ⚙️ Configuration

### Global Configuration File

All application configuration is centralized in `src/config/index.ts`. This file contains:

- **Environment Variables**: Supabase URL and keys
- **Database Configuration**: Table names and schema
- **API Endpoints**: REST API endpoint definitions
- **Feature Flags**: Enable/disable features
- **Constants**: Departments, statuses, colors, validation rules
- **UI Settings**: Pagination, animations, breakpoints
- **External Links**: SharePoint, Confluence, BITS URLs

### Customization

To customize the application:

1. **Brand Colors**: Edit `tailwind.config.js`
2. **Feature Flags**: Edit `src/config/index.ts`
3. **Translations**: Edit `src/contexts/LanguageContext.tsx`
4. **Sample Data**: Edit `src/data/sampleData.ts`

---

## 🏃 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at:
- **Local**: `http://localhost:5173`
- **Network**: `http://192.168.x.x:5173` (for testing on other devices)

### Features in Development Mode:

- **Hot Module Replacement (HMR)**: Changes reflect instantly
- **Fast Refresh**: Preserves component state during updates
- **TypeScript Checking**: Real-time type checking
- **Detailed Error Messages**: Stack traces and suggestions

### Other Commands

```bash
# Type checking (without building)
npm run typecheck

# Linting
npm run lint

# Preview production build
npm run preview
```

---

## 🔨 Building for Production

### Create Production Build

```bash
npm run build
```

This command:
1. Runs TypeScript type checking
2. Compiles and optimizes all code
3. Minifies JavaScript and CSS
4. Generates hashed filenames for caching
5. Creates a `dist/` directory with production-ready files

### Build Output

```
dist/
├── index.html              # Entry HTML file
├── assets/
│   ├── index-[hash].js    # Bundled JavaScript
│   └── index-[hash].css   # Bundled styles
└── image.png              # Static assets
```

### Build Statistics

After building, you'll see output like:

```
dist/index.html                   0.47 kB
dist/assets/index-[hash].css     21.59 kB │ gzip:  4.98 kB
dist/assets/index-[hash].js     195.54 kB │ gzip: 58.70 kB
```

---

## 📁 Project Structure

```
tesa-ai-hub/
│
├── public/                        # Static assets
│   └── image.png                 # Tesa logo
│
├── src/                          # Source code
│   ├── components/               # React components
│   │   ├── Footer.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── NewUseCaseModal.tsx
│   │   ├── UseCaseCard.tsx
│   │   ├── UseCaseDetailModal.tsx
│   │   └── UseCaseOverview.tsx
│   │
│   ├── contexts/                 # React contexts
│   │   └── LanguageContext.tsx  # Internationalization
│   │
│   ├── data/                     # Data files
│   │   └── sampleData.ts        # Sample use cases
│   │
│   ├── config/                   # Configuration
│   │   └── index.ts             # Global config file
│   │
│   ├── types.ts                  # TypeScript type definitions
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Global styles
│   └── vite-env.d.ts            # Vite type declarations
│
├── .env                          # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.js            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.node.json           # Node-specific TypeScript config
├── vite.config.ts               # Vite configuration
├── README.md                     # This file
└── DOCUMENTATION.md             # Detailed technical documentation
```

---

## 🧩 Key Components

### LandingPage

The entry point of the application featuring:
- Animated gradient background (slate to blue)
- Grid pattern overlay
- Pulsing AI-inspired dots
- Glowing atmospheric effects
- Call-to-action button
- Language switcher

**File**: `src/components/LandingPage.tsx`

### UseCaseOverview

Main application view featuring:
- Search functionality
- Department and status filters
- Responsive grid of use case cards
- Results counter
- Modal for detailed views
- Modal for creating new use cases

**File**: `src/components/UseCaseOverview.tsx`

### UseCaseDetailModal

Full-screen modal showing:
- Hero image with department overlay
- Use case phase progression
- Business impact section
- Technology stack badges
- Internal documentation links
- BITS roles and responsibilities section
- Related use cases carousel
- Launch application button

**File**: `src/components/UseCaseDetailModal.tsx`

### NewUseCaseModal

Multi-step form wizard with:
- Step 1: Basic information (title, descriptions)
- Step 2: Classification (department, status, business impact)
- Step 3: Contact information (owner details)
- Step 4: Additional info (tech stack, links, tags)
- Progress indicator
- Validation at each step

**File**: `src/components/NewUseCaseModal.tsx`

---

## 🗄️ Database Setup

### Supabase Configuration

1. **Create a Supabase Project**:
   - Go to [Supabase](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Database Schema**:

```sql
-- Create use_cases table
CREATE TABLE use_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  department TEXT NOT NULL,
  status TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  image_url TEXT,
  business_impact TEXT,
  technology_stack TEXT[] DEFAULT '{}',
  internal_links JSONB DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  related_use_case_ids TEXT[] DEFAULT '{}',
  application_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access"
  ON use_cases FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated insert
CREATE POLICY "Allow authenticated insert"
  ON use_cases FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_use_cases_department ON use_cases(department);
CREATE INDEX idx_use_cases_status ON use_cases(status);
CREATE INDEX idx_use_cases_created_at ON use_cases(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_use_cases_updated_at
  BEFORE UPDATE ON use_cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

3. **Seed Sample Data** (optional):

Use the data from `src/data/sampleData.ts` to populate the database through Supabase dashboard or API.

---

## 🌐 Internationalization

The application supports English and German languages.

### Current Languages

- **English (en)**: Full translation
- **German (de)**: Full translation (default)

### Adding Translations

Edit `src/contexts/LanguageContext.tsx`:

```typescript
const translations: Record<Language, Record<string, string>> = {
  en: {
    'your.key': 'English text',
  },
  de: {
    'your.key': 'Deutscher Text',
  }
};
```

### Using Translations

In components:

```typescript
import { useLanguage } from '../contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  return <h1>{t('landing.title')}</h1>;
}
```

---

## 🤝 Contributing

### Development Workflow

1. **Create a Branch**:
```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**:
- Follow existing code style
- Add TypeScript types
- Update tests if needed
- Update documentation

3. **Test Changes**:
```bash
npm run typecheck
npm run lint
npm run build
```

4. **Commit**:
```bash
git add .
git commit -m "Description of changes"
```

5. **Push & Create Pull Request**:
```bash
git push origin feature/your-feature-name
```

### Code Style Guidelines

- Use TypeScript for all new files
- Follow existing component patterns
- Use Tailwind CSS for styling
- Add comments for complex logic
- Keep components focused and small
- Use meaningful variable names

---

## 🧪 Testing

### Type Checking

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
```

### Manual Testing Checklist

- [ ] Landing page loads correctly
- [ ] Language switcher works
- [ ] Search functionality filters results
- [ ] Department filter works
- [ ] Status filter works
- [ ] Use case cards display correctly
- [ ] Detail modal opens and shows information
- [ ] New use case modal workflow completes
- [ ] Responsive design works on mobile
- [ ] All links open correctly
- [ ] No console errors

---

## 🚀 Deployment

### Recommended Platforms

#### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

#### Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Deploy:
```bash
netlify deploy --prod
```

3. Set environment variables in Netlify dashboard

#### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` directory to your hosting provider

3. Configure environment variables on the hosting platform

### Environment Variables for Production

Ensure these are set in your hosting platform:

```
VITE_SUPABASE_URL=your-production-url
VITE_SUPABASE_ANON_KEY=your-production-key
```

---

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use

**Problem**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

#### Environment Variables Not Loading

**Problem**: Supabase connection fails

**Solution**:
1. Ensure `.env` file exists in project root
2. Check variable names start with `VITE_`
3. Restart the development server
4. Verify values are correct in Supabase dashboard

#### TypeScript Errors

**Problem**: Build fails with type errors

**Solution**:
```bash
# Check for specific errors
npm run typecheck

# Update types if needed
npm install --save-dev @types/react @types/react-dom
```

#### Build Fails

**Problem**: `npm run build` fails

**Solution**:
1. Clear cache: `rm -rf node_modules dist .vite`
2. Reinstall: `npm install`
3. Try building again: `npm run build`

---

## 📞 Support

### Internal Support

- **AI Transformation Team**: ai-team@tesa.com
- **Support Portal**: https://support.tesa.com/ai-hub
- **Documentation**: See `DOCUMENTATION.md` for detailed technical docs

### External Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## 📄 License

**Internal use only – Property of tesa SE**

This application is for internal use within Tesa SE and its affiliates. All rights reserved.

---

## 📊 Project Information

- **Project Name**: Tesa AI Hub
- **Version**: 1.0.0
- **Last Updated**: April 26, 2024
- **Maintained by**: Tesa AI Transformation Team
- **Contact**: ai-team@tesa.com

---

## 🎉 Acknowledgments

Built with modern web technologies and best practices to provide a world-class experience for exploring AI initiatives at Tesa.

**Technology Stack**:
- React + TypeScript for robust, type-safe development
- Vite for blazing-fast builds and development experience
- Tailwind CSS for beautiful, consistent design
- Supabase for scalable backend infrastructure

---

**Happy Coding!** 🚀
