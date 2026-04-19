import React from 'react'
export default function Card({icon,title,description,number}) {
  return (
    <div className='card'>
      <div className='card-icon'>{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
     
    </div>
  )
}
