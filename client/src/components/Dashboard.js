import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { CourseContext } from "./CourseContext";
import "../styles/dashboard.css";
import { FaUser } from "react-icons/fa";
import Footer from '../components/Footer';
import API from "../api/axios";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { myEnrollments, courses } = useContext(CourseContext);
  const [userStats, setUserStats] = useState(null);
  const [myCreatedCourses, setMyCreatedCourses] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const res = await API.get("/users/stats");
        setUserStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    
    const fetchTeacherCourses = async () => {
      if (user?.role === "lecturer") {
        try {
          const res = await API.get("/users/my-courses");
          setMyCreatedCourses(res.data);
        } catch (err) {
          console.error("Failed to fetch teacher courses:", err);
        }
      }
    };

    fetchUserStats();
    fetchTeacherCourses();
  }, [user]);

  // Get enrolled courses from the context that have payment completed
  const enrolledCourses = myEnrollments.map(enrollment => {
    const course = courses.find(c => c.id === enrollment.course_id);
    return {
      ...course,
      progress: enrollment.progress_percentage,
      enrollmentId: enrollment.id
    };
  }).filter(c => c);

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
            <h2>{user?.full_name}</h2>
            <p className="role">{user?.role === "lecturer" ? "Teacher" : "Student"}</p>
            <p className="email">{user?.email}</p>
          </div>

          <div className="stats-card">
            <h3>Learning Overview</h3>
            {userStats && (
              <>
                <div className="stat">
                  <span>Total Courses</span>
                  <b>{courses.length}</b>
                </div>
                {user?.role !== "lecturer" && (
                  <>
                    <div className="stat">
                      <span>Enrolled Courses</span>
                      <b>{userStats.enrolled_courses}</b>
                    </div>
                    <div className="stat">
                      <span>Lessons Completed</span>
                      <b>{userStats.completed_lessons} / {userStats.total_lessons}</b>
                    </div>
                    <div className="stat">
                      <span>Overall Progress</span>
                      <b>{userStats.overall_progress}%</b>
                    </div>
                  </>
                )}
                {user?.role === "lecturer" && (
                  <div className="stat">
                    <span>Courses Created</span>
                    <b>{userStats.courses_created}</b>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="dashboard-right">
          <h1>Dash<span>board</span></h1>
          
          {user?.role !== "lecturer" && (
            <div className="progress-grid">
              {enrolledCourses.length === 0 ? (
                <p className="empty">
                  You are not enrolled in any courses yet. 
                  <br />
                  <a href="/courses">Browse Courses →</a>
                </p>
              ) : (
                enrolledCourses.map((course) => (
                  <div className="progress-card" key={course.id}>
                    <div className="progress-top">
                      <h3>{course.title}</h3>
                      <span>{course.progress || 0}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                    <p>{course.description?.substring(0, 100)}...</p>
                    <a href={`/courses/${course.id}`} className="continue-link">
                      Continue Learning →
                    </a>
                  </div>
                ))
              )}
            </div>
          )}
          
          {user?.role === "lecturer" && (
            <div className="lecture-grid">
              {myCreatedCourses.length === 0 ? (
                <p className="empty">
                  You haven't created any courses yet.
                  <br />
                  <a href="/create-course">Create Your First Course →</a>
                </p>
              ) : (
                myCreatedCourses.map((course) => (
                  <div className="lecture-card" key={course.id}>
                    <h3>{course.title}</h3>
                    <p>{course.description?.substring(0, 100)}...</p>
                    <p>
                      <FaUser /> Enrolled Students: <b>{course.enrolled_students || 0}</b>
                    </p>
                    <p>
                      Status:{" "}
                      <span className="active">
                        {course.enrolled_students > 0 ? "Active" : "Inactive"}
                      </span>
                    </p>
                    <small>Lessons: {course.total_lessons || 0}</small>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}