import React from 'react';
import NotificationManager from '../components/NotificationManager';

const NotificationsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notification Management</h1>
      <NotificationManager />
    </div>
  );
};

export default NotificationsPage;
