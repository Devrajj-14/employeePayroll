import React from 'react';
import './App.css';
import PayrollForm from './payroll-form/payroll-form';

function App() {
  const message = "Hello from BridgeLabz";
  
  return (
    <div className="App">
      <h1>{message}</h1>
      <PayrollForm />
    </div>
  );
}

export default App;
