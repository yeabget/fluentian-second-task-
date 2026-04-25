import React, { useContext } from "react";
import "../styles/manageCourse.css";
import { CourseContext } from "./CourseContext";

export default function ManageCourses() {
  const { courses, deleteCourse } = useContext(CourseContext);

  return (
    <div className="manage-container">

      <h1>Manage <span>Courses</span></h1>

      {courses.map((course) => (
        <div key={course.id} className="course-card">

          <h3>{course.title}</h3>
          <p>{course.note}</p>

          <div className="actions">
            <button onClick={() => deleteCourse(course.id)}>
              Delete
            </button>
          </div>

        </div>
      ))}

    </div>
  );
}