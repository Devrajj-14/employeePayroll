import React, { useState } from 'react';
import './home.scss';
import Display from '../components/display/display';
import inMemoryService from '../services/inMemoryService';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(0);

  // Load employees on component mount
  React.useEffect(() => {
    const allEmployees = inMemoryService.getAllEmployees();
    setEmployees(allEmployees);
  }, [refresh]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      inMemoryService.deleteEmployee(id);
      setRefresh(prev => prev + 1); // Trigger re-render
      alert('Employee deleted successfully!');
    }
  };

  return (
    <div className="home-container">
      <h1>Hello from BridgeLabz</h1>
      <p>Welcome to Employee Payroll Application</p>
      <Display employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
