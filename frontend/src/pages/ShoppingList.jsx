import React, { useState } from 'react';
import { FaAd, FaPlus, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';

const ShoppingList = () => {
  const [items, setItems] = useState(['Apples', 'Bananas', 'Oranges']);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem !== '') {
      setItems([...items, newItem]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
      <Header text='WG Manager' />
      <div className="container my-5">
        <h1 className="text-center mb-4">Shopping List</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add new item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className={`btn btn-${newItem ? 'primary' : 'secondary'}`}
                type="button"
                onClick={addItem}
                disabled={!newItem}
                title={newItem ? '' : 'Please enter an item to add'}
                style={{marginLeft: "15px"}}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {items.length > 0 ? (
            <ul className="list-group">
              {items.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {item}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(index)}
                  >
                    {/* Verwende dies, wenn du react-icons in deinem Projekt hast */}
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center mt-3 text-muted">Your shopping list is empty. Add some items!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
