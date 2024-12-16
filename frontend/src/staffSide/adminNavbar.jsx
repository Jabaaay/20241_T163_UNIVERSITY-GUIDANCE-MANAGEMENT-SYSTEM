import React, { useEffect, useState } from 'react';
import logo from '../assets/1.png';
import { useNavigate } from 'react-router-dom';
import { MdNotifications } from "react-icons/md";

function NavBar() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('userInfo');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }

    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3001/staff/contact');
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
          const unread = data.filter(notification => notification.status === 'unread').length;
          setUnreadCount(unread);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, []);

  const handleNavigation = (route) => {
    navigate(route);
  };

  // Function to update unread count when a notification is marked as read
  const updateUnreadCount = () => {
    const unread = notifications.filter(notification => notification.status === 'unread').length;
    setUnreadCount(unread);
  };

  return (
    <nav>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="user-info">
        <div className="notification-container" onClick={() => handleNavigation('/staff-notification')}>
          <MdNotifications className="notif" />
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>

        {userData ? (
          <button className="user" onClick={() => handleNavigation('/staff-Profile')}>
            {userData.picture ? (
              <img src={userData.picture} alt="User" />
            ) : (
              <span>{userData.name?.charAt(0)}</span>
            )}
          </button>
        ) : (
          <button className="user" onClick={() => handleNavigation('/login')}>Login</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
