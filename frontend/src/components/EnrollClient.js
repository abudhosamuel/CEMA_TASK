import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function EnrollClient() {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    async function fetchData() {
      const clientRes = await axios.get(`${API_BASE_URL}/clients`);
      const programRes = await axios.get(`${API_BASE_URL}/programs`);
      setClients(clientRes.data);
      setPrograms(programRes.data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = clients.find(c => c.name === selectedClient);
    const program = programs.find(p => p.name === selectedProgram);

    if (!client || !program) {
      setMessage(' Please select valid client and program');
      setMessageType('danger');
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/clients/${client.id}/enroll`, null, {
        params: { program_id: program.id }
      });
      setMessage(`✅ Enrolled ${client.name} in ${program.name}`);
      setMessageType('success');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setMessage(`❌ ${client.name} is already enrolled in ${program.name}`);
      } else {
        setMessage('❌ Enrollment Failed');
      }
      setMessageType('danger');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Enroll Client in Program</h2>
      {message && <div className={`alert alert-${messageType}`}>{message}</div>}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <select className="form-select mb-3" value={selectedClient} onChange={e => setSelectedClient(e.target.value)} required>
          <option value="">-- Select Client --</option>
          {clients.map(client => (
            <option key={client.id} value={client.name}>{client.name}</option>
          ))}
        </select>
        <select className="form-select mb-3" value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)} required>
          <option value="">-- Select Program --</option>
          {programs.map(program => (
            <option key={program.id} value={program.name}>{program.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary w-100">Enroll Client</button>
      </form>
    </div>
  );
}

export default EnrollClient;
