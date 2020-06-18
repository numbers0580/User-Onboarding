import React, {useState, useEffect} from 'react';
import Form from './Form';
//import formSchema from '../validation/formSchema';
import axios from 'axios';
import {v4} from 'uuid';
import * as yup from 'yup';
//import logo from './logo.svg';
//import './App.css';

const defaultValues = {uName: '', uEmail: '', uPass: '', tosAccept: false};
const defaultErrors = {uName: '', uEmail: '', uPass: '', tosAccept: ''};

const initUsers = [];
const initDisabled = true;

const formSchema = yup.object().shape({
  uName: yup
    .string()
    .min(4, "Username must be at least 4 characters")
    .required("Username is required"),
  uEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("An email address is required"),
  uPass: yup
    .string()
    .min(8, "Passwords must be at least 8 characters long")
    .required("A password is required"),
  tosAccept: yup
    .boolean()
    .oneOf([true], "Have you agreed to the Terms of Service?")
});

function Apptwo() {
  const [users, setUsers] = useState(initUsers);
  const [formEntries, updateEntries] = useState(defaultValues);
  const [formErrors, updateErrors] = useState(defaultErrors);
  const [isDisabled, changeDisabled] = useState(initDisabled);

  const getUsers = function() {
    axios.get('https://reqres.in/api/users')
      .then(fetched => {
        setUsers(fetched.data);
      })
      .catch(errorMsg => {
        debugger
        console.log('Error getting Users');
      })
  };

  const postUsers = function(newUser) {
    debugger
    axios.post('https://reqres.in/api/users', newUser)
      .then(shipped => {
        debugger
        setUsers([...users, shipped.data]);
      })
      .catch(shipError => {
        debugger
        console.log('Error in adding user to List');
      })
      .finally(evt => {
        debugger
        updateEntries(defaultValues);
      })
  };
  console.log('Final test on users', users);
  //So I was successfully able to get the newUser added to the users[] array, but I still can't see it in the api

  const changedInput = function(event) {
    const {name, value} = event.target;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(() => {
        updateErrors({...formErrors, [name]: ""});
      })
      .catch(err => {
        updateErrors({...formErrors, [name]: err.errors[0]});
      })

    updateEntries({...formEntries, [name]: value});
  };

  const checkingBoxes = function(evt) {
    const {name, checked} = evt.target;
    updateEntries({...formEntries, [name]:checked});
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

    postUsers(newEntry);
  };

  useEffect(() => {
    formSchema.isValid(formEntries).then(valid => {
      changeDisabled(!valid);
    })
  }, [formEntries]);

  return (
    <div className="App">
      <h2>Add New User</h2>
      <Form entries={formEntries} inputChange={changedInput} checkboxInput={checkingBoxes} idTenT={formErrors} disability={isDisabled} formSubmit={clickedSubmit}/>
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

export default Apptwo;
