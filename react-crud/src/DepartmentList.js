
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './DepartmentList.css';
import { DeptsContext } from './DataContext';

function DepartmentList() {

   const depts = useContext(DeptsContext);
  return (
    <div className='App'>
       <h2>DEPARTMENT</h2>
      <div class="department-links">
          {depts.map((department) => (
              <Link key={department} to={`/department/${department}`} className="department-link">{department.toUpperCase()}</Link>
          ))}
      </div>
    </div>
  )
}

export default DepartmentList