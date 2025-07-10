import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useChat } from "../context/ChatContext";

const ASSISTANT_AVATAR = '/assistant-avatar.png'

export default function ChatBanner() {
  const [state, setState] = useState("collapsed");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
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
          className="w-full flex items-center justify-between bg-white/90 text-[#281478] px-5 py-3 rounded-xl font-semibold shadow transition hover:shadow-lg focus:outline-none"
          onClick={() => {
            setState("expanded");
            setTimeout(() => inputRef.current?.focus(), 300);
          }}
        >
          <div className="flex items-center">
            <div className="w-9 h-9 bg-[#ece4ff] rounded-full flex items-center justify-center mr-3 text-[20px]">
              <img
              src={ASSISTANT_AVATAR}
              alt="Assistant"
              className="w-9 h-9 rounded-full mr-3 border border-gray-200 bg-white shadow"
            />
            </div>
            <span className="text-base tracking-wide">Chat to Buy - Ask me anything</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-60" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      ) : (
        <motion.div
          layout
          className="bg-white/95 rounded-xl shadow-md p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center mb-2">
            <div className="w-9 h-9 bg-[#ece4ff] rounded-full flex items-center justify-center mr-3 text-[20px]">
                            <img
              src={ASSISTANT_AVATAR}
              alt="Assistant"
              className="w-9 h-9 rounded-full mr-3 border border-gray-200 bg-white shadow"
            />

            </div>
            <h3 className="font-semibold text-[#281478] text-lg">ShopWise Assistant</h3>
          </div>
          <div className="flex items-center">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              className="flex-1 rounded-l-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 outline-none focus:ring-0 focus:border-[#ac6cff] transition placeholder:text-gray-400"
              placeholder="Ask for product recommendations…"
              style={{
                boxShadow: "none",    // Remove blue glow
                borderRight: "none"
              }}
              autoFocus
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-tr from-[#ac6cff] to-[#6129d9] text-white rounded-r-full px-5 py-2 text-sm font-semibold transition hover:from-[#b388fd] hover:to-[#8264e7] focus:outline-none"
              style={{
                boxShadow: "none"   // Remove blue highlight
              }}
            >
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
