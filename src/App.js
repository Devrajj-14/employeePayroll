import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import './global.css';
import Home from './home/home';
import PayrollForm from './payroll-form/payroll-form';
import AddressBook from './components/address-book/AddressBook';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEmployeeAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                🏠 Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/payroll" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                💼 Employee Payroll
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/address-book" 
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                📇 Address Book
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home key={refreshKey} />} />
          <Route path="/payroll" element={<PayrollForm onEmployeeAdded={handleEmployeeAdded} />} />
          <Route path="/address-book" element={<AddressBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
