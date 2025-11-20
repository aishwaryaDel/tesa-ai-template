# Backend Architecture Diagram

## Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      HTTP REQUEST                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    ROUTES LAYER                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  routes/useCaseRoutes.ts                             │   │
│  │  - Define endpoints (GET, POST, PUT, DELETE)         │   │
│  │  - Map to controller methods                         │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                  CONTROLLERS LAYER                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  controllers/useCaseController.ts                    │   │
│  │  - Handle HTTP requests/responses                    │   │
│  │  - Validate request parameters                       │   │
│  │  - Call service methods                              │   │
│  │  - Return formatted responses                        │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   SERVICES LAYER                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  services/useCaseService.ts                          │   │
│  │  - Business logic                                    │   │
│  │  - Call repository methods                           │   │
│  │  - Publish events                                    │   │
│  │  - Throw AppError for errors                         │   │
│  └──────────────────┬───────────────────┬────────────────┘   │
└────────────────────┬┘                   └┬───────────────────┘
                     │                     │
        ┌────────────▼──────────┐ ┌────────▼──────────────┐
        │   REPOSITORY LAYER    │ │   EVENT GRID ADAPTER  │
        │  ┌─────────────────┐  │ │  ┌─────────────────┐  │
        │  │ repository/     │  │ │  │ adapters/       │  │
        │  │ useCase.repo.ts │  │ │  │ event-grid.ts   │  │
        │  │                 │  │ │  │                 │  │
        │  │ - findAll()     │  │ │  │ - publish()     │  │
        │  │ - findById()    │  │ │  │ - subscribe()   │  │
        │  │ - create()      │  │ │  │                 │  │
        │  │ - update()      │  │ │  └─────────────────┘  │
        │  │ - delete()      │  │ │                       │
        │  └────────┬────────┘  │ │    ┌─────────────┐   │
        └───────────┼────────────┘ │    │ Subscribers │   │
                    │              │    └─────────────┘   │
        ┌───────────▼────────────┐ └───────────────────────┘
        │    DB ADAPTER          │
        │  ┌─────────────────┐   │
        │  │ adapters/       │   │
        │  │ db.adapter.ts   │   │
        │  │                 │   │
        │  │ - query()       │   │
        │  │ - connect()     │   │
        │  │ - disconnect()  │   │
        │  └────────┬────────┘   │
        └───────────┼─────────────┘
                    │
        ┌───────────▼─────────────┐
        │      PostgreSQL DB      │
        │    (use_cases table)    │
        └─────────────────────────┘
```

## Error Handling Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   ANY LAYER THROWS ERROR                     │
│  throw AppError.badRequest("message")                        │
│  throw AppError.notFound("message")                          │
│  throw AppError.internal("message")                          │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ next(error)
                            │
┌───────────────────────────▼─────────────────────────────────┐
│               ERROR HANDLER MIDDLEWARE                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  middlewares/errorHandler.ts                         │   │
│  │                                                       │   │
│  │  if (error instanceof AppError)                      │   │
│  │    → Return with error.statusCode                    │   │
│  │  else                                                 │   │
│  │    → Return 500 Internal Server Error                │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│              FORMATTED ERROR RESPONSE                        │
│  {                                                           │
│    success: false,                                           │
│    error: "error message",                                   │
│    stack: "..." (development only)                           │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Example: Create Use Case

```
1. POST /api/use-cases
   Body: { title, description, ... }
        │
        ▼
2. routes/useCaseRoutes.ts
   router.post('/', ...)
        │
        ▼
3. controllers/useCaseController.ts
   createUseCase(req, res, next)
   - Validate request body
   - Check required fields
        │
        ▼
4. services/useCaseService.ts
   createUseCase(data)
   - Business logic
        │
        ├──────────────────┐
        ▼                  ▼
5a. repository/          5b. adapters/
    useCase.repo.ts          event-grid.ts
    create(data)             publish('useCase.created', data)
        │                    │
        ▼                    ▼
6a. adapters/            6b. Event Subscribers
    db.adapter.ts            (any listeners)
    query(sql, params)
        │
        ▼
7.  PostgreSQL
    INSERT INTO use_cases...
        │
        ▼
8.  Return created use case
        │
        ▼
9.  Response: 201 Created
    { success: true, data: {...} }
```

## Component Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                         CONFIG                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  config/constants.ts                                 │   │
│  │  - VALID_STATUSES                                    │   │
│  │  - VALID_DEPARTMENTS                                 │   │
│  │  - APP_CONFIG                                        │   │
│  │  - DB_CONFIG                                         │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ (imported by)
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌──────▼─────────┐
│  Controllers   │  │   Adapters     │  │  Middlewares   │
└────────────────┘  └────────────────┘  └────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        MODELS                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  models/UseCase.ts                                   │   │
│  │  - UseCase interface                                 │   │
│  │  - CreateUseCaseDTO                                  │   │
│  │  - UpdateUseCaseDTO                                  │   │
│  │  - Type definitions                                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ (used by)
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌──────▼─────────┐
│  Controllers   │  │   Services     │  │  Repository    │
└────────────────┘  └────────────────┘  └────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                         UTILS                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  utils/AppError.ts                                   │   │
│  │  - Custom error class                                │   │
│  │  - Static factory methods                            │   │
│  │  - HTTP status codes                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ▲
                            │ (used by)
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌──────▼─────────┐
│  Controllers   │  │   Services     │  │  Middlewares   │
└────────────────┘  └────────────────┘  └────────────────┘
```

## Dependency Graph

```
server.ts
    ├── routes/useCaseRoutes.ts
    │   └── controllers/useCaseController.ts
    │       ├── services/useCaseService.ts
    │       │   ├── repository/useCase.repository.ts
    │       │   │   └── adapters/db.adapter.ts
    │       │   │       └── config/constants.ts
    │       │   └── adapters/event-grid.adapter.ts
    │       ├── models/UseCase.ts
    │       ├── utils/AppError.ts
    │       └── config/constants.ts
    ├── middlewares/errorHandler.ts
    │   ├── utils/AppError.ts
    │   └── config/constants.ts
    ├── adapters/db.adapter.ts
    │   └── config/constants.ts
    └── config/constants.ts
```

## Key Design Patterns

### 1. Repository Pattern
```
Service → Repository → DB Adapter → Database
(Business Logic) → (Data Access) → (Connection) → (Storage)
```

### 2. Adapter Pattern
```
Application → Adapter Interface → External Service
(Decoupled)   (Abstraction)      (Implementation)
```

### 3. Singleton Pattern
```
DatabaseAdapter.getInstance() → Same instance everywhere
EventGridAdapter.getInstance() → Same instance everywhere
```

### 4. Dependency Injection
```
Controller receives Service
Service receives Repository
Repository receives DB Adapter
```

## Benefits Summary

✅ **Separation of Concerns**: Each layer has clear responsibility
✅ **Testability**: Easy to mock and unit test
✅ **Maintainability**: Easy to locate and modify code
✅ **Scalability**: Easy to add features without breaking existing code
✅ **Flexibility**: Easy to swap implementations (adapters)
✅ **Error Handling**: Centralized and consistent
✅ **Event-Driven**: Decoupled components via events
