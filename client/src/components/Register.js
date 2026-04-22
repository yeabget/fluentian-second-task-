import React, { useState, useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

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

  // IMAGE FIX (BASE64)
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
      role: role, // IMPORTANT
    };

    login(userData);
    navigate("/dashboard");
  };

  return (
    <div className="register-page">

      {/* STEP 1 - ROLE SELECT */}
      {step === 1 && (
        <div className="role-box">

          <h2>Select Your Role</h2>

          <div className="role-container">

            <div
              className={`role-card ${role === "student" ? "active" : ""}`}
              onClick={() => setRole("student")}
            >
              🎓 Student
            </div>

            <div
              className={`role-card ${role === "lecturer" ? "active" : ""}`}
              onClick={() => setRole("lecturer")}
            >
              👨‍🏫 Lecturer
            </div>

          </div>

          <button
            disabled={!role}
            onClick={() => setStep(2)}
          >
            Continue
          </button>

        </div>
      )}

      {/* STEP 2 - FORM */}
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