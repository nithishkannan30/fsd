import React, { useState } from 'react';
import './Styles/Form.css';

const departments = ['HR', 'Engineering', 'Marketing', 'Finance', 'Operations'];

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        department: '',
        dateOfJoining: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]+$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        const phoneRegex = /^\d{10}$/;
    
        if (formData.name.trim() === '') {
            alert('Name cannot be empty.');
            return false;
        }
        if (!nameRegex.test(formData.name)) {
            alert('Name should contain only alphabets and spaces.');
            return false;
        }
        if (formData.email.trim().length === 0) {
            alert('Email cannot be empty.');
            return false;
        }
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        if (!phoneRegex.test(formData.phoneNumber)) {
            alert('Phone number should contain exactly 10 digits.');
            return false;
        }
        if (!formData.department) {
            alert('Please select a department.');
            return false;
        }
        if (!formData.dateOfJoining) {
            alert('Please select a valid date of joining.');
            return false;
        }
        if (formData.role.trim() === '') {
            alert('Role cannot be empty.');
            return false;
        }
        return true;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; 
            
        }

        try {
            const response = await fetch('http://localhost:5000/api/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                handleReset();
            } else {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            phoneNumber: '',
            department: '',
            dateOfJoining: '',
            role: ''
        });
    };

    return (
        <form className="employee-form" onSubmit={handleSubmit}>
            <h2>Add New Employee</h2>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="First and Last Name"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@domain.com"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    pattern="\d{10}"
                    placeholder="10-digit number"
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="dateOfJoining">Date of Joining</label>
                <input
                    type="date"
                    id="dateOfJoining"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="e.g., Manager, Developer"
                    required
                />
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </div>
        </form>
    );
};

export default Form;

