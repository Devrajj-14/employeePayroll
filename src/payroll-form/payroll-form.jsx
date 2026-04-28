import React, { useState } from 'react';
import './payroll-form.scss';

const PayrollForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    salary: '',
    department: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleDepartmentChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        department: [...formData.department, value]
      });
    } else {
      setFormData({
        ...formData,
        department: formData.department.filter(dept => dept !== value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.gender && formData.salary) {
      console.log('Employee Data:', formData);
      // This will be connected to service in next UC
      alert('Employee data saved successfully!');
      // Reset form
      setFormData({
        name: '',
        gender: '',
        salary: '',
        department: []
      });
    } else {
      alert('Please fill all required fields');
    }
  };

  return (
    <div className="payroll-form-container">
      <h2>Employee Payroll Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter employee name"
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleInputChange}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleInputChange}
              />
              Female
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            placeholder="Enter salary"
          />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="HR"
                onChange={handleDepartmentChange}
              />
              HR
            </label>
            <label>
              <input
                type="checkbox"
                value="Sales"
                onChange={handleDepartmentChange}
              />
              Sales
            </label>
            <label>
              <input
                type="checkbox"
                value="Finance"
                onChange={handleDepartmentChange}
              />
              Finance
            </label>
            <label>
              <input
                type="checkbox"
                value="Engineering"
                onChange={handleDepartmentChange}
              />
              Engineering
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default PayrollForm;
