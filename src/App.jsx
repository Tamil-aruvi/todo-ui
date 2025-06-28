import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import NotificationManager from './components/NotificationManager';
import './styles/index.css'; // ✅ Plain CSS

function App() {
  const [filter, setFilter] = useState('all');

  return (
    <TaskProvider>
      <div className="page-wrapper">
        <div className="container">
          <h1>📄 My To-Do List</h1>
          <TaskForm />
          <FilterBar filter={filter} setFilter={setFilter} />
          <TaskList filter={filter} />
          <NotificationManager />
        </div>
      </div>
    </TaskProvider>
  );
}


export default App;
