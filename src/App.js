import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './global.css';
import Home from './home/home';
import PayrollForm from './payroll-form/payroll-form';

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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/payroll">Payroll Form</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home key={refreshKey} />} />
          <Route path="/payroll" element={<PayrollForm onEmployeeAdded={handleEmployeeAdded} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
