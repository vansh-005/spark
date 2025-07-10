import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useChat } from "../context/ChatContext";

export default function ChatBanner() {
  const [state, setState] = useState<"collapsed" | "expanded">("collapsed");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { openChat, sendMessage } = useChat();

  const handleSend = () => {
    if (inputValue.trim()) {
      openChat();
      sendMessage(inputValue.trim());
      setInputValue("");
      setState("collapsed");
    }
  };

  return (
    <div className="w-full">
      {state === "collapsed" ? (
        <motion.button
          layout
          className="w-full flex items-center justify-between bg-white text-blue-900 px-4 py-3 rounded-lg font-bold shadow-md"
          onClick={() => {
            setState("expanded");
            setTimeout(() => inputRef.current?.focus(), 300);
          }}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              💬
            </div>
            <span>Chat to Buy - Ask me anything</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      ) : (
        <motion.div
          layout
          className="bg-white rounded-lg shadow-md p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              💬
            </div>
            <h3 className="font-bold">Shopping Assistant</h3>
          </div>
          
          <div className="flex items-center">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 rounded-l-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ask for product recommendations..."
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white rounded-r-full px-4 py-2 text-sm font-medium hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}