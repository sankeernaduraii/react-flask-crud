import React, { useState,useEffect, useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DepartmentList.css'
import { YearsContext } from './DataContext';

function YearList() {
    const years = useContext(YearsContext)
 
  return (
    <div className='App'>
        <h2>YEARS</h2>
        <div class="year-list">
        {years.map((year) => (
            <h4><Link key={year} to={`/year/${year}`} className='year-link'>{year}</Link></h4>
        ))}
        </div>
    </div>
  )
}

export default YearList