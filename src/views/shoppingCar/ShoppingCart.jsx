import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Shoppingcart() {

  const storedToken= localStorage.getItem('authToken')
  const navigate = useNavigate();
  const [shoesId, setShoesId] = useState(null)
  const [totalPrice, setTotalPrice]=useState(0)
  const { id } = useParams();

  useEffect(() => {
  const getData = async () => {
    let price=0
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/shoppingcart`, { headers: { Authorization:`Bearer ${storedToken}` }})
      response=response.data.data
      response.forEach((ele) => price+=ele.retailPrice)
      setShoesId(response)
      setTotalPrice(price)

    } catch (error) {
      console.error(error)
    }
  } 
  getData();
}, [storedToken])

const goToComments = (e) => {
  navigate(`/comments/${id}`);
}

const deleteFromCart = async (e) => {
  e.preventDefault();
  let price=0
  try {
    await axios.delete(`${process.env.REACT_APP_API_URL}/shoppingcart/${id}`,  { headers: { Authorization:`Bearer ${storedToken}` }});
    toast.success('Shoe Deleted Of The Cart!')
    let response = await axios.get(`${process.env.REACT_APP_API_URL}/shoppingcart`, { headers: { Authorization:`Bearer ${storedToken}` }})
      response=response.data.data
      response.forEach((ele) => price+=ele.retailPrice)
      setShoesId(response)
      setTotalPrice(price)
  } catch (error) {
    console.log(error)
  }
}

  return (
      <>
      {shoesId && shoesId.map((shoe) => {
        return <div key={Math.floor(Math.random()*100)} className='h-13 w-13 rounded border-solid border-zinc-300 border-2 m-2 p-2 bg-contain dark:bg-slate-600 dark:border-slate-400'>
        <img src={shoe.media[0].thumbUrl} alt="cart" className='m-auto dark:rounded'/>
        <p className='pl-3 pb-1 dark:text-slate-200'>{`${shoe.retailPrice}€`}</p>
        <button onClick={deleteFromCart} className='pl-2 pb-2 m-1 bg-red-500 px-4 py-2 text-white rounded-full'>Delete from cart?</button>
        <p onClick={goToComments} className='pl-2 pb-2 pt-2 text-black dark:text-cyan-400'>See the reviews!</p></div>
        })}
        <div className='h-13 w-13 rounded border-solid border-zinc-300 border-2 m-2 p-2 bg-contain dark:bg-slate-600 dark:border-slate-400'>
        <h1>Total Amount: {totalPrice}€</h1>
        </div>
    </>
  )
}
