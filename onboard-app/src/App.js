import React, {useState, useEffect} from 'react';
import Form from './Form';
import axios from 'axios';
import * as yup from 'yup';
//import logo from './logo.svg';
//import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Add New User</h2>
      <Form />
    </div>
  );
}

export default App;
