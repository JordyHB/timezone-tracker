import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import UserContextProvider from "./context/UserInfoContextProvider";
import UserPreferencesContextProvider from "./context/UserPreferencesContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UserContextProvider>
            <UserPreferencesContextProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </UserPreferencesContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
