# Use Case API Documentation

## Overview

This document provides comprehensive documentation for the Use Case CRUD API. The API is built with Node.js, TypeScript, Express, and uses Supabase PostgreSQL as the database.

## Base URL

```
http://localhost:3001/api
```

## Database Schema

### use_cases Table

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key, auto-generated |
| title | text | Title of the use case |
| short_description | text | Brief description |
| full_description | text | Detailed description |
| department | text | Department (Marketing, R&D, Procurement, IT, HR, Operations) |
| status | text | Status (Ideation, Pre-Evaluation, Evaluation, PoC, MVP, Live, Archived) |
| owner_name | text | Name of the owner |
| owner_email | text | Email of the owner |
| image_url | text | Optional image URL |
| business_impact | text | Business impact description |
| technology_stack | text[] | Array of technologies |
| tags | text[] | Array of tags |
| application_url | text | Optional application URL |
| internal_links | jsonb | JSON object with internal links |
| related_use_case_ids | text[] | Array of related use case IDs |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## API Endpoints

### 1. Get All Use Cases

**GET** `/api/use-cases`

Retrieves all use cases from the database.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "string",
      "short_description": "string",
      "full_description": "string",
      "department": "string",
      "status": "string",
      "owner_name": "string",
      "owner_email": "string",
      "image_url": "string",
      "business_impact": "string",
      "technology_stack": ["string"],
      "internal_links": {},
      "tags": ["string"],
      "related_use_case_ids": ["string"],
      "created_at": "timestamp",
      "updated_at": "timestamp",
      "application_url": "string"
    }
  ],
  "count": 10
}
```

### 2. Get Use Case by ID

**GET** `/api/use-cases/:id`

Retrieves a specific use case by its ID.

**Parameters:**
- `id` (path parameter) - UUID of the use case

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "string",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Use case not found"
}
```

### 3. Create Use Case

**POST** `/api/use-cases`

Creates a new use case.

**Request Body:**
```json
{
  "title": "string (required)",
  "short_description": "string (required)",
  "full_description": "string (required)",
  "department": "string (required)",
  "status": "string (required)",
  "owner_name": "string (required)",
  "owner_email": "string (required)",
  "image_url": "string (optional)",
  "business_impact": "string (optional)",
  "technology_stack": ["string"] (required),
  "internal_links": {} (required),
  "tags": ["string"] (required),
  "related_use_case_ids": ["string"] (optional),
  "application_url": "string (optional)"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    ...
  },
  "message": "Use case created successfully"
}
```

**Validation Rules:**
- `title`: Required, non-empty
- `short_description`: Required, non-empty
- `full_description`: Required, non-empty
- `department`: Must be one of: Marketing, R&D, Procurement, IT, HR, Operations
- `status`: Must be one of: Ideation, Pre-Evaluation, Evaluation, PoC, MVP, Live, Archived
- `owner_email`: Must be valid email format
- `technology_stack`: Must be an array
- `tags`: Must be an array
- `internal_links`: Must be an object

### 4. Update Use Case

**PUT** `/api/use-cases/:id`

Updates an existing use case.

**Parameters:**
- `id` (path parameter) - UUID of the use case

**Request Body:**
All fields are optional. Only include fields you want to update.

```json
{
  "title": "string",
  "short_description": "string",
  "full_description": "string",
  "department": "string",
  "status": "string",
  "owner_name": "string",
  "owner_email": "string",
  "image_url": "string",
  "business_impact": "string",
  "technology_stack": ["string"],
  "internal_links": {},
  "tags": ["string"],
  "related_use_case_ids": ["string"],
  "application_url": "string"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    ...
  },
  "message": "Use case updated successfully"
}
```

### 5. Delete Use Case

**DELETE** `/api/use-cases/:id`

Deletes a use case by its ID.

**Parameters:**
- `id` (path parameter) - UUID of the use case

**Response (200):**
```json
{
  "success": true,
  "message": "Use case deleted successfully"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Frontend Integration

### API Service (src/services/api.ts)

The frontend includes a complete API service with error handling:

```typescript
import { useCaseApi } from './services/api';

// Get all use cases
const useCases = await useCaseApi.getAllUseCases();

// Get use case by ID
const useCase = await useCaseApi.getUseCaseById('uuid');

// Create use case
const newUseCase = await useCaseApi.createUseCase({
  title: 'My Use Case',
  short_description: 'Short description',
  full_description: 'Full description',
  department: 'IT',
  status: 'PoC',
  owner_name: 'John Doe',
  owner_email: 'john.doe@example.com',
  technology_stack: ['Python', 'React'],
  tags: ['AI', 'Automation'],
  internal_links: {
    sharepoint: 'https://sharepoint.example.com'
  }
});

// Update use case
const updated = await useCaseApi.updateUseCase('uuid', {
  status: 'Live'
});

// Delete use case
await useCaseApi.deleteUseCase('uuid');
```

## Running the Backend

### Development Mode

```bash
cd backend
npm install
npm run dev
```

The server will start on `http://localhost:3001`

### Production Build

```bash
cd backend
npm run build
npm start
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing with Postman

### Example: Create Use Case

**Method:** POST
**URL:** http://localhost:3001/api/use-cases
**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "title": "Test Use Case",
  "short_description": "This is a test use case",
  "full_description": "This is a detailed description of the test use case",
  "department": "IT",
  "status": "Ideation",
  "owner_name": "Test User",
  "owner_email": "test@example.com",
  "technology_stack": ["Node.js", "React"],
  "tags": ["Testing", "API"],
  "internal_links": {
    "confluence": "https://confluence.example.com"
  }
}
```

### Example: Get All Use Cases

**Method:** GET
**URL:** http://localhost:3001/api/use-cases

### Example: Update Use Case

**Method:** PUT
**URL:** http://localhost:3001/api/use-cases/{use-case-id}
**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "status": "Live",
  "business_impact": "Saved 20 hours per week"
}
```

### Example: Delete Use Case

**Method:** DELETE
**URL:** http://localhost:3001/api/use-cases/{use-case-id}

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts         # Supabase client configuration
│   ├── models/
│   │   └── UseCase.ts          # TypeScript interfaces and types
│   ├── services/
│   │   └── useCaseService.ts   # Business logic layer
│   ├── controllers/
│   │   └── useCaseController.ts # Request handlers
│   ├── routes/
│   │   └── useCaseRoutes.ts    # API route definitions
│   └── server.ts               # Express server setup
├── db/
│   └── migrations/
│       ├── 002_create_use_cases_table.sql
│       └── 003_seed_sample_use_cases.sql
├── .env                        # Environment variables
├── package.json
└── tsconfig.json
```

## Architecture

The backend follows a layered architecture:

1. **Routes Layer** - Defines API endpoints and maps them to controllers
2. **Controllers Layer** - Handles HTTP requests/responses and validation
3. **Services Layer** - Contains business logic and database operations
4. **Models Layer** - Defines TypeScript types and interfaces
5. **Config Layer** - Database and environment configuration
