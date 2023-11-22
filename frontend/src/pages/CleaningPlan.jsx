import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';


function CleaningSchedule() {
  const [tasks, setTasks] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [roommate, setRoommate] = useState([]);
  const [selectedRoommate, setSelectedRoommate] = useState('');
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    fetchCleaningTasks();
    fetchRoommates();
  }, []);

  const fetchCleaningTasks = () => {
    axios
      .get('http://localhost:5001/api/cleaning-tasks')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTasks(response.data);
          console.log("1: ", response.data);
        } else {
          console.error('Data is not an array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error occurred while fetching data:', error);
      });
  };

  const fetchRoommates = () => {
    axios
      .get('http://localhost:5001/api/roommates')
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
  };

  const deleteTask = (taskid) => {
    const parsedTaskId = parseInt(taskid);
    axios.delete(`http://localhost:5001/api/cleaning-tasks/${parsedTaskId}`)
      .then(response => {
        console.log(`Task mit der ID ${parsedTaskId} wurde gelöscht`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.taskid !== parsedTaskId));
      })
      .catch(error => {
        console.error('Fehler beim Löschen der Task: ', error);
      });
  };

  const addTask = () => {
    console.log("SelectedRoommate: ", selectedRoommate.roommateid);
    if (selectedRoommate && taskText) {
      const newTask = {
        task: taskText,
        roommateid: selectedRoommate.roommateid,
      };
      axios
        .post('http://localhost:5001/api/cleaning-tasks', newTask)
        .then((response) => {
          setTaskText('');
          setSelectedRoommate('');
          setTasks([...tasks, response.data]);
          console.log(response.data);

          // Nachdem Sie eine Aufgabe hinzugefügt haben, rufen Sie die Liste erneut ab
          fetchCleaningTasks();
        })
        .catch((error) => {
          console.error('Error occurred while adding task:', error);
        });
    }
  }; 

  const roommateName = (roommateId) => {
    const selectedRoommate = roommates.find((roommate) => roommate.roommateid === roommateId);
    return selectedRoommate ? `${selectedRoommate.firstname} ${selectedRoommate.lastname}` : '';
  };
  

  return (
    <div>
      <Header text="WG Manager" />
      <div className="container my-5">
        <h1 className="text-center mb-4">Putzplan</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <h5 className="mb-3">Hinzufügen einer neuen Aufgabe:</h5>
          <form className="mb-4">
            <div className="form-row">
              <div className="col">
                <select
                  className="form-control"
                  value={selectedRoommate.roommateid} // Setzen Sie den Wert auf die roommateid des ausgewählten Mitbewohners
                  onChange={(e) => {
                    const selectedValue = parseInt(e.target.value);
                    const selectedRoommateObject = roommates.find((roommate) => roommate.roommateid === selectedValue);
                    setSelectedRoommate(selectedRoommateObject); // Setzen Sie den selectedRoommate auf das ausgewählte Mitbewohner-Objekt
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
                  placeholder="Aufgabe einfügen"
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
                  <th>Löschen</th>
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