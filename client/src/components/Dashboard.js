import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { CourseContext } from "./CourseContext";
import "../styles/dashboard.css";
import { FaUser } from "react-icons/fa";
import Footer from '../components/Footer'
export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { courses } = useContext(CourseContext);

  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <>
    <div className="dashboard-wrapper">

      <div className="dashboard-left">

        <div className="profile-card">
          {user?.image ? (
            <img src={user.image} alt="profile" />
          ) : (
            <div className="default-avatar"><FaUser /></div>
          )}

          <h2>{user?.fullName}</h2>
          <p className="role">{user?.role}</p>
        </div>

        <div className="stats-card">
          <h3>Overview</h3>

          <div className="stat">
            <span>Total Courses</span>
            <b>{courses.length}</b>
          </div>

          {user?.role !== "lecturer" && (
            <div className="stat">
              <span>Enrolled Courses</span>
              <b>{enrolledCourses.length}</b>
            </div>
          )}

        </div>

      </div>

      <div className="dashboard-right">
        <h1>Dash<span>board</span></h1>
        {user?.role !== "lecturer" && (
          <div className="progress-grid">

            {enrolledCourses.length === 0 ? (
              <p className="empty">You are not enrolled in any courses yet.</p>
            ) : (
              enrolledCourses.map((course) => {
                const progress = course.progress || Math.floor(Math.random() * 100);

                return (
                  <div className="progress-card" key={course.id}>

                    <div className="progress-top">
                      <h3>{course.title}</h3>
                      <span>{progress}%</span>
                    </div>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p>{course.note}</p>

                  </div>
                );
              })
            )}

          </div>
        )}
        {user?.role === "lecturer" && (
          <div className="lecture-grid">

            {courses.map((course) => (
              <div className="lecture-card" key={course.id}>

                <h3>{course.title}</h3>

                <p>
                  <FaUser />Enrolled Students:{" "}
                  <b>{course.students || 0}</b>
                </p>

                <p>
                   Status:{" "}
                  <span className="active">
                    {course.enrolled ? "Active" : "Inactive"}
                  </span>
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
    <Footer/>
    </>
  );
}