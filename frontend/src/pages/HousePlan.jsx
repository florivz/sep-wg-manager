import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

const HousePlan = () => {
  const [expenses, setExpenses] = useState([]);
  const [payer, setPayer] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [beneficiariesInput, setBeneficiariesInput] = useState('');

  const addExpense = () => {
    const beneficiaries = beneficiariesInput.split(',').map(name => name.trim());
    // Der Zahler wird zu den Begünstigten hinzugefügt, um den Betrag aufzuteilen
    beneficiaries.push(payer);
    setExpenses([...expenses, { payer, description, amount: parseFloat(amount), beneficiaries }]);
    setPayer('');
    setDescription('');
    setAmount('');
    setBeneficiariesInput('');
  };

  const calculateOwedAmounts = () => {
    let owed = {};
    expenses.forEach(expense => {
      const share = expense.amount / expense.beneficiaries.length;
      expense.beneficiaries.forEach(beneficiary => {
        owed[beneficiary] = (owed[beneficiary] || 0) + share;
      });
      owed[expense.payer] -= expense.amount;
    });
    return owed;
  };

  return (
    <div>
    <Header text='WG Manager' />
    <div className="container mt-3">
      <h2>Haushaltsplan</h2>
      <form onSubmit={(e) => { e.preventDefault(); addExpense(); }}>
        <div className="form-group">
          <label>Zahler:</label>
          <input type="text" className="form-control" value={payer} onChange={e => setPayer(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Bezeichnung:</label>
          <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Betrag (€):</label>
          <input type="number" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Für (Namen durch Komma getrennt):</label>
          <input type="text" className="form-control" value={beneficiariesInput} onChange={e => setBeneficiariesInput(e.target.value)} placeholder="z.B. Maya, Niko, Sven" />
        </div>
        <button type="submit" className="btn btn-primary">Eintragen</button>
      </form>
      <hr />
      <h3>Ausgaben:</h3>
      <ul className="list-group">
        {expenses.map((expense, index) => (
          <li key={index} className="list-group-item">
            {expense.payer} hat {expense.amount}€ für {expense.description} ausgegeben für {expense.beneficiaries.join(', ')}
          </li>
        ))}
      </ul>
      <hr />
      <h3>Schuldverhältnisse:</h3>
      <ul className="list-group">
        {Object.entries(calculateOwedAmounts()).map(([name, amount]) => (
          <li key={name} className="list-group-item">
            {name} {amount > 0 ? `schuldet` : `ist geschuldet`} {Math.abs(amount.toFixed(2))}€
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default HousePlan;
