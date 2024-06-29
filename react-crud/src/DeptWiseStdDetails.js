import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './App.css';


function DeptWiseStdDetails(){
    const [stdDetailsDeptWise,setStdDetailsDeptWise] = useState([])
    const navigate = useNavigate();
    const {department} = useParams();
    const [page,setPage] = useState(1);
    const [maxpage,setmaxpage] = useState(0);
    console.log(department);
    useEffect(()=>{
        const fetchDepartment = async() => {
            const response = await axios.get(`http://localhost:8000/studentDetailsInParticularDepartment?department=${department}&page=${page}`);
            setmaxpage(response.data.maxpage);
            setStdDetailsDeptWise(response.data.Students);
            console.log(response.data.Students);
        }
        fetchDepartment();
    },[department,page]);

    const updateInDeptWise = (id) => {
        navigate(`/updateStudent/${id}`, {state:{id}});
    }

    const deleteInDeptWise = async(id,dept) => {
        const response = await axios.delete(`http://localhost:8000/deleteStudentDeptWise/${dept}/${id}`);
        setStdDetailsDeptWise(response.data.Students);
    }

    const pageButtons = [];
    for(let i=1;i<=maxpage;i++)
    {
        pageButtons.push(<button onClick={()=>setPage(i)} className={page === i ? 'active' : ''}>{i}</button>)
    }

    const prevPage = () => {
        if(page>1){
            setPage(page-1)
        }
    }

    const nextPage = () => {
        if(page<maxpage)
        {
            setPage(page+1)
        }
    }
    return(
        
        <div className='App'>
            <h3>DEPARTMENT : <span>{department.toUpperCase()}</span></h3>
            <div className="container">
            { stdDetailsDeptWise.map((std) => (
        <div>
            <h4>Name : {std.name}</h4>
            <h4>Age : {std.age}</h4>
            <h4>RollNo : {std.rollno}</h4>
            <h4>Year : {std.year}</h4>
            <h4>Department : {std.department}</h4>
            <button className='update-button' onClick={()=>updateInDeptWise(std._id)}>UPDATE</button>
            <button className='delete-button' onClick={()=>deleteInDeptWise(std._id,std.department)}>DELETE</button>
        </div>
      ))}  
      </div>
        <div className='pagination-container'>
        <button onClick={prevPage}>Prev</button>
            {pageButtons}
        <button onClick={nextPage}>Next</button>
        </div>
        </div>
    )
};

export default DeptWiseStdDetails;