import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './UpdateStudents.css';

function UpdateStudents() {
    const location = useLocation();
    const stdId = location.state.id;
    const [name, setName] = useState('');
    const [rollno, setRollno] = useState('');
    const [age, setAge] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [m, setMessage] = useState('');
    const [responseStatus, setResponseStatus] = useState('');



    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:8000/findById/${stdId}`);
            console.log(response.data.Result[0]);
            setName(response.data.Result[0].name);   
            setRollno(response.data.Result[0].rollno);
            setAge(response.data.Result[0].age);
            setDepartment(response.data.Result[0].department);
            setYear(response.data.Result[0].year);
        }
        fetch();
    }, [stdId]);

    const fun = (e) => {
        e.preventDefault();
        if (!name || !age || !rollno || !department || !year){
            alert("All fields must be filled");
            return;
        }
        let data = {
            "name":name,
            "age":age,
            "rollno": rollno,
            "year": year,
            "department": department
        };
        const sendData = async() => {
            const response = await axios.put(`http://localhost:8000/updateStudent/${stdId}`,data);
            console.log(response.data);
            if(response.status === 200){
                setMessage("Updated Successfully");
                setResponseStatus("200");
            }
            else{
                setMessage("Failed to Update");
            }
        }
        sendData();
    }

    return (
        <div className='App'>
            <div>
            <h1>Update Student</h1>
             <form onSubmit={fun}>
                <label>Name: </label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <label>Roll Number: </label>
                <input type="text" name="rollno" id="rollno" value={rollno} onChange={(e) => setRollno(e.target.value)} />
                <label>Age: </label>
                <input type="number" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                <label>Department: </label>
                <input type="text" name="dept" id="dept" value={department} onChange={(e) => setDepartment(e.target.value)} />
                <label>Year: </label>
                <input type="number" name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
                <input type="submit" value="Update" /><br />
                <span className={responseStatus === "200" ? "success-message" : "error-message"}>{m}</span>
            </form>
            </div>

        </div>
    )
}

export default UpdateStudents;
