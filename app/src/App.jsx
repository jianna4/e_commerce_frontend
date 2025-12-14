import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
function App() {
 

  return (
    <div className="flex flex-col min-h-screen">
    <Router>
       <div className="flex flex-col min-h-screen">
        <Header />
        

        {/* Main content grows to push footer down */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Add other routes here */}
          </Routes>
        </main>

        {/* Footer stays at bottom */}
        <Footer />
      </div>
    </Router>
    </div>
  )
}

export default App
