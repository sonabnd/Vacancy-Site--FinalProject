import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Context from './context/context'; 
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import './App.css';
import Details from './pages/Details';
import Service from './pages/Service';
import Contact from './pages/Contact';
import About from './pages/About';
import Apply from './pages/Apply';
import AddPost from './pages/AddPost';


function App() {
  const data = {}; 

  return (
    <div className="app-container">
      <Context.Provider value={data}>
        <div className="navbar-component">
          <Navbar />
        </div>
        <div className="all-components">
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/details/:id' element={<Details/>}/>
            <Route path='/service' element={<Service/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/apply' element={<Apply/>}/>
            <Route path='/add-post' element={<AddPost/>} />
          </Routes>
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;