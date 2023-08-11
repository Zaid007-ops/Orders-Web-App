import React, {useState} from 'react';
import '../App.css';

function Form(props) {
  const [title, setTitle] = useState('Mr');
  const [firstName, setFirstName] = useState('Mohammed');
  const [middleName, setMiddleName] = useState('Zaid');
  const [lastName, setLastName] = useState('Mansoor');
  const[productCode, setProductCode] = useState('Fttc8020');
  console.log(props);

  const handleTitleChange =(e)=>{setTitle(e.target.value);}
  const handleFirstNameChange =(e)=>{setFirstName(e.target.value);}
  const handleMiddleNameChange =(e)=>{setMiddleName(e.target.value);}
  const handleLastNameChange =(e)=>{setLastName(e.target.value);}
  const handleProductCodeChange =(e)=>{setProductCode(e.target.value);}

  const handleSubmit =(e)=>{
    const customer = {
      title: title,
      firstName: firstName, 
      middleName: middleName, 
      lastName:lastName
    };

    fetch('https://localhost:7280/api/Orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productCode: productCode,
        customer: customer
      })
    }).then(function(response) {
      console.log(response)
      return response.json();
    });
    e.preventDefault();
  }
  return (
    <div className='Form'>
    <header className='Form-header'>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <h2>Place Order Form</h2>
        <label>Title:</label><br/>
        <input type='text' value={title} required onChange={(e) => {handleTitleChange(e)}} /><br/>
  
        <label>First Name:</label><br/>
        <input type='text' value={firstName} required onChange={(e) => {handleFirstNameChange(e)}} /><br/>
  
        <label>Middle Name:</label><br/>
        <input type='text' value={middleName} required onChange={(e) => {handleMiddleNameChange(e)}} /><br/>
  
        <label>Last Name:</label><br/>
        <input type='text' value={lastName} required onChange={(e) => {handleLastNameChange(e)}} /><br/>

        <label>Produc Code:</label><br/>
        <select onChange={(e) => {handleProductCodeChange(e)}}>
        <option>Select a Product</option>
          {props.products.map((option, index) => {
             return <option key={index} disabled={!option.available}>
              {option.code}
           </option>
          })}
        </select>
  
        <input type = 'submit' value ='Submit' />
  
      </form>
    </header>
    </div>
  );
}
export default Form;