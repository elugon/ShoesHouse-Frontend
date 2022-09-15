import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select'


export default function OneShoe() {

  const navigate = useNavigate();
  const [shoe, setShoe] = useState()
  const { id } = useParams();
  const [options, setOptions] = useState()

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/shoes/${id}`)
      setShoe(response.data.data);
      const optionsToSelect=response.data.data.size.map(shoe => ({value: shoe, label: shoe}))
      setOptions(optionsToSelect)
      console.log(response.data.data)
    } catch (error) {
      console.error(error)
    }
  }
  getData();
}, [id])

const goToComments = (e) => {
  navigate(`/comments/${id}`);
}

  console.log(options)

  return (
    <div>
      {shoe && 
        <div className='h-13 w-13 rounded border-solid border-zinc-300 border-2 m-2'>
        <img src={shoe.media[0].thumbUrl} alt="shoe" className='m-auto'/>
        <Select 
           options={options}
        />
       
        
        {/* <p>Select Size:{` ${shoe.size} `}</p> */}
        <p className='pl-1 pb-1'>{`${shoe.retailPrice}€`}</p>
        <p>Add to car</p>
        <p onClick={goToComments}>See the reviews!</p></div>
      }
    </div>
  )
}
