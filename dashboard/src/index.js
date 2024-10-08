import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from "./components/Home";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

