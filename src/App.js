import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Product from './components/Product/Product';
import Products from './components/Products/Products';
import Signin from './components/SignIn/Signin';
import Wishlist from './components/Wishlist/Wishlist';
function App() {
  return (
      <Router>
        <Signin />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/products' element={<Products />} />
          <Route exact path='/product/:id'  element={<Product />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/wishlist' element={<Wishlist />} />
          
        </Routes>
        <Footer />
      </Router>
  )
}

export default App;
