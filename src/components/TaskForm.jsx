import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const initialState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
  reminder: false,
};

const TaskForm = ({ task, onClose }) => {
  const isEdit = !!task;
  const { addTask, updateTask } = useTasks();

  const [formData, setFormData] = useState(task || initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('Title is required');

    isEdit ? updateTask(task.id, formData) : addTask(formData);

    if (onClose) {
      onClose(); // Close the form in edit mode
    } else {
      setFormData(initialState); // Reset form in add mode
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded-lg space-y-4">
      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        //className="w-full border border-gray-300 px-3 py-2 rounded"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 rounded-lg transition"

      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        //className="w-full border border-gray-300 px-3 py-2 rounded"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 rounded-lg transition"
      />
        
      <input
        type="datetime-local"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        //className="w-full border border-gray-300 px-3 py-2 rounded"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 rounded-lg transition"
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        //className="w-full border border-gray-300 px-3 py-2 rounded"
        className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2 rounded-lg transition"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="reminder"
          checked={formData.reminder}
          onChange={handleChange}
        />
        <span>Set Reminder</span>
      </label>

      <div className="button-row">
  <button
    type="submit"
    className="primary-button"
  >
    {isEdit ? 'Update Task' : 'Add Task'}
  </button>

  {isEdit && (
    <button
      type="button"
      className="cancel-button"
      onClick={onClose}
    >
      Cancel
    </button>
  )}
</div>

    </form>
  );
};

export default TaskForm;
