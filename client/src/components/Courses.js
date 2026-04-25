import React, { useState, useContext } from "react";
import CourseBox from "./CourseBox";
import CourseRoadmap from "./CourseRoadmap";
import "../styles/courses.css";
import Footer from "../components/Footer";
import { CourseContext } from "./CourseContext";
import { AuthContext } from "./AuthContext";

export default function Courses() {
  const { courses, loading, error } = useContext(CourseContext);
  const { user } = useContext(AuthContext);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Show loading state
  if (loading) {
    return (
      <>
        <div className="courses">
          <div className="course-container">
            <div className="course-header">
              <h1>Course <span>Catalog</span></h1>
              <p>Loading courses...</p>
            </div>
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Fetching available courses...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <div className="courses">
          <div className="course-container">
            <div className="course-header">
              <h1>Course <span>Catalog</span></h1>
              <p>Unable to load courses at this moment.</p>
            </div>
            <div className="error-message">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="courses">
        <div className="course-container">
          {!selectedCourse && (
            <div className="course-header">
              <h1>
                Course <span>Catalog</span>
              </h1>
              <p>Choose a roadmap and start building your future.</p>
            </div>
          )}

          <div className="courses-layout">
            {selectedCourse ? (
              <CourseRoadmap
                course={selectedCourse}
                onBack={() => setSelectedCourse(null)}
                isLoggedIn={!!user}
              />
            ) : (
              <div className="courses-grid">
                {courses.length === 0 ? (
                  <div className="no-courses">
                    <p>No courses available at the moment.</p>
                    <p>Check back later for new content!</p>
                  </div>
                ) : (
                  courses.map((course) => (
                    <CourseBox
                      key={course.id}
                      id={course.id}
                      image={course.img || "/default-course.jpg"}
                      title={course.title}
                      level={course.level}
                      note={course.description}
                      instructor={course.instructor}
                      enrolment={true}
                      onClick={() => setSelectedCourse(course)}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}