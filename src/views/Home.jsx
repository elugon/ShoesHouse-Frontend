import React from 'react'
import imageBackground from '../../src/img/shoes-background.png'
import shoesHouseLogo from '../img/shoesHouseLogo.png'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={()=>navigate('/shoes')} className='bg-contain min-h-screen bg-gray-100 flex flex-col justify-center px-6 lg:px-8 m-2 rounded dark:bg-slate-600 dark:m-2 dark:rounded' style={{ backgroundImage: `url(${imageBackground})` }}>
        <div className="z-10 sm:mx-auto sm:w-full sm:max-w-md">
          <img onClick={()=>navigate('/shoes')} className="z-10 mx-auto h-18 w-auto" src={shoesHouseLogo} alt="shoes-house logo" />
          <h4 className="italic mt-6 text-center text-3xl font-extrabold rounded-lg bg-white text-black">Welcome to the best e-Commerce of shoes</h4>
        </div>
    
      </div>
  
    </>
  )
}
