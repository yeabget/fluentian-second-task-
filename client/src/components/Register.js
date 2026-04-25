import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/register.css";
import { FaGraduationCap } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function Register() {  // ← Make sure this is "export default"
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: form.fullName,
      email: form.email,
      password: form.password,
      role: role === "lecturer" ? "teacher" : "student",
      country: "Ethiopia"
    };

    console.log("REGISTER PAYLOAD:", payload);

    try {
      const res = await API.post("/auth/register", payload);
      console.log("SUCCESS RESPONSE:", res.data);

      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
      }

      login(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.log("ERROR STATUS:", err.response?.status);
      console.log("ERROR DATA:", err.response?.data);
      
      const errorMsg = err.response?.data?.detail || "Registration failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="register-page">
      {step === 1 && (
        <div className="role-box">
          <h1>
            Select Your <span>Role</span>
          </h1>

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
          <h2>Create {role === "lecturer" ? "Teacher" : "Student"} Account</h2>

          <input
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      )}
    </div>
  );
}