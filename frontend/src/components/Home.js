import React from 'react';
import bgImage from './bgimage.jpeg';
import '../App.css';

function Home() {
  return (
    <div 
      className="background-container"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="overlay">
        <div className="content-box">
          <h1 className="display-4 mb-4">Health Information System</h1>
          <p className="lead">
            Welcome to the Health Information System. <br />
            Manage clients, health programs, enrollments, and access client profiles with ease.
          </p>
          <hr />
          <p>Select an option from the navigation bar to get started.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
