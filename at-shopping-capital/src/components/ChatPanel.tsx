import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '../context/ChatContext';
import { useCart } from '../context/CartContext';
import { useState, useRef, useEffect } from 'react';

// Your avatar icon, use the uploaded image or set your own path
const ASSISTANT_AVATAR = "/assistant-avatar.png"; // put the image in public or src/assets

// Product Card for AI responses (unchanged)
const ChatProductCard = ({ item, onAddToCart }) => {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      className="bg-white rounded-xl border border-gray-100 p-3 flex flex-col shadow-sm"
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
            <span className="font-bold text-indigo-600">₹{item.estimated_price_inr}</span>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`px-3 py-1 text-xs rounded-full ${
                added 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
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
  const { isOpen, closeChat, messages, sendMessage } = useChat();
  const { addToCart } = useCart();
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [pinned, setPinned] = useState(false);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-grow textarea
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 96) + "px";
    }
  }, [inputValue]);

  const handleAddToCart = (item) => {
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
      sendMessage(inputValue.trim());
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
          className="fixed top-0 right-0 h-full w-full max-w-xl bg-white rounded-l-3xl shadow-2xl z-50 flex flex-col border-none"
        >
          {/* Header */}
          <div className="flex items-center px-6 py-4 bg-white border-b border-gray-100 rounded-t-3xl shadow-sm sticky top-0 z-10">
            <img
              src={ASSISTANT_AVATAR}
              alt="Assistant"
              className="w-9 h-9 rounded-full mr-3 border border-gray-200 bg-white shadow"
            />
            <span className="font-bold text-base text-gray-900 flex-1">Shopping Assistant</span>
            <div className="flex items-center gap-1">
              <button onClick={() => setPinned(!pinned)} className="text-gray-400 hover:text-indigo-500 p-1 rounded-full transition" title={pinned ? 'Unpin' : 'Pin'}>
                {pinned ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.414 5l2.829-2.828a1 1 0 111.414 1.414L7.828 6.414 10 8.586V11H8.586l-2.172-2.172-2.829 2.828a1 1 0 11-1.414-1.414L5 7.586V6H6.414z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.707 3.293l7 7a1 1 0 01-1.414 1.414l-1.586-1.586V17a1 1 0 01-1 1H7a1 1 0 01-1-1v-6.879L4.414 11.707A1 1 0 013 10.293l7-7a1 1 0 011.414 0z" />
                  </svg>
                )}
              </button>
              <button onClick={closeChat} className="text-gray-400 hover:text-red-400 p-1 rounded-full transition" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-2xl max-w-[80%] shadow-sm ${
                  message.sender === 'user' 
                    ? 'bg-indigo-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
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
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 rounded-full px-5 py-2 text-sm border border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 bg-gray-50 shadow-sm transition"
                rows={1}
                style={{ minHeight: 40, maxHeight: 96, overflowY: 'auto', resize: 'none' }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                maxLength={512}
              />
              <button
                onClick={handleSend}
                className="ml-1 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm shadow transition hover:from-indigo-600 hover:to-purple-600 active:scale-95"
                style={{ minWidth: 72 }}
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
