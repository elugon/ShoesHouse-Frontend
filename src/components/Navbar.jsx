import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import shoesHouseLogo from '../img/shoesHouseLogo.png'

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className='flex items-center px-2 border-solid border-2 rounded h-14 m-2'>
      {user && <p>Hello {user.username}</p> }
      <nav className='flex w-full h-full items-center place-content-between font-serif'>
        <img src={shoesHouseLogo} alt='logo of ecommerce' className='object-contain w-12 h-12'></img>
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">Home</NavLink>
        <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/shoes">Shoes</NavLink>
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup">Sign up</NavLink>}
        {!isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/login">Login</NavLink>}{
        /* {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/mycar">My Car</NavLink>} */}
        {isLoggedIn && <button onClick={() => logOutUser()}>Log out</button>}
        <button onClick={() => navigate(-1)}>Go back</button>
      </nav>
    </div>
  )
}
