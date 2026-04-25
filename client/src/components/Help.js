import React, { useState } from "react";
import "../styles/help.css";
import { FaQuestionCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import Footer from "../components/Footer";

const faqData = [
  {
    question: "How do I change my password?",
    answer:
      "Head over to your profile settings, then open Account Security. You'll be asked for your current password before setting a new one.",
  },
  {
    question: "Why is the next lesson locked?",
    answer:
      "We unlock lessons step by step so you don’t miss anything important. Finish the current module and the next one will open automatically.",
  },
  {
    question: "Can I access courses offline?",
    answer:
      "Yes — some courses can be downloaded and viewed offline through our mobile app.",
  },
  {
    question: "Can I send files in the chat?",
    answer:
      "You can send images, PDFs, and common documents up to 10MB directly in chat.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <h1 className="help-title">
        How can we <span>help you?</span>
      </h1>

      <div className="faq-page">

        <div className="faq-container">
          <div className="faq-header">
            <h2>
              <FaQuestionCircle size={22} /> FAQs
            </h2>
          </div>

          <div className="faq-list">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className={`faq-item ${isOpen ? "open" : ""}`}>
                  
                  <div className="faq-question" onClick={() => toggle(index)}>
                    <h4>{item.question}</h4>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </div>

                  {isOpen && (
                    <p className="faq-answer">{item.answer}</p>
                  )}

                </div>
              );
            })}
          </div>
        </div>
        <div className="help-cards">
          <h3>Still stuck?</h3>

          <div className="help-card">
            <div className="support-box">
              <div className="icon">
                <MdEmail size={22} />
              </div>

              <h4>Email us</h4>
              <p>We usually reply within a day</p>

              <a href="mailto:support@eduai.com">
                next_support@gmail.com →
              </a>
            </div>
          </div>

          <div className="help-card">
            <div className="support-box">
              <div className="icon">
                <MdPhone size={22} />
              </div>

              <h4>Call support</h4>
              <p>Get help instantly</p>

              <p className="phone-number">
                +251 912 345 678
              </p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}