# Employee Service Demos

This folder contains demonstration files for different patterns of making HTTP requests.

## UC16: Node.js Terminal Demo - Ajax Callback and Promise

**File**: `employee-service-nodejs.js`

### Prerequisites

1. Make sure JSON Server is running:
   ```bash
   npm run server
   ```
   (Should be running on http://localhost:3001)

2. Make sure you're in the project root directory

### How to Run

```bash
node demos/employee-service-nodejs.js
```

### What It Demonstrates

1. **Callback Pattern**
   - Traditional callback-based HTTP requests
   - Error-first callback convention
   - GET, POST, DELETE operations

2. **Promise Pattern**
   - Promise-based HTTP requests
   - `.then()` and `.catch()` chaining
   - Better error handling

3. **Async/Await Pattern**
   - Modern async/await syntax
   - Cleaner, more readable code
   - Try-catch error handling

### Expected Output

The demo will:
1. Fetch all employees (GET)
2. Create a test employee (POST)
3. Delete the test employee (DELETE)

Each operation is demonstrated using all three patterns:
- Callback
- Promise
- Async/Await

### Sample Output

```
╔════════════════════════════════════════════════════════╗
║  Employee Service Demo - Node.js Terminal             ║
║  UC16: Ajax Callback and Promise Patterns             ║
╚════════════════════════════════════════════════════════╝


📋 DEMO 1: CALLBACK PATTERN
─────────────────────────────────────────────────────────

=== CALLBACK PATTERN ===
Fetching employees using callback...
✅ Success! Employees fetched: 3
Data: [...]

=== CALLBACK PATTERN - CREATE ===
Creating employee using callback...
✅ Success! Employee created: {...}

=== CALLBACK PATTERN - DELETE ===
Deleting employee 4 using callback...
✅ Success! Employee deleted: Employee deleted successfully


📋 DEMO 2: PROMISE PATTERN
─────────────────────────────────────────────────────────

=== PROMISE PATTERN ===
Fetching employees using Promise...
✅ Success! Employees fetched: 3
Data: [...]

=== PROMISE PATTERN - CREATE ===
Creating employee using Promise...
✅ Success! Employee created: {...}

=== PROMISE PATTERN - DELETE ===
Deleting employee 5 using Promise...
✅ Success! Employee deleted: Employee deleted successfully


📋 DEMO 3: ASYNC/AWAIT PATTERN
─────────────────────────────────────────────────────────

=== ASYNC/AWAIT PATTERN ===
Fetching employees using async/await...
✅ Success! Employees fetched: 3
Data: [...]

=== ASYNC/AWAIT PATTERN - CREATE ===
Creating employee using async/await...
✅ Success! Employee created: {...}

=== ASYNC/AWAIT PATTERN - DELETE ===
Deleting employee 6 using async/await...
✅ Success! Employee deleted: Employee deleted successfully


╔════════════════════════════════════════════════════════╗
║  Demo completed successfully!                          ║
╚════════════════════════════════════════════════════════╝
```

### Troubleshooting

**Error: connect ECONNREFUSED**
- Make sure JSON Server is running: `npm run server`

**Error: Cannot find module**
- Make sure you're running from the project root directory

**No output or hanging**
- Check if port 3001 is available
- Verify JSON Server is accessible at http://localhost:3001/employees

### Code Structure

```javascript
// 1. Callback Pattern
getEmployeesWithCallback((error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});

// 2. Promise Pattern
getEmployeesWithPromise()
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 3. Async/Await Pattern
async function demo() {
  try {
    const data = await getEmployeesWithAsync();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## Next Steps

See UC17 for browser-based AJAX demonstrations using XMLHttpRequest.


---

## UC17: Browser AJAX Demo - XMLHttpRequest with Promise

**File**: `public/ajax-demo.html` and `public/ajax-demo.js`

### Prerequisites

1. Make sure JSON Server is running:
   ```bash
   npm run server
   ```
   (Should be running on http://localhost:3001)

2. Start the React development server:
   ```bash
   npm start
   ```

### How to Access

Open your browser and navigate to:
```
http://localhost:3000/ajax-demo.html
```

### What It Demonstrates

This is a standalone HTML page that demonstrates pure AJAX (XMLHttpRequest) with three patterns:

1. **Callback Pattern**
   - Traditional XMLHttpRequest with callbacks
   - Error-first callback convention
   - GET, POST, DELETE operations

2. **Promise Pattern**
   - Promise wrapper around XMLHttpRequest
   - `.then()` and `.catch()` chaining
   - Chained operations demo

3. **Async/Await Pattern**
   - Modern async/await syntax
   - Try-catch error handling
   - Full CRUD demo

### Features

- **Interactive Buttons**: Click buttons to execute different operations
- **Real-time Console**: See request/response logs in real-time
- **Color-coded Output**: Success (green), Error (red), Info (blue)
- **Timestamps**: Each log entry shows execution time
- **Multiple Demos**: Compare all three patterns side-by-side

### Available Operations

Each pattern section has buttons for:
- **GET Employees**: Fetch all employees from server
- **POST Employee**: Create a new test employee
- **DELETE Employee**: Delete the last employee
- **Special Demos**: 
  - Promise: Chained operations
  - Async/Await: Full CRUD cycle

### Code Structure

The demo uses pure JavaScript with XMLHttpRequest:

```javascript
// Callback Pattern
function getAllEmployeesCallback(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', API_URL, true);
  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, JSON.parse(xhr.responseText));
    } else {
      callback(new Error(`HTTP Error: ${xhr.status}`), null);
    }
  };
  xhr.send();
}

// Promise Pattern
function getAllEmployeesPromise() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL, true);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`HTTP Error: ${xhr.status}`));
      }
    };
    xhr.send();
  });
}

// Async/Await Pattern
async function demo3GetEmployees() {
  try {
    const employees = await getAllEmployeesPromise();
    console.log(employees);
  } catch (error) {
    console.error(error);
  }
}
```

### Alternative: Using in React Components

The `src/services/employeeServiceAjax.js` file provides the same AJAX functionality that can be imported into React components:

```javascript
import employeeServiceAjax from '../services/employeeServiceAjax';

// Use in React component
async function loadEmployees() {
  try {
    const employees = await employeeServiceAjax.getAllEmployees();
    setEmployees(employees);
  } catch (error) {
    console.error(error);
  }
}
```

### Comparison: AJAX vs Axios

**Current App (Axios)**:
- Simpler API
- Automatic JSON parsing
- Better error handling
- Promise-based by default

**This Demo (XMLHttpRequest)**:
- More control over requests
- Understanding of low-level HTTP
- Manual JSON parsing
- Educational value

### Troubleshooting

**Page not loading**
- Make sure React dev server is running: `npm start`
- Access via: `http://localhost:3000/ajax-demo.html`

**CORS errors**
- JSON Server has CORS enabled by default
- Make sure both servers are running

**No data showing**
- Check if JSON Server is running on port 3001
- Verify `db.json` has employee data
- Check browser console for errors

### Learning Outcomes

After completing this demo, you will understand:
- How XMLHttpRequest works at a low level
- Difference between callback, promise, and async/await
- How to handle HTTP errors properly
- How modern libraries like Axios simplify AJAX
- Promise chaining vs async/await syntax
