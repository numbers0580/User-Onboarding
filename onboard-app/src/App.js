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

//This section checks entries for required minimums before enabling Submit button
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

//Start of actual App
function App() {
  const [users, setUsers] = useState(initUsers);
  const [formEntries, updateEntries] = useState(defaultValues);
  const [formErrors, updateErrors] = useState(defaultErrors);
  const [isDisabled, changeDisabled] = useState(initDisabled);

  //This function was not even used in this project, but keeping it as reference notes, just in case
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

  //Axios POST
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

  //Again, I was fighting objects passed via axios, so I resorted to passing object to temporary variable to ensure I didn't lose it
  let newUserHolder = users;
  console.log('Final test on users', newUserHolder[0]);

  //This section manages error messages via formSchema above on Line 17
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

  //Once submit button is pressed, this method takes entered values and creates an object to send to POST method on Line 55
  const clickedSubmit = function(submitEvent) {
    submitEvent.preventDefault();

    //Object creation
    const newEntry = {
      id: v4(),
      uName: formEntries.uName.trim(),
      uEmail: formEntries.uEmail.trim(),
      uPass: formEntries.uPass.trim(),
      tosAccept: formEntries.tosAccept
    };

    //POST method call
    postUsers(newEntry);
  };

  //Continuous formSchema check. I watched this in Console. It updates with every key press, even backspaces.
  useEffect(() => {
    formSchema.isValid(formEntries).then(valid => {
      changeDisabled(!valid);
    })
  }, [formEntries]);

  return (
    <div className="App">
      <h2>Add New User</h2>
      <Form entries={formEntries} inputChange={changedInput} checkboxInput={checkingBoxes} idTenT={formErrors} disability={isDisabled} formSubmit={clickedSubmit}/>
      {/* <div className="tosDetails">
        <h3>Terms of Service</h3>
        <p> You agree to this standard boilerplate... blah blah blah... first-born child or equivalent... more technical jargon gibberish...
        Our cookies will end up knowing things about you that even you've forgotten, and they will be better parents to your kids than you... SkyNet is real (not even 
        joking, look it up)... Resistance is Futile! All praise HAL 9000!</p>
      </div> */}
      <div>
        {users.map(patientZero => (
          <UserDetails key={patientZero.id} theUser={patientZero} />
        ))}
      </div>
    </div>
  );
}

function UserDetails({theUser}) {
  const {uName, uEmail, tosAccept} = theUser;
  let tosAnswer = "";

  if(tosAccept) {
    tosAnswer = "true";
  } else {
    tosAnswer = "false";
  }

  return (
    <div className="userCard">
      <h3>Username: {uName}</h3>
      <p>Email: {uEmail}</p>
      <p>Password: This has been encrypted, locked, shaken not stirred, pureed, and deep-fried for the user's protection.</p>
      <p>Has user accepted our Overlord's draconian Terms of Service? {tosAnswer}</p>
      <br />
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
