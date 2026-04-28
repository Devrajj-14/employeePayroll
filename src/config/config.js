// Configuration for backend API
// Switch between JSON Server and Spring Boot

// For JSON Server (default)
export const BASE_URL = 'http://localhost:3001';
export const EMPLOYEES_ENDPOINT = '/employees';

// For Spring Boot (uncomment when ready)
// export const BASE_URL = 'http://localhost:8080/api';
// export const EMPLOYEES_ENDPOINT = '/employees';

// API Mode
export const API_MODE = 'JSON_SERVER'; // or 'SPRING_BOOT'
