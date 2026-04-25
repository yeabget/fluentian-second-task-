import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { NotificationContext } from "../components/Notification";
import { AiFillHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { BsChatDots } from "react-icons/bs";
import { MdMenuBook } from "react-icons/md";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import "../styles/navbar.css";

export default function NextTopbar() {
  const { user, logout } = useContext(AuthContext);
  const notifContext = useContext(NotificationContext);
  const notifications = notifContext?.notifications || [];
  const markAsRead = notifContext?.markAsRead;
  const clearAll = notifContext?.clearAll;
  const location = useLocation();

  const [ui, setUi] = useState({
    menu: false,
    profile: false,
    notif: false,
  });

  useEffect(() => {
    setUi({ menu: false, profile: false, notif: false });
  }, [location.pathname]);

  useEffect(() => {
    const last = localStorage.getItem("next:lastPanel");
    if (last) {
      setUi((prev) => ({ ...prev, notif: last === "notif" }));
    }
  }, []);

  useEffect(() => {
    if (ui.notif) localStorage.setItem("next:lastPanel", "notif");
  }, [ui.notif]);

  let unread = 0;
  notifications.forEach((n) => {
    if (!n.read) unread++;
  });

  const toggle = (key) => {
    setUi((prev) => ({
      menu: key === "menu" ? !prev.menu : false,
      profile: key === "profile" ? !prev.profile : false,
      notif: key === "notif" ? !prev.notif : false,
    }));
  };

  return (
    <header className="navbar-container">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <nav className={ui.menu ? "links open" : "links"}>
        <Link to="/">
          <AiFillHome /> Home
        </Link>

        <Link to="/courses">
          <MdMenuBook /> Courses
        </Link>

        {user && user.role !== "lecturer" && (
          <Link to="/dashboard">
            <RxDashboard /> Dashboard
          </Link>
        )}

        <Link to="/chat">
          <BsChatDots /> Chat
        </Link>

        <Link to="/help">
          <AiOutlineQuestionCircle /> Help
        </Link>

        {user?.role === "lecturer" && (
          <Link to="/create-course" className="create-course-btn">
            Create Course
          </Link>
        )}

        {!user && ui.menu && (
          <Link to="/register" className="mobile-register">
            Register
          </Link>
        )}
      </nav>

      <div className="right">
        <div className="notification">
          <div className="icon" onClick={() => toggle("notif")}>
            <IoNotificationsOutline size={24} />
            {unread > 0 && <span className="badge">{unread}</span>}
          </div>

          {ui.notif && (
            <div className="dropdown notif">
              <div className="top">
                <h4>Updates</h4>
                {notifications.length > 0 && (
                  <button onClick={clearAll}>Clear</button>
                )}
              </div>

              {notifications.length === 0 ? (
                <p className="empty">Nothing new</p>
              ) : (
                notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    className={`item ${n.read ? "read" : ""}`}
                    onClick={() => markAsRead?.(n.id)}
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
          <div className="profile">
            <div onClick={() => toggle("profile")}>
              {user.image ? (
                <img src={user.image} className="avatar" alt="profile" />
              ) : (
                <FaUserCircle size={26} style={{ color: "white" }} />
              )}
            </div>

            {ui.profile && (
              <div className="dropdown profile">
                <p className="name">{user.fullName}</p>
                <small className="role">{user.role}</small>

                {user.role === "lecturer" && (
                  <Link to="/manage-courses">My Courses</Link>
                )}

                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/register">
            <button className="register-btn">Register</button>
          </Link>
        )}

        <div className="menu" onClick={() => toggle("menu")}>
          {ui.menu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>
    </header>
  );
}