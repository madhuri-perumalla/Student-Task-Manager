// components/NotificationPanel.js
import React from 'react';

function NotificationPanel({ notifications, setNotifications }) {
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, read: true }))
    );
  };
  
  if (notifications.length === 0) {
    return (
      <div className="notification-panel">
        <div className="notification-header">
          <h3>Notifications</h3>
        </div>
        <div className="empty-notifications">
          <p>No notifications</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="notification-panel">
      <div className="notification-header">
        <h3>Notifications</h3>
        <button className="mark-all-read" onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>
      <div className="notification-list">
        {notifications.map(notif => (
          <div 
            key={notif.id}
                className={`notification-item ${notif.read ? 'read' : 'unread'}`}
          >
            <div className="notification-content">
              <p>{notif.message}</p>
              {!notif.read && (
                <button 
                  className="mark-read-btn"
                  onClick={() => markAsRead(notif.id)}
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;