# Documentation Index

Welcome to the Tesa AI Hub documentation. This index provides quick access to all documentation resources.

## Getting Started

Start here if you're new to the project:

1. **[README](README.md)** - Project overview and setup instructions
2. **[Architecture Overview](ARCHITECTURE_OVERVIEW.md)** - Understand the full-stack architecture

## Architecture Documentation

### Full-Stack Architecture
- **[Architecture Overview](ARCHITECTURE_OVERVIEW.md)** - Complete system architecture, data flow, and technology stack
- **[API Documentation](API_DOCUMENTATION.md)** - REST API endpoints, request/response formats, and examples

### Frontend Architecture
- **[Frontend Refactoring](FRONTEND_REFACTORING.md)** - Frontend structure, component organization, and patterns
  - Component hierarchy
  - Folder organization principles
  - Import patterns
  - Best practices

### Backend Architecture
- **[Backend Architecture](backend/ARCHITECTURE.md)** - Backend layer architecture and design patterns
  - Repository pattern
  - Service layer
  - Controllers and routes
  - Error handling
  - Event system

- **[Backend Architecture Diagram](backend/ARCHITECTURE_DIAGRAM.md)** - Visual diagrams of backend architecture
  - Layer architecture
  - Data flow diagrams
  - Component relationships
  - Dependency graphs

- **[Backend Refactoring Summary](backend/REFACTORING_SUMMARY.md)** - Detailed backend refactoring guide
  - What changed
  - Migration notes
  - Benefits
  - Best practices

## Quick Reference

### Frontend Structure
```
src/
├── pages/              # Page components
├── components/
│   ├── common/        # Reusable UI
│   ├── layout/        # Layout components
│   └── domain/        # Business components
├── contexts/          # React contexts
├── services/          # API clients
├── types/             # TypeScript types
├── config/            # Configuration
└── styles/            # Global styles
```

### Backend Structure
```
backend/src/
├── adapters/          # External service adapters
├── config/            # Configuration
├── controllers/       # Request handlers
├── middlewares/       # Express middlewares
├── models/            # Data models
├── repository/        # Data access layer
├── routes/            # API routes
├── services/          # Business logic
└── utils/             # Utilities
```

## API Endpoints

```
GET    /api/use-cases       # Get all use cases
GET    /api/use-cases/:id   # Get single use case
POST   /api/use-cases       # Create use case
PUT    /api/use-cases/:id   # Update use case
DELETE /api/use-cases/:id   # Delete use case
```

See **[API Documentation](API_DOCUMENTATION.md)** for detailed information.

## Development Workflow

### Frontend Development
```bash
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Build for production
```

### Backend Development
```bash
cd backend
npm install         # Install dependencies
npm run dev        # Start dev server (http://localhost:3001)
npm run build      # Compile TypeScript
npm start          # Start production server
```

## Key Concepts

### Frontend Patterns
- **Component Composition** - Pages compose smaller components
- **Context API** - Global state management for language
- **Service Layer** - API abstraction and centralized fetch logic
- **Type Safety** - Full TypeScript coverage

### Backend Patterns
- **Repository Pattern** - Data access abstraction
- **Adapter Pattern** - External service abstractions
- **Service Layer** - Business logic separation
- **Error Handling** - Global error middleware with custom AppError class
- **Event-Driven** - Publish/subscribe via Event Grid Adapter

## Architecture Benefits

### Maintainability
- Clear separation of concerns
- Predictable file structure
- Self-documenting code organization
- Easy to locate functionality

### Scalability
- Modular components and services
- Independent layers
- Easy to add new features
- Horizontal scaling ready

### Testability
- Isolated units
- Mockable dependencies
- Clear interfaces
- Test-friendly patterns

## Technology Stack

### Frontend
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- Lucide React Icons

### Backend
- Node.js
- Express 4
- TypeScript 5
- Sequelize ORM
- PostgreSQL
- Helmet (Security)
- CORS

### Development Tools
- ts-node-dev (Backend hot reload)
- Vite HMR (Frontend hot reload)
- ESLint
- TypeScript Compiler

## Document Map

```
docs/
├── INDEX.md (this file)
├── README.md
├── ARCHITECTURE_OVERVIEW.md
├── FRONTEND_REFACTORING.md
├── API_DOCUMENTATION.md
└── backend/
    ├── ARCHITECTURE.md
    ├── ARCHITECTURE_DIAGRAM.md
    └── REFACTORING_SUMMARY.md
```

## Need Help?

1. Check the relevant documentation above
2. Review code examples in the documentation
3. Examine existing code for patterns
4. Contact the AI Transformation Team

---

**Internal use only – Property of tesa SE**
