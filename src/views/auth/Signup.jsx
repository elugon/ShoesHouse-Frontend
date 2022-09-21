import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import shoesHouseLogo from '../../img/shoesHouseLogo.png'

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
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

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
    // eslint-disable-next-line
  }, [passwordControl])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { username: user.username, email: user.email, password });
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <>
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8 m-2 rounded dark:bg-slate-600 dark:m-2 dark:rounded'>
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
    <img className="mx-auto h-18 w-auto" src={shoesHouseLogo} alt="shoes-house logo" />
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-slate-200">Create your account</h2>
    <p className="mt-2 text-center text-sm text-gray-600 max-w dark:text-slate-200">
      Already registered?
      <NavLink className="font-medium text-indigo-600 dark:text-cyan-400" to="/login"> Sign in</NavLink>
    </p>
      </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10 dark:bg-slate-400">
      <form onSubmit={handleSubmit} className="mb-0 space-y-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Username</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} className='w-full border-gray-300 p-2 border-2 rounded-lg shadow-sm focus:border-2 focus:rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none dark:bg-slate-200'/>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} className='w-full border-gray-300 p-2 border-2 rounded-lg shadow-sm focus:border-2 focus:rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none dark:bg-slate-200'/>
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Password</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value) } className='w-full border-gray-300 p-2 border-2 rounded-lg shadow-sm focus:border-2 focus:rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none dark:bg-slate-200' />
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-100">Repeat the password</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} className='w-full border-gray-300 p-2 border-2 rounded-lg shadow-sm focus:border-2 focus:rounded-lg focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none dark:bg-slate-200'/>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" className='pl-2 pb-2 m-1 bg-blue-500 px-4 py-2 text-white rounded-full'>Register</button>
      </form>
      </div>
    </div>
    </div>
    </>
  )
}
