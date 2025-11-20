# Backend Architecture

This backend follows an enterprise repository pattern with clean architecture principles.

## Directory Structure

```
backend/
├── src/
│   ├── adapters/          # External service adapters
│   │   ├── db.adapter.ts         # Database adapter (Sequelize)
│   │   └── event-grid.adapter.ts # Event publishing adapter
│   ├── config/            # Configuration files
│   │   ├── constants.ts          # Application constants
│   │   └── index.ts              # Config exports
│   ├── controllers/       # HTTP request handlers
│   │   └── useCaseController.ts  # Use case endpoint handlers
│   ├── middlewares/       # Express middlewares
│   │   └── errorHandler.ts       # Global error handler
│   ├── models/            # Data models and DTOs
│   │   └── UseCase.ts            # Use case types and interfaces
│   ├── repository/        # Data access layer
│   │   └── useCase.repository.ts # Use case database operations
│   ├── routes/            # Express route definitions
│   │   └── useCaseRoutes.ts      # Use case routes
│   ├── services/          # Business logic layer
│   │   └── useCaseService.ts     # Use case business logic
│   ├── utils/             # Utility classes
│   │   └── AppError.ts           # Custom error class
│   └── server.ts          # Application entry point
```

## Architecture Layers

### 1. Routes (`/routes`)
- Define HTTP endpoints
- Route requests to appropriate controllers
- Pass `next` for error handling

### 2. Controllers (`/controllers`)
- Handle HTTP requests and responses
- Validate request parameters
- Call service layer methods
- Return formatted responses
- Use `next(error)` for error propagation

### 3. Services (`/services`)
- Contain business logic
- Call repository methods for data access
- Publish events via event-grid adapter
- Throw `AppError` for error handling
- No direct database access

### 4. Repository (`/repository`)
- Encapsulate all database operations
- Use database adapter for queries
- Return domain models
- Single source of truth for data access

### 5. Adapters (`/adapters`)

#### Database Adapter
- Singleton pattern for database connection
- Wraps Sequelize functionality
- Provides query interface
- Manages connection lifecycle

#### Event Grid Adapter
- Publish/subscribe event system
- Async event handling
- Decoupled event communication

### 6. Middlewares (`/middlewares`)

#### Error Handler
- Global error handling
- Catches all thrown errors
- Returns consistent error responses
- Logs errors appropriately

### 7. Utils (`/utils`)

#### AppError
- Custom error class
- HTTP status code support
- Operational vs programming error distinction
- Static factory methods (badRequest, notFound, etc.)

## Data Flow

```
Request → Route → Controller → Service → Repository → Database
                      ↓
                  Response
                      ↓
                Error Handler (if error)
```

## Event Flow

```
Service → Event Grid Adapter → Subscribers
```

## Key Principles

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Dependency Inversion**: Higher layers don't depend on lower layers directly
3. **Clean Architecture**: Business logic is independent of frameworks
4. **Repository Pattern**: Abstract data access from business logic
5. **Error Handling**: Centralized error handling via middleware
6. **Event-Driven**: Decouple components via events

## Error Handling

All errors flow through the global error handler:

```typescript
// In controllers, services, or repositories
throw AppError.badRequest('Invalid input');
throw AppError.notFound('Resource not found');
throw AppError.internal('Something went wrong');
```

## Event Publishing

Publish events for important state changes:

```typescript
await eventGridAdapter.publish('useCase.created', {
  id: newUseCase.id,
  title: newUseCase.title,
});
```

## Database Access

Always use the repository layer:

```typescript
// ✅ Correct
const useCases = await useCaseRepository.findAll();

// ❌ Incorrect (never do this in services)
const result = await dbAdapter.query('SELECT * FROM use_cases');
```

## Best Practices

1. Controllers should be thin - delegate to services
2. Services contain business logic - no direct DB access
3. Repositories handle all database operations
4. Use AppError for all error throwing
5. Publish events for significant state changes
6. Keep models pure - no business logic
7. Use adapters for external dependencies
