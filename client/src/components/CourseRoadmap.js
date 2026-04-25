import React, { useMemo, useState, useEffect, useContext } from "react";
import { FaLock, FaArrowLeft, FaUser, FaClock, FaNetworkWired } from "react-icons/fa";
import { IoPlay, IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/courseRoadmap.css";
import { CourseContext } from "./CourseContext";
import { AuthContext } from "./AuthContext";
import API from "../api/axios";

export default function CourseRoadmap({ course = {}, onBack, isLoggedIn }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { completeLesson, getCourseRoadmap, myEnrollments } = useContext(CourseContext);
  
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState(null);
  useEffect(() => {
    if (user && myEnrollments.length > 0) {
      const enrollment = myEnrollments.find(e => e.course_id === course.id);
      setIsEnrolled(!!enrollment);
      setEnrollmentId(enrollment?.id);
    }
  }, [user, myEnrollments, course.id]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const data = await getCourseRoadmap(course.id);
        setRoadmapData(data);
      } catch (err) {
        console.error("Failed to fetch roadmap:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [course.id, getCourseRoadmap]);

  const modules = useMemo(() => {
    if (!roadmapData?.lessons) return [];
    return roadmapData.lessons.map((lesson, index) => ({
      id: lesson.id,
      title: lesson.title,
      status: lesson.completed ? "completed" : lesson.locked ? "locked" : "available",
      time: lesson.duration || "15m",
      order: lesson.order
    }));
  }, [roadmapData]);

  const progress = roadmapData?.progress_percentage || 0;

  const handleEnroll = () => {
    navigate("/subscription", { state: { course } });
  };

  const handleCompleteLesson = async (lessonId) => {
    if (!isEnrolled || !enrollmentId) {
      alert("Please enroll in the course first");
      return;
    }
    
    try {
      await completeLesson(enrollmentId, lessonId);
      const updated = await getCourseRoadmap(course.id);
      setRoadmapData(updated);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to mark lesson as complete");
    }
  };

  const renderIcon = (status) => {
    switch (status) {
      case "completed":
        return <IoCheckmarkCircle />;
      case "available":
        return <IoPlay />;
      default:
        return <FaLock />;
    }
  };

  if (loading) {
    return (
      <div className="courseRoadmap-container">
        <div className="loading">Loading roadmap...</div>
      </div>
    );
  }

  return (
    <div className="courseRoadmap-container">
      <div className="roadmaps-header-section">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Back to catalog
        </button>

        <h1>{course.title}</h1>

        <div className="roadmap-stats">
          <p><FaUser /> {course.teacher?.full_name || "Staff"}</p>
          <p><FaClock /> {course.duration || "8 weeks"}</p>
          <p><FaNetworkWired /> {course.students || 0} Students</p>
        </div>

        <p className="roadmap-desc">{course.description}</p>

        <div className="action-buttons">
          {!isLoggedIn ? (
            <button className="enroll-btn" onClick={() => navigate("/register")}>
              Login to Enroll
            </button>
          ) : !isEnrolled ? (
            <button className="enroll-btn" onClick={handleEnroll}>
              Enroll Now - ${course.price || 0}
            </button>
          ) : (
            <button className="enrolled-status" disabled>
              ✓ Currently Enrolled
            </button>
          )}
        </div>
      </div>

      <div className={`roadmap-timeline-card ${!isEnrolled ? "content-locked" : ""}`}>
        {!isEnrolled && (
          <div className="overlay-lock">
            <FaLock />
            <p>Enroll to unlock the full roadmap</p>
          </div>
        )}

        <div className="timeline-header">
          <div>
            <h2>{course.title} Journey</h2>
            <p>MODULE TRACKER</p>
          </div>

          <div className="progress-circle">
            <h3>{isEnrolled ? progress : 0}%</h3>
            <span>COMPLETE</span>
          </div>
        </div>

        <div className="timeline-list">
          {modules.map((mod, index) => (
            <div 
              key={mod.id} 
              className={`timeline-item ${mod.status}`}
              onClick={() => mod.status === "available" && handleCompleteLesson(mod.id)}
              style={{ cursor: mod.status === "available" ? "pointer" : "default" }}
            >
              <div className="icon-container">
                {renderIcon(mod.status)}
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