
import React from 'react'
import '../styles/Home.css'
import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import { FaGraduationCap } from "react-icons/fa";
import { IoFlashOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import Card from './Card';
import Roadmap from './Roadmap';
import Works from './Works';
import Journey from './Journey';
import Footer from './Footer';
export default function Home() {
  const [query, setQuery] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/roadmap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: query }),
      });

      const data = await res.json();
      setRoadmap(data.steps || []);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };
 return (
    <div>
     <div className='home'>
        <div className='home-container'>
          <h1>Learn Smarter with <span>AI-Powered Roadmaps</span></h1>

          <div className='search-bar'>
            <IoSearchOutline size={22} className='search-icon'/>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='What do you want to learn?'
            />

            <button onClick={generateRoadmap}>
              {loading ? "Generating..." : "Generate Roadmap"}
            </button>
          </div>
          <div className='home-btns'>
          <button className='course-btn'><Link to='/courses'>Browse Courses</Link></button>
          <button className='dashboard-btn'><Link to='/dashboard'>Student Dashboard</Link></button>
        </div>
        </div>
      </div>

  
      {roadmap.length > 0 && (
        <div className="ai-roadmap">
          <h2>Your Learning Path</h2>
          <ol>
            {roadmap.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    
    <Roadmap/>
    <Works/>
    <Journey/>
    <Footer/>
    </div>
  )
}
