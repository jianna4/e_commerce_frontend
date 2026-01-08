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
import Admin from './pages/Admin';
import Admin2 from './pages/Admin2';

//admin pages
import AdminSubcategories from './pages/zadmin/Subcategory';
import AdminCategories from './pages/zadmin/Category';
import AdminProducts from './pages/zadmin/Product';
import Mainoffers from './pages/zadmin/Mainoffers';
import Offers from './pages/zadmin/Offer';
import Users from './pages/zadmin/Users';
import Orders from './pages/zadmin/Orders';

function App() {
 
//#5AB7E6
  return (
    <div className="flex flex-col min-h-screen">
   
       <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/category/:slug" element={<CategoryDetail />} />
            <Route path="/admin2" element={<Admin2 />} />
            {/* Admin routes */}
            <Route path="/admin2/subcategories" element={<AdminSubcategories />} />
            <Route path="/admin2/categories" element={<AdminCategories />} />
            <Route path="/admin2/products" element={<AdminProducts />} />
            <Route path="/admin2/mainoffers" element={<Mainoffers />} />
            <Route path="/admin2/offers" element={<Offers />} />
            <Route path="/admin2/users" element={<Users />} />
            <Route path="/admin2/orders" element={<Orders />} />

           
          </Routes>
        </main>
        <Footer />
      </div>
    
    </div>
  )
}

export default App
