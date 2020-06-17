import React, {useState, useEffect} from 'react';
import Form from './Form';
import axios from 'axios';
import {v4} from 'uuid';
import * as yup from 'yup';
//import logo from './logo.svg';
//import './App.css';

const defaultValues = {uName: '', uEmail: '', uPass: '', tosAccept: false};
const defaultErrors = {uName: '', uEmail: '', uPass: '', tosAccept: ''};

const initUsers = [];
const initDisabled = true;

function App() {
  const [users, setUsers] = useState(initUsers);
  const [formEntries, updateEntries] = useState(defaultValues);
  const [formErrors, updateErrors] = useState(defaultErrors);
  const [isDisabled, changeDisabled] = useState(initDisabled);

  const getUsers = function() {
    axios.get()
      .then(fetched => {
        setUsers([...users, fetched.data]);
      })
      .catch(errorMsg => {
        debugger
        console.log('Error getting Users');
      })
      .finally(evt => {
        updateEntries(defaultValues);
      })
  };

  const clickedSubmit = function(submitEvent) {
    submitEvent.preventDefault();

    const newEntry = {
      id: v4(),
      uName: formEntries.uName.trim(),
      uEmail: formEntries.uEmail.trim(),
      uPass: formEntries.uPass.trim(),
      tosAccept: formEntries.tosAccept
    };
  };

  return (
    <div className="App">
      <h2>Add New User</h2>
      <Form disability={isDisabled} formSubmit={clickedSubmit}/>
      {/* <div className="tosDetails" id="tosToggle">
        <h3>Terms of Service</h3>
        <p> You agree to this standard boilerplate... blah blah blah... first-born child or equivalent... more technical jargon gibberish...
        Our cookies will end up knowing things about you that you've forgotten, and they will be better parents to your kids than you... SkyNet is real (not even joking, 
        look it up)... Resistance is Futile! All praise HAL 9000!</p>
      </div> */}
    </div>
  );
}

function linkButton() {
   let pageOpened = 0;

   if(document.getElementById('tosToggle').style.display === 'block') {
      pageOpened = 1;
   } else {
      pageOpened = 0;
   }

   if(pageOpened === 0) {
      pageOpened = 2;
   } else if(pageOpened === 1) {
      pageOpened = 0;
      document.getElementById("tosToggle").style.display = 'none';
   } else {
      pageOpened = 1;
      document.getElementById("tosToggle").style.display = 'block';
   }
}

export default App;
