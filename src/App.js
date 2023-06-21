import React from 'react';
import {  Route, Routes } from 'react-router-dom';
// styling
import './App.css';
// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

function App() {
  return (

    <div className="App">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Register/>}/>
        </Routes>
    </div>
  );
}

export default App;
