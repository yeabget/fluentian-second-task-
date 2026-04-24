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

           </div>
        </div>
      </div>

      <Footer />
    </>
  );
}