import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // 🔔 Step 1: Reminder notification function
  const notifyUser = (title) => {
    alert(`⏰ Reminder: ${title}`);
  };

  // 🔔 Step 2: Re-schedule reminders after refresh
  useEffect(() => {
    tasks.forEach((task) => {
      if (task.reminder && !task.completed) {
        const dueTime = new Date(task.dueDate).getTime();
        const now = new Date().getTime();
        const delay = dueTime - now;

        if (delay > 0) {
          setTimeout(() => {
            notifyUser(task.title);
          }, delay);
        }
      }
    });
  }, [tasks]);

  // Your addTask / updateTask / deleteTask logic (already there)


  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: uuidv4(), completed: false }]);
  };

  const updateTask = (id, updatedTask) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleComplete }}>
      {children}
    </TaskContext.Provider>
  );
};
