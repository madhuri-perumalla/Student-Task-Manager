// components/Header.js
import React from 'react';
import { Bell } from 'lucide-react';

function Header({ activeTab, setActiveTab, notificationCount, setShowNotifications, showNotifications }) {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Student Task Manager</h1>
        <p>Organize your academic life</p>
      </div>
      <nav className="nav-tabs">
        <div className="tab-container">
          <button 
            className={`tab ${activeTab === 'Tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('Tasks')}
          >
            <span className="tab-icon">✓</span> Tasks
          </button>
          <button 
            className={`tab ${activeTab === 'Archive' ? 'active' : ''}`}
            onClick={() => setActiveTab('Archive')}
          >
            <span className="tab-icon">📁</span> Archive
          </button>
        </div>
        <div className="nav-actions">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={24} />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;