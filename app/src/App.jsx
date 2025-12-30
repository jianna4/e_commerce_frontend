import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import Header from './components/Header';
import Footer from './components/Footer';
import CategoryDetail from './pages/CategoryDetail';
import Home from './pages/Home';
import Login  from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
function App() {
 
//#5AB7E6
  return (
    <div className="flex flex-col min-h-screen">
   
       <div className="flex flex-col min-h-screen">
        <Header />
        

        {/* Main content grows to push footer down */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />

            {/* Add other routes here */}
          </Routes>
        </main>

        {/* Footer stays at bottom */}
        <Footer />
      </div>
    
    </div>
  )
}

export default App
