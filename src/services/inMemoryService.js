class InMemoryService {
  constructor() {
    this.employees = [];
    this.nextId = 1;
  }

  // Create
  createEmployee(employee) {
    const newEmployee = {
      id: this.nextId++,
      ...employee,
      createdAt: new Date().toISOString()
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  // Read all
  getAllEmployees() {
    return [...this.employees];
  }

  // Read by ID
  getEmployeeById(id) {
    return this.employees.find(emp => emp.id === id);
  }

  // Update
  updateEmployee(id, updatedData) {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = {
        ...this.employees[index],
        ...updatedData,
        updatedAt: new Date().toISOString()
      };
      return this.employees[index];
    }
    return null;
  }

  // Delete
  deleteEmployee(id) {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      const deleted = this.employees.splice(index, 1);
      return deleted[0];
    }
    return null;
  }

  // Clear all
  clearAll() {
    this.employees = [];
    this.nextId = 1;
  }
}

export default new InMemoryService();
