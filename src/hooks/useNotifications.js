// Currently handled inline in NotificationManager, you can abstract logic here if needed
export const requestNotificationPermission = () => {
  if (Notification.permission !== 'granted') {
    Notification.requestPermission();
  }
};
