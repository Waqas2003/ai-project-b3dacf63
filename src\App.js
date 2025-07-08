import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setItems(data));
  }, []);

  const handleAddToCart = (item) => {
    setCart((prevCart) => ({ ...prevCart, [item.id]: (prevCart[item.id] || 0) + 1 }));
    setTotal((prevTotal) => prevTotal + item.price);
  };

  const handleRemoveFromCart = (item) => {
    setCart((prevCart) => ({ ...prevCart, [item.id]: (prevCart[item.id] || 0) - 1 }));
    setTotal((prevTotal) => prevTotal - item.price);
  };

  return (
    <div className="app">
      <header>
        <h1>POS System</h1>
      </header>
      <main>
        <section className="items">
          {items.map((item) => (
            <div key={item.id} className="item">
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </section>
        <section className="cart">
          <h2>Cart</h2>
          <ul>
            {Object.keys(cart).map((itemId) => (
              <li key={itemId}>
                {items.find((item) => item.id === itemId).name} x {cart[itemId]}
                <button onClick={() => handleRemoveFromCart(items.find((item) => item.id === itemId))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Total: ${total.toFixed(2)}</p>
        </section>
      </main>
    </div>
  );
}

export default App;