import React, { createContext, useState } from "react";
import { data } from "./CoursesData";

export const CourseContext = createContext();

export default function CourseProvider({ children }) {
  const [courses, setCourses] = useState(data);

  const addCourse = (course) => {
    setCourses((prev) => [...prev, course]);
  };

  const deleteCourse = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        setCourses,
        addCourse,
        deleteCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}