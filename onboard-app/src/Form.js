import React from 'react';

function Form(props) {
   const {entries, inputChange, checkboxInput, idTenT, disability, formSubmit} = props;

    return (
        <form className="formulator" onSubmit={formSubmit}>
            <div className='formInput'>
               <div><label>Name:</label></div>
               <div><input type="text" name="uName" value={entries.uName} maxLength="15" onChange={inputChange} /></div>
            </div>
            <div className='formInput'>
               <div><label>Email:</label></div>
               <div><input type="email" name="uEmail" value={entries.uEmail} onChange={inputChange} /></div>
            </div>
            <div className='formInput'>
               <div><label>Password:</label></div>
               <div><input type="password" name="uPass" value={entries.uPass} maxLength="30" onChange={inputChange} /></div>
            </div>
            <div className='tosInput'>
               {/* <div><label>I agree to the <a onClick={linkButton} href="javascript:void(0)">Terms of Service</a>:</label></div> */}
               <div><label>I agree to the <a href="https://www.google.com/search?q=terms+of+service&oq=terms+of+service&aqs=chrome..69i57.2527j0j1&sourceid=chrome&ie=UTF-8">Terms of Service</a>:</label></div>
               <div><input type="checkbox" name="tosAccept" style={{width: '40px', height: '40px'}} checked={entries.tosAccept} onChange={checkboxInput} /></div>
            </div>
            <button type="submit" name="submitBtn" disabled={disability}>Submit</button>
            <div className="tosDetails" id="tosToggle">
               <h3>Terms of Service</h3>
               <p> You agree to this standard boilerplate... blah blah blah... first-born child or equivalent... more technical jargon gibberish...
               Our cookies will end up knowing things about you that you've forgotten, and they will be better parents to your kids than you... SkyNet is real (not even joking, 
               look it up)... Resistance is Futile! All praise HAL 9000!</p>
            </div>
            <div className="errorMessages"></div>
        </form>
    );
};

export default Form;