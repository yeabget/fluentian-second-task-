import React, { useState } from 'react';
import { FaLock, FaArrowLeft, FaUser, FaClock, FaNetworkWired } from "react-icons/fa";
import { IoPlay, IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/courseRoadmap.css";

export default function CourseRoadmap({ course, onBack }) {
  const navigate = useNavigate();

  // Enrollment state
  const [isEnrolled, setIsEnrolled] = useState(course.enrolled || false);

  // Prepare modules with status logic
  const modules = (course.modules || []).map((mod, index, arr) => {
    if (mod.completed) {
      return { ...mod, status: "completed" };
    }

    if (index === 0 || arr[index - 1].completed) {
      return { ...mod, status: "available" };
    }

    return { ...mod, status: "locked" };
  });

  // Progress calculation
  const calculateProgress = () => {
    if (!modules.length) return 0;
    const completed = modules.filter(m => m.status === "completed").length;
    return Math.round((completed / modules.length) * 100);
  };

  // Enroll → go to payment
  const handleEnroll = () => {
    navigate("/subscription", { state: { course } });
  };

  return (
    <div className='courseRoadmap-wrapper'>

      {/* HEADER */}
      <div className='roadmaps-header-section'>

        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Back to catalog
        </button>

        <h1>{course.title}</h1>

        <div className='roadmap-stats'>
          <p><FaUser /> {course.instructor}</p>
          <p><FaClock /> {course.duration}</p>
          <p><FaNetworkWired /> {course.students} Students</p>
        </div>

        <p className='roadmap-desc'>{course.note}</p>

        <div className='action-buttons'>
          {!isEnrolled ? (
            <button className='enroll-btn' onClick={handleEnroll}>
              Enroll in path
            </button>
          ) : (
            <button className='enrolled-status' disabled>
              Already Enrolled
            </button>
          )}


        </div>
      </div>

      {/* ROADMAP */}
      <div className={`roadmap-timeline-card ${!isEnrolled ? 'content-locked' : ''}`}>

        {!isEnrolled && (
          <div className="overlay-lock">
            <FaLock />
            <p>Enroll to unlock the full roadmap</p>
          </div>
        )}

        {/* TOP */}
        <div className="timeline-header">
          <div>
            <h2>{course.title} Journey</h2>
            <p>MODULE TRACKER</p>
          </div>

          <div className="progress-circle">
            <h3>{isEnrolled ? calculateProgress() : 0}%</h3>
            <span>COMPLETE</span>
          </div>
        </div>

        {/* MODULE LIST */}
        <div className="timeline-list">
          {modules.map((mod, index) => (
            <div key={index} className={`timeline-item ${mod.status}`}>

              <div className="icon-container">
                {mod.status === "completed" ? (
                  <IoCheckmarkCircle />
                ) : mod.status === "available" ? (
                  <IoPlay />
                ) : (
                  <FaLock />
                )}
              </div>

              <div className="item-text">
                <h4>{mod.title}</h4>
                <p>{mod.status.toUpperCase()}</p>
              </div>

              <span className="item-duration">{mod.time}</span>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}