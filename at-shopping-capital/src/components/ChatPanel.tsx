import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import { useCart } from '../context/CartContext';
import { useState, useRef, useEffect } from 'react';

interface ChatProductCardProps {
  item: any;
  onAddToCart: (item: any) => void;
}

const ChatProductCard = ({ item, onAddToCart }: ChatProductCardProps) => {
  const [added, setAdded] = useState(false);
  
  const handleAddToCart = () => {
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start">
        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-3">
          {item.imageURL ? (
            <img 
              src={item.imageURL} 
              alt={item.item_name} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium text-sm line-clamp-2">{item.item_name}</h3>
          <p className="text-xs text-gray-500 mt-1">{item.quantity}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-blue-600">₹{item.estimated_price_inr}</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`px-3 py-1 text-xs rounded-full ${
                added 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
              disabled={added}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </motion.button>
          </div>
        </div>
      </div>
      
      {item.sustainability?.co2_impact && (
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <span>CO₂: {item.sustainability.co2_impact}</span>
        </div>
      )}
    </motion.div>
  );
};

export default function ChatPanel() {
  const { isOpen, closeChat, messages } = useChat();
  const { addToCart } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: `${item.item_name}-${Date.now()}`,
      name: item.item_name,
      price: item.estimated_price_inr,
      quantity: 1,
      image: item.imageURL || ''
    });
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      // Would normally call sendMessage here
      setInputValue('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Shopping Assistant</h2>
            <button onClick={closeChat} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-white border border-gray-200 rounded-bl-none'
                }`}>
                  {message.content}
                </div>
                
                {message.items && message.sender === 'ai' && (
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    {message.items.map((item, index) => (
                      <ChatProductCard 
                        key={index} 
                        item={item} 
                        onAddToCart={handleAddToCart} 
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white rounded-r-lg px-4 py-2 font-medium hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}