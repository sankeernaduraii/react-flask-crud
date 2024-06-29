
import axios from 'axios';
import React, { useState } from 'react';
import styles from './AddStudents.module.css';

function AddStudents() {
    const [name,setName] = useState('');
    const [rollno,setRollNo] = useState('');
    const [age,setAge] = useState('');
    const [dept,setDept] = useState('');
    const [year,setYear] = useState('');
    const [message,setMessage] = useState('');
   
    
    const fun = (e) => {
        e.preventDefault();
        if(name === '' || age === '' || rollno === '' || dept === '' || year === '')
        {
            alert("Please enter all the fields");
        }
        else{
            let data = {
                "name": name,
                "rollno": rollno,
                "age" : parseInt(age),
                "department":dept,
                "year" :parseInt(year)
            };
            
            const sendData = async() => {
                const response = await axios.post("http://localhost:8000/addStudent", data);
                console.log(response.data);
                if(response.status === 200){
                    setMessage("Added Successfully!");
                }else{  
                    setMessage("Error in Adding Student");
                }
            } 
            sendData();           
        }
    }
  return (
    <div>
        <h1 className={styles.addStudent}>Add Students</h1>
        <form onSubmit={fun}>
            <label>Name: </label>
            <input type="text"  name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)}/><br/>
            <label>Roll Number: </label>
            <input type="text" name="rollno" id="rollno" value={rollno} onChange={(e)=>setRollNo(e.target.value)}/>
            <label>Age: </label>
            <input type="number" name="age" id="age" value={age} onChange={(e)=>setAge(e.target.value)}/>
            <label>Department: </label>
            <input type="text" name="dept" id="dept" value={dept} onChange={(e)=>setDept(e.target.value)}/>
            <label>Year: </label>
            <input type="number" name="year" id="year" value={year} onChange={(e)=>setYear(e.target.value)}/>
            <input type="submit" value="submit" /><br />
            <span className='message'>{message}</span>
        </form><br /><br /><br />
    </div>
  )

}
export default AddStudents