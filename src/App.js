import React from 'react';
import {  Route, Routes } from 'react-router-dom';
// styling
import './App.css';
// pages
import Home from "./pages/home/Home";
// components
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (

    <div className="App">
        <Routes>
            <Route path='/' element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
