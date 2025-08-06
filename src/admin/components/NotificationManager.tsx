import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select, { MultiValue } from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Notification, 
  NotificationRecipient, 
  getNotifications, 
  sendNotification as apiSendNotification, 
  getRecipientOptions 
} from '../services/notificationService';

interface NotificationUI extends Notification {
  isNew?: boolean;
}

const NotificationManager: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationUI[]>([]);
  const [userOptions, setUserOptions] = useState<NotificationRecipient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<MultiValue<NotificationRecipient>>([]);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<{ content?: string; recipients?: string }>({});

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [fetchedNotifications, fetchedOptions] = await Promise.all([
          getNotifications(),
          getRecipientOptions(),
        ]);
        setNotifications(fetchedNotifications);
        setUserOptions(fetchedOptions);
      } catch (error) {
        console.error('Failed to fetch notification data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSendNotification = async () => {
    const newErrors: { content?: string; recipients?: string } = {};
    if (!content.replace(/<[^>]*>/g, '').trim()) {
      newErrors.content = 'Notification content cannot be empty.';
    }
    if (selectedRecipients.length === 0) {
      newErrors.recipients = 'Please select at least one recipient.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSending(true);
      try {
        const recipientValues = selectedRecipients.map((r: NotificationRecipient) => r.value);
        const newNotification = await apiSendNotification({ 
          content, 
          recipients: recipientValues, 
          scheduledDate 
        });
        
        setNotifications(prev => [{ ...newNotification, isNew: true }, ...prev]);
        
        setContent('');
        setSelectedRecipients([]);
        setScheduledDate(null);
        setErrors({});

        setTimeout(() => {
          setNotifications(current =>
            current.map(n => (n.id === newNotification.id ? { ...n, isNew: false } : n))
          );
        }, 500);

      } catch (error) {
        console.error('Failed to send notification:', error);
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Compose Notification</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
        <Select
          isMulti
          options={userOptions}
          value={selectedRecipients}
          onChange={(selected: MultiValue<NotificationRecipient>) => {
            setSelectedRecipients(selected);
            if (errors.recipients) setErrors(prev => ({...prev, recipients: undefined}));
          }}
          className="react-select-container"
          classNamePrefix="react-select"
        />
        {errors.recipients && <p className="error-text">{errors.recipients}</p>}
      </div>

      <div className="mb-4">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(value: string) => {
            setContent(value);
            if (errors.content) setErrors(prev => ({...prev, content: undefined}));
          }}
          placeholder="Write your notification here..."
        />
        {errors.content && <p className="error-text">{errors.content}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Schedule (Optional)</label>
        <DatePicker
          selected={scheduledDate}
          onChange={(date: Date | null) => setScheduledDate(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Send immediately or schedule for later"
          className="input-field w-full"
        />
      </div>

      <button onClick={handleSendNotification} className={`btn btn-primary ${isSending ? 'is-loading' : ''}`} disabled={isSending}>
        Send Notification
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Notification History</h2>
        {isLoading ? (
          <div className="loading-spinner">Loading notifications...</div>
        ) : (
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div key={notification.id} className={`card ${notification.isNew ? 'new-item-animation' : ''}`}>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: notification.content }} />
                  <p className="text-sm text-gray-600 mt-2">Recipients: {notification.recipients.join(', ')}</p>
                  <p className="text-sm text-gray-500 mt-1">Date: {notification.sentDate}</p>
                  <p className="text-sm font-semibold mt-2">
                    Status: 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${notification.status === 'Sent' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                      {notification.status}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p>No notifications sent yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationManager;
