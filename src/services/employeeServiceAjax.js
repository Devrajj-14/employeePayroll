/**
 * UC17: Employee Service using Pure AJAX (XMLHttpRequest)
 * 
 * This demonstrates HTTP requests using XMLHttpRequest instead of Axios
 * Includes: Callback pattern, Promise wrapper, and Async/Await
 */

const BASE_URL = 'http://localhost:3001';
const EMPLOYEES_ENDPOINT = '/employees';
const API_URL = `${BASE_URL}${EMPLOYEES_ENDPOINT}`;

class EmployeeServiceAjax {
  
  // ============================================
  // 1. CALLBACK PATTERN with XMLHttpRequest
  // ============================================
  
  getAllEmployeesCallback(callback) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', API_URL, true);
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const employees = JSON.parse(xhr.responseText);
          callback(null, employees);
        } catch (error) {
          callback(error, null);
        }
      } else {
        callback(new Error(`HTTP Error: ${xhr.status}`), null);
      }
    };
    
    xhr.onerror = function() {
      callback(new Error('Network Error'), null);
    };
    
    xhr.send();
  }
  
  createEmployeeCallback(employee, callback) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('POST', API_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const newEmployee = JSON.parse(xhr.responseText);
          callback(null, newEmployee);
        } catch (error) {
          callback(error, null);
        }
      } else {
        callback(new Error(`HTTP Error: ${xhr.status}`), null);
      }
    };
    
    xhr.onerror = function() {
      callback(new Error('Network Error'), null);
    };
    
    xhr.send(JSON.stringify(employee));
  }
  
  deleteEmployeeCallback(id, callback) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('DELETE', `${API_URL}/${id}`, true);
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(null, { message: 'Employee deleted successfully' });
      } else {
        callback(new Error(`HTTP Error: ${xhr.status}`), null);
      }
    };
    
    xhr.onerror = function() {
      callback(new Error('Network Error'), null);
    };
    
    xhr.send();
  }
  
  // ============================================
  // 2. PROMISE PATTERN (Wrapper around AJAX)
  // ============================================
  
  getAllEmployees() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('GET', API_URL, true);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const employees = JSON.parse(xhr.responseText);
            resolve(employees);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network Error'));
      };
      
      xhr.send();
    });
  }
  
  getEmployeeById(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('GET', `${API_URL}/${id}`, true);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const employee = JSON.parse(xhr.responseText);
            resolve(employee);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network Error'));
      };
      
      xhr.send();
    });
  }
  
  createEmployee(employee) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', API_URL, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const newEmployee = JSON.parse(xhr.responseText);
            resolve(newEmployee);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network Error'));
      };
      
      xhr.send(JSON.stringify(employee));
    });
  }
  
  updateEmployee(id, employee) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('PUT', `${API_URL}/${id}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const updatedEmployee = JSON.parse(xhr.responseText);
            resolve(updatedEmployee);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network Error'));
      };
      
      xhr.send(JSON.stringify(employee));
    });
  }
  
  deleteEmployee(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      xhr.open('DELETE', `${API_URL}/${id}`, true);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({ message: 'Employee deleted successfully' });
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      };
      
      xhr.onerror = function() {
        reject(new Error('Network Error'));
      };
      
      xhr.send();
    });
  }
  
  // ============================================
  // 3. ASYNC/AWAIT PATTERN (Uses Promise methods)
  // ============================================
  
  async getAllEmployeesAsync() {
    try {
      const employees = await this.getAllEmployees();
      return employees;
    } catch (error) {
      throw error;
    }
  }
  
  async createEmployeeAsync(employee) {
    try {
      const newEmployee = await this.createEmployee(employee);
      return newEmployee;
    } catch (error) {
      throw error;
    }
  }
  
  async deleteEmployeeAsync(id) {
    try {
      const result = await this.deleteEmployee(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default new EmployeeServiceAjax();
