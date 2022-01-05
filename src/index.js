import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
    <Router>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Router>,
  document.getElementById('root')
);