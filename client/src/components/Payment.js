import React, { useContext } from "react";
import { CourseContext } from "./CourseContext";
import { AuthContext } from "./AuthContext";
import "../styles/subscription.css";

export default function Subscription() {
  const { courses } = useContext(CourseContext);
  const { user } = useContext(AuthContext);

  // mock pricing (you can replace with backend later)
  const getPrice = (course) => {
    if (course.level === "Beginner") return 10;
    if (course.level === "Intermediate") return 20;
    return 30;
  };

  return (
    <div className="subscription-wrapper">

      <div className="subscription-header">
        <h1>Subscription <span>Plans</span></h1>
        <p>Unlock courses by completing payments</p>
      </div>

      <div className="subscription-grid">

        {courses.map((course) => (
          <div className="subscription-card" key={course.id}>

            <img src={course.img} alt={course.title} />

            <div className="sub-content">

              <h3>{course.title}</h3>

              <p className="note">{course.note}</p>

              <div className="meta">
                <span>Level: {course.level}</span>
                <span>Instructor: {course.instructor}</span>
              </div>

              {/* PRICE */}
              <div className="price">
                ${getPrice(course)}
              </div>

              {/* PAYMENT STATUS */}
              {course.paid ? (
                <button className="paid-btn">Paid ✔</button>
              ) : (
                <button className="pay-btn">
                  Pay Now
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}