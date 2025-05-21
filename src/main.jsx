import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'


// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  // Disable StrictMode temporarily to prevent double initialization in development
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>``
)
