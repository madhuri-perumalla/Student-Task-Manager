// components/AddTaskForm.js
import React, { useState } from 'react';

function AddTaskForm({ addTask, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    category: 'Assignment',
    priority: 'Medium',
    status: 'Pending'
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    addTask(formData);
  };
  
  return (
    <div className="form-container">
      <div className="form-header">
        <h2>Add New Task</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title*</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label>Due Date*</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Assignment">Assignment</option>
            <option value="Examination">Examination</option>
            <option value="Club Activity">Club Activity</option>
            <option value="Discussion">Discussion</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="On-going">On-going</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div className="form-buttons">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTaskForm;
