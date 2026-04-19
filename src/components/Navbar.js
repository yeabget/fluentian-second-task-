import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/images/logo.png'
import '../styles/navbar.css'
import { MdMenuBook } from "react-icons/md";
import { BsChatDots } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { MdPayment } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
export default function Navbar() {
  const [menuOpen,setMenuOpen]=useState(false)
  const [register,setRegister]=useState(false)
  return (
    <div className='navbar-container'>
        <div className='logo'>
          <Link to='/'><img src={logo} alt='logo'/></Link> 
        </div>
        <div className={menuOpen?'hidden-menubar':'links'}>
            <Link to="/">Home</Link>
            <Link to='/courses'><MdMenuBook size={20} />Courses</Link>
            <Link to='/dashboard'> <RxDashboard size={20} />Dashboard</Link>
            <Link to='/chat'> <BsChatDots size={20} />Chat</Link>
            <Link to='/subscription'><MdPayment size={20} />Subscription</Link>
            <Link to='/help'><AiOutlineQuestionCircle size={20} />Help</Link>
        </div>
        <div className='register'>
          <div className='notification'>
            <IoNotificationsOutline size={22} />
          </div>
          {register?<div className='profile'>
                         <FaUserCircle size={30} />
                    </div>:
                    <button className={menuOpen?'register-btn-menubar-opened':'register-btn'}>
                        Register
                   </button>
          }
          <div className='menubar' onClick={()=>{setMenuOpen(!menuOpen)}}>
            {menuOpen? <FaTimes size={25} />:<FaBars size={25} />}
          </div>
        </div>
    </div>
  )
}
