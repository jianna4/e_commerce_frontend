import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
function App() {
 

  return (
    <Router>
       <Header className='header'/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>

      <Footer className='footer'/>
    </Router>
  )
}

export default App
