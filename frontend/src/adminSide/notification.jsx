import React, { useState, useEffect } from 'react';
import NavBar from './adminNavbar';
import Sidebar from './adminSidebar';
import { format } from 'timeago.js';
import { MdDelete } from 'react-icons/md';

function Status({ updateUnreadCount }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState('all');
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [confirmedAppointments, setConfirmedAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/contact');
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
          setFilteredNotifications(data);
        } else {
          console.error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/admin/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();

        // Sort appointments by date in descending order
        const sortedData = data.sort((a, b) => new Date(b.dateNow) - new Date(a.dateNow));

        // Filter appointments by status
        const pending = sortedData.filter(appointment => appointment.status === 'Waiting for Approval');
        const confirmed = sortedData.filter(appointment => appointment.status === 'Confirmed');

        setPendingAppointments(pending);
        setConfirmedAppointments(confirmed);
        setTotalAppointments(data.length);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    fetchAppointments();
  }, []);

  // Update filtered notifications when filter changes
  useEffect(() => {
    if (filter === 'all') {
      setFilteredNotifications(notifications);
    } else {
      const filtered = notifications.filter(notification => notification.status === filter);
      setFilteredNotifications(filtered);
    }
  }, [filter, notifications]);

  const handleNewNotification = (newNotification) => {
    // When a new notification arrives, add it to the top
    setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
  
    // Re-sort notifications in case the new one has a more recent timestamp
    setNotifications((prevNotifications) => 
      [...prevNotifications].sort((a, b) => new Date(b.date) - new Date(a.date))
    );
  };
  

  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/admin/contact/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setNotifications((prev) => prev.filter((notif) => notif._id !== id));
        alert('Notification has been deleted.');
      } else {
        alert('Failed to delete notification.');
      }
    } catch (error) {
      alert('Error deleting notification.');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      deleteNotification(id);
    }
  };

  const handleNotificationClick = async (notification) => {
    try {
      const response = await fetch(`http://localhost:3001/admin/contact/${notification._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'read' }),
      });
      if (response.ok) {
        const updatedNotification = await response.json();
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === updatedNotification._id ? updatedNotification : notif
          )
        );
        setSelectedNotification(updatedNotification); // Set selected notification for modal
        setShowModal(true); // Show modal
        updateUnreadCount();
      } else {
        console.error('Failed to update notification status');
      }
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/contact/markAllAsRead', {
        method: 'PATCH',
      });
      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, status: 'read' }))
        );
        setFilteredNotifications((prev) =>
          prev.map((notif) => ({ ...notif, status: 'read' }))
        );
        alert('All notifications marked as read.');
        updateUnreadCount();
      } else {
        alert('Failed to mark all notifications as read.');
      }
    } catch (error) {
      alert('Error marking notifications as read.');
    }
  };

  return (
    <>
      <NavBar />
      <div className="card1">
        <Sidebar />
        <div className="card3">
          <div className="notif-card">
            <p>Notifications</p>
            <select onChange={(e) => setFilter(e.target.value)} value={filter}>
              <option value="all">All</option>
              <option value="read">Read</option>
              <option value="unread">Unread</option>
            </select>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification._id}
                className={`message ${notification.status === 'unread' ? 'unread' : 'read'}`}
                onClick={() => handleNotificationClick(notification)}
                style={{ cursor: 'pointer' }}
              >
                <div className="name-msg">
                  <p className="notif-name">
                    <b>{notification.fullName}</b>
                  </p>
                  <p className="notif-msg">{notification.message}</p>
                </div>
                <div className="date-del">
                  <p className="notif-date">{format(notification.date)}</p>
                  <MdDelete
                    className="notif-del"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(notification._id);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No new notifications</p>
          )}

{loading ? (
            <p>Loading...</p>
          ) : pendingAppointments.length > 0 ? (
            pendingAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className={`message ${appointment.status === 'Waiting for Approval' ? 'Pending' : ''}`}
                
                
                style={{ cursor: 'pointer' }}
              >
                <div className="name-msg">
                  <p className="notif-name">
                    <b>{appointment.userName}</b>
                  </p>
                  <p className="notif-msg">Made an Appointment</p>
                </div>
                <div className="date-del">
                  <p className="notif-date">{format(appointment.dateNow)}</p>
                  <MdDelete
                    className="notif-del"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(appointment._id);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No pending appointments available</p>
          )}

        </div>
      </div>

      {/* Suggestion Modal */}
      {showModal && selectedNotification && (
        <div className="modal">
          <div className="modal-contents">
            <h3 className='namess'>{selectedNotification.fullName}</h3>
            <p className='msgss'>{selectedNotification.message}</p>
            <button className='btnss' onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Status;
