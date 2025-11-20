# Tesa AI Hub

A full-stack enterprise application for managing AI use cases within an organization.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js + Express + TypeScript
- PostgreSQL with Sequelize ORM
- Enterprise repository architecture

## Quick Start

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## Documentation

All documentation is located in the `/docs` folder:

- **[README](docs/README.md)** - Main documentation index
- **[Architecture Overview](docs/ARCHITECTURE_OVERVIEW.md)** - Full-stack architecture guide
- **[Frontend Refactoring](docs/FRONTEND_REFACTORING.md)** - Frontend structure and patterns
- **[API Documentation](docs/API_DOCUMENTATION.md)** - API endpoints and usage
- **[Backend Architecture](docs/backend/ARCHITECTURE.md)** - Backend architecture details
- **[Backend Diagram](docs/backend/ARCHITECTURE_DIAGRAM.md)** - Visual architecture diagrams
- **[Backend Refactoring](docs/backend/REFACTORING_SUMMARY.md)** - Backend refactoring summary

## Project Structure

```
tesa-ai-hub/
├── docs/                      # Documentation
├── src/                       # Frontend source
│   ├── pages/                # Page components
│   ├── components/           # UI components
│   │   ├── common/          # Reusable components
│   │   ├── layout/          # Layout components
│   │   └── domain/          # Business components
│   ├── contexts/            # React contexts
│   ├── services/            # API services
│   ├── types/               # TypeScript types
│   ├── config/              # Configuration
│   └── styles/              # Global styles
├── backend/                  # Backend source
│   └── src/
│       ├── adapters/        # External adapters
│       ├── config/          # Configuration
│       ├── controllers/     # Request handlers
│       ├── middlewares/     # Express middlewares
│       ├── models/          # Data models
│       ├── repository/      # Data access
│       ├── routes/          # API routes
│       ├── services/        # Business logic
│       └── utils/           # Utilities
└── public/                  # Static assets
```

## Features

- Multi-language support (English/German)
- Use case management (CRUD operations)
- Department and status filtering
- Search functionality
- Detailed use case views
- Responsive design

## Development

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend Commands
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript
- `npm start` - Start production server

## License

Internal use only – Property of tesa SE
