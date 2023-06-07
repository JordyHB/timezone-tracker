import React from 'react';
import {  Route, Routes } from 'react-router-dom';
// styling
import './App.css';
// pages
import Home from "./pages/Home";
// components
import NavBar from "./components/NavBar";

function App() {
  return (

    <div className="App">
        <NavBar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
