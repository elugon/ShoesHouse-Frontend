import axios from 'axios';
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import shoesHouseLogo from '../../img/shoesHouseLogo.png'
import { motion } from 'framer-motion';

export default function Login() {
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, user);
      toast.success('Welcome back!')
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <>
     <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8 m-2 rounded dark:bg-slate-600 dark:m-2 dark:rounded'>
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
    <img className="mx-auto h-18 w-auto" src={shoesHouseLogo} alt="shoes-house logo" />
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-slate-200">Login</h2>
    <p className="mt-2 text-center text-sm text-gray-600 max-w dark:text-slate-200">
      Are you not registered?
      <NavLink className="font-medium text-indigo-600 dark:text-cyan-400" to="/signup"> Sign Up</NavLink>
    </p>
      </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 dark:bg-slate-400">
      <form onSubmit={handleSubmit} className="mb-0 space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} className='w-full border-gray-300 p-2 border-2 rounded-lg shadow-sm focus:border-2 focus:rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none dark:bg-slate-200' />
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Password</label>
        <input required type="password" name="password" value={user.password} onChange={handleChange} className='w-full border-gray-300 p-2 border-2 rounded-lg shadow-sm focus:border-2 focus:rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none dark:bg-slate-200'/>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" className='p-auto pb-2 m-auto bg-blue-500 px-4 py-2 text-white rounded-full'>Log in </button>
      </form>
      </div>
    </div>
    </motion.div>
    </>
  )
}
