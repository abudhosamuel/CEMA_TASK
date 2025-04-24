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
    <div>
      <h2>Register New Client</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Client Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterClient;
