import React, { useState } from 'react';
import { registerPatient } from '../db';
import { useDatabaseContext } from '../DbContext';

const initialFormData = {
  name: '',
  dob: '',
  address: '',
  phone: '',
  email: '',
};

function PatientRegistration() {
  const [formData, setFormData] = useState(initialFormData);

  const { isInitialized } = useDatabaseContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e)=> {
    e.preventDefault();

    try {
      await registerPatient(formData);
      setFormData(initialFormData);
      alert('Patient registered successfully');
    } catch (error) {
      console.error('Error registering patient:', error);
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2>Register New Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default PatientRegistration; 