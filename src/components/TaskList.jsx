import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = ({ filter }) => {
  const { tasks } = useTasks();

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="space-y-4 mt-4">
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found.</p>
      ) : (
        filteredTasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
