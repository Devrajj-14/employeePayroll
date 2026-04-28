import React, { useState } from 'react';
import './payroll-form.scss';
import inMemoryService from '../services/inMemoryService';

const PayrollForm = ({ onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    salary: '',
    department: []
  });

  const [errors, setErrors] = useState({
    name: '',
    gender: '',
    salary: '',
    department: ''
  });

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!name) return 'Name is required';
    if (!nameRegex.test(name)) return 'Name must be at least 3 characters and contain only letters';
    return '';
  };

  const validateSalary = (salary) => {
    if (!salary) return 'Salary is required';
    if (salary < 0) return 'Salary cannot be negative';
    if (salary < 10000) return 'Salary must be at least 10000';
    return '';
  };

  const validateGender = (gender) => {
    if (!gender) return 'Gender is required';
    return '';
  };

  const validateDepartment = (department) => {
    if (department.length === 0) return 'Please select at least one department';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate on change
    let error = '';
    if (name === 'name') error = validateName(value);
    if (name === 'salary') error = validateSalary(value);
    if (name === 'gender') error = validateGender(value);

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleDepartmentChange = (e) => {
    const { value, checked } = e.target;
    let updatedDepartments;
    if (checked) {
      updatedDepartments = [...formData.department, value];
    } else {
      updatedDepartments = formData.department.filter(dept => dept !== value);
    }
    
    setFormData({
      ...formData,
      department: updatedDepartments
    });

    // Validate department
    setErrors({
      ...errors,
      department: validateDepartment(updatedDepartments)
    });
  };

  const handleSubmit = (e) => {
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

    // Check if there are any errors
    if (nameError || genderError || salaryError || departmentError) {
      alert('Please fix all validation errors before submitting');
      return;
    }

    const newEmployee = inMemoryService.createEmployee(formData);
    console.log('Employee Data:', newEmployee);
    alert('Employee data saved successfully!');
    
    // Notify parent component
    if (onEmployeeAdded) {
      onEmployeeAdded(newEmployee);
    }
    
    // Reset form
    setFormData({
      name: '',
      gender: '',
      salary: '',
      department: []
    });
    setErrors({
      name: '',
      gender: '',
      salary: '',
      department: ''
    });
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
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
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
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
            placeholder="Enter salary"
            className={errors.salary ? 'error-input' : ''}
          />
          {errors.salary && <span className="error-message">{errors.salary}</span>}
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
          {errors.department && <span className="error-message">{errors.department}</span>}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default PayrollForm;
