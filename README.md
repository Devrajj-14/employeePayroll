# Employee Payroll React App

A full-stack Employee Payroll Management and Address Book application built with React and supporting both JSON Server and Spring Boot backends.

## Features

### Employee Payroll (UC1-12)
- ✅ UC1-4: Basic React setup with routing and components
- ✅ UC5: JSON Server REST API integration
- ✅ UC6: In-memory CRUD operations
- ✅ UC7: State management with React hooks
- ✅ UC8: Form validation
- ✅ UC9: Display all employees
- ✅ UC10: Client-server architecture
- ✅ UC11: Delete employee functionality
- ✅ UC12: Spring Boot integration ready

### Address Book (UC13-15)
- ✅ UC13: Address Book UI setup with full CRUD
- ✅ UC14: Edit and Delete contact functionality
- ✅ UC15: Enhanced routing with active navigation

## Tech Stack

- React 18
- React Router DOM v6
- Axios for API calls
- SCSS for styling
- JSON Server (development)
- Spring Boot ready (production)
- LocalStorage for Address Book persistence

## Installation

```bash
npm install
```

## Running the Application

### Start JSON Server (Backend for Employee Payroll)
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
│   │   ├── address-book/
│   │   │   ├── AddressBook.jsx
│   │   │   ├── address-list.jsx
│   │   │   ├── address-form.jsx
│   │   │   ├── address-book.scss
│   │   │   ├── address-list.scss
│   │   │   └── address-form.scss
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
│   │   ├── inMemoryService.js
│   │   └── addressService.js
│   ├── config/
│   │   └── config.js
│   └── assets/
├── db.json
└── package.json
```

## Features Overview

### Employee Payroll
- Add, edit, delete employees
- Form validation (name, salary, gender, department)
- Display employee list with details
- REST API integration with JSON Server
- Ready for Spring Boot backend

### Address Book
- Add, edit, delete contacts
- Contact cards with avatar support
- Form validation (name, phone, email, address)
- LocalStorage persistence
- Responsive grid layout
- Profile image support

## API Endpoints (Employee Payroll)

- GET /employees - Get all employees
- GET /employees/:id - Get employee by ID
- POST /employees - Create new employee
- PUT /employees/:id - Update employee
- DELETE /employees/:id - Delete employee

## Form Validation

### Employee Payroll
- Name: Minimum 3 characters, letters only
- Gender: Required
- Salary: Minimum 10000
- Department: At least one required

### Address Book
- Name: Minimum 3 characters
- Phone: 10 digits
- Email: Valid email format
- Address: Required

## Navigation

The app includes three main sections:
- 🏠 Home - Dashboard with employee list
- 💼 Employee Payroll - Add/manage employees
- 📇 Address Book - Manage contacts

## Spring Boot Integration

See `SPRING_BOOT_INTEGRATION.md` for details on connecting to a Spring Boot backend.

## Git Branches

- `main` - Contains only README
- `develop` - Full working application
- Feature branches for each UC (UC1-UC15)

## All Feature Branches

### Employee Payroll
- feature/UC1-helloworld-setup
- feature/UC2-data-binding
- feature/UC3-react-components
- feature/UC4-routing-global-css
- feature/UC5-json-server-setup
- feature/UC6-in-memory-crud
- feature/UC7-use-state
- feature/UC8-validation
- feature/UC9-display-all-employees
- feature/UC10-client-server-architecture
- feature/UC11-delete-employee
- feature/UC12-spring-boot-integration

### Address Book
- feature/UC13-addressbook-setup
- feature/UC14-edit-delete-contact
- feature/UC15-routing-navigation

## Author

Devraj
