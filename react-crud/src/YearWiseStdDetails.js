import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import './App.css';

function YearWiseStdDetails() {
    const {year} = useParams();
    const [page,setPage] = useState(1);
    const [maxpage,setMaxpage] = useState(0);
    const navigate = useNavigate();
    const [YearWiseStdDetails,setYearWiseStdDetails] = useState([]);
    console.log(year);
    useEffect(()=>{
      const fetchDetails = async() => {
        const response = await axios.get(`http://localhost:8000/studentDetailsInParticularYear?year=${year}&page=${page}`);
        setMaxpage(response.data.maxpage);
        setYearWiseStdDetails(response.data.StudentDetails);
        console.log(response.data.StudentDetails);
      }
      fetchDetails();
    },[year,page]);

    const updateyearWise = (id) => {
      navigate(`/updateStudent/${id}`, {state:{id}});
    }

    const deleteYearWise = async(year,id) => {
      const response = await axios.delete(`http://localhost:8000/deleteStudentYearWise/${year}/${id}`);
      setYearWiseStdDetails(response.data.Students);
    }

    const pageButtons = [];
    for(let i=1;i<=maxpage;i++)
    {
      pageButtons.push(<button onClick={()=>setPage(i)} className={page === i ? 'active' : ''}>{i}</button>);
    }

    const prevPage = () => {
      if(page>1)
        {
          setPage(page-1);
        }
    }

    const NextPage = () => {
      if(page<maxpage){
        setPage(page+1);
      }
    }

  return (
    <div className='App'>
    <h3>YEAR : <span>{year}</span></h3>
    <div className="container">
        {YearWiseStdDetails.map((YearWiseStdDetail) => (
        <div>
            <h4>Name : {YearWiseStdDetail.name}</h4>
            <h4>Age : {YearWiseStdDetail.age}</h4>
            <h4>RollNo : {YearWiseStdDetail.rollno}</h4>
            <h4>Department : {YearWiseStdDetail.department}</h4>
            <h4>Year : {YearWiseStdDetail.year}</h4>
            <button className='update-button' onClick={()=>updateyearWise(YearWiseStdDetail._id)}>UPDATE</button>
            <button className='delete-button' onClick={()=>deleteYearWise(YearWiseStdDetail.year,YearWiseStdDetail._id)}>DELETE</button>
        </div>
      ))} 
    </div>
    <div className='pagination-container'>  
      <button onClick={prevPage}>Prev</button>
      {pageButtons}
      <button onClick={NextPage}>Next</button>
    </div>
    </div>
  )
}
export default YearWiseStdDetails