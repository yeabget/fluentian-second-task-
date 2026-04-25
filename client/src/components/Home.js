import React, { useState, useContext } from 'react';
import '../styles/Home.css';
import { IoSearchOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Card from './Card';
import Roadmap from './Roadmap';
import Works from './Works';
import Journey from './Journey';
import Footer from './Footer';
import API from '../api/axios';
import { AuthContext } from './AuthContext';

export default function Home() {
  const [query, setQuery] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const generateRoadmap = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await API.post("/ai/roadmap", { topic: query });
      setRoadmap(res.data.steps || []);
    } catch (err) {
      console.error("Roadmap generation error:", err);
      setRoadmap(["Error generating roadmap. Please try again."]);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className='home'>
        <div className='home-container'>
          <h1>Learn Smarter with <span>AI-Powered Roadmaps</span></h1>

          <div className='search-bar'>
            <IoSearchOutline size={22} className='search-icon' />
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
            <button className='course-btn'>
              <Link to='/courses'>Browse Courses</Link>
            </button>
            {user && (
              <button className='dashboard-btn'>
                <Link to='/dashboard'>Student Dashboard</Link>
              </button>
            )}
          </div>
        </div>
      </div>

      {roadmap.length > 0 && (
        <div className="ai-roadmap">
          <h2>Your Learning Path for "{query}"</h2>
          <ol>
            {roadmap.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}

      <Roadmap />
      <Works />
      <Journey />
      <Footer />
    </div>
  );
}