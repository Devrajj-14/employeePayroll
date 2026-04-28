import React, { useState, useEffect } from 'react';
import './home.scss';
import Display from '../components/display/display';
import employeeService from '../services/employeeService';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useBackend, setUseBackend] = useState(true);

  // Load employees from backend
  const loadEmployees = async () => {
    if (!useBackend) return;
    
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

  useEffect(() => {
    loadEmployees();
  }, [useBackend]);

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

  return (
    <div className="home-container">
      <h1>Hello from BridgeLabz</h1>
      <p>Welcome to Employee Payroll Application</p>
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <Display employees={employees} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Home;
