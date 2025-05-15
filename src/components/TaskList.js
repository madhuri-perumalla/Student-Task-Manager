// components/TaskList.js
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import EditTaskForm from './EditTaskForm';

function TaskList({ tasks, updateTaskStatus, editTask, archiveTask, unarchiveTask, isArchive }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  const handleEdit = (taskId) => {
    setEditingTaskId(taskId);
  };
  
  const handleEditClose = () => {
    setEditingTaskId(null);
  };
  
  const handleEditSubmit = (taskId, updatedTask) => {
    editTask(taskId, updatedTask);
    setEditingTaskId(null);
  };
  
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No {isArchive ? 'archived ' : ''}tasks found</h3>
        <p>{isArchive ? 'Completed tasks will appear here' : 'Add a task to get started'}</p>
      </div>
    );
  }
  
  return (
    <div className="task-list">
      {tasks.map(task => (
        <React.Fragment key={task.id}>
          <TaskCard 
            task={task}
            updateTaskStatus={updateTaskStatus}
            onEdit={() => handleEdit(task.id)}
            onArchive={() => archiveTask(task.id)}
            onUnarchive={() => unarchiveTask(task.id)}
            isArchive={isArchive}
          />
          {editingTaskId === task.id && (
            <div className="modal-overlay">
              <EditTaskForm 
                task={task}
                onSubmit={(updatedTask) => handleEditSubmit(task.id, updatedTask)}
                onClose={handleEditClose}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default TaskList;