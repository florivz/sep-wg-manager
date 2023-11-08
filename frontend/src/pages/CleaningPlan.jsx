import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';


function CleaningSchedule() {
  const [text, setText] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [selectedRoommate, setSelectedRoommate] = useState('');
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/getAllCleaningTasks')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setText(response.data);
          console.log(response.data);
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error occurred while fetching data:', error);
      });

    axios
      .get('http://localhost:5001/api/getAllRoommates')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setRoommates(response.data);
          console.log(response.data);
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error occurred while fetching roommates:', error);
      });
  }, []);

  const deleteTask = (taskid) => {
    const parsedTaskId = parseInt(taskid);
    axios.get(`http://localhost:5001/api/deleteCleaningTask/${parsedTaskId}`)
      .then(response => {
        console.log(`Task mit der ID ${parsedTaskId} wurde gelöscht`);
        axios
          .get('http://localhost:5001/api/getAllCleaningTasks')
          .then((response) => {
            if (Array.isArray(response.data)) {
              setText(response.data);
            } else {
              console.error('Data is not an array:', response.data);
            }
          })
          .catch((error) => {
            console.error('Error occurred while fetching data:', error);
          });
      })
      .catch(error => {
        console.error('Fehler beim Löschen der Task: ', error);
      });
  }

  const addTask = () => {
    const parsedSelectedRoommate = parseInt(selectedRoommate);
    if (selectedRoommate && taskText) {
      const newTask = {
        task: taskText,
        roommateid: parsedSelectedRoommate,
        done: false,
      };

      axios
        .post('http://localhost:5001/api/addCleaningTask', newTask)
        .then((response) => {
          setText([...text, response.data]);
          setTaskText('');
          setSelectedRoommate('');
          axios
            .get('http://localhost:5001/api/getAllCleaningTasks')
            .then((response) => {
              if (Array.isArray(response.data)) {
                setText(response.data);
                console.log(response.data);
              } else {
                console.error('Data is not an array:', response.data);
              }
            })
            .catch((error) => {
              console.error('Error occurred while fetching data:', error);
            });
        })
        .catch((error) => {
          console.error('Error occurred while adding task:', error);
        });
    }
  };

  return (
    <div>
      <Header text="WG Manager" />
      <div className="container my-5">
        <h1 className="text-center mb-4">Cleaning Schedule</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <h5 className="mb-3">Add a Roommate and their Task:</h5>
          <form className="mb-4">
            <div className="form-row">
              <div className="col">
                <select
                  className="form-control"
                  value={selectedRoommate}
                  onChange={(e) => setSelectedRoommate(e.target.value)}
                >
                  <option value="">Select Roommate</option>
                  {roommates.map((roommate) => (
                    <option key={roommate.roommateid} value={roommate.roommateid}>
                      {roommate.firstname} {roommate.lastname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Task"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                />
              </div>
              <div className="col">
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={() => addTask()}
                >
                  Add Task
                </button>
              </div>
            </div>
          </form>
          <h5 className="mb-3">Current Assignments:</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Task ID</th>
                  <th>Task</th>
                  <th>Roommate ID</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {text.map((task, index) => (
                  <tr key={index}>
                    <td>{task.taskid}</td>
                    <td>{task.task}</td>
                    <td>{task.roommateid}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteTask(task.taskid)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CleaningSchedule;