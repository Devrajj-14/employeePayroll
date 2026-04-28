import axios from 'axios';
import { BASE_URL, EMPLOYEES_ENDPOINT } from '../config/config';

const API_URL = `${BASE_URL}${EMPLOYEES_ENDPOINT}`;

class EmployeeService {
  // Get all employees
  getAllEmployees() {
    return axios.get(API_URL);
  }

  // Get employee by ID
  getEmployeeById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // Create new employee
  createEmployee(employee) {
    return axios.post(API_URL, employee);
  }

  // Update employee
  updateEmployee(id, employee) {
    return axios.put(`${API_URL}/${id}`, employee);
  }

  // Delete employee
  deleteEmployee(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new EmployeeService();
