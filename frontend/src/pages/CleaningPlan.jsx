import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';

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

  const [text, setText] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/getShoppingList')
      .then(response => {
        if (Array.isArray(response.data)) {
          setText(response.data);
          console.log(response.data);
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Header text='WG Manager' />
      <div className="container my-5">
        <h1 className="text-center mb-4">Cleaning Schedule</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <h5 className="mb-3">Add a Roommate and their Task:</h5>
          <form onSubmit={addRoommate} className="mb-4">
            <div className="form-row">
              <div className="col">
                <input type="text" className="form-control" placeholder="Roommate Name" />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Task" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Add Task
            </button>
          </form>
  
          <h5 className="mb-3">Current Assignments:</h5>
          <ul className="list-group list-group-flush">
            {text.map((task, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <span className="mr-2">Task ID: {task.taskid}</span>
                  <span>Task: {task.task}</span>
                </div>
                <div>
                  <span className="mr-2">Roommate ID: {task.roommateid}</span>
                </div>
                <div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={`taskCheckbox${index}`}
                      checked={task.done}
                      readOnly
                    />
                    <label className="form-check-label" htmlFor={`taskCheckbox${index}`}>
                      {task.done ? 'Done' : 'Not Done'}
                    </label>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
}

export default CleaningSchedule;
