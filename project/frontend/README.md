# Inventory Management System - Frontend

React.js frontend for the Inventory Management System.

## Tech Stack
- React.js
- Context API (State Management)
- Axios (API calls)
- React Router (Navigation)
- Chart.js (Dashboard charts)

## Features
- Login & JWT Authentication
- Dashboard with charts & summary cards
- Product management (Add, Edit, Delete)
- Low stock alerts & notifications
- Reports & analytics
- Role-based access (Admin, Manager, Staff)

## Setup & Run

### Prerequisites
- Node.js v16+
- npm

### Install & Start
cd frontend
npm install
npm start

App runs on http://localhost:3000

## Folder Structure
src/
├── components/    # Reusable UI components
├── pages/         # Route-level pages
├── hooks/         # Custom React hooks
├── context/       # Auth & Inventory context
├── services/      # API call functions
├── styles/        # CSS files
└── utilities/     # Helper functions

## Environment Variables
Create a .env file:
REACT_APP_API_URL=http://localhost:8080
