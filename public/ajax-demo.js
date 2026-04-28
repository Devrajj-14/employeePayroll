/**
 * UC17: Browser AJAX Demo JavaScript
 * Demonstrates XMLHttpRequest with Callback, Promise, and Async/Await patterns
 */

const BASE_URL = 'http://localhost:3001';
const API_URL = `${BASE_URL}/employees`;

// Utility function to log output
function log(outputId, message, type = 'info') {
  const output = document.getElementById(outputId);
  const timestamp = new Date().toLocaleTimeString();
  const className = type === 'error' ? 'error' : type === 'success' ? 'success' : 'info';
  output.innerHTML += `<span class="timestamp">[${timestamp}]</span> <span class="${className}">${message}</span>\n`;
  output.scrollTop = output.scrollHeight;
}

function clearLog(outputId) {
  document.getElementById(outputId).innerHTML = '';
}

// ============================================
// DEMO 1: CALLBACK PATTERN
// ============================================

function getAllEmployeesCallback(callback) {
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

function createEmployeeCallback(employee, callback) {
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

function deleteEmployeeCallback(id, callback) {
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

// Demo 1 Functions
function demo1GetEmployees() {
  clearLog('output1');
  log('output1', '🔄 Fetching employees using callback pattern...', 'info');
  
  getAllEmployeesCallback((error, employees) => {
    if (error) {
      log('output1', `❌ Error: ${error.message}`, 'error');
    } else {
      log('output1', `✅ Success! Fetched ${employees.length} employees`, 'success');
      log('output1', JSON.stringify(employees, null, 2), 'info');
    }
  });
}

function demo1CreateEmployee() {
  clearLog('output1');
  const testEmployee = {
    name: 'Callback Test Employee',
    gender: 'Male',
    salary: '45000',
    department: ['Engineering']
  };
  
  log('output1', '🔄 Creating employee using callback pattern...', 'info');
  log('output1', `Data: ${JSON.stringify(testEmployee, null, 2)}`, 'info');
  
  createEmployeeCallback(testEmployee, (error, newEmployee) => {
    if (error) {
      log('output1', `❌ Error: ${error.message}`, 'error');
    } else {
      log('output1', `✅ Success! Employee created with ID: ${newEmployee.id}`, 'success');
      log('output1', JSON.stringify(newEmployee, null, 2), 'info');
    }
  });
}

function demo1DeleteEmployee() {
  clearLog('output1');
  log('output1', '🔄 First, getting all employees to find one to delete...', 'info');
  
  getAllEmployeesCallback((error, employees) => {
    if (error) {
      log('output1', `❌ Error: ${error.message}`, 'error');
      return;
    }
    
    if (employees.length === 0) {
      log('output1', '⚠️ No employees to delete', 'error');
      return;
    }
    
    const employeeToDelete = employees[employees.length - 1];
    log('output1', `🔄 Deleting employee ID: ${employeeToDelete.id}`, 'info');
    
    deleteEmployeeCallback(employeeToDelete.id, (error, result) => {
      if (error) {
        log('output1', `❌ Error: ${error.message}`, 'error');
      } else {
        log('output1', `✅ Success! ${result.message}`, 'success');
      }
    });
  });
}

// ============================================
// DEMO 2: PROMISE PATTERN
// ============================================

function getAllEmployeesPromise() {
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

function createEmployeePromise(employee) {
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

function deleteEmployeePromise(id) {
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

// Demo 2 Functions
function demo2GetEmployees() {
  clearLog('output2');
  log('output2', '🔄 Fetching employees using promise pattern...', 'info');
  
  getAllEmployeesPromise()
    .then(employees => {
      log('output2', `✅ Success! Fetched ${employees.length} employees`, 'success');
      log('output2', JSON.stringify(employees, null, 2), 'info');
    })
    .catch(error => {
      log('output2', `❌ Error: ${error.message}`, 'error');
    });
}

function demo2CreateEmployee() {
  clearLog('output2');
  const testEmployee = {
    name: 'Promise Test Employee',
    gender: 'Female',
    salary: '55000',
    department: ['Sales', 'HR']
  };
  
  log('output2', '🔄 Creating employee using promise pattern...', 'info');
  log('output2', `Data: ${JSON.stringify(testEmployee, null, 2)}`, 'info');
  
  createEmployeePromise(testEmployee)
    .then(newEmployee => {
      log('output2', `✅ Success! Employee created with ID: ${newEmployee.id}`, 'success');
      log('output2', JSON.stringify(newEmployee, null, 2), 'info');
    })
    .catch(error => {
      log('output2', `❌ Error: ${error.message}`, 'error');
    });
}

function demo2DeleteEmployee() {
  clearLog('output2');
  log('output2', '🔄 First, getting all employees to find one to delete...', 'info');
  
  getAllEmployeesPromise()
    .then(employees => {
      if (employees.length === 0) {
        throw new Error('No employees to delete');
      }
      const employeeToDelete = employees[employees.length - 1];
      log('output2', `🔄 Deleting employee ID: ${employeeToDelete.id}`, 'info');
      return deleteEmployeePromise(employeeToDelete.id);
    })
    .then(result => {
      log('output2', `✅ Success! ${result.message}`, 'success');
    })
    .catch(error => {
      log('output2', `❌ Error: ${error.message}`, 'error');
    });
}

function demo2ChainedOperations() {
  clearLog('output2');
  log('output2', '🔄 Starting chained operations demo...', 'info');
  log('output2', '1️⃣ Fetching all employees', 'info');
  
  const testEmployee = {
    name: 'Chained Test Employee',
    gender: 'Male',
    salary: '60000',
    department: ['Finance']
  };
  
  getAllEmployeesPromise()
    .then(employees => {
      log('output2', `✅ Fetched ${employees.length} employees`, 'success');
      log('output2', '2️⃣ Creating new employee', 'info');
      return createEmployeePromise(testEmployee);
    })
    .then(newEmployee => {
      log('output2', `✅ Created employee with ID: ${newEmployee.id}`, 'success');
      log('output2', '3️⃣ Fetching updated employee list', 'info');
      return getAllEmployeesPromise();
    })
    .then(employees => {
      log('output2', `✅ Now have ${employees.length} employees`, 'success');
      log('output2', '✨ Chained operations completed successfully!', 'success');
    })
    .catch(error => {
      log('output2', `❌ Error in chain: ${error.message}`, 'error');
    });
}

// ============================================
// DEMO 3: ASYNC/AWAIT PATTERN
// ============================================

async function demo3GetEmployees() {
  clearLog('output3');
  log('output3', '🔄 Fetching employees using async/await pattern...', 'info');
  
  try {
    const employees = await getAllEmployeesPromise();
    log('output3', `✅ Success! Fetched ${employees.length} employees`, 'success');
    log('output3', JSON.stringify(employees, null, 2), 'info');
  } catch (error) {
    log('output3', `❌ Error: ${error.message}`, 'error');
  }
}

async function demo3CreateEmployee() {
  clearLog('output3');
  const testEmployee = {
    name: 'Async Test Employee',
    gender: 'Female',
    salary: '65000',
    department: ['Engineering', 'Finance']
  };
  
  log('output3', '🔄 Creating employee using async/await pattern...', 'info');
  log('output3', `Data: ${JSON.stringify(testEmployee, null, 2)}`, 'info');
  
  try {
    const newEmployee = await createEmployeePromise(testEmployee);
    log('output3', `✅ Success! Employee created with ID: ${newEmployee.id}`, 'success');
    log('output3', JSON.stringify(newEmployee, null, 2), 'info');
  } catch (error) {
    log('output3', `❌ Error: ${error.message}`, 'error');
  }
}

async function demo3DeleteEmployee() {
  clearLog('output3');
  log('output3', '🔄 First, getting all employees to find one to delete...', 'info');
  
  try {
    const employees = await getAllEmployeesPromise();
    
    if (employees.length === 0) {
      log('output3', '⚠️ No employees to delete', 'error');
      return;
    }
    
    const employeeToDelete = employees[employees.length - 1];
    log('output3', `🔄 Deleting employee ID: ${employeeToDelete.id}`, 'info');
    
    const result = await deleteEmployeePromise(employeeToDelete.id);
    log('output3', `✅ Success! ${result.message}`, 'success');
  } catch (error) {
    log('output3', `❌ Error: ${error.message}`, 'error');
  }
}

async function demo3FullCRUD() {
  clearLog('output3');
  log('output3', '🔄 Starting Full CRUD demo with async/await...', 'info');
  
  const testEmployee = {
    name: 'Full CRUD Test Employee',
    gender: 'Male',
    salary: '70000',
    department: ['Sales']
  };
  
  try {
    // CREATE
    log('output3', '1️⃣ CREATE: Adding new employee', 'info');
    const newEmployee = await createEmployeePromise(testEmployee);
    log('output3', `✅ Created employee with ID: ${newEmployee.id}`, 'success');
    
    // READ
    log('output3', '2️⃣ READ: Fetching all employees', 'info');
    const employees = await getAllEmployeesPromise();
    log('output3', `✅ Total employees: ${employees.length}`, 'success');
    
    // DELETE
    log('output3', `3️⃣ DELETE: Removing employee ID: ${newEmployee.id}`, 'info');
    await deleteEmployeePromise(newEmployee.id);
    log('output3', '✅ Employee deleted successfully', 'success');
    
    // VERIFY
    log('output3', '4️⃣ VERIFY: Fetching updated list', 'info');
    const updatedEmployees = await getAllEmployeesPromise();
    log('output3', `✅ Total employees now: ${updatedEmployees.length}`, 'success');
    
    log('output3', '✨ Full CRUD demo completed successfully!', 'success');
  } catch (error) {
    log('output3', `❌ Error: ${error.message}`, 'error');
  }
}
