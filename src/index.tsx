import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Router from './middleware/Router';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
