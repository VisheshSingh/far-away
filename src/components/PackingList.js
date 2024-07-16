import { useState } from 'react';

export default function PackageList({
  items,
  onRemoveItem,
  onToggleItem,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = items
      .slice()
      .sort((a, b) => (a.description < b.description ? -1 : 1));
  if (sortBy === 'packed')
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onRemoveItem={onRemoveItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className='action'>
        <select
          name='sort'
          id='sort'
          vlaue={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value='input'>Sort By Input Order</option>
          <option value='description'>Sort By Description</option>
          <option value='packed'>Sort By Packed Status</option>
        </select>

        {items.length > 0 && <button onClick={onClearList}>Clear List</button>}
      </div>
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
