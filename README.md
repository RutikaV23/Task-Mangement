# Task Management

A full-stack task management application built with React, Node.js, Express, and MySQL.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MySQL

## Project Structure

```text
task-management/
├── frontend/        # React + Vite application
├── backend/         # Node.js + Express API
├── database/        # MySQL schema
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MySQL

### Database Setup

1. Open MySQL and run the schema file:

```bash
mysql -u root -p < database/schema.sql
```

### Backend

```bash
cd backend
cp .env.example .env   # Configure your database credentials
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173` and the backend on `http://localhost:5000`.
