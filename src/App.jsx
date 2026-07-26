import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Dashboard';
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
            {/* Additional routes will be added here */}
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;