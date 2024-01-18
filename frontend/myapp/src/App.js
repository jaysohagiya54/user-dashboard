// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userlist from './components/Userlist';
import Userdetails from './components/UserDetails';
import './App.css';
import CreateUser from './components/CreateUser'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact Component={Userlist} />
          <Route path="/user/:id" Component={Userdetails} /> 
          <Route path="/create" Component={CreateUser} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
