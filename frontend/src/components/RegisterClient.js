import React, { useState } from 'react';
import axios from 'axios';

function RegisterClient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/clients', null, {
        params: { name, age }
      });
      alert('Client Registered Successfully!');
      setName('');
      setAge('');
    } catch (err) {
      alert('Error registering client');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register New Client</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Client Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default RegisterClient;
