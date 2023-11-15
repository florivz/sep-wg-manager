import React, { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Header from '../components/Header';
import axios from 'axios';

const ShoppingList = () => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    axios.get('http://localhost:5001/api/getItems')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.log('Error occurred', error);
      });
  };

  const addItem = () => {
    if (newItem.trim() !== '') {
      const newItemObject = { itemname: newItem.trim() };
      axios.post('http://localhost:5001/api/addShoppingListItem', newItemObject)
        .then(response => {
          setItems([...items, response.data]);
          setNewItem('');
        })
        .catch(error => {
          console.log('Error occurred while adding item:', error);
        });
    }
  };

  const removeItem = (itemId) => {
    const parsedItemId = parseInt(itemId, 10);
    console.log(parsedItemId);
    axios.get(`http://localhost:5001/api/deleteShoppingListItem/${parsedItemId}`)
      .then(response => {
        setItems(items.filter(item => item.itemid !== parsedItemId));
        console.log(`Item with ID: ${parsedItemId} has been deleted.`);
      })
      .catch(error => {
        console.log('Error occurred while deleting item:', error);
      });
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
              placeholder="Add new item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className={`btn btn-${newItem.trim() ? 'primary' : 'secondary'}`}
                type="button"
                onClick={addItem}
                disabled={!newItem.trim()}
                title={newItem.trim() ? '' : 'Please enter an item to add'}
                style={{ marginLeft: "15px" }}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          {items.length > 0 ? (
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
            <div className="text-center mt-3 text-muted">Your shopping list is empty. Add some items!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
