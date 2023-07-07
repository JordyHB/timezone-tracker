import React, {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
// styling
import './App.css';
// pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserProfile from "./pages/userProfile/UserProfile";
import AccountDetails from "./pages/accountdetails/AccountDetails";
import PublicUserProfile from "./pages/publicuserprofile/PublicUserProfile";

// context
import {UserInfoContext} from "./context/UserInfoContextProvider";
import GroupOverview from "./pages/groupoverview/GroupOverview";


function App() {

    // get the user info and check if the user has completed the account setup
    const { user, isAuth } = useContext(UserInfoContext)
    const accountSetupComplete = user?.accountSetupComplete

  return (

    <div className="App">
        <Routes>
            <Route path='/' element={<Home/>}/>

            <Route path='/login' element={
                // if the user is authenticated, redirects the user to the profile page
                isAuth ? <Navigate to="/profile/myprofile"/> : <Login/>
            }/>
            <Route path='/signup' element={
                // if the user is authenticated, redirects the user to the profile page
                isAuth ? <Navigate to="/profile/myprofile"/> : <Register/>
            }/>

            <Route path='/profile/myprofile' element={
                // if the user is authenticated, checks if the user has completed the account setup
                isAuth ?
                    accountSetupComplete ? <UserProfile/> : <Navigate to="/account-details"/>
                    :
                    <Login/>
            }/>
            <Route path='/profile' element={
                //if the user is authenticated, redirects the user to the profile page
                isAuth ? <Navigate to="/profile/myprofile"/> : <Navigate to="/login"/>
            }/>
            <Route path='/profile/:id' element={
                // links to other user profiles
                <PublicUserProfile/>
            }/>
            <Route path='/groups/:id' element={
                // links to group pages
                <GroupOverview/>
            }/>
            <Route path='/account-details' element={
                // if the user is authenticated, blocks the user from accessing this page if the account setup is complete
                isAuth ?
                    accountSetupComplete ? <Navigate to="/profile/myprofile"/> : <AccountDetails/>
                    :
                    <Login/>
            }/>
            <Route path='*' element={<h1>404 Not Found</h1>}/>
        </Routes>
    </div>
  );
}

export default App;
