# Inventory Management System

Full-stack Inventory Management System built with React.js and Spring Boot.

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Context API, Chart.js |
| Backend | Spring Boot, JWT Auth, Spring Security |
| Database | MySQL, JPA/Hibernate |

## Project Structure
project/
├── frontend/    # React.js app
├── backend/     # Spring Boot app
└── database/    # SQL schema & migrations

## Quick Start

### Backend
cd backend/src
./mvnw spring-boot:run
# Runs on http://localhost:8080

### Frontend
cd frontend
npm install && npm start
# Runs on http://localhost:3000

## Features
- JWT Authentication & Role-based Access
- Real-time Inventory Tracking
- Dashboard with Analytics & Charts
- Product, Supplier & Transaction Management
- Low Stock Alerts & Email Notifications
- Report Generation
