// src/admin/services/notificationService.ts

export interface Notification {
  id: number;
  content: string;
  recipients: string[];
  sentDate: string;
  status: 'Sent' | 'Scheduled' | 'Draft';
}

export interface NotificationRecipient {
    value: string;
    label: string;
}

// Mock database
let notifications: Notification[] = [];
let nextId = 1;

const userOptions: NotificationRecipient[] = [
    { value: 'all', label: 'All Users' },
    { value: 'user1', label: 'John Doe' },
    { value: 'user2', label: 'Jane Smith' },
    { value: 'user3', label: 'Peter Jones' },
];

// Simulate API latency
const API_LATENCY = 500;

export const getNotifications = async (): Promise<Notification[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...notifications].sort((a, b) => new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime()));
    }, API_LATENCY);
  });
};

export const getRecipientOptions = async (): Promise<NotificationRecipient[]> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(userOptions);
        }, API_LATENCY);
    });
};

export const sendNotification = async (data: { content: string; recipients: string[]; scheduledDate: Date | null }): Promise<Notification> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newNotification: Notification = {
        id: nextId++,
        content: data.content,
        recipients: data.recipients,
        sentDate: data.scheduledDate ? data.scheduledDate.toLocaleString() : new Date().toLocaleString(),
        status: data.scheduledDate ? 'Scheduled' : 'Sent',
      };
      notifications = [newNotification, ...notifications];
      resolve(newNotification);
    }, API_LATENCY);
  });
};
