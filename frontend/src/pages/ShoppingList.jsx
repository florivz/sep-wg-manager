import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ShoppingList = () => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const username = useAuth().user.user.username;

  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch shopping items from the server
  const fetchItems = async () => {
    try {
      console.log("fetching items")
      const response = await axios.get(`http://localhost:5001/api/shopping-items/${username}`);
      setItems(response.data);
    } catch (error) {
      console.error('Error occurred while fetching items:', error);
      setError('Failed to fetch items.');
    }
  };

  // Add a new shopping item
  const addItem = async () => {
    if (newItem.trim() !== '') {
      const newItemObject = { 
        itemname: newItem.trim(), 
        username: username 
      };
      try {
        const response = await axios.post('http://localhost:5001/api/shopping-items', newItemObject);
        setItems([...items, response.data]);
        setNewItem('');
      } catch (error) {
        console.error('Error occurred while adding item:', error);
      }
    }
  };

  // Remove a shopping item
  const removeItem = async (itemId) => {
    const parsedItemId = parseInt(itemId, 10);
    try {
      await axios.delete(`http://localhost:5001/api/shopping-items/${parsedItemId}`);
      setItems(items.filter(item => item.itemid !== parsedItemId));
    } catch (error) {
      console.error('Error occurred while deleting item:', error);
    }
  };

  return (
    <div>
      <Header text='WG Manager' />
      <div className="container my-5">
        <h1 className="text-center mb-4">Einkaufsliste</h1>
        <div className="card p-4 shadow-sm" style={{ borderRadius: '15px' }}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Item hinzufügen"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className={`btn btn-${newItem.trim() ? 'primary' : 'secondary'}`}
                type="button"
                onClick={addItem}
                disabled={!newItem.trim()}
                title={newItem.trim() ? '' : 'Please select an item to add'}
                style={{ marginLeft: "15px" }}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : items.length > 0 ? (
            <ul className="list-group">
              {items.map((item) => (
                <li key={item.itemid} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.itemname}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.itemid)}
                  >
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center mt-3 text-muted">Die Einkaufslist ist momentan leer.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
