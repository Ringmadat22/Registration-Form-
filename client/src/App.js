import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'; // Import Routes instead of Switch
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes> {/* Use Routes component */}
        <Route path="/" element={<Home />} /> {/* Use "element" prop instead of "component" */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
