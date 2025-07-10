import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Missions from './pages/Missions';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import { CartProvider } from './context/CartContext';
import { ChatProvider } from './context/ChatContext';
import ChatPanel from './components/ChatPanel';

function Layout({ children }) {
  const location = useLocation();
  // List all routes where header/footer should be hidden
  const hideHeaderFooter = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {!hideHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {!hideHeaderFooter && <Footer />}
      <ChatPanel />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <ChatProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Layout>
        </Router>
      </ChatProvider>
    </CartProvider>
  );
}

export default App;
