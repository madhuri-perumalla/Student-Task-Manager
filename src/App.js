// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import Header from './components/Header';
import Footer from './components/Footer';
import AddTaskForm from './components/AddTaskForm';
import NotificationPanel from './components/NotificationPanel';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [
        {
          id: 1,
          title: 'CS Club Meeting',
          description: 'Weekly meeting to discuss upcoming hackathon',
          dueDate: '2025-03-25',
          category: 'Club Activity',
          priority: 'Medium',
          status: 'Completed',
        },
        {
          id: 2,
          title: 'Database Assignment',
          description: 'Complete ERD and SQL queries for the database course',
          dueDate: '2025-03-30',
          category: 'Assignment',
          priority: 'High',
          status: 'Completed',
        },
        {
          id: 3,
          title: 'Midterm Preparation',
          description: 'Review chapters 1-5 for midterm examination',
          dueDate: '2025-04-05',
          category: 'Examination',
          priority: 'Low',
          status: 'Pending',
        },
      ];
    }
  });
  
  const [archivedTasks, setArchivedTasks] = useState(() => {
    const savedArchived = localStorage.getItem('archivedTasks');
    return savedArchived ? JSON.parse(savedArchived) : [];
  });
  
  const [activeTab, setActiveTab] = useState('Tasks');
  const [showAddForm, setShowAddForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState({ type: 'all', value: '' });
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('archivedTasks', JSON.stringify(archivedTasks));
    
    // Generate notifications for approaching deadlines (3 days)
    const today = new Date();
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(today.getDate() + 3);
    
    const newNotifications = tasks
      .filter(task => new Date(task.dueDate) <= threeDaysFromNow && task.status !== 'Completed')
      .map(task => ({
        id: task.id,
        message: `${task.title} is due on ${new Date(task.dueDate).toLocaleDateString()}`,
        read: false
      }));
    
    setNotifications(newNotifications);
  }, [tasks, archivedTasks]);
  
  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task
    };
    setTasks([...tasks, newTask]);
    setShowAddForm(false);
  };
  
  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };
  
  const archiveTask = (id) => {
    const taskToArchive = tasks.find(task => task.id === id);
    if (taskToArchive) {
      setArchivedTasks([...archivedTasks, taskToArchive]);
      setTasks(tasks.filter(task => task.id !== id));
    }
  };
  
  const unarchiveTask = (id) => {
    const taskToUnarchive = archivedTasks.find(task => task.id === id);
    if (taskToUnarchive) {
      setTasks([...tasks, taskToUnarchive]);
      setArchivedTasks(archivedTasks.filter(task => task.id !== id));
    }
  };
  
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };
  
  const handleFilterChange = (type, value) => {
    setFilter({ type, value });
  };
  
  const filteredTasks = () => {
    if (filter.type === 'all') return activeTab === 'Tasks' ? tasks : archivedTasks;
    
    const tasksToFilter = activeTab === 'Tasks' ? tasks : archivedTasks;
    
    return tasksToFilter.filter(task => {
      if (filter.type === 'category') return task.category === filter.value;
      if (filter.type === 'priority') return task.priority === filter.value;
      if (filter.type === 'status') return task.status === filter.value;
      if (filter.type === 'dueDate') {
        // Filter by due date (today, this week, this month)
        const today = new Date();
        const taskDate = new Date(task.dueDate);
        
        if (filter.value === 'today') {
          return taskDate.toDateString() === today.toDateString();
        } else if (filter.value === 'week') {
          const endOfWeek = new Date();
          endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
          return taskDate <= endOfWeek && taskDate >= today;
        } else if (filter.value === 'month') {
          return taskDate.getMonth() === today.getMonth() && 
                 taskDate.getFullYear() === today.getFullYear();
        }
      }
      return true;
    });
  };
  
  return (
    <div className="app">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        notificationCount={notifications.filter(n => !n.read).length}
        setShowNotifications={setShowNotifications}
        showNotifications={showNotifications}
      />
      
      <main className="main-content">
        {showNotifications && (
          <NotificationPanel 
            notifications={notifications}
            setNotifications={setNotifications}
          />
        )}
        
        <div className="content-wrapper">
          <div className="tasks-header">
            <h1>Your {activeTab}</h1>
            {activeTab === 'Tasks' && (
              <button className="add-task-btn" onClick={() => setShowAddForm(true)}>
                + Add Task
              </button>
            )}
          </div>
          
          <div className="filter-controls">
            <select onChange={(e) => handleFilterChange('category', e.target.value)}>
              <option value="">Filter by Category</option>
              <option value="Assignment">Assignment</option>
              <option value="Examination">Examination</option>
              <option value="Club Activity">Club Activity</option>
              <option value="Discussion">Discussion</option>
            </select>
            
            <select onChange={(e) => handleFilterChange('priority', e.target.value)}>
              <option value="">Filter by Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            
            <select onChange={(e) => handleFilterChange('dueDate', e.target.value)}>
              <option value="">Filter by Due Date</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            
            <button onClick={() => handleFilterChange('all', '')}>
              Clear Filters
            </button>
          </div>
          
          <TaskList 
            tasks={filteredTasks()} 
            updateTaskStatus={updateTaskStatus}
            editTask={editTask}
            archiveTask={archiveTask}
            unarchiveTask={unarchiveTask}
            isArchive={activeTab === 'Archive'}
          />
        </div>
      </main>
      
      {showAddForm && (
        <div className="modal-overlay">
          <AddTaskForm 
            addTask={addTask} 
            onClose={() => setShowAddForm(false)} 
          />
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default App;