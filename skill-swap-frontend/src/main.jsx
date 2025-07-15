
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./context/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</AuthProvider>

)
