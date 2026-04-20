import React from 'react'

export default function WorkCard({number,title,description}) {
  return (
    <div className='work-card'>
      <h1>{number}</h1>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
