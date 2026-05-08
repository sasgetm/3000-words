# 3000 Words — Project Context for AI Agents

> This file provides a structured overview of the project to help AI agents navigate the codebase efficiently without exhaustive file scanning.

## Project Overview

Web application for learning the most common English words using flashcards, spaced repetition, and interactive training. Full-stack SPA with React frontend and Laravel backend communicating via REST API.

## Directory Structure

```
3000words/
├── frontend/                 # React frontend (Vite + react-scripts)
│   ├── src/
│   │   ├── api/              # REST API client modules
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React contexts (state management)
│   │   ├── pages/            # Page components (routes)
│   │   ├── styles/           # Global styles
│   │   ├── types/            # TypeScript type definitions
│   │   └── utils/            # Utility functions
│   ├── public/               # Static assets
│   └── package.json
│
├── backend/
│   ├── laravel/              # Laravel backend (API server)
│   │   ├── app/
│   │   │   ├── Http/Controllers/  # API controllers
│   │   │   └── Models/            # Eloquent models
│   │   ├── config/           # Laravel configuration
│   │   ├── database/
│   │   │   ├── migrations/   # Database migrations (active)
│   │   │   └── seeders/      # Database seeders (active)
│   │   ├── routes/           # Route definitions
│   │   └── tests/            # PHPUnit tests
│   ├── docker-compose.yml    # Docker configuration
│   └── docker/               # Docker files
│
└── README.md
```

## Key Files Quick Reference

### Frontend Entry Points
- `frontend/src/index.js` — App entry point, ReactDOM render
- `frontend/src/App.js` — Root component, routing setup
- `frontend/src/App.css` — Root component styles

### Frontend Pages (Routes)
- `frontend/src/pages/CardsPage.jsx` — Main flashcards page
- `frontend/src/pages/AuthPage.tsx` — Authentication page
- `frontend/src/pages/HiddenWordsPage.jsx` — Hidden words management

### Frontend Components
- `frontend/src/components/Loader.tsx` — Loading spinner component (rotating circle with arrow)
- `frontend/src/components/Card.tsx` — Word card component
- `frontend/src/components/Button.tsx` — Reusable button
- `frontend/src/components/Input.tsx` — Reusable input field

### Frontend API Layer
- `frontend/src/api/api.ts` — Base API client / config
- `frontend/src/api/authApi.ts` — Authentication API calls
- `frontend/src/api/wordsApi.js` — Words-related API calls
- `frontend/src/api/categoriesApi.js` — Categories-related API calls

### Frontend Types & Utils
- `frontend/src/types/` — TypeScript type definitions
- `frontend/src/utils/` — Helper functions
- `frontend/src/contexts/` — React context providers

### Backend Routes
- `backend/laravel/routes/api.php` — REST API routes (main)
- `backend/laravel/routes/web.php` — Web routes
- `backend/laravel/routes/console.php` — Artisan console commands

### Backend Models
- `backend/laravel/app/Models/Word.php` — Word entity model
- `backend/laravel/app/Models/Category.php` — Category entity model
- `backend/laravel/app/Models/User.php` — User entity model

### Backend Controllers
- `backend/laravel/app/Http/Controllers/` — All API controllers

### Backend Database
- `backend/laravel/database/migrations/` — Active migrations
- `backend/laravel/database/seeders/` — Active seeders
- `backend/laravel/database/migrations/old_migrations/` — Deprecated migrations (ignore)
- `backend/laravel/database/old_seeders/` — Deprecated seeders (ignore)

## Tech Stack

### Frontend
- React 18
- React Router v7
- TypeScript (mixed with JSX)
- CSS / SCSS
- react-scripts (Create React App)
- Jest + Testing Library

### Backend
- Laravel (PHP)
- MySQL
- REST API
- Docker

## Conventions

### Frontend
- Mixed `.js`, `.jsx`, `.ts`, `.tsx` files — check extension for type safety level
- Components use PascalCase naming
- API modules grouped by domain (auth, words, categories)
- Styles in `styles/` directory and co-located `.css` files

### Backend
- Standard Laravel structure
- Controllers in `app/Http/Controllers/`
- Models in `app/Models/`
- Migrations with `old_` prefix are deprecated — do not modify

## Directories to Skip

These directories should be excluded from analysis:
- `frontend/node_modules/` — Third-party dependencies
- `frontend/build/` — Production build output
- `backend/laravel/vendor/` — Composer dependencies
- `backend/laravel/storage/` — Runtime storage (logs, cache, sessions)
- `backend/laravel/bootstrap/cache/` — Compiled cache
- `*/old_*` — Deprecated/legacy files
- `.git/` — Version control metadata

## Commands

### Frontend
```bash
cd frontend
npm start        # Dev server
npm run build    # Production build
npm test         # Run tests
```

### Backend
```bash
cd backend/laravel
php artisan serve                    # Dev server
php artisan migrate                  # Run migrations
php artisan db:seed                  # Run seeders
```

### Docker
```bash
cd backend
docker-compose up -d                 # Start services
docker-compose down                  # Stop services
```
