import React,{createContext,useState,useEffect} from 'react'
import axios from 'axios';
export const YearsContext = createContext();
export const DeptsContext = createContext();

function DataContext({children}) {
    const [years,setYears] = useState([]);
    const [depts,setDept] = useState([]);

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


  return (
    <YearsContext.Provider value={years}>
        <DeptsContext.Provider value={depts}>
            {children}
        </DeptsContext.Provider>
    </YearsContext.Provider>
  )
}

export default DataContext