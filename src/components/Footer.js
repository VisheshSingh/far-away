export default function Footer({ items }) {
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
