import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  items?: any[];
}

interface ChatContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (message: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  const sendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: message
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Send to backend
      const response = await fetch('http://127.0.0.1:8000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ required_data: message })
      });

      const data = await response.json();
      console.log('Backend response:', data); 
      // Add AI response
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        content: 'Here are some products I found:',
        items: data.data
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <ChatContext.Provider value={{ isOpen, messages, openChat, closeChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within a ChatProvider');
  return context;
};