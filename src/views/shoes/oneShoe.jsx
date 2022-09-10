import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';


export default function OneShoe() {

  const [shoe, setShoe] = useState()
  const { id } = useParams();

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/shoes/${id}`)
      setShoe(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  getData();
}, [id])

  return (
    <div>
      {shoe && 
        <div><img src={shoe.media[0].thumbUrl} alt="shoe" className='shoe-size'/><p>{shoe.retailPrice}</p></div>
      }
    </div>
  )
}
