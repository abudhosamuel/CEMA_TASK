import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function RegisterClient() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/clients`, null, {
        params: { name, age }
      });
      setMessage('Client registered successfully!');
      setMessageType('success');
      setName('');
      setAge('');
    } catch (err) {
      setMessage('Failed to register client.');
      setMessageType('danger');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Register New Client</h2>
      {message && <div className={`alert alert-${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <input type="text" className="form-control mb-3" placeholder="Client Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" className="form-control mb-3" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}

export default RegisterClient;
