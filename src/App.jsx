import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import BusinessInsights from './pages/BusinessInsights';
import MyProducts from './pages/MyProducts';
import AddProduct from './pages/AddProduct';
import UserProfile from './pages/UserProfile';
import Reports from './pages/Reports';
import Layout from './components/layout/Layout';
import './index.css';

function App() {
  return (
    <Router>
      <div className="bg-background font-body-md text-on-background min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Authenticated Routes with Layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<BusinessInsights />} />
            <Route path="/products" element={<MyProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/reports" element={<Reports />} />
            {/* Additional routes will be added here */}
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;