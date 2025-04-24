import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EnrollClient() {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');  // 'success' or 'danger'

  useEffect(() => {
    async function fetchData() {
      try {
        const clientRes = await axios.get('http://127.0.0.1:8000/clients');
        const programRes = await axios.get('http://127.0.0.1:8000/programs');
        setClients(clientRes.data);
        setPrograms(programRes.data);
      } catch (err) {
        setMessage('Error fetching clients or programs');
        setMessageType('danger');
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const client = clients.find(c => c.name === selectedClient);
    const program = programs.find(p => p.name === selectedProgram);

    if (!client || !program) {
      setMessage('Please select valid client and program');
      setMessageType('danger');
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:8000/clients/${client.id}/enroll`, null, {
        params: { program_id: program.id }
      });
      setMessage(`Successfully enrolled ${client.name} in ${program.name}`);
      setMessageType('success');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setMessage(`${client.name} is already enrolled in ${program.name}`);
      } else if (err.response && err.response.status === 404) {
        setMessage('Client or Program not found');
      } else {
        setMessage('Enrollment Failed due to server error');
      }
      setMessageType('danger');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Enroll Client in Program</h2>
      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Client Name</label>
          <select className="form-select" value={selectedClient} onChange={e => setSelectedClient(e.target.value)} required>
            <option value="">-- Select Client --</option>
            {clients.map(client => (
              <option key={client.id} value={client.name}>{client.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Program Name</label>
          <select className="form-select" value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)} required>
            <option value="">-- Select Program --</option>
            {programs.map(program => (
              <option key={program.id} value={program.name}>{program.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Enroll Client</button>
      </form>
    </div>
  );
}

export default EnrollClient;
