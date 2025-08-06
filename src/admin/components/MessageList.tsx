import React, { useState, useMemo } from 'react';
import { ContactMessage } from '../services/messageService';

interface MessageListProps {
  messages: ContactMessage[];
  selectedMessage: ContactMessage | null;
  loading: boolean;
  onMessageSelect: (message: ContactMessage) => void;
  onStatusUpdate: (messageId: string, status: ContactMessage['status']) => void;
  onBulkAction: (messageIds: string[], action: string) => void;
}

interface Conversation {
  id: string;
  messages: ContactMessage[];
  latestMessage: ContactMessage;
  subject: string;
  senderName: string;
  senderEmail: string;
  unreadCount: number;
  participantNames: string[];
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  selectedMessage,
  loading,
  onMessageSelect,
  onStatusUpdate,
  onBulkAction
}) => {
  const [selectedConversations, setSelectedConversations] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Group messages into conversations
  const conversations = useMemo<Conversation[]>(() => {
    const convs: { [key: string]: ContactMessage[] } = {};
    messages.forEach(message => {
      const convId = message.conversation_id || message.id;
      if (!convs[convId]) {
        convs[convId] = [];
      }
      convs[convId].push(message);
    });

    return Object.values(convs).map(msgs => {
      const sortedMsgs = msgs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      const latestMessage = sortedMsgs[0];
      const participantNames = [...new Set(msgs.map(m => m.name))];

      return {
        id: latestMessage.conversation_id || latestMessage.id,
        messages: sortedMsgs,
        latestMessage,
        subject: latestMessage.subject,
        senderName: latestMessage.name,
        senderEmail: latestMessage.email,
        unreadCount: msgs.filter(m => m.status === 'unread').length,
        participantNames,
      };
    }).sort((a, b) => new Date(b.latestMessage.created_at).getTime() - new Date(a.latestMessage.created_at).getTime());
  }, [messages]);

  // Handle individual conversation selection for bulk actions
  const handleConversationCheck = (conversationId: string, checked: boolean) => {
    if (checked) {
      setSelectedConversations(prev => [...prev, conversationId]);
    } else {
      setSelectedConversations(prev => prev.filter(id => id !== conversationId));
    }
  };

  // Handle select all conversations
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedConversations(conversations.map(c => c.id));
    } else {
      setSelectedConversations([]);
    }
  };

  // Handle bulk action
  const handleBulkActionClick = (action: string) => {
    if (selectedConversations.length > 0) {
      const messageIds = conversations
        .filter(c => selectedConversations.includes(c.id))
        .flatMap(c => c.messages.map(m => m.id));
      onBulkAction(messageIds, action);
      setSelectedConversations([]);
      setShowBulkActions(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 24 * 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Get status badge
  const getStatusBadge = (status: ContactMessage['status']) => {
    const badges = {
      unread: { class: 'status-unread', text: 'Unread', icon: '●' },
      read: { class: 'status-read', text: 'Read', icon: '○' },
      replied: { class: 'status-replied', text: 'Replied', icon: '↩️' },
      archived: { class: 'status-archived', text: 'Archived', icon: '📁' }
    };
    
    const badge = badges[status];
    return (
      <span className={`status-badge ${badge.class}`} title={badge.text}>
        {badge.icon}
      </span>
    );
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="message-list loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      {/* List Header */}
      <div className="message-list-header">
        <div className="list-controls">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={selectedConversations.length === conversations.length && conversations.length > 0}
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="message-count">
            {conversations.length} conversation{conversations.length !== 1 ? 's' : ''}
          </span>
        </div>

        {selectedConversations.length > 0 && (
          <div className="bulk-actions">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setShowBulkActions(!showBulkActions)}
            >
              Actions ({selectedConversations.length})
            </button>
            {showBulkActions && (
              <div className="bulk-actions-dropdown">
                <button
                  className="dropdown-item"
                  onClick={() => handleBulkActionClick('mark-read')}
                >
                  Mark as Read
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleBulkActionClick('mark-unread')}
                >
                  Mark as Unread
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => handleBulkActionClick('archive')}
                >
                  Archive
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messages List */}
      <div className="message-list-content">
        {conversations.length === 0 ? (
          <div className="no-messages">
            <span className="no-messages-icon">📭</span>
            <h3>No conversations found</h3>
            <p>No conversations match your current filters</p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`message-item ${
                selectedMessage?.conversation_id === conversation.id || selectedMessage?.id === conversation.id ? 'selected' : ''
              } ${conversation.unreadCount > 0 ? 'unread' : ''}`}
              onClick={() => onMessageSelect(conversation.latestMessage)}
            >
              <div className="message-checkbox">
                <label className="checkbox-container" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedConversations.includes(conversation.id)}
                    onChange={(e) => handleConversationCheck(conversation.id, e.target.checked)}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="message-content">
                <div className="message-header">
                  <div className="message-sender">
                    <span className="sender-name">{conversation.participantNames.join(', ')}</span>
                    {conversation.messages.length > 1 && (
                      <span className="conversation-count">({conversation.messages.length})</span>
                    )}
                  </div>
                  <div className="message-meta">
                    {getStatusBadge(conversation.latestMessage.status)}
                    <span className="message-date">{formatDate(conversation.latestMessage.created_at)}</span>
                  </div>
                </div>

                <div className="message-subject">
                  {conversation.subject}
                </div>

                <div className="message-preview">
                  {truncateText(conversation.latestMessage.message)}
                </div>

                {conversation.latestMessage.company && (
                  <div className="message-company">
                    <span className="company-label">Company:</span>
                    <span className="company-name">{conversation.latestMessage.company}</span>
                  </div>
                )}
              </div>

              <div className="message-actions" onClick={(e) => e.stopPropagation()}>
                <div className="action-dropdown">
                  <button className="action-btn" title="More actions">
                    ⋮
                  </button>
                  <div className="action-dropdown-content">
                    {conversation.latestMessage.status !== 'read' && (
                      <button
                        className="dropdown-item"
                        onClick={() => onStatusUpdate(conversation.latestMessage.id, 'read')}
                      >
                        Mark as Read
                      </button>
                    )}
                    {conversation.latestMessage.status !== 'unread' && (
                      <button
                        className="dropdown-item"
                        onClick={() => onStatusUpdate(conversation.latestMessage.id, 'unread')}
                      >
                        Mark as Unread
                      </button>
                    )}
                    {conversation.latestMessage.status !== 'archived' && (
                      <button
                        className="dropdown-item"
                        onClick={() => onStatusUpdate(conversation.latestMessage.id, 'archived')}
                      >
                        Archive
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageList;