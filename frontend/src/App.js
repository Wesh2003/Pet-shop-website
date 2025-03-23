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
import AdminLoginPage from './pages/AdminLoginPage';
import AdminSignUpPage from './pages/AdminSignUpPage';
import GroomerLoginPage from './pages/GroomerLoginPage';
import GroomerSignUpPage from './pages/GroomerSignUpPage';
import AdminMainPage from './pages/AdminMainPage';
import GroomerMainPage from './pages/GroomerMainPage';
import AdminTaskListPage from './pages/AdminTaskListPage';
import AdminGroomerListPage from './pages/AdminGroomerListPage';
import AdminUserListPage from './pages/AdminUserListPage';
import GroomerShoppingCartPage from './pages/GroomerShoppingCartPage';
import GroomerNavBar from './components/GroomerNavBar';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [GroomerId, setGroomerId] = useState('');
  const [AdminId, setAdminId] = useState('');

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/home" element={<MainPage isAuthenticated={isAuthenticated} userId={userId} />} />
          <Route exact path="/adminhome" element={<AdminMainPage isAuthenticated={isAuthenticated} AdminId={AdminId} />} />
          <Route exact path="/groomerhome" element={<GroomerMainPage isAuthenticated={isAuthenticated} GroomerId={GroomerId} />} />
          <Route exact path="/" element={<EntryPage />} />
          <Route exact path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />} />
          <Route exact path="/register" element={<SignUpPage />} />
          <Route exact path="/adminlogin" element={<AdminLoginPage setIsAuthenticated={setIsAuthenticated} setAdminId={setAdminId} />} />
          <Route exact path="/adminregister" element={<AdminSignUpPage />} />
          <Route exact path="/groomerlogin" element={<GroomerLoginPage setIsAuthenticated={setIsAuthenticated} setGroomerId={setGroomerId} />} />
          <Route exact path="/groomerregister" element={<GroomerSignUpPage />} />
          <Route exact path="/shoppingcart" element={<ShoppingCartPage userId={userId} />} />
          <Route exact path="/groomershoppingcart" element={<GroomerShoppingCartPage GroomerId={GroomerId} />} />
          <Route exact path="/checkout" element={<CheckoutInfoPage userId={userId} />} />
          <Route exact path="/customercare" element={<CustomerCarePage />} />
          <Route exact path="/userprofile" element={<UserProfilePage userId={userId}/>} />
          <Route exact path="/admintasks" element={<AdminTaskListPage />} />
          <Route exact path="/admingroomers" element={<AdminGroomerListPage />} />
          <Route exact path="/adminusers" element={<AdminUserListPage />} />
        </Routes>
        
        {/* Components that are outside of Routes */}
        
        {/* <UserProfile userId={userId} /> */}
      </div>
    </Router>
  );
}

export default App;
