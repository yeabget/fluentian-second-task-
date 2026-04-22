import React from 'react'
import { Link } from 'react-router-dom'
export default function Journey() {
  return (
    <div className='journey-container'>
      <div className='journey'>
      <h1>Ready to Start Your Journey?</h1>
      <p>Join thousands of students who are already learning smarter with personalized AI-driven roadmaps.</p>
      <div className='journey-btns'>
        <button className='view-btn'><Link to='/courses'>View All Courses</Link></button>
      </div>
      </div>
    </div>
  )
}
