import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import adidas1 from '../../gif/Adidas1.gif'
import cristiano1 from '../../gif/Cristiano1.gif'
import jordan1 from '../../gif/Jordan1.gif'
import justDoIt1 from '../../gif/JustDoIt1.gif'
import messi1 from '../../gif/Messi1.gif'
import newBalance1 from '../../gif/NewBalance1.gif'
import neymar1 from '../../gif/Neymar1.gif'
import neymar2 from '../../gif/Neymar2.gif'
import neymar3 from '../../gif/Neymar3.gif'
import puma1 from '../../gif/Puma1.gif'
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';




export default function OneShoe() {

  const storedToken= localStorage.getItem('authToken')
  const navigate = useNavigate();
  const [shoe, setShoe] = useState()
  const { id } = useParams();
  const [options, setOptions] = useState()
  const advertising= [adidas1,cristiano1,jordan1,justDoIt1,messi1,newBalance1,neymar1,neymar2,neymar3,puma1]

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/shoes/${id}`)
      setShoe(response.data.data);
      const optionsToSelect=response.data.data.size.map(shoe => ({value: shoe, label: shoe}))
      setOptions(optionsToSelect)
    } catch (error) {
      console.error(error)
    }
  }
  getData();
}, [id])

const goToComments = (e) => {
  navigate(`/comments/${id}`);
}

const addToCart = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/shoppingcart/${id}`, {},  { headers: { Authorization:`Bearer ${storedToken}` }});
    toast.success('Shoe Added To The Cart!')
  } catch (error) {
    console.log(error)
  }
}



  return (
    <>
    <motion.article initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      {shoe && 
        <>
        <div className='h-13 w-13 rounded border-solid border-zinc-300 border-2 m-2 p-2 bg-contain dark:bg-slate-600 dark:border-slate-400'>
         <img src={shoe.media[0].thumbUrl} alt="shoe" className='m-auto dark:rounded'/>
          <div>
            <h1 className='w-24 m-2 dark:text-slate-200'>Size: {<Select options={options} className='dark:text-black'/>}</h1>
            <h1 className='pl-3 pb-1 dark:text-slate-200'>{shoe.retailPrice}???</h1>
            <button onClick={addToCart} className='pl-2 pb-2 m-1 bg-red-500 px-4 py-2 text-white rounded-full'>Add to Cart</button>
            <p onClick={goToComments} className='pl-2 pb-2 pt-2 text-dark dark:text-cyan-400'>See the reviews!</p>
          </div>
        </div>
        <div className='h-13 w-13 rounded border-solid border-zinc-300 border-2 m-2'>
          <img src={advertising[Math.floor(Math.random() * (advertising.length-1))]} alt='advertising gif' className='m-auto'/>
        </div>
        </>
      }
    </motion.article>
    </>
  )
}
