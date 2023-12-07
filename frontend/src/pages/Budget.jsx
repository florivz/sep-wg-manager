import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Budget = () => {

  const [expenses, setExpenses] = useState([]);
  const [payer, setPayer] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [roommates, setRoommates] = useState([]); // Initialize as an empty array
  const username = useAuth().user.user.username;

  // Fetch roommates data on component mount
  useEffect(() => {
    fetchRoommates();
    fetchExpenses(); // Fetch expenses data
  }, []);

  async function fetchRoommates() {
    try {
      const response = await axios.get(`http://localhost:5001/api/roommates/${username}`);
      setRoommates(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Function to post a new expense
  const postNewExpense = async (roommateId, amount, description, username) => {
    try {
      roommateId = parseInt(roommateId);
      amount = parseFloat(amount);
      const newExpense = {
        roommateid: roommateId,
        amount: amount,
        description: description,
        username: username
      };
      await axios.post('http://localhost:5001/api/expenses', newExpense);
      fetchExpenses(); // Refresh expenses data
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch expenses data
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/expenses/${username}`);
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete an expense
  const deleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:5001/api/expenses/${expenseId}`);
      fetchExpenses(); // Refresh expenses data
    } catch (error) {
      console.error(error);
    }
  };

// Function to get roommate's full name
const getRoommateName = (id) => {
    const roommate = roommates.find((roommate) => roommate.roommateid === id);
    return roommate ? `${roommate.firstname} ${roommate.lastname}` : '';
};

  return (
    <div>
      <Header text="WG Manager" />
      <div className="container mt-3">
        <h1 className="text-center mb-4">Haushaltsplaner</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postNewExpense(payer, amount, description, username);
          }}
        >
          <div className="form-group">
            <label>Zahler:</label>
            <select
              type="text"
              className="form-control"
              value={payer}
              onChange={(e) => setPayer(e.target.value)}
            >
              <option value="">Zahler auswählen</option>
              {
                roommates.map((roommate) => (
                  <option key={roommate.roommateid} value={roommate.roommateid}>
                    {roommate.firstname} {roommate.lastname}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label>Beschreibung:</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Betrag (€):</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Ausgabe hinzufügen
          </button>
        </form>
        <hr />
        <h3>Expenses:</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Mitbewohner/in</th>
              <th>Preis (€)</th>
              <th>Beschreibung</th>
              <th>Enfernen</th>
            </tr>
          </thead>
          <tbody>
            {expenses.slice(0, 10).map((expense) => (
              <tr key={expense.expenseid}>
                <td>{getRoommateName(expense.roommateid)}</td>
                <td>{expense.amount} €</td>
                <td>{expense.description}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteExpense(expense.expenseid)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
