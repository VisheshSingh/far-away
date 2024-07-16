import { useState } from 'react';
import './App.css';
import Logo from './components/Logo';
import PackageForm from './components/PackageForm';
import PackageList from './components/PackingList';
import Footer from './components/Footer';

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

  const handleClearList = () => {
    if (window.confirm('Are you sure')) {
      setItems([]);
    }
  };

  return (
    <div className='app'>
      <Logo />
      <PackageForm onAddItems={handleAddItems} />
      <PackageList
        items={items}
        onRemoveItem={handleDeleteItem}
        onToggleItem={handlePackedItem}
        onClearList={handleClearList}
      />
      <Footer items={items} />
    </div>
  );
}

export default App;
