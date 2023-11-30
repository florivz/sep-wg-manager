import React, { useState, useEffect } from 'react';
import { useRoommates } from '../contexts/RoommateContext.js';
import Header from '../components/Header';
import axios from 'axios';

function RoommateManagement() {
  const { roommates, setRoommates } = useRoommates();

  const [newRoommate, setNewRoommate] = useState({
    firstname: '',
    lastname: '',
    email: ''
  });

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (newRoommate.firstname && newRoommate.lastname && newRoommate.email) {
      addNewRoommate(newRoommate.firstname, newRoommate.lastname, newRoommate.email);
    }
  };

  // Fetch roommates data on component mount
  useEffect(() => {
    fetchRoommates();
  }, []);

  // Fetch roommates data from the API
  const fetchRoommates = () => {
    axios.get('http://localhost:5001/api/roommates')
      .then((response) => {
        setRoommates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Delete a roommate by ID
  const deleteRoommate = (id) => {
    axios.delete(`http://localhost:5001/api/roommates/${id}`)
      .then(() => {
        fetchRoommates();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Add a new roommate
  const addNewRoommate = (firstname, lastname, email) => {
    axios.post('http://localhost:5001/api/roommates', {
      firstname: firstname,
      lastname: lastname,
      email: email
    })
      .then(() => {
        fetchRoommates();
        // Clear the form
        setNewRoommate({
          firstname: '',
          lastname: '',
          email: ''
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <Header text='Roommate Manager' />
      <div className="container my-5">
        <h1 className="text-center mb-4">Mitbewohnerverwaltung</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="firstname">Vorname:</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={newRoommate.firstname}
                  onChange={(e) => setNewRoommate({ ...newRoommate, firstname: e.target.value })}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="lastname">Nachname:</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={newRoommate.lastname}
                  onChange={(e) => setNewRoommate({ ...newRoommate, lastname: e.target.value })}
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
            <button type="submit" className="btn btn-primary" style={{ marginTop: "20px", marginBottom: "20px" }}>
              Hinzufügen
            </button>
            <h4>Anzahl Mitbewohner/innen: {roommates.length}</h4>
          </form>

          <ul className="list-group mt-4">
            {roommates.map((roommate) => (
              <li key={roommate.roommateid} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span>ID: {roommate.roommateid}</span> <br />
                  <span>Vorname: {roommate.firstname}</span> <br />
                  <span>Nachname: {roommate.lastname}</span> <br />
                  <span>Email: {roommate.email}</span>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteRoommate(roommate.roommateid)}
                >
                  Entfernen
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RoommateManagement;
