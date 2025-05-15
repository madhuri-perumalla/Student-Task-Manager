// components/TaskCard.js
import React from 'react';

function TaskCard({ task, updateTaskStatus, onEdit, onArchive, onUnarchive, isArchive }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  
  const getCategoryClass = (category) => {
    switch (category) {
      case 'Assignment': return 'category-assignment';
      case 'Examination': return 'category-exam';
      case 'Club Activity': return 'category-club';
      case 'Discussion': return 'category-discussion';
      default: return '';
    }
  };
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'Completed': return 'status-completed';
      case 'Pending': return 'status-pending';
      case 'On-going': return 'status-ongoing';
      default: return '';
    }
  };
  
  return (
    <div className="task-card">
      <div className="task-header">
        <h2>{task.title}</h2>
        <div className="task-actions">
          <button className="icon-button edit-button" onClick={onEdit}>
            <span className="pencil-icon">✏️</span>
          </button>
          {isArchive ? (
            <button className="icon-button unarchive-button" onClick={onUnarchive}>
              <span className="folder-icon">📂</span>
            </button>
          ) : (
            <button className="icon-button archive-button" onClick={onArchive}>
              <span className="folder-icon">📁</span>
            </button>
          )}
        </div>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-tags">
        <span className={`tag ${getCategoryClass(task.category)}`}>
          {task.category}
        </span>
        <span className={`tag ${getPriorityClass(task.priority)}`}>
          {task.priority}
        </span>
        <span className={`tag ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
      </div>
      
      <div className="task-due-date">
        <span className="calendar-icon">📅</span> Due: {formatDate(task.dueDate)}
      </div>
      
      {!isArchive && (
        <div className="task-status-buttons">
          <button 
            className={`status-button ${task.status === 'On-going' ? 'active' : ''}`}
            onClick={() => updateTaskStatus(task.id, 'On-going')}
          >
            On-going
          </button>
          <button 
            className={`status-button ${task.status === 'Pending' ? 'active' : ''}`}
            onClick={() => updateTaskStatus(task.id, 'Pending')}
          >
            Pending
          </button>
          <button 
            className={`status-button ${task.status === 'Completed' ? 'active' : ''}`}
            onClick={() => updateTaskStatus(task.id, 'Completed')}
          >
            Completed
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
