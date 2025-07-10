// Add to top of file
import { useState, useRef } from 'react';
import FlyingItem from './FlyingItem';

// Add inside component
const [flying, setFlying] = useState(false);
const [startPos, setStartPos] = useState({ x: 0, y: 0 });
const buttonRef = useRef<HTMLButtonElement>(null);

const handleAddToCart = () => {
  if (buttonRef.current) {
    const rect = buttonRef.current.getBoundingClientRect();
    setStartPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
    setFlying(true);
  }
  
  setTimeout(() => {
    onAddToCart(item);
    setAdded(true);
  }, 1000);
};

// Add before return
const cartIconPos = { x: window.innerWidth - 50, y: 20 };

// Add to return JSX
{flying && (
  <FlyingItem
    start={startPos}
    end={cartIconPos}
    onComplete={() => setFlying(false)}
  />
)}

// Update button
<motion.button
  ref={buttonRef}
  // ... existing props
>
  {added ? '✓ Added' : 'Add to Cart'}
</motion.button>