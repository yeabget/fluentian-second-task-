import React, { useMemo, useState } from "react";
import { FaLock, FaArrowLeft, FaUser, FaClock, FaNetworkWired } from "react-icons/fa";
import { IoPlay, IoCheckmarkCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/courseRoadmap.css";

export default function CourseRoadmap({ course = {}, onBack }) {
  const navigate = useNavigate();
  const [isEnrolled] = useState(course.enrolled ?? false);

  const modules = useMemo(() => {
    if (!course.modules?.length) return [];

    return course.modules.map((mod, index, arr) => {
      const isCompleted = mod.completed === true;
      const isFirst = index === 0;
      const prevCompleted = arr[index - 1]?.completed;

      let status = "locked";

      if (isCompleted) status = "completed";
      else if (isFirst || prevCompleted) status = "available";

      return { ...mod, status };
    });
  }, [course.modules]);

  const progress = useMemo(() => {
    if (!modules.length) return 0;

    const completed = modules.filter((m) => m.status === "completed").length;
    return Math.round((completed / modules.length) * 100);
  }, [modules]);

  const handleEnroll = () => {
    navigate("/subscription", { state: { course } });
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

  return (
    <div className="courseRoadmap-container">
      <div className="roadmaps-header-section">
        <button className="back-btn" onClick={onBack}>
          <FaArrowLeft /> Back to catalog
        </button>

        <h1>{course.title}</h1>

        <div className="roadmap-stats">
          <p><FaUser /> {course.instructor}</p>
          <p><FaClock /> {course.duration}</p>
          <p><FaNetworkWired /> {course.students} Students</p>
        </div>

        <p className="roadmap-desc">{course.note}</p>

        <div className="action-buttons">
          {!isEnrolled ? (
            <button className="enroll-btn" onClick={handleEnroll}>
              Enroll in path
            </button>
          ) : (
            <button className="enrolled-status" disabled>
              Already Enrolled
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
            <div key={mod.id || index} className={`timeline-item ${mod.status}`}>
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