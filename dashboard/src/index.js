import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "../src/components/Login";

import {UserProvider} from '../src/components/UserContext'; // Import the UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Home />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
