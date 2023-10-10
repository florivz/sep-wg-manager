import React, { useState } from 'react';
import { useRoommates } from '../contexts/RoommateContext.js'; 

function RoommateManagement() {
    const { roommates, setRoommates } = useRoommates();

    const [newRoommate, setNewRoommate] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newRoommate.firstName && newRoommate.lastName && newRoommate.email) {
      setRoommates([...roommates, newRoommate]);
      setNewRoommate({
        firstName: '',
        lastName: '',
        email: ''
      });
    }
  };

  const removeRoommate = (index) => {
    const newRoommates = [...roommates];
    newRoommates.splice(index, 1);
    setRoommates(newRoommates);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Roommate Management</h1>
      <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={newRoommate.firstName}
                onChange={(e) => setNewRoommate({ ...newRoommate, firstName: e.target.value })}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={newRoommate.lastName}
                onChange={(e) => setNewRoommate({ ...newRoommate, lastName: e.target.value })}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={newRoommate.email}
                onChange={(e) => setNewRoommate({ ...newRoommate, email: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{marginTop: "20px", marginBottom:"20px"}}>
            Add Roommate
          </button>
          <h4>Number of Roommates: {roommates.length}</h4>
        </form>

        <ul className="list-group mt-4">
          {roommates.map((roommate, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {roommate.firstName} {roommate.lastName} - {roommate.email}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeRoommate(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RoommateManagement;
