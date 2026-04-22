import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { NotificationContext } from "../components/Notification";
import logo from "../assets/images/logo.png";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { BsChatDots } from "react-icons/bs";
import { MdMenuBook, MdPayment } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext) || {};
  const { notifications = [], markAsRead, clearAll } =
    useContext(NotificationContext) || {};
  const [ismenuOpen, setisMenuOpen] = useState(false);
  const [isprofileOpen, setisProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const unreadNumber = notifications.filter((n) => !n.read).length;
  return (
    <div className="navbar-container">
      <div className="logo">
          <Link to="/">
              <img src={logo} alt="logo" />
          </Link>
      </div>

      <div className={ismenuOpen ? "hidden-menubar" : "links"}>
        <Link to="/">Home</Link>
        <Link to="/courses"><MdMenuBook />Courses</Link>
        {user?.role !== "lecturer" && (
        <Link to="/dashboard">
            <RxDashboard />Dashboard
        </Link>
        )}
        <Link to="/chat"><BsChatDots />Chat</Link>
        <Link to="/help"><AiOutlineQuestionCircle />Help</Link>
        {user?.role === "lecturer" && (
          <Link to="/create-course">Create Course</Link>
        )}
      </div>
      <div className="register">
        <div className="notification">
          <div
            className="notification-icon"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <IoNotificationsOutline size={28} />
            {unreadNumber > 0 && (
              <span className="new-notifications">{unreadNumber}</span>
            )}
          </div>

          {notifOpen && (
            <div className="dropdown-notification">

              <div className="notification-box">
                <h4>Notifications</h4>
                <button onClick={clearAll}>Clear</button>
              </div>

              {notifications.length === 0 ? (
                <p className="no-notification">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`notification-item ${n.read ? "read" : ""}`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <p>{n.message}</p>
                    <span>{n.time}</span>
                  </div>
                ))
              )}

            </div>
          )}

        </div>
        {user ? (
          <div className="profile-pic">
            <div
              className="profile"
              onClick={() => setisProfileOpen(!isprofileOpen)}
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt="profile"
                  className="profile-img "
                />
              ) : (
                <FaUserCircle size={34} style={{color:"rgb(209, 206, 206)"}} />
              )}
            </div>

            {isprofileOpen && (
              <div className="profilepic-dropdown">
                <p className="name">{user.fullName}</p>
                <p className="user">{user.role}</p>

                {user.role === "lecturer" && (
                  <Link to="/manage-courses">Manage Courses</Link>
                )}
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/register">
            <button className={ismenuOpen?"register-btn-menubar-opened":"register-btn"}>Register</button>
          </Link>
        )}
        <div
          className="menubar"
          onClick={() => setisMenuOpen(!ismenuOpen)}
        >
          {ismenuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </div>
      </div>
    </div>
  );
}