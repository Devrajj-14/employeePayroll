import React from 'react';
import './display.scss';

const Display = ({ employees, onDelete }) => {
  return (
    <div className="display-container">
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p className="no-data">No employees found. Add some employees to get started!</p>
      ) : (
        <div className="employee-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Salary</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.gender}</td>
                  <td>${employee.salary}</td>
                  <td>{employee.department.join(', ')}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => onDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Display;
