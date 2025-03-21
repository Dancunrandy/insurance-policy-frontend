import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PolicyForm from './components/PolicyForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-policy" element={<PolicyForm />} />
        <Route path="/edit-policy/:id" element={<PolicyForm />} />
      </Routes>
    </Router>
  );
};

export default App;