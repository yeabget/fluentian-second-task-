import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { CourseContext } from "./CourseContext";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { courses } = useContext(CourseContext);

  const enrolledCourses = courses.filter((c) => c.enrolled);

  return (
    <div className="dashboard-wrapper">

      {/* LEFT PROFILE */}
      <div className="dashboard-left">

        <div className="profile-card">
          {user?.image ? (
            <img src={user.image} alt="profile" />
          ) : (
            <div className="default-avatar">👤</div>
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

          {/* STUDENT STATS */}
          {user?.role !== "lecturer" && (
            <div className="stat">
              <span>Enrolled Courses</span>
              <b>{enrolledCourses.length}</b>
            </div>
          )}

        </div>

      </div>

      {/* RIGHT CONTENT */}
      <div className="dashboard-right">

        <h2>Dashboard</h2>

        {/* 👨‍🎓 STUDENT VIEW */}
        {user?.role !== "lecturer" && (
          <div className="progress-grid">

            {enrolledCourses.length === 0 ? (
              <p className="empty">You are not enrolled in any courses yet.</p>
            ) : (
              enrolledCourses.map((course) => {
                // if backend exists → use real progress
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

        {/* 👨‍🏫 LECTURER VIEW */}
        {user?.role === "lecturer" && (
          <div className="lecture-grid">

            {courses.map((course) => (
              <div className="lecture-card" key={course.id}>

                <h3>{course.title}</h3>

                <p>
                  👥 Enrolled Students:{" "}
                  <b>{course.students || 0}</b>
                </p>

                <p>
                  📊 Status:{" "}
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
  );
}