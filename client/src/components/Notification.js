import React, { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // load on refresh
  useEffect(() => {
    const saved = localStorage.getItem("notifications");
    if (saved) {
      setNotifications(JSON.parse(saved));
    }
  }, []);

  // save on change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (message) => {
    const newNotif = {
      id: Date.now(),
      message,
      read: false,
      time: new Date().toLocaleTimeString(),
    };

    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAsRead, clearAll }}
    >
      {children}
    </NotificationContext.Provider>
  );
}