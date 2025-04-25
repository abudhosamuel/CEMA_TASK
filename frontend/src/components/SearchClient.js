import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function SearchClient() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage('❌ Please enter a client name to search.');
      setMessageType('danger');
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/clients/search/`, { params: { name: query } });
      if (res.data.length === 0) {
        setMessage(`No clients found matching "${query}".`);
        setMessageType('danger');
        setResults([]);
      } else {
        setResults(res.data);
        setMessage(`Found ${res.data.length} client(s) matching "${query}".`);
        setMessageType('success');
      }
    } catch (err) {
      setMessage('❌ Error searching for clients.');
      setMessageType('danger');
      setResults([]);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Search Clients</h2>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Enter client name" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button className="btn btn-secondary" onClick={handleSearch}>Search</button>
      </div>

      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}

      {results.length > 0 && (
        <ul className="list-group">
          {results.map(client => (
            <li key={client.id} className="list-group-item">
              <strong>{client.name}</strong> (Age: {client.age})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchClient;
