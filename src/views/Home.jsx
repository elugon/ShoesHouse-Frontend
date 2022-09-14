import React from 'react'
import imageBackground from '../../src/img/shoes-background.png'

export default function Home() {
  return (
    <>
      <div className='h-screen w-screen bg-contain bg-repeat bg-left-top object-scale-down' style={{backgroundImage: `url(${imageBackground})`}}></div>
    </>
    
  )
}
