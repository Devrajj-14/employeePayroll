/**
 * UC16: Employee Service Demo using Ajax Callback and Promise in Node.js Terminal
 * 
 * This demonstrates:
 * 1. Callback pattern
 * 2. Promise pattern
 * 3. Async/Await pattern
 * 
 * Run: node demos/employee-service-nodejs.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:3001';
const EMPLOYEES_ENDPOINT = '/employees';

// ============================================
// 1. CALLBACK PATTERN
// ============================================

function getEmployeesWithCallback(callback) {
  console.log('\n=== CALLBACK PATTERN ===');
  console.log('Fetching employees using callback...');
  
  http.get(`${BASE_URL}${EMPLOYEES_ENDPOINT}`, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const employees = JSON.parse(data);
        callback(null, employees);
      } catch (error) {
        callback(error, null);
      }
    });
  }).on('error', (error) => {
    callback(error, null);
  });
}

function createEmployeeWithCallback(employee, callback) {
  console.log('\n=== CALLBACK PATTERN - CREATE ===');
  console.log('Creating employee using callback...');
  
  const postData = JSON.stringify(employee);
  
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: EMPLOYEES_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const newEmployee = JSON.parse(data);
        callback(null, newEmployee);
      } catch (error) {
        callback(error, null);
      }
    });
  });
  
  req.on('error', (error) => {
    callback(error, null);
  });
  
  req.write(postData);
  req.end();
}

function deleteEmployeeWithCallback(id, callback) {
  console.log('\n=== CALLBACK PATTERN - DELETE ===');
  console.log(`Deleting employee ${id} using callback...`);
  
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: `${EMPLOYEES_ENDPOINT}/${id}`,
    method: 'DELETE'
  };
  
  const req = http.request(options, (res) => {
    res.on('end', () => {
      callback(null, { message: 'Employee deleted successfully' });
    });
  });
  
  req.on('error', (error) => {
    callback(error, null);
  });
  
  req.end();
}

// ============================================
// 2. PROMISE PATTERN
// ============================================

function getEmployeesWithPromise() {
  console.log('\n=== PROMISE PATTERN ===');
  console.log('Fetching employees using Promise...');
  
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${EMPLOYEES_ENDPOINT}`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const employees = JSON.parse(data);
          resolve(employees);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function createEmployeeWithPromise(employee) {
  console.log('\n=== PROMISE PATTERN - CREATE ===');
  console.log('Creating employee using Promise...');
  
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(employee);
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: EMPLOYEES_ENDPOINT,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const newEmployee = JSON.parse(data);
          resolve(newEmployee);
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

function deleteEmployeeWithPromise(id) {
  console.log('\n=== PROMISE PATTERN - DELETE ===');
  console.log(`Deleting employee ${id} using Promise...`);
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: `${EMPLOYEES_ENDPOINT}/${id}`,
      method: 'DELETE'
    };
    
    const req = http.request(options, (res) => {
      res.on('end', () => {
        resolve({ message: 'Employee deleted successfully' });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// ============================================
// 3. ASYNC/AWAIT PATTERN
// ============================================

async function getEmployeesWithAsync() {
  console.log('\n=== ASYNC/AWAIT PATTERN ===');
  console.log('Fetching employees using async/await...');
  
  try {
    const employees = await getEmployeesWithPromise();
    return employees;
  } catch (error) {
    throw error;
  }
}

async function createEmployeeWithAsync(employee) {
  console.log('\n=== ASYNC/AWAIT PATTERN - CREATE ===');
  console.log('Creating employee using async/await...');
  
  try {
    const newEmployee = await createEmployeeWithPromise(employee);
    return newEmployee;
  } catch (error) {
    throw error;
  }
}

async function deleteEmployeeWithAsync(id) {
  console.log('\n=== ASYNC/AWAIT PATTERN - DELETE ===');
  console.log(`Deleting employee ${id} using async/await...`);
  
  try {
    const result = await deleteEmployeeWithPromise(id);
    return result;
  } catch (error) {
    throw error;
  }
}

// ============================================
// DEMO EXECUTION
// ============================================

async function runDemo() {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  Employee Service Demo - Node.js Terminal             ║');
  console.log('║  UC16: Ajax Callback and Promise Patterns             ║');
  console.log('╚════════════════════════════════════════════════════════╝');
  
  const testEmployee = {
    name: 'Test Employee',
    gender: 'Male',
    salary: '50000',
    department: ['Engineering']
  };
  
  try {
    // ============================================
    // DEMO 1: CALLBACK PATTERN
    // ============================================
    console.log('\n\n📋 DEMO 1: CALLBACK PATTERN');
    console.log('─────────────────────────────────────────────────────────');
    
    // GET with callback
    getEmployeesWithCallback((error, employees) => {
      if (error) {
        console.error('❌ Error:', error.message);
      } else {
        console.log('✅ Success! Employees fetched:', employees.length);
        console.log('Data:', JSON.stringify(employees, null, 2));
      }
    });
    
    // Wait a bit for callback to complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // POST with callback
    createEmployeeWithCallback(testEmployee, (error, newEmployee) => {
      if (error) {
        console.error('❌ Error:', error.message);
      } else {
        console.log('✅ Success! Employee created:', newEmployee);
        
        // DELETE with callback (cleanup)
        setTimeout(() => {
          deleteEmployeeWithCallback(newEmployee.id, (error, result) => {
            if (error) {
              console.error('❌ Error:', error.message);
            } else {
              console.log('✅ Success! Employee deleted:', result.message);
            }
          });
        }, 500);
      }
    });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // ============================================
    // DEMO 2: PROMISE PATTERN
    // ============================================
    console.log('\n\n📋 DEMO 2: PROMISE PATTERN');
    console.log('─────────────────────────────────────────────────────────');
    
    // GET with Promise
    getEmployeesWithPromise()
      .then(employees => {
        console.log('✅ Success! Employees fetched:', employees.length);
        console.log('Data:', JSON.stringify(employees, null, 2));
        return createEmployeeWithPromise(testEmployee);
      })
      .then(newEmployee => {
        console.log('✅ Success! Employee created:', newEmployee);
        return deleteEmployeeWithPromise(newEmployee.id);
      })
      .then(result => {
        console.log('✅ Success! Employee deleted:', result.message);
      })
      .catch(error => {
        console.error('❌ Error:', error.message);
      });
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // ============================================
    // DEMO 3: ASYNC/AWAIT PATTERN
    // ============================================
    console.log('\n\n📋 DEMO 3: ASYNC/AWAIT PATTERN');
    console.log('─────────────────────────────────────────────────────────');
    
    const employees = await getEmployeesWithAsync();
    console.log('✅ Success! Employees fetched:', employees.length);
    console.log('Data:', JSON.stringify(employees, null, 2));
    
    const newEmployee = await createEmployeeWithAsync(testEmployee);
    console.log('✅ Success! Employee created:', newEmployee);
    
    const deleteResult = await deleteEmployeeWithAsync(newEmployee.id);
    console.log('✅ Success! Employee deleted:', deleteResult.message);
    
    console.log('\n\n╔════════════════════════════════════════════════════════╗');
    console.log('║  Demo completed successfully!                          ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');
    
  } catch (error) {
    console.error('\n❌ Demo failed:', error.message);
    console.error('Make sure JSON Server is running on http://localhost:3001');
  }
}

// Run the demo
if (require.main === module) {
  runDemo();
}

module.exports = {
  getEmployeesWithCallback,
  createEmployeeWithCallback,
  deleteEmployeeWithCallback,
  getEmployeesWithPromise,
  createEmployeeWithPromise,
  deleteEmployeeWithPromise,
  getEmployeesWithAsync,
  createEmployeeWithAsync,
  deleteEmployeeWithAsync
};
