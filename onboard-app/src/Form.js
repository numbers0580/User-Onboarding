import React from 'react';

function Form(props) {
    return (
        <form>
            <div className='formInput'>
				<div><label>Name:</label></div>
				<div><input type="text" /></div>
            </div>
            <div className='formInput'>
				<div><label>Email:</label></div>
				<div><input type="email" /></div>
            </div>
            <div className='formInput'>
				<div><label>Password:</label></div>
				<div><input type="password" /></div>
            </div>
            <div className='tosInput'>
				<div><label>I agree to the <a href="">Terms of Service</a>:</label></div>
				<div><input type="checkbox" /></div>
            </div>
            <button>Submit</button>
        </form>
    );
};

export default Form;