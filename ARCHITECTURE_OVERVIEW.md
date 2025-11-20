# Full-Stack Architecture Overview

## Project Structure

```
tesa-ai-hub/
├── backend/                    # Node.js + Express + PostgreSQL
│   └── src/
│       ├── adapters/          # External service abstractions
│       ├── config/            # Configuration management
│       ├── controllers/       # Request handlers
│       ├── middlewares/       # Express middlewares
│       ├── models/            # Data models & DTOs
│       ├── repository/        # Data access layer
│       ├── routes/            # API routes
│       ├── services/          # Business logic
│       ├── utils/             # Utilities (AppError)
│       └── server.ts          # Entry point
│
├── src/                       # React + TypeScript + Vite
│   ├── pages/                 # Page components
│   ├── components/
│   │   ├── common/           # Reusable UI
│   │   ├── layout/           # Layout components
│   │   └── domain/           # Business components
│   ├── contexts/             # React contexts
│   ├── services/             # API clients
│   ├── types/                # TypeScript types
│   ├── config/               # App configuration
│   ├── styles/               # Global styles
│   ├── App.tsx
│   └── main.tsx
│
├── supabase/                  # Database migrations
└── public/                    # Static assets
```

## Full-Stack Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────┐         ┌────────────┐                     │
│  │   Pages    │────────▶│ Components │                     │
│  │            │         │            │                     │
│  │ Landing    │         │ - Common   │                     │
│  │ Overview   │         │ - Layout   │                     │
│  └──────┬─────┘         │ - Domain   │                     │
│         │               └──────┬─────┘                     │
│         │                      │                            │
│         └──────────┬───────────┘                            │
│                    │                                        │
│                    ▼                                        │
│         ┌──────────────────┐                               │
│         │  Services (API)   │                               │
│         └─────────┬─────────┘                               │
└───────────────────┼─────────────────────────────────────────┘
                    │
                    │ HTTP Request
                    │ (REST API)
                    ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Node.js)                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────┐                                               │
│  │  Routes  │                                               │
│  └────┬─────┘                                               │
│       │                                                      │
│       ▼                                                      │
│  ┌──────────────┐                                           │
│  │ Controllers  │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐         ┌──────────────┐                │
│  │   Services   │────────▶│ Event Grid   │                │
│  └──────┬───────┘         │   Adapter    │                │
│         │                  └──────────────┘                │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │  Repository  │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────┐                                           │
│  │  DB Adapter  │                                           │
│  └──────┬───────┘                                           │
└─────────┼─────────────────────────────────────────────────┘
          │
          │ SQL
          ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (PostgreSQL)                      │
│                                                              │
│  ┌────────────────┐                                         │
│  │  use_cases     │                                         │
│  ├────────────────┤                                         │
│  │ id             │                                         │
│  │ title          │                                         │
│  │ description    │                                         │
│  │ department     │                                         │
│  │ status         │                                         │
│  │ ...            │                                         │
│  └────────────────┘                                         │
└─────────────────────────────────────────────────────────────┘
```

## Request Lifecycle Example

### Creating a New Use Case

```
1. USER ACTION
   ↓
   User clicks "Submit" in NewUseCaseModal

2. FRONTEND
   ↓
   pages/UseCaseOverview.tsx
   └─> handleSubmit()
       └─> services/api.ts
           └─> useCaseApi.createUseCase(data)
               └─> POST /api/use-cases

3. NETWORK
   ↓
   HTTP POST Request
   Body: { title, description, department, status, ... }

4. BACKEND ROUTES
   ↓
   routes/useCaseRoutes.ts
   └─> router.post('/', ...)
       └─> controllers/useCaseController.ts

5. BACKEND CONTROLLER
   ↓
   useCaseController.createUseCase()
   ├─> Validate request body
   └─> services/useCaseService.ts

6. BACKEND SERVICE
   ↓
   useCaseService.createUseCase()
   ├─> repository/useCase.repository.ts
   │   └─> useCaseRepository.create()
   │       └─> adapters/db.adapter.ts
   │           └─> dbAdapter.query(SQL INSERT)
   └─> adapters/event-grid.adapter.ts
       └─> eventGridAdapter.publish('useCase.created')

7. DATABASE
   ↓
   INSERT INTO use_cases (...) VALUES (...)
   RETURNING *
   ↓
   Returns created use case with ID

8. RESPONSE FLOW
   ↓
   Repository ← Database Result
   Service ← Repository Result
   Controller ← Service Result
   HTTP Response ← Controller
   Frontend ← HTTP Response (200 Created)

9. FRONTEND UPDATE
   ↓
   pages/UseCaseOverview.tsx
   └─> Updates state
       └─> Re-renders UI
           └─> New use case appears in list
```

## Technology Stack

### Frontend
```
┌────────────────────────────────┐
│ React 18                       │
│ TypeScript 5                   │
│ Vite 5                         │
│ Tailwind CSS 3                 │
│ Lucide Icons                   │
└────────────────────────────────┘
```

### Backend
```
┌────────────────────────────────┐
│ Node.js                        │
│ Express 4                      │
│ TypeScript 5                   │
│ Sequelize (ORM)                │
│ PostgreSQL                     │
│ Helmet (Security)              │
│ CORS                           │
└────────────────────────────────┘
```

### Database
```
┌────────────────────────────────┐
│ PostgreSQL                     │
│ Schema: public                 │
│ Main Table: use_cases          │
└────────────────────────────────┘
```

## Architecture Patterns Used

### Backend Patterns

1. **Repository Pattern**
   - Abstracts data access
   - Single source of truth for DB operations
   - Easy to test and mock

2. **Adapter Pattern**
   - Database adapter wraps Sequelize
   - Event grid adapter for pub/sub
   - Easy to swap implementations

3. **Singleton Pattern**
   - DB adapter instance
   - Event grid instance
   - Ensures single connection

4. **Error Handler Pattern**
   - Global error middleware
   - Custom AppError class
   - Consistent error responses

5. **Service Layer Pattern**
   - Business logic separation
   - No direct DB access
   - Testable units

### Frontend Patterns

1. **Component Composition**
   - Pages compose components
   - Reusable UI elements
   - Clear hierarchy

2. **Context Pattern**
   - Language state management
   - Global state without props drilling
   - Clean state access

3. **Custom Hooks** (Ready to add)
   - Reusable logic extraction
   - Testable units
   - Clean components

4. **Service Pattern**
   - API abstraction
   - Centralized fetch logic
   - Type-safe responses

## API Endpoints

```
GET    /api/use-cases           # Get all use cases
GET    /api/use-cases/:id       # Get single use case
POST   /api/use-cases           # Create use case
PUT    /api/use-cases/:id       # Update use case
DELETE /api/use-cases/:id       # Delete use case
```

## Error Handling

### Backend
```
Error Occurrence
    ↓
throw AppError.badRequest("message")
    ↓
next(error)
    ↓
Global Error Handler Middleware
    ↓
Formatted JSON Response
{
  success: false,
  error: "message",
  stack: "..." (development only)
}
```

### Frontend
```
API Call
    ↓
try/catch block
    ↓
Display error message to user
    ↓
Optional: Error boundary
```

## Event System

```
State Change in Service
    ↓
eventGridAdapter.publish('useCase.created', data)
    ↓
All Subscribers Notified
    ↓
    ├─> Logger subscriber (logs event)
    ├─> Analytics subscriber (tracks event)
    └─> Notification subscriber (sends notification)
```

## Security Layers

### Backend
1. Helmet.js - Security headers
2. CORS - Cross-origin control
3. Input validation - Controller layer
4. SQL injection protection - Parameterized queries
5. Error sanitization - No stack traces in production

### Frontend
1. CSP headers (via backend)
2. XSS protection (React auto-escaping)
3. Type safety (TypeScript)
4. Secure HTTP only

## Development Workflow

```
┌─────────────────────────────────────┐
│  Developer makes changes            │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  TypeScript compilation              │
│  - Frontend: Vite dev server         │
│  - Backend: ts-node-dev              │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Hot reload / Live reload            │
└─────────────┬───────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│  Browser auto-refreshes              │
│  Changes visible immediately         │
└─────────────────────────────────────┘
```

## Build Process

### Frontend
```
npm run build
    ↓
Vite builds for production
    ↓
    ├─> TypeScript → JavaScript
    ├─> Bundle optimization
    ├─> Tree shaking
    ├─> Minification
    └─> Asset optimization
    ↓
dist/
├── index.html
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

### Backend
```
npm run build
    ↓
TypeScript compiler (tsc)
    ↓
Compiles .ts → .js
    ↓
dist/src/
└── All JS files with same structure
```

## Deployment Architecture

```
┌─────────────────────────────────────┐
│         Static Hosting              │
│      (Frontend - React SPA)         │
│  Nginx / Vercel / Netlify / S3     │
└───────────┬─────────────────────────┘
            │
            │ HTTP Requests
            │
            ▼
┌─────────────────────────────────────┐
│       Application Server            │
│      (Backend - Node.js API)        │
│   Docker / PM2 / AWS EC2 / Heroku  │
└───────────┬─────────────────────────┘
            │
            │ SQL
            │
            ▼
┌─────────────────────────────────────┐
│       Database Server               │
│         (PostgreSQL)                │
│   AWS RDS / Supabase / Heroku DB   │
└─────────────────────────────────────┘
```

## Key Benefits

### Maintainability
- Clear separation of concerns
- Predictable file structure
- Easy to locate functionality
- Self-documenting architecture

### Scalability
- Modular components
- Easy to add features
- Independent layers
- Horizontal scaling ready

### Testability
- Isolated units
- Mockable dependencies
- Clear interfaces
- Test-friendly patterns

### Developer Experience
- Fast hot reload
- Type safety
- Clear conventions
- Good error messages

## Future Enhancements

### Frontend
- [ ] Add routing (React Router)
- [ ] Add state management (Redux/Zustand)
- [ ] Add custom hooks
- [ ] Add utility functions
- [ ] Add unit tests (Vitest)
- [ ] Add E2E tests (Playwright)

### Backend
- [ ] Add authentication/authorization
- [ ] Add rate limiting
- [ ] Add caching (Redis)
- [ ] Add logging (Winston)
- [ ] Add API documentation (Swagger)
- [ ] Add unit tests (Jest)
- [ ] Add integration tests

### Infrastructure
- [ ] Add CI/CD pipeline
- [ ] Add Docker containers
- [ ] Add monitoring (Datadog/New Relic)
- [ ] Add error tracking (Sentry)
- [ ] Add performance monitoring

This architecture provides a solid foundation for enterprise-grade application development with clean separation of concerns, scalability, and maintainability.
