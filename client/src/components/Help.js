import React, { useState } from "react";
import "../styles/help.css";
import { FaQuestionCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Footer from '../components/Footer'
const faqData = [
  {
    question: "How do I change my password?",
    answer:
      "You can change your password by going to Profile Settings > Account Security. You will need to enter your current password for verification.",
  },
  {
    question: "Why is the next lesson locked?",
    answer:
      "The next lesson is locked until you complete the previous module. This ensures structured learning progression.",
  },
  {
    question: "Can I access courses offline?",
    answer:
      "Yes, you can download selected courses and access them offline through the mobile app.",
  },
 {
    question: "Can I send files in the chat?",
    answer:"Yes, our chat system supports PDFs, images, and common document formats up to 10MB per file."}
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
    <h1 className="help-title">How can we <span>help you?</span></h1>
    <div className="faq-page">

      {/* LEFT SIDE */}
      <div className="faq-container">

        <div className="faq-header">
          <h2><FaQuestionCircle size={24} /> Frequently Asked Questions</h2>
          
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">

              <div
                className="faq-question"
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
              >
                <h4>{item.question}</h4>
                <div>{openIndex === index ?<FaChevronUp /> : <FaChevronDown />}</div>
              </div>

              {openIndex === index && (
                <p className="faq-answer">{item.answer}</p>
              )}

            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="help-cards">
        <h3>Still Need Help?</h3>
      <div className="help-card">

       

        <div className="support-box">
          <div className="icon"><MdEmail size={24} /></div>

          <h4>Email Support</h4>
          <p>Response in 24 hours</p>

          <a href="mailto:support@eduai.com">
            support@eduai.com →
          </a>
        </div>

      </div>
      
 <div className="help-card">

        

        <div className="support-box">
          <div className="icon"><MdPhone size={24} color="green" /></div>

          <h4>Phone Support</h4>
          <p>Immediate assistance</p>

          <a href="mailto:support@eduai.com">
            +251 912 345 678
          </a>
        </div>

      </div>
    
      </div>
    </div>
    <Footer/>
    </>
  );
}