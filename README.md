# Employee Payroll React App

A full-stack Employee Payroll Management application built with React and supporting both JSON Server and Spring Boot backends.

## Features

- ✅ UC1-4: Basic React setup with routing and components
- ✅ UC5: JSON Server REST API integration
- ✅ UC6: In-memory CRUD operations
- ✅ UC7: State management with React hooks
- ✅ UC8: Form validation
- ✅ UC9: Display all employees
- ✅ UC10: Client-server architecture
- ✅ UC11: Delete employee functionality
- ✅ UC12: Spring Boot integration ready

## Tech Stack

- React 18
- React Router DOM
- Axios for API calls
- SCSS for styling
- JSON Server (development)
- Spring Boot ready (production)

## Installation

```bash
npm install
```

## Running the Application

### Start JSON Server (Backend)
```bash
npm run server
```
This starts JSON Server on http://localhost:3001

### Start React App (Frontend)
```bash
npm start
```
This starts the React app on http://localhost:3000

## Project Structure

```
employeePayroll/
├── src/
│   ├── App.js
│   ├── components/
│   │   └── display/
│   │       ├── display.jsx
│   │       └── display.scss
│   ├── home/
│   │   ├── home.jsx
│   │   └── home.scss
│   ├── payroll-form/
│   │   ├── payroll-form.jsx
│   │   └── payroll-form.scss
│   ├── services/
│   │   ├── employeeService.js
│   │   └── inMemoryService.js
│   ├── config/
│   │   └── config.js
│   └── assets/
├── db.json
└── package.json
```

## API Endpoints

- GET /employees - Get all employees
- GET /employees/:id - Get employee by ID
- POST /employees - Create new employee
- PUT /employees/:id - Update employee
- DELETE /employees/:id - Delete employee

## Form Validation

- Name: Minimum 3 characters, letters only
- Gender: Required
- Salary: Minimum 10000
- Department: At least one required

## Spring Boot Integration

See `SPRING_BOOT_INTEGRATION.md` for details on connecting to a Spring Boot backend.

## Git Branches

- `main` - Contains only README
- `develop` - Full working application
- Feature branches for each UC (UC1-UC12)

## Author

Devraj
