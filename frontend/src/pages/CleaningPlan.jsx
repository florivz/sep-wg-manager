import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

function CleaningSchedule() {
  
  const [tasks, setTasks] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [selectedRoommate, setSelectedRoommate] = useState('');
  const [taskText, setTaskText] = useState('');
  const username =  useAuth().user.user.username;

  useEffect(() => {
    // Fetch cleaning tasks and roommates when the component mounts
    fetchCleaningTasks();
    fetchRoommates();
  }, []);

  const fetchCleaningTasks = () => {
    try {
      axios.get(`http://localhost:5001/api/cleaning-tasks/${username}`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            // Update tasks state with fetched data
            setTasks(response.data);
          } else {
            console.error('Data is not an array:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error occurred while fetching cleaning tasks:', error);
        });
    } catch (error) {
      console.error('An error occurred while fetching cleaning tasks:', error);
    }
  };

  const fetchRoommates = () => {
    try {
      axios.get('http://localhost:5001/api/roommates')
        .then((response) => {
          if (Array.isArray(response.data)) {
            // Update roommates state with fetched data
            setRoommates(response.data);
          } else {
            console.error('Data is not an array:', response.data);
          }
        })
        .catch((error) => {
          console.error('Error occurred while fetching roommates:', error);
        });
    } catch (error) {
      console.error('An error occurred while fetching roommates:', error);
    }
  };

  const deleteTask = (taskId) => {
    try {
      const parsedTaskId = parseInt(taskId);
      axios.delete(`http://localhost:5001/api/cleaning-tasks/${parsedTaskId}`)
        .then(response => {
          console.log(`Task with ID ${parsedTaskId} was deleted`);
          // Remove the deleted task from the tasks state
          setTasks((prevTasks) => prevTasks.filter((task) => task.taskid !== parsedTaskId));
        })
        .catch(error => {
          console.error('Error occurred while deleting task:', error);
        });
    } catch (error) {
      console.error('An error occurred while deleting task:', error);
    }
  };

  const addTask = () => {
    try {
      if (selectedRoommate && taskText) {
        const newTask = {
          task: taskText,
          roommateId: selectedRoommate.roommateid,
          username: username
        };
        axios
        .post('http://localhost:5001/api/cleaning-tasks', newTask)
        .then((response) => {
          // Clear input fields and update tasks state with the new task
          setTaskText('');
          setSelectedRoommate('');
          setTasks([...tasks, response.data]);
          
          // After adding a task, fetch the list again
          fetchCleaningTasks();
        })
        .catch((error) => {
          console.error('Error occurred while adding task:', error);
        });
      }
    } catch (error) {
      console.error('An error occurred while adding task:', error);
    }
  }; 

  const roommateName = (roommateId) => {
    // Find the roommate with the given ID and return their full name
    const selectedRoommate = roommates.find((roommate) => roommate.roommateid === roommateId);
    return selectedRoommate ? `${selectedRoommate.firstname} ${selectedRoommate.lastname}` : '';
  };
  
  return (
    <div>
      <Header text="WG Manager" />
      <div className="container my-5">
        <h1 className="text-center mb-4">Putzplan</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <h5 className="mb-3">Neue Aufgabe hinzufügen:</h5>
          <form className="mb-4">
            <div className="form-row">
              <div className="col">
                <select
                  className="form-control"
                  value={selectedRoommate.roommateid}
                  onChange={(e) => {
                    const selectedValue = parseInt(e.target.value);
                    // Find the selected roommate object and set it in state
                    const selectedRoommateObject = roommates.find((roommate) => roommate.roommateid === selectedValue);
                    setSelectedRoommate(selectedRoommateObject);
                  }}
                >
                  <option value="">Mitbewohner/in auswählen</option>
                  {roommates.map((roommate) => (
                    <option
                      key={roommate.roommateid}
                      value={roommate.roommateid}
                    >
                      {roommate.firstname} {roommate.lastname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Aufgabe eingeben"
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
                  Hinzufügen
                </button>
              </div>
            </div>
          </form>
          <h5 className="mb-3">Aktueller Putzplan:</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Aufgabe</th>
                  <th>Mitbewohner/in</th>
                  <th>Entfernen</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.taskid}</td>
                    <td>{task.task}</td>
                    <td>{roommateName(task.roommateid)}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteTask(task.taskid)}
                      >
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
