import React, {useContext, useEffect, useState} from 'react';
import {  Route, Routes } from 'react-router-dom';
// styling
import './App.css';
// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserProfile from "./pages/userProfile/UserProfile";
import AccountDetails from "./pages/accountdetails/AccountDetails";

function App() {

  return (



    <div className="App">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/profile' element={<UserProfile/>}/>
            <Route path='/accountdetails' element={<AccountDetails/>}/>
            <Route path='*' element={<h1>404 Not Found</h1>}/>
        </Routes>
    </div>
  );
}

export default App;
