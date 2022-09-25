import React, { useEffect, useState } from 'react'
//import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';

export default function Shoppingcart() {

  const storedToken= localStorage.getItem('authToken')
  const navigate = useNavigate();
  const [cart, setCart] = useState()
  const { id } = useParams(); 
  //const [options, setOptions] = useState()
  //const { user } = useContext(AuthContext);

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/shoppingcart`, { headers: { Authorization:`Bearer ${storedToken}` }})
      console.log(response)
      setCart(response.data.data);
    } catch (error) {
      console.error(error)
    }
  }
  getData();
}, [storedToken])

const goToComments = (e) => {
  navigate(`/comments/${id}`);
}
  return (
    <div>
      {cart && 
        <>
        <div className='h-13 w-13 rounded border-solid border-zinc-300 border-2 m-2 p-2 bg-contain dark:bg-slate-600 dark:border-slate-400'>
        {/* <img src={cart.media[0].thumbUrl} alt="cart" className='m-auto dark:rounded'/> */}
        <p className='pl-3 pb-1 dark:text-slate-200'>{`${cart.retailPrice}€`}</p>
        <button className='pl-2 pb-2 m-1 bg-red-500 px-4 py-2 text-white rounded-full'>Add to car</button>
        <p onClick={goToComments} className='pl-2 pb-2 pt-2 dark:text-slate-200 dark:text-cyan-400'>See the reviews!</p></div>
        <div className='h-13 w-13 rounded border-solid border-zinc-300 border-2 m-2'>
        </div>
        </>
      }
    </div>
  )
}
