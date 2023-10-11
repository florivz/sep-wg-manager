import React, { useState } from 'react';
import Header from '../components/Header';

function CleaningSchedule() {
  const [roommates, setRoommates] = useState([]);
  const [newRoommate, setNewRoommate] = useState({
    firstName: '',
    lastName: '',
    task: ''
  });

  const addRoommate = (event) => {
    event.preventDefault();
    if (
      newRoommate.firstName &&
      newRoommate.lastName &&
      newRoommate.task
    ) {
      setRoommates([...roommates, newRoommate]);
      setNewRoommate({
        firstName: '',
        lastName: '',
        task: ''
      });
    }
  };

  const deleteRoommate = (index) => {
    const updatedRoommates = [...roommates];
    updatedRoommates.splice(index, 1);
    setRoommates(updatedRoommates);
  };

  return (
    <div>
      <Header text='WG Manager' />
      <div className="container my-5">
        <h1 className="text-center mb-4">Cleaning Schedule</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <h5 className="mb-3">Add a Roommate and their Task:</h5>
          <form onSubmit={addRoommate} className="mb-4">
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={newRoommate.firstName}
                  onChange={(e) =>
                    setNewRoommate({ ...newRoommate, firstName: e.target.value })
                  }
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
                  onChange={(e) =>
                    setNewRoommate({ ...newRoommate, lastName: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="task">Task:</label>
                <input
                  type="text"
                  className="form-control"
                  id="task"
                  value={newRoommate.task}
                  onChange={(e) =>
                    setNewRoommate({ ...newRoommate, task: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mb-3" style={{ marginTop: '10px' }}>
              Add Task
            </button>
          </form>

          <h5 className="mb-3">Current Assignments:</h5>
          <ul className="list-group">
            {roommates.map((roommate, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {roommate.firstName} {roommate.lastName}: {roommate.task}
                <button className="btn btn-danger btn-sm" onClick={() => deleteRoommate(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CleaningSchedule;
