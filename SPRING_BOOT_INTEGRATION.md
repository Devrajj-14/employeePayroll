# Spring Boot Integration Guide

## Overview
This document explains how to integrate the Employee Payroll React App with a Spring Boot backend.

## Current Setup
- The app currently uses JSON Server (http://localhost:3001)
- All CRUD operations are configured in `src/services/employeeService.js`

## Steps to Integrate with Spring Boot

### 1. Update Configuration
Edit `src/config/config.js`:

```javascript
// For Spring Boot
export const BASE_URL = 'http://localhost:8080/api';
export const EMPLOYEES_ENDPOINT = '/employees';
export const API_MODE = 'SPRING_BOOT';
```

### 2. Spring Boot Backend Requirements
Your Spring Boot backend should expose these endpoints:

- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

### 3. CORS Configuration
Add CORS configuration in your Spring Boot application:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
```

### 4. Employee Model
Ensure your Spring Boot Employee model matches the frontend structure:

```java
public class Employee {
    private Long id;
    private String name;
    private String gender;
    private Double salary;
    private List<String> department;
    // getters and setters
}
```

### 5. Testing
1. Start your Spring Boot backend on port 8080
2. Update the config file as shown in step 1
3. Start the React app: `npm start`
4. Test all CRUD operations

## Switching Between JSON Server and Spring Boot
Simply update the `BASE_URL` in `src/config/config.js` to switch between backends.

## Running JSON Server
```bash
npm run server
```

## Running React App
```bash
npm start
```
