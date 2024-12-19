import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Form from './Form';

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">
            <button>View Employee List</button>
          </Link>
          <Link to="/add">
            <button>Add Employee</button>
          </Link>
        </nav>
        
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <h1>Employee Details</h1>

                <input
                  type="text"
                  placeholder="Search Employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />

                <table className="employee-table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Department</th>
                      <th>Date of Joining</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan="6">No employees found</td>
                      </tr>
                    ) : (
                      filteredEmployees.map((employee) => (
                        <tr key={employee.id}>
                          {/* <td>{employee.id}</td> */}
                          <td>{employee.name}</td>
                          <td>{employee.email}</td>
                          <td>{employee.phone_number}</td>
                          <td>{employee.department}</td>
                          <td>{new Date(employee.date_of_joining).toLocaleDateString()}</td>
                          <td>{employee.role}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            }
          />
          <Route path="/add" element={<Form />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
