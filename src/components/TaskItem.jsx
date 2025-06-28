import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskForm from './TaskForm';

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete } = useTasks();
  const [editing, setEditing] = useState(false);

  if (editing) return <TaskForm task={task} onClose={() => setEditing(false)} />;

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
  <div className="task-info">
    <h3>{task.title}</h3>
    <p>{task.description}</p>
    <div className="task-meta">
      Priority: {task.priority} | Due: {new Date(task.dueDate).toLocaleString()}
    </div>
  </div>
  <div className="task-actions">
    <button onClick={() => toggleComplete(task.id)}>✔</button>
    <button onClick={() => setEditing(true)}>✏️</button>
    <button onClick={() => deleteTask(task.id)}>🗑️</button>
  </div>
</div>


  );
};

export default TaskItem;
