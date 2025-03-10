import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Footer from './components/Footer';
import SignUp from './components/SignUp';
import UserProfile from "./components/UserProfile";
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CustomerCarePage from './pages/CustomerCarePage';
import CheckoutInfoPage from './pages/CheckoutInfoPage';
import HelpPage from './pages/HelpPage';
import EntryPage from './pages/EntryPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/home" element={<MainPage isAuthenticated={isAuthenticated} userId={userId} />} />
          <Route exact path="/" element={<EntryPage />} />
          <Route exact path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />} />
          <Route exact path="/register" element={<SignUpPage />} />
          <Route exact path="/shoppingcart" element={<ShoppingCartPage userId={userId} />} />
          <Route exact path="/checkout" element={<CheckoutInfoPage userId={userId} />} />
          <Route exact path="/customercare" element={<CustomerCarePage />} />
          <Route exact path="/userprofile" element={<UserProfilePage userId={userId}/>} />
          <Route exact path="/help" element={<HelpPage />} />
        </Routes>
        
        {/* Components that are outside of Routes */}
        
        {/* <UserProfile userId={userId} /> */}
      </div>
    </Router>
  );
}

export default App;
