import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/createCourse.css";
import { CourseContext } from "./CourseContext";

export default function CreateCourse() {
  const navigate = useNavigate();

  const { addCourse } = useContext(CourseContext); // ✅ MUST WORK NOW

  const [form, setForm] = useState({
    title: "",
    level: "",
    note: "",
    instructor: "",
    duration: "",
    img: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "img") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          img: reader.result,
        }));
      };

      if (file) reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      id: Date.now(),
      img: form.img,
      title: form.title,
      level: form.level,
      note: form.note,
      instructor: form.instructor,
      duration: form.duration,
      students: 0,
      enrolled: false,
      modules: [],
    };

    addCourse(newCourse); // ✅ NOW WORKS

    navigate("/manage-courses");
  };

  return (
    <div className="create-course">
      <h2>Create Course</h2>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <input name="level" placeholder="Level" onChange={handleChange} />
        <input name="note" placeholder="Description" onChange={handleChange} />
        <input name="instructor" placeholder="Instructor" onChange={handleChange} />
        <input name="duration" placeholder="Duration" onChange={handleChange} />

        <input type="file" name="img" accept="image/*" onChange={handleChange} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}