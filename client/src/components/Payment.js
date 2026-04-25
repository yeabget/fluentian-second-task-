import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLock, FaCreditCard, FaMobileAlt } from "react-icons/fa";
import "../styles/payment.css";
import API from "../api/axios";
import { CourseContext } from "./CourseContext";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { fetchMyEnrollments } = useContext(CourseContext);
  const course = state?.course;
  
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const price = course?.price || 20;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await API.post("/payments/initiate", { course_id: course.id });
      const { checkout_url, payment_id } = res.data;
      
      // Store payment ID to check status later
      localStorage.setItem("pending_payment_id", payment_id);
      
      // Redirect to payment gateway
      window.location.href = checkout_url;
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert(err.response?.data?.detail || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check payment status on return from gateway
  useEffect(() => {
    const checkPendingPayment = async () => {
      const paymentId = localStorage.getItem("pending_payment_id");
      if (paymentId && window.location.search.includes("success")) {
        try {
          const res = await API.get(`/payments/${paymentId}/status`);
          if (res.data.status === "completed") {
            await fetchMyEnrollments();
            alert("Payment successful! You are now enrolled.");
            localStorage.removeItem("pending_payment_id");
            navigate("/dashboard");
          }
        } catch (err) {
          console.error("Payment verification failed:", err);
        }
      }
    };
    checkPendingPayment();
  }, [navigate, fetchMyEnrollments]);

  if (!course) {
    return (
      <div className="payment-wrapper">
        <h2>No course selected. <a href="/courses">Browse Courses →</a></h2>
      </div>
    );
  }

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <div className="payment-left">
          <h2>Secure Checkout</h2>
          <p className="subtitle">Complete your enrollment safely</p>

          <div className="tabs">
            <button
              className={method === "card" ? "active" : ""}
              onClick={() => setMethod("card")}
            >
              <FaCreditCard /> Card
            </button>
            <button
              className={method === "mobile" ? "active" : ""}
              onClick={() => setMethod("mobile")}
            >
              <FaMobileAlt /> Mobile Money
            </button>
          </div>

          {method === "card" && (
            <div className="form">
              <input placeholder="Cardholder Name" />
              <input placeholder="Card Number" />
              <div className="row">
                <input placeholder="MM/YY" />
                <input placeholder="CVV" />
              </div>
            </div>
          )}
          
          {method === "mobile" && (
            <div className="form">
              <input placeholder="Phone Number (e.g., 0912345678)" />
              <select>
                <option>Select Provider</option>
                <option>Telebirr</option>
                <option>M-Pesa</option>
              </select>
            </div>
          )}
        </div>

        <div className="payment-right">
          <h3>Order Summary</h3>

          <div className="course-card">
            <div>
              <h4>{course.title}</h4>
              <p>{course.difficulty_level || "Beginner"}</p>
            </div>
          </div>

          <div className="summary">
            <div>
              <span>Course</span>
              <span>${price}</span>
            </div>
            <div>
              <span>Tax</span>
              <span>$2</span>
            </div>
            <hr />
            <div className="total">
              <span>Total</span>
              <span>${price + 2}</span>
            </div>
          </div>

          <button className="pay-btn" onClick={handlePayment} disabled={loading}>
            <FaLock /> {loading ? "Processing..." : `Pay $${price + 2} & Enroll`}
          </button>

          <p className="secure-note">
            <FaLock /> Secure payment powered by Chapa/Stripe
          </p>
        </div>
      </div>
    </div>
  );
}