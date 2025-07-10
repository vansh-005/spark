import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FlyingItem({ start, end, onComplete }: {
  start: { x: number; y: number };
  end: { x: number; y: number };
  onComplete: () => void;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed z-50"
      initial={{
        x: start.x,
        y: start.y,
        scale: 1
      }}
      animate={{
        x: end.x,
        y: end.y,
        scale: 0.5,
        rotate: 45
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
      </svg>
    </motion.div>
  );
}