import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";
import { FaGraduationCap } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null,
  });
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };

      if (file) reader.readAsDataURL(file);
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      id: Date.now(),
      fullName: form.fullName,
      email: form.email,
      image: form.image,
      role: role, 
    };

    login(userData);
    navigate("/dashboard");
  };

  return (
    <div className="register-page">
      {step === 1 && (
        <div className="role-box">

          <h1>Select Your <span>Role</span></h1>

          <div className="role-container">

            <div
              className={`role-card ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
             <FaGraduationCap /> Student
            </div>

            <div
              className={`role-card ${role === "lecturer" ? "active" : ""}`}
              onClick={() => setRole("lecturer")}
            >
             <FaChalkboardTeacher /> Lecturer
            </div>

          </div>

          <button
            disabled={!role}
            onClick={() => setStep(2)}
            className="continue-btn"
          >
            Continue
          </button>

        </div>
      )}
      {step === 2 && (
        <form className="register-form" onSubmit={handleSubmit}>

          <h2>Create {role} Account</h2>

          <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />

          <input type="file" name="image" accept="image/*" onChange={handleChange} />

          <button type="submit">Register</button>

        </form>
      )}

    </div>
  );
}