# Employee Payroll Service - JSON Server Demo

## Project Location
The Employee Payroll App is in the current directory: `employeePayroll/`

## Use Cases Implementation

### UC5-UC12: Employee Payroll Features
All employee payroll features are implemented in:
- **Forms**: `src/payroll-form/payroll-form.jsx`
- **Display**: `src/components/display/display.jsx`
- **Home**: `src/home/home.jsx`
- **Service**: `src/services/employeeService.js`
- **Config**: `src/config/config.js`
- **Database**: `db.json` (JSON Server)

## JSON Server Setup

### 1. Start JSON Server
```bash
npm run server
```
This starts the server on: `http://localhost:3001`

### 2. API Endpoints
- **GET** `http://localhost:3001/employees` - Get all employees
- **GET** `http://localhost:3001/employees/:id` - Get employee by ID
- **POST** `http://localhost:3001/employees` - Create new employee
- **PUT** `http://localhost:3001/employees/:id` - Update employee
- **DELETE** `http://localhost:3001/employees/:id` - Delete employee

## Demonstration of GET, POST, DELETE Calls

### 1. GET Request (Fetch All Employees)

**Location**: `src/home/home.jsx` (lines 15-26)

```javascript
const loadEmployees = async () => {
  try {
    setLoading(true);
    const response = await employeeService.getAllEmployees();
    setEmployees(response.data);
  } catch (error) {
    console.error('Error loading employees:', error);
    alert('Failed to load employees from server');
  } finally {
    setLoading(false);
  }
};
```

**How it works:**
1. User navigates to Home page (/)
2. `useEffect` triggers `loadEmployees()`
3. Calls `employeeService.getAllEmployees()`
4. Makes GET request to `http://localhost:3001/employees`
5. Displays employee list in table format

### 2. POST Request (Create Employee)

**Location**: `src/payroll-form/payroll-form.jsx` (lines 87-115)

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validate all fields
  const nameError = validateName(formData.name);
  const genderError = validateGender(formData.gender);
  const salaryError = validateSalary(formData.salary);
  const departmentError = validateDepartment(formData.department);

  setErrors({
    name: nameError,
    gender: genderError,
    salary: salaryError,
    department: departmentError
  });

  if (nameError || genderError || salaryError || departmentError) {
    alert('Please fix all validation errors before submitting');
    return;
  }

  try {
    const response = await employeeService.createEmployee(formData);
    console.log('Employee Data:', response.data);
    alert('Employee data saved successfully!');
    
    if (onEmployeeAdded) {
      onEmployeeAdded(response.data);
    }
    
    // Reset form
    setFormData({
      name: '',
      gender: '',
      salary: '',
      department: []
    });
  } catch (error) {
    console.error('Error saving employee:', error);
    alert('Failed to save employee data');
  }
};
```

**How it works:**
1. User fills the payroll form at `/payroll`
2. Validates: name (min 3 chars), salary (min 10000), gender, department
3. Calls `employeeService.createEmployee(formData)`
4. Makes POST request to `http://localhost:3001/employees`
5. JSON Server auto-generates ID and saves to `db.json`
6. Form resets and user is notified

**Sample POST Data:**
```json
{
  "name": "John Doe",
  "gender": "Male",
  "salary": "50000",
  "department": ["Engineering", "HR"]
}
```

### 3. DELETE Request (Remove Employee)

**Location**: `src/home/home.jsx` (lines 28-38)

```javascript
const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this employee?')) {
    try {
      await employeeService.deleteEmployee(id);
      alert('Employee deleted successfully!');
      loadEmployees(); // Reload the list
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Failed to delete employee');
    }
  }
};
```

**How it works:**
1. User clicks "Delete" button on employee row
2. Confirmation dialog appears
3. If confirmed, calls `employeeService.deleteEmployee(id)`
4. Makes DELETE request to `http://localhost:3001/employees/:id`
5. JSON Server removes employee from `db.json`
6. List refreshes automatically

## Testing the Service

### Step 1: Start the Servers

**Terminal 1 - JSON Server:**
```bash
npm run server
```
Output:
```
JSON Server is running on http://localhost:3001
```

**Terminal 2 - React App:**
```bash
npm start
```
Output:
```
Compiled successfully!
Local: http://localhost:3000
```

### Step 2: Test POST (Create Employee)

1. Navigate to `http://localhost:3000/payroll`
2. Fill the form:
   - Name: "Alice Johnson"
   - Gender: Female
   - Salary: 60000
   - Department: Engineering, Finance
3. Click "Submit"
4. Check `db.json` - new employee added with auto-generated ID

### Step 3: Test GET (View Employees)

1. Navigate to `http://localhost:3000/`
2. Employee list displays all employees from JSON Server
3. Open browser DevTools → Network tab
4. See GET request to `http://localhost:3001/employees`
5. Response shows all employees in JSON format

### Step 4: Test DELETE (Remove Employee)

1. On Home page, click "Delete" on any employee
2. Confirm deletion
3. Employee removed from list
4. Check `db.json` - employee no longer exists
5. In DevTools Network tab, see DELETE request

## Service Implementation Details

### employeeService.js Structure

```javascript
class EmployeeService {
  // GET - Fetch all employees
  getAllEmployees() {
    return axios.get(API_URL);
  }

  // GET - Fetch single employee
  getEmployeeById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // POST - Create new employee
  createEmployee(employee) {
    return axios.post(API_URL, employee);
  }

  // PUT - Update employee
  updateEmployee(id, employee) {
    return axios.put(`${API_URL}/${id}`, employee);
  }

  // DELETE - Remove employee
  deleteEmployee(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}
```

### Configuration (config.js)

```javascript
export const BASE_URL = 'http://localhost:3001';
export const EMPLOYEES_ENDPOINT = '/employees';
```

## Data Flow

```
User Action → React Component → Employee Service → Axios → JSON Server → db.json
                                                                ↓
User sees result ← React Component ← Response ← Axios ← JSON Server
```

## Sample db.json After Operations

```json
{
  "employees": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "gender": "Female",
      "salary": "60000",
      "department": ["Engineering", "Finance"]
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "gender": "Male",
      "salary": "55000",
      "department": ["Sales", "HR"]
    },
    {
      "id": 3,
      "name": "Carol White",
      "gender": "Female",
      "salary": "70000",
      "department": ["Engineering"]
    }
  ]
}
```

## Verification Checklist

✅ JSON Server running on port 3001
✅ React app running on port 3000
✅ GET request fetches all employees
✅ POST request creates new employee with validation
✅ DELETE request removes employee with confirmation
✅ Data persists in db.json
✅ UI updates automatically after operations
✅ Error handling for failed requests
✅ Loading states during API calls

## Browser DevTools Testing

### Check Network Tab:
1. Open DevTools (F12)
2. Go to Network tab
3. Perform actions (add/delete employee)
4. See actual HTTP requests:
   - Method: GET, POST, DELETE
   - URL: http://localhost:3001/employees
   - Status: 200, 201, 204
   - Response data

### Check Console:
- Success messages logged
- Error messages if API fails
- Employee data objects

## Common Issues & Solutions

**Issue**: JSON Server not starting
**Solution**: Check if port 3001 is available, or change port in config.js

**Issue**: CORS errors
**Solution**: JSON Server has CORS enabled by default, ensure both servers are running

**Issue**: Data not persisting
**Solution**: Check db.json file permissions and location

**Issue**: 404 errors
**Solution**: Verify BASE_URL and EMPLOYEES_ENDPOINT in config.js

## Next Steps

To integrate with Spring Boot backend:
1. Update `src/config/config.js`
2. Change BASE_URL to Spring Boot server
3. Ensure Spring Boot has CORS configured
4. See `SPRING_BOOT_INTEGRATION.md` for details
