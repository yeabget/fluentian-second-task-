import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaLock, FaCreditCard } from "react-icons/fa";
import "../styles/payment.css";

export default function Payment() {
  const { state } = useLocation();
  const course = state?.course;

  const [method, setMethod] = useState("card");
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  if (!course) return <h2>No course selected</h2>;

  const price = course.price || 20;

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
              Mobile
            </button>
          </div>
          {method === "card" && (
            <div className="card-preview">
              <p className="card-number">
                {card.number || "**** **** **** 1234"}
              </p>
              <div className="card-bottom">
                <span>{card.name || "Your Name"}</span>
                <span>{card.expiry || "MM/YY"}</span>
              </div>
            </div>
          )}
          {method === "card" && (
            <div className="form">
              <input
                placeholder="Cardholder Name"
                onChange={(e) =>
                  setCard({ ...card, name: e.target.value })
                }
              />
              <input
                placeholder="Card Number"
                onChange={(e) =>
                  setCard({ ...card, number: e.target.value })
                }
              />

              <div className="row">
                <input
                  placeholder="MM/YY"
                  onChange={(e) =>
                    setCard({ ...card, expiry: e.target.value })
                  }
                />
                <input
                  placeholder="CVV"
                  onChange={(e) =>
                    setCard({ ...card, cvv: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          {method === "mobile" && (
            <div className="form">
              <input placeholder="Phone Number" />
              <input placeholder="Provider (Telebirr / M-Pesa)" />
            </div>
          )}
        </div>
        <div className="payment-right">
          <h3>Order Summary</h3>

          <div className="course-card">
            <img src={course.img} alt="" />
            <div>
              <h4>{course.title}</h4>
              <p>{course.level}</p>
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

          <button className="pay-btn">
            <FaLock /> Pay & Enroll
          </button>

          <p className="secure-note">
            <FaLock /> Secure payment powered by gateway
          </p>
        </div>
      </div>
    </div>
  );
}