import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
//import nikeIcon from '../../img/nikeIcon.png'


export default function HomeShoes() {

  const [shoes, setShoes] = useState()

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/shoes')
      setShoes(response.data.data);
    } catch (error) {
      console.error(error)
    }
  }
  getData();
}, [])

  return (
    <div>
      {/* <div><Link to={'nike'}><img src={nikeIcon} alt='brand nike'/></Link></div> */}
      {shoes && shoes.map(shoe => {
        return <div key={shoe._id}><p><Link to={`/shoes/${shoe._id}`}>{shoe.name}</Link></p><img src={shoe.media[0].thumbUrl} alt="shoe" className='shoe-size'/><p>{shoe.retailPrice}</p></div>
      })}
    </div>
  )
}
