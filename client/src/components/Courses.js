import React, { useState, useContext } from "react";
import CourseBox from "./CourseBox";
import CourseRoadmap from "./CourseRoadmap";
import "../styles/courses.css";
import Footer from "../components/Footer";
import { CourseContext } from "./CourseContext";

export default function Courses() {
  const { courses } = useContext(CourseContext);
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      <div className="page-wrapper">
        <div className="course-container">

          {/* HEADER */}
          {!selectedCourse && (
            <div className="course-header">
              <h1>
                Course <span>Catalog</span>
              </h1>
              <p>Choose a roadmap and start building your future.</p>
            </div>
          )}

          <div className="courses-layout">

            {/* MAIN CONTENT */}
            {selectedCourse ? (
              <CourseRoadmap
                course={selectedCourse}
                onBack={() => setSelectedCourse(null)}
              />
            ) : (
              <div className="courses-grid">

                {courses.length === 0 ? (
                  <p>No courses available</p>
                ) : (
                  courses.map((course) => (
                    <CourseBox
                      key={course.id}
                      {...course}
                      image={course.img}
                      onClick={() => setSelectedCourse(course)}
                    />
                  ))
                )}

              </div>
            )}

            {/* AI SIDEBAR (ALWAYS VISIBLE) */}
            {!selectedCourse && (
              <div className="ai-sidebar">

                <h2>
                  AI <span>Insights</span>
                </h2>

                <div className="ai-card">
                  <h4>Recommended Path</h4>
                  <p>
                    Based on your activity, we suggest learning <b>Backend Development</b>.
                  </p>
                </div>

                <div className="ai-card">
                  <h4>Skill Gap</h4>
                  <p>
                    You are strong in Frontend. Next step: APIs & Databases.
                  </p>
                </div>

                <div className="ai-card">
                  <h4>Trending</h4>
                  <p>
                    Cybersecurity is trending among new learners this month.
                  </p>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}