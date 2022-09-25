import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import nikeIcon from '../../img/nikeIcon.png'
import jordanIcon from '../../img/jordanIcon.png'
import adidasIcon from '../../img/adidasIcon.png'
import newBalanceIcon from '../../img/newBalanceIcon.png'
import { motion } from "framer-motion";

export default function HomeShoes() {

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.6
      }
    }
  }
  
  const animatedItem = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  const [shoes, setShoes] = useState()
  const [originalShoes, setOriginalShoes] = useState()
 
  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/shoes`)
      setOriginalShoes(response.data.data);
      setShoes(response.data.data);
    } catch (error) {
      console.error(error)
    }
  }
  getData();
}, [])
const filter = (brand) => {
  const newShoes = originalShoes.filter(ele => ele.brand === brand)
  setShoes(newShoes)
}
  return (
    <>
    <div className='flex items-center place-content-between mx-4 md:mx-16 lg:mx-20 dark:bg-slate-900'>
      <div><img src={nikeIcon} className='h-12 w-12 dark:bg-white dark:rounded dark:p-1' alt='brand nike' onClick={() => filter('Nike')}/></div>
      <div><img src={adidasIcon} className='h-12 w-12 dark:bg-white dark:rounded dark:p-1' alt='brand adidas' onClick={() => filter('adidas')}/></div>
      <div><img src={jordanIcon} className='h-12 w-13 dark:bg-white dark:rounded dark:p-1' alt='brand jordan' onClick={() => filter('Jordan')}/></div>
      <div><img src={newBalanceIcon} className='h-12 w-13 dark:bg-white dark:rounded dark:p-1' alt='brand new balance' onClick={() => filter('New Balance')}/></div>
    </div>
    <React.Fragment>
       {shoes && <motion.ul variants={container} initial="hidden" animate="show" className='flex flex-wrap justify-center'>
       {shoes.map( (shoe) => {
        return <motion.li variants={animatedItem} key={shoe._id} className='h-13 w-13 rounded border-solid border-zinc-300 border-2 m-2 dark:bg-white'>
        <Link to={`/shoes/${shoe._id}`}><img src={shoe.media[0].thumbUrl} alt="shoe" className='m-auto'/></Link>
        <p><Link to={`/shoes/${shoe._id}`} className='pl-1 pb-1'>{shoe.name}</Link></p>
        <p className='pl-1 pb-1'>{`${shoe.retailPrice}€`}</p>
        </motion.li>
       })}
    </motion.ul>
       }
    </React.Fragment>
    </>
  )
}