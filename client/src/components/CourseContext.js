import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "./AuthContext";

export const CourseContext = createContext();

export default function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let user = null;
  try {
    const authContext = useContext(AuthContext);
    user = authContext?.user;
  } catch (e) {
   
  }

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.get("/courses");
      console.log("Courses API response:", res.data);
      const transformedCourses = res.data.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description || course.note || "No description available",
        level: course.difficulty_level || "Beginner",
        instructor: course.teacher?.full_name || "Staff",
        duration: course.duration || "8 weeks",
        students: course.students_count || 0,
        img: course.image_url || null,
        price: course.price || 0,
        enrolled: course.enrolled || false,
        modules: course.modules || [
          { title: "Introduction", time: "15m", completed: false },
          { title: "Core Concepts", time: "25m", completed: false },
          { title: "Advanced Topics", time: "40m", completed: false }
        ]
      }));
      
      setCourses(transformedCourses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError(err.response?.data?.detail || "Failed to load courses");
      setCourses(getFallbackCourses());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackCourses = () => {
    return [
      {
        id: 1,
        title: "Frontend Development",
        description: "Learn HTML, CSS, JavaScript, React",
        level: "Beginner",
        instructor: "Abebe",
        duration: "12 weeks",
        students: 2300,
        img: null,
        price: 29,
        enrolled: false,
        modules: [
          { title: "Introduction to Web Development", time: "15m", completed: false },
          { title: "HTML Fundamentals", time: "25m", completed: false },
          { title: "CSS Styling", time: "40m", completed: false },
          { title: "JavaScript Basics", time: "35m", completed: false }
        ]
      },
      {
        id: 2,
        title: "Backend Development",
        description: "Learn Node.js, Express, Databases, APIs",
        level: "Intermediate",
        instructor: "Meron",
        duration: "10 weeks",
        students: 1800,
        img: null,
        price: 45,
        enrolled: false,
        modules: [
          { title: "Introduction to Backend", time: "15m", completed: false },
          { title: "Node.js Fundamentals", time: "30m", completed: false },
          { title: "Express Framework", time: "35m", completed: false },
          { title: "Database Integration", time: "40m", completed: false }
        ]
      },
      {
        id: 3,
        title: "Machine Learning Basics",
        description: "Learn Python, ML algorithms, AI concepts",
        level: "Advanced",
        instructor: "Selam",
        duration: "14 weeks",
        students: 950,
        img: null,
        price: 59,
        enrolled: false,
        modules: [
          { title: "Python for ML", time: "20m", completed: false },
          { title: "Data Preprocessing", time: "30m", completed: false },
          { title: "Supervised Learning", time: "45m", completed: false },
          { title: "Neural Networks", time: "50m", completed: false }
        ]
      }
    ];
  };

  const fetchMyEnrollments = async () => {
    if (!user) return;
    try {
      const res = await API.get("/enrollments/my");
      console.log("Enrollments response:", res.data);
      setMyEnrollments(res.data);
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
    }
  };
  const enrollInCourse = async (courseId) => {
    try {
      const res = await API.post("/enrollments", { course_id: courseId });
      await fetchMyEnrollments();
      return res.data;
    } catch (err) {
      console.error("Enrollment failed:", err);
      throw err;
    }
  };

  const completeLesson = async (enrollmentId, lessonId) => {
    try {
      const res = await API.post("/enrollments/progress", {
        enrollment_id: enrollmentId,
        lesson_id: lessonId,
      });
      await fetchMyEnrollments();
      return res.data;
    } catch (err) {
      console.error("Failed to mark lesson complete:", err);
      throw err;
    }
  };

  const getCourseRoadmap = async (courseId) => {
    try {
      const res = await API.get(`/courses/${courseId}/roadmap`);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch roadmap:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (user) {
      fetchMyEnrollments();
    }
  }, [user]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        myEnrollments,
        loading,
        error,
        enrollInCourse,
        completeLesson,
        getCourseRoadmap,
        fetchCourses,
        fetchMyEnrollments,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}