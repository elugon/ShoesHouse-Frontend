import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import ErrorPage from '../views/ErrorPage';
import Signup from '../views/auth/Signup';
import Login from '../views/auth/Login';
import PrivateView from '../views/PrivateView';
import IsPrivate from '../components/IsPrivate';
import HomeShoes from '../views/shoes/Home'
import OneShoe from '../views/shoes/OneShoe'
import AllComments from '../views/comments/Comments'
import Shoppingcart from '../views/shoppingCar/ShoppingCart';
import Home from '../views/Home';
import {AnimatePresence} from 'framer-motion'


function AnimatedRoutes() {
    const location=useLocation()
  return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/private" element={<IsPrivate><PrivateView/></IsPrivate>}/>
                <Route path="*" element={<ErrorPage />} />
                <Route path="/shoes" element={<HomeShoes />} />
                <Route path="/shoes/:id" element={<OneShoe />} />
                <Route path="/comments/:id" element={<AllComments />} />
                <Route path="/shoppingcar" element={<Shoppingcart />} />
            </Routes>
      </AnimatePresence>
  )
}

export default AnimatedRoutes