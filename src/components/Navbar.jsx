import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import shoesHouseLogo from '../img/shoesHouseLogo.png'
import { AiOutlineShopping } from "react-icons/ai"
import { AiOutlineRollback } from "react-icons/ai"
import { GiExitDoor } from "react-icons/gi"


export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='flex items-center px-2 border-solid border-2 rounded h-14 m-2'>
      {user && <p>Hello {user.username}</p> }
      <nav className='flex w-full h-full items-center place-content-between font-serif'>
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">{<img src={shoesHouseLogo} alt='logo of ecommerce' className='object-contain w-12 h-12'></img>}</NavLink>
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/shoes">{<AiOutlineShopping className='w-6 h-6'/>}</NavLink>
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wider text-blue-500 border-solid border-2 border-blue-500' : 'rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wider text-red-500 border-solid border-2 border-red-500'} to="/signup">Sign Up</NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wider text-blue-500 border-solid border-2 border-blue-500' : 'rounded-full py-2 px-3 uppercase text-xs font-bold cursor-pointer tracking-wider text-red-500 border-solid border-2 border-red-500'} to="/login">Login</NavLink>}{
        /* {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/mycar">My Car</NavLink>} */}
        {isLoggedIn && <button onClick={() => logOutUser()}>{<GiExitDoor className='w-6 h-6'/>}</button>}
        <button onClick={() => navigate(-1)}>{<AiOutlineRollback className='w-6 h-6'/>}</button>
      </nav>
    </div>
  )
}

