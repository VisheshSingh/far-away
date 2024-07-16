import { useState } from 'react';
import './App.css';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handlePackedItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className='app'>
      <Logo />
      <PackageForm onAddItems={handleAddItems} />
      <PackageList
        items={items}
        onRemoveItem={handleDeleteItem}
        onToggleItem={handlePackedItem}
      />
      <Footer items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function PackageForm({ onAddItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const item = {
      id: Math.random().toString(16).slice(2),
      description,
      quantity,
      packed: false,
    };

    onAddItems(item);
    setQuantity(1);
    setDescription('');
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        name='count'
        id='count'
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackageList({ items, onRemoveItem, onToggleItem }) {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemoveItem={onRemoveItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem, onToggleItem }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Footer({ items }) {
  if (!items.length) {
    return (
      <footer className='stats'>
        <em>Start adding items for your trip 🚀</em>
      </footer>
    );
  }
  const packedItems = items.filter((item) => item.packed);
  const percentPacked =
    Math.floor((packedItems.length / items.length) * 100) || 0;
  return (
    <div className='stats'>
      {percentPacked === 100 ? (
        <em>You are ready to fly! ✈️</em>
      ) : (
        <em>
          💼 You have {items.length} items on your list, and you have already
          packed {packedItems.length} ({percentPacked})%
        </em>
      )}
    </div>
  );
}

export default App;
