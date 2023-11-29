import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import axios from 'axios';

const Budget = () => {
  const [expenses, setExpenses] = useState([]);
  const [payer, setPayer] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [beneficiariesInput, setBeneficiariesInput] = useState('');
  const [roommates, setRoommates] = useState([]);
  const [selectedRoommates, setSelectedRoommates] = useState([]);
  const [debts, setDebts] = useState([]);
  const [roommateNames, setRoommateNames] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5001/api/roommates')
      .then((response) => {
        setRoommates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('http://localhost:5001/api/debts')
      .then((response) => {
        setDebts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('http://localhost:5001/api/expenses')
      .then((response) => {
        setExpenses(response.data);
        console.log(expenses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const test = () => {
    console.log(payer)
  }

  const postNewExpense = () => {
    const newExpense = {
      roommateid: payer,
      amount: amount,
      description: description
    }
    axios.post('http://localhost:5001/api/expenses', newExpense)
      .then(() => {
        console.log(newExpense.roommateid, newExpense.amount, newExpense.description)
      }
      )
  }

  const getRoommate = (id) => {
    const roommate = roommates.find((roommate) => roommate.roommateid === id);
    console.log(roommate.firstname);
    return roommate.firstname;
  }

  return (
    <div>
      <Header text="WG Manager" />
      <div className="container mt-3">
        <h1 className="text-center mb-4">Haushaltsplan</h1>
        <form onSubmit={(e) => { e.preventDefault(); postNewExpense(); }}>
          <div className="form-group">
            <label>Zahler:</label>
            <select type="text" className="form-control" value={payer} onChange={(e) => setPayer(e.target.value)} >
              <option value="" >Zahler auswählen</option>
              {roommates.map((roommate) => (
                <option key={roommate.roommateid} value={roommate.roommateid}>{roommate.firstname} {roommate.lastname}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Bezeichnung:</label>
            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Betrag (€):</label>
            <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary mt-2" onClick={test}>
            Eintragen
          </button>
        </form>
        <hr />
        <h3>Ausgaben:</h3>
        {expenses.slice(0, 10).map((expense) => (
          <p key={expense.expenseid}>
            {getRoommate(expense.roommateid)} hat {expense.amount}€ für {expense.description} ausgegeben.
          </p>
        ))}
      </div>
    </div>
  );
};

export default Budget;
