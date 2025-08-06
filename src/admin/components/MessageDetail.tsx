import React, { useState, useEffect } from 'react';
import { ContactMessage, messageService, ResponseTemplate } from '../services/messageService';

interface MessageDetailProps {
  message: ContactMessage;
  onReply: (messageId: string, replyContent: string, replyToEmail: string) => void;
  onStatusUpdate: (messageId: string, status: ContactMessage['status']) => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({
  message,
  onReply,
  onStatusUpdate
}) => {
    const [conversationThread, setConversationThread] = useState<ContactMessage[]>([]);
  const [threadLoading, setThreadLoading] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [replySubject, setReplySubject] = useState('');
  const [responseTemplates, setResponseTemplates] = useState<ResponseTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Load conversation thread
  useEffect(() => {
    const loadConversation = async () => {
      if (!message) return;
      setThreadLoading(true);
      try {
        const conversationId = message.conversation_id || message.id;
        const thread = await messageService.getConversationThread(conversationId);
                setConversationThread(thread.sort((a: ContactMessage, b: ContactMessage) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
      } catch (error) {
        console.error('Error loading conversation thread:', error);
        setConversationThread([message]); // Fallback to showing the single message
      } finally {
        setThreadLoading(false);
      }
    };
    loadConversation();
  }, [message]);

  // Load response templates
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const templates = await messageService.getResponseTemplates();
        setResponseTemplates(templates);
      } catch (error) {
        console.error('Error loading response templates:', error);
      }
    };
    loadTemplates();
  }, []);

  // Set default reply subject
  useEffect(() => {
    if (message) {
      const subject = message.subject.startsWith('Re: ') 
        ? message.subject 
        : `Re: ${message.subject}`;
      setReplySubject(subject);
    }
  }, [message]);

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    const template = responseTemplates.find(t => t.id === templateId);
    if (template) {
      setReplyContent(template.content);
      setReplySubject(template.subject || replySubject);
    }
    setSelectedTemplate(templateId);
  };

  // Handle reply submission
  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setLoading(true);
    try {
      await onReply(message.id, replyContent, message.email);
      setShowReplyForm(false);
      setReplyContent('');
      setSelectedTemplate('');
    } catch (error) {
      console.error('Error sending reply:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Get status color
  const getStatusColor = (status: ContactMessage['status']) => {
    const colors = {
      unread: '#ff6b6b',
      read: '#4ecdc4',
      replied: '#45b7d1',
      archived: '#96ceb4'
    };
    return colors[status] || '#666';
  };

  if (threadLoading) {
    return (
      <div className="message-detail loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading conversation...</p>
        </div>
      </div>
    );
  }

  const firstMessage = conversationThread[0] || message;

  return (
    <div className="message-detail">
      {/* Message Header */}
      <div className="message-detail-header">
        <div className="message-info">
          <h2 className="message-subject">{firstMessage.subject}</h2>
          <div className="message-meta">
            <span className="message-sender">
              <strong>{firstMessage.name}</strong> &lt;{firstMessage.email}&gt;
            </span>
                        <span className="message-date">{formatDate(firstMessage.created_at)}</span>
          </div>
                    {firstMessage.company && (
            <div className="message-company">
              <span className="company-label">Company:</span>
                            <span className="company-name">{firstMessage.company}</span>
            </div>
          )}
                    {firstMessage.phone && (
            <div className="message-phone">
              <span className="phone-label">Phone:</span>
                            <span className="phone-number">{firstMessage.phone}</span>
            </div>
          )}
        </div>

        <div className="message-actions">
          <div className="status-indicator">
            <span 
              className="status-dot" 
              style={{ backgroundColor: getStatusColor(firstMessage.status) }}
            ></span>
                        <span className="status-text">{firstMessage.status.charAt(0).toUpperCase() + firstMessage.status.slice(1)}</span>
          </div>

          <div className="action-buttons">
            <button
              className="btn btn-primary"
              onClick={() => setShowReplyForm(!showReplyForm)}
              disabled={firstMessage.status === 'archived'}
            >
              <span className="btn-icon">↩️</span>
              Reply
            </button>

            <div className="status-dropdown">
              <button className="btn btn-outline">
                <span className="btn-icon">⚙️</span>
                Status
              </button>
              <div className="dropdown-content">
                <button
                  className="dropdown-item"
                  onClick={() => onStatusUpdate(firstMessage.id, 'unread')}
                  disabled={firstMessage.status === 'unread'}
                >
                  Mark as Unread
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => onStatusUpdate(firstMessage.id, 'read')}
                  disabled={firstMessage.status === 'read'}
                >
                  Mark as Read
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => onStatusUpdate(firstMessage.id, 'archived')}
                  disabled={firstMessage.status === 'archived'}
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="message-detail-content">
        <div className="conversation-thread">
          {conversationThread.map((msg, index) => (
            <div key={msg.id} className={`conversation-message ${index > 0 ? 'follow-up' : ''}`}>
              <div className="message-header">
                <span className="message-sender">
                  <strong>{msg.name}</strong> &lt;{msg.email}&gt;
                </span>
                <span className="message-date">{formatDate(msg.created_at)}</span>
              </div>
              <div className="message-body">
                {msg.message.split('\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {msg.reply_content && msg.replied_at && (
                <div className="previous-reply">
                  <div className="reply-header">
                    <h4>Reply</h4>
                    <span className="reply-date">{formatDate(msg.replied_at)}</span>
                  </div>
                  <div className="reply-content">
                    {msg.reply_content.split('\n').map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="reply-form-container">
            <div className="reply-form-header">
              <h3>Reply to {message.name}</h3>
              <button
                className="close-btn"
                onClick={() => setShowReplyForm(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleReplySubmit} className="reply-form">
              {/* Template Selector */}
              {responseTemplates.length > 0 && (
                <div className="form-group">
                  <label htmlFor="template-select">Use Template:</label>
                  <select
                    id="template-select"
                    value={selectedTemplate}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select a template...</option>
                    {responseTemplates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Reply Subject */}
              <div className="form-group">
                <label htmlFor="reply-subject">Subject:</label>
                <input
                  type="text"
                  id="reply-subject"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* Reply Content */}
              <div className="form-group">
                <label htmlFor="reply-content">Message:</label>
                <textarea
                  id="reply-content"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="form-control reply-textarea"
                  rows={8}
                  placeholder="Type your reply here..."
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowReplyForm(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !replyContent.trim()}
                >
                  {loading ? (
                    <>
                      <span className="spinner-sm"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">📧</span>
                      Send Reply
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageDetail;