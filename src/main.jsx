import React from 'react';
import './index.css'
import App from './App.jsx'
import Header from './components/ui/custom/Header'
import { Toaster } from 'sonner'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Header />
    <Toaster />
    <App/>
    </BrowserRouter>
  </React.StrictMode>,
)
