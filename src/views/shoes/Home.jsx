import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import nikeIcon from '../../img/nikeIcon.png'
import jordanIcon from '../../img/jordanIcon.png'
import adidasIcon from '../../img/adidasIcon.png'
import newBalanceIcon from '../../img/newBalanceIcon.png'



export default function HomeShoes() {

  const [shoes, setShoes] = useState()
  const [originalShoes, setOriginalShoes] = useState()

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/shoes')
      setOriginalShoes(response.data.data);
      setShoes(response.data.data);
    } catch (error) {
      console.error(error)
    }
  }
  getData();
}, [])
console.log(shoes)

const filter = (brand) => {
  //setShoes(originalShoes)
  const newShoes = originalShoes.filter(ele => ele.brand === brand)
  setShoes(newShoes)
  console.log(newShoes)
}

  return (
    <div>
      <div><img src={nikeIcon} alt='brand nike' onClick={() => filter('Nike')}/></div>
      <div><img src={adidasIcon} alt='brand adidas' onClick={() => filter('adidas')}/></div>
      <div><img src={jordanIcon} alt='brand jordan' onClick={() => filter('Jordan')}/></div>
      <div><img src={newBalanceIcon} alt='brand new balance' onClick={() => filter('New Balance')}/></div>


      {shoes && shoes.map(shoe => {
        return <div key={shoe._id}><p><Link to={`/shoes/${shoe._id}`}>{shoe.name}</Link></p><img src={shoe.media[0].thumbUrl} alt="shoe" className='shoe-size'/><p>{shoe.retailPrice}</p></div>
      })}
    </div>
  )
}
