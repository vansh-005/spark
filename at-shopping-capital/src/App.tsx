import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Missions from './pages/Missions';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { ChatProvider } from './context/ChatContext';
import ChatPanel from './components/ChatPanel';

function App() {
  return (
    <CartProvider>
      <ChatProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
            <Footer />
            <ChatPanel />
          </div>
        </Router>
      </ChatProvider>
    </CartProvider>
  );
}

export default App;