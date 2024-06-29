import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DepartmentList from './DepartmentList';
import Home from './Home';
import YearList from './YearList';
import YearWiseStdDetails from './YearWiseStdDetails';
import DepWiseStdDetails from './DeptWiseStdDetails';
import UpdateStudents from './UpdateStudents';
import AddStudents from './AddStudents';
import Navbar from './Navbar';
import YearAndDept from './YearAndDept';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/AddStudent' element={<AddStudents />} />
          <Route path='/department' element={<DepartmentList />} />
          <Route path='/department/:department' element={<DepWiseStdDetails />} />
          <Route path='/year' element={<YearList />} />
          <Route path='/year/:year' element={<YearWiseStdDetails />} />
          <Route path='/updateStudent/:id' element={<UpdateStudents />} />
          <Route path='/yearAndDept/' element={<YearAndDept/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
