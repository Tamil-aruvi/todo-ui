import { useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

const NotificationManager = () => {
  const { tasks } = useTasks();

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const now = new Date().getTime();

    tasks.forEach(task => {
      if (task.reminder && !task.completed) {
        const reminderTime = new Date(task.dueDate).getTime() - 3600000; // 1 hour before due
        const delay = reminderTime - now;

        if (delay > 0) {
          setTimeout(() => {
            new Notification(`Reminder: ${task.title}`, {
              body: `Due at ${new Date(task.dueDate).toLocaleTimeString()}`,
            });
          }, delay);
        }
      }
    });
  }, [tasks]);

  return null;
};

export default NotificationManager;
