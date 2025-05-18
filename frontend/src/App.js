import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Context
import { AppProvider } from './context/AppContext';

// Páginas
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';

function App() {
  console.log("Login:", Login);
console.log("Dashboard:", Dashboard);
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;