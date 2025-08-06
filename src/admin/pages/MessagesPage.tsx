import React, { useState, useEffect } from 'react';
import { messageService, ContactMessage, MessageFilters, MessageReply } from '../services/messageService';
import MessageList from '../components/MessageList';
import MessageDetail from '../components/MessageDetail';
import MessageFiltersComponent from '../components/MessageFilters';
import MessageStats from '../components/MessageStats';
import ResponseTemplates from '../components/ResponseTemplates';

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MessageFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    archived: 0
  });

  // Load messages
  const loadMessages = async (newFilters: MessageFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageService.getMessages(newFilters);
      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Load message statistics
  const loadStats = async () => {
    try {
      const statsData = await messageService.getMessageStats();
      setStats(statsData);
    } catch (err) {
      console.error('Error loading message stats:', err);
    }
  };

  // Initial load
  useEffect(() => {
    loadMessages();
    loadStats();
  }, []);

  // Handle filter changes
  const handleFiltersChange = (newFilters: MessageFilters) => {
    setFilters(newFilters);
    loadMessages(newFilters);
  };

  // Handle message selection
  const handleMessageSelect = async (message: ContactMessage) => {
    setSelectedMessage(message);
    
    // Mark as read if it's unread
    if (message.status === 'unread') {
      try {
        const updatedMessage = await messageService.markAsRead(message.id);
        if (updatedMessage) {
          setMessages(prev => 
            prev.map(m => m.id === message.id ? updatedMessage : m)
          );
          setSelectedMessage(updatedMessage);
          loadStats(); // Refresh stats
        }
      } catch (err) {
        console.error('Error marking message as read:', err);
      }
    }
  };

  // Handle message status update
  const handleMessageStatusUpdate = async (messageId: string, status: ContactMessage['status']) => {
    try {
      const updatedMessage = await messageService.updateMessageStatus(messageId, status);
      if (updatedMessage) {
        setMessages(prev => 
          prev.map(m => m.id === messageId ? updatedMessage : m)
        );
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(updatedMessage);
        }
        loadStats(); // Refresh stats
      }
    } catch (err) {
      console.error('Error updating message status:', err);
      setError('Failed to update message status. Please try again.');
    }
  };

  const handleMessageReply = async (messageId: string, replyContent: string, replyToEmail: string) => {
    try {
      setLoading(true);
      const messageReply: MessageReply = { 
        message_id: messageId, 
        reply_content: replyContent, 
        reply_to_email: replyToEmail 
      };
      const newReply = await messageService.replyToMessage(messageReply);
      
      if (newReply) {
        setMessages(prevMessages => {
          const updatedMessages = prevMessages.map(m => 
            m.id === messageId ? { ...m, status: 'replied' as const } : m
          );
          return [...updatedMessages, newReply];
        });

        // We need to refresh the selected message to trigger the detail view to re-fetch the conversation
        // but we can't just set it to the new reply, as that's not the root of the conversation.
        // Instead, we'll find the original message in the updated list and set that.
        const originalMessage = messages.find(m => m.id === messageId);
        if (originalMessage) {
          setSelectedMessage({ ...originalMessage, status: 'replied' });
        }

        loadStats();
      }
    } catch (err) {
      console.error('Error replying to message:', err);
      setError('Failed to send reply. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (messageIds: string[], action: string) => {
    try {
      let status: ContactMessage['status'];
      switch (action) {
        case 'mark-read':
          status = 'read';
          break;
        case 'mark-unread':
          status = 'unread';
          break;
        case 'archive':
          status = 'archived';
          break;
        default:
          return;
      }

      await messageService.bulkUpdateStatus(messageIds, status);
      loadMessages(); // Refresh messages
      loadStats(); // Refresh stats
    } catch (err) {
      console.error('Error performing bulk action:', err);
      setError('Failed to perform bulk action. Please try again.');
    }
  };

  return (
    <div className="messages-page">
      <div className="page-header">
        <div className="page-title">
          <h1>Messages</h1>
          <p>Manage customer inquiries and communications</p>
        </div>
        <div className="page-actions">
          <button
            className="btn btn-outline"
            onClick={() => setShowTemplates(true)}
          >
            <span className="btn-icon">📝</span>
            Templates
          </button>
          <button
            className={`btn btn-outline ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="btn-icon">🔍</span>
            Filters
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
          <button 
            className="alert-close"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      {/* Message Statistics */}
      <MessageStats stats={stats} />

      {/* Filters */}
      {showFilters && (
        <MessageFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClose={() => setShowFilters(false)}
        />
      )}

      <div className="messages-content">
        {/* Messages List */}
        <div className="messages-list-container">
          <MessageList
            messages={messages}
            selectedMessage={selectedMessage}
            loading={loading}
            onMessageSelect={handleMessageSelect}
            onStatusUpdate={handleMessageStatusUpdate}
            onBulkAction={handleBulkAction}
          />
        </div>

        {/* Message Detail */}
        <div className="message-detail-container">
          {selectedMessage ? (
            <MessageDetail
              message={selectedMessage}
              onReply={handleMessageReply}
              onStatusUpdate={handleMessageStatusUpdate}
            />
          ) : (
            <div className="no-message-selected">
              <div className="no-message-content">
                <span className="no-message-icon">💬</span>
                <h3>Select a message</h3>
                <p>Choose a message from the list to view details and reply</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Response Templates Modal */}
      {showTemplates && (
        <ResponseTemplates onClose={() => setShowTemplates(false)} />
      )}
    </div>
  );
};

export default MessagesPage;