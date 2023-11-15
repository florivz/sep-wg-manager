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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newRoommate.firstname && newRoommate.lastname && newRoommate.email) {
      setRoommates([...roommates, newRoommate]);
      setNewRoommate({
        roommateid: '',
        firstname: '',
        lastname: '',
        email: ''
      });
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5001/api/getAllRoommates', {
      firstname: firstname,
      lastname: lastname,
      email: email
    })
      .then((response) => {
        setRoommates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchRoommates = () => {
    axios.get('http://localhost:5001/api/getAllRoommates')
      .then((response) => {
        setRoommates(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteRoommate = (id) => {
    axios.delete(`http://localhost:5001/api/deleteRoommate/${id}`,
    )
      .then((response) => {
        fetchRoommates();
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const addNewRoommate = (firstname, lastname, email) => {
    axios.post('http://localhost:5001/api/addNewRoommate', {
      firstname: firstname,
      lastname: lastname,
      email: email
    })
      .then((response) => {
        fetchRoommates();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Header text='WG Manager' />
      <div className="container my-5">
        <h1 className="text-center mb-4">Mitbewohnerverwaltung</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="firstname">First Name:</label>
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
                <label htmlFor="lastname">Last Name:</label>
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
            <button type="submit" className="btn btn-primary" style={{ marginTop: "20px", marginBottom: "20px" }}
              onClick={() => addNewRoommate(newRoommate.firstname, newRoommate.lastname, newRoommate.email)}
            >
              Add Roommate
            </button>
            <h4>Number of Roommates: {roommates.length}</h4>
          </form>

          <ul className="list-group mt-4">
            {roommates.map((roommate, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
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
                  Remove
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
