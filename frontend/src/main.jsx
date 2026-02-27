import app from './app';
import React from 'react';
import react from 'react';
import reactDom from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </React.StrictMode>
);