import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import shoesHouseLogo from '../img/shoesHouseLogo.png'
import { AiOutlineShopping } from "react-icons/ai"
import { AiOutlineRollback } from "react-icons/ai"
import { GiExitDoor } from "react-icons/gi"
import { AiOutlineShoppingCart } from "react-icons/ai"
import InitialsAvatar from 'react-initials-avatar';
import Switcher from './Switcher';

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='flex items-center px-2 border-solid border-2 rounded h-14 ml-2 mr-2 mb-2 dark:bg-slate-600 dark:border-slate-400'>
        <nav className='flex w-full h-full items-center place-content-between font-serif'>
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">{<img src={shoesHouseLogo} alt='logo of ecommerce' className='object-contain w-12 h-12'></img>}</NavLink>
        {user && <InitialsAvatar name={user.username} className='md:w-10 md:h-10 p-2 text-center selected rounded-full uppercase text-xs md:text-sm  font-bold cursor-pointer tracking-wider text-blue-500 border-solid border-2 border-blue-500' /> }
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/shoes">{<AiOutlineShopping className='w-6 h-6 md:w-10 md:h-10 dark:bg-slate-400'/>}</NavLink>
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected rounded-full py-1 px-1 uppercase text-xs font-bold cursor-pointer tracking-wider text-blue-500 border-solid border-2 border-blue-500' : 'rounded-full py-1 px-1 uppercase text-xs font-bold cursor-pointer tracking-wider text-red-500 border-solid border-2 border-red-500 dark:text-slate-200 dark:border-slate-400'} to="/signup">Sign Up</NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected rounded-full py-1 px-1 uppercase text-xs font-bold cursor-pointer tracking-wider text-blue-500 border-solid border-2 border-blue-500' : 'rounded-full py-1 px-1 uppercase text-xs font-bold cursor-pointer tracking-wider text-red-500 border-solid border-2 border-red-500 dark:text-slate-200 dark:border-slate-400'} to="/login">Login</NavLink>}
        {isLoggedIn && <NavLink to='/shoppingcar'><AiOutlineShoppingCart className='w-6 h-6 md:w-10 md:h-10 dark:bg-slate-400'/></NavLink>}
        {isLoggedIn && <button onClick={() => logOutUser()}>{<GiExitDoor className='w-6 h-6 md:w-10 md:h-10 dark:bg-slate-400'/>}</button>}
        <Switcher />
        <button onClick={() => navigate(-1)}>{<AiOutlineRollback className='w-6 h-6 md:w-10 md:h-10 dark:bg-slate-400'/>}</button>
      </nav>
    </div>
  )
}

