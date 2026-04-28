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
