import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [years,setYears] = useState([]);
    const [depts,setDept] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        const retrieveData = async () => {
            let response = await axios.get(`http://localhost:8000/retrieveStudents?page=${page}`);
            setStudents(response.data.Students);
            setMaxPage(response.data.maxpage);
        }
        retrieveData();
    }, [page]);

    useEffect(() => {
        const filteredResults = students.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) || 
            item.department.toLowerCase().includes(search.toLowerCase())
        );
        setResults(filteredResults);
    }, [search, students]);

    useEffect(() => {
        const fetchYear = async() => {
            const response = await axios.get("http://localhost:8000/year");
            setYears(response.data.Years);
        };
        fetchYear();
    },[]);

    
    useEffect(()=>{
        const fetchDepartment = async() => {
            const response = await axios.get('http://localhost:8000/retrieve_departments');
            console.log(response.data.departments);
            setDept(response.data.departments);
        }
        fetchDepartment();
    },[]);



    const deleteHandler = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/deleteStudent/${id}`);
            setStudents(response.data.StudentDetails.std_data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateHandler = async (id) => {
        navigate(`/updateStudent/${id}`, { state: { id } });
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if (page < maxPage) {
            setPage(page + 1);
        }
    };

    const pageButtons = [];
    for (let i = 1; i <= maxPage; i++) {
        pageButtons.push(<button key={i} onClick={() => setPage(i)} className={page === i ? 'active' : ''}>{i}</button>);
    }

    return (
        <div className='App'>
            <div>
                <span className="title">STUDENTS APPLICATION MANAGEMENT SYSTEM</span><br />
                <div className='search-input'>
                    <input type="text" placeholder='SEARCH BY STUDENT DETAILS' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="container">
                {results.map((student) => (
                    <div key={student._id}>
                        <h4>Name: {student.name}</h4>
                        <h4>Age: {student.age}</h4>
                        <h4>RollNo: {student.rollno}</h4>
                        <h4>Department: {student.department}</h4>
                        <h4>Year: {student.year}</h4>
                        <button className='update-button' onClick={() => updateHandler(student._id)}>UPDATE</button>
                        <button className='delete-button' onClick={() => deleteHandler(student._id)}>DELETE</button>
                    </div>
                ))}
            </div>
            <div className='pagination-container'>
                <button onClick={prevPage}>Prev</button>
                {pageButtons}
                <button onClick={nextPage}>Next</button>
            </div>
        </div>
    );
}

export default Home;
