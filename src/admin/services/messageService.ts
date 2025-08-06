// import { supabase } from '../../data/supabase';
import { mockMessages } from './mockMessages';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  created_at: string;
  replied_at?: string;
  reply_content?: string;
  conversation_id?: string;
  parent_message_id?: string;
}

export interface MessageFilters {
  status?: 'unread' | 'read' | 'replied' | 'archived';
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface MessageReply {
  message_id: string;
  reply_content: string;
  reply_to_email: string;
}

export interface ResponseTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  created_at: string;
  updated_at: string;
}

class MessageService {
  // Get all messages with optional filtering
  async getMessages(filters: MessageFilters = {}): Promise<ContactMessage[]> {
    let messages = [...mockMessages];

    if (filters.status) {
      messages = messages.filter(m => m.status === filters.status);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      messages = messages.filter(m => 
        m.name.toLowerCase().includes(search) ||
        m.email.toLowerCase().includes(search) ||
        m.subject.toLowerCase().includes(search) ||
        m.message.toLowerCase().includes(search)
      );
    }

    if (filters.dateFrom) {
      messages = messages.filter(m => new Date(m.created_at) >= new Date(filters.dateFrom!));
    }

    if (filters.dateTo) {
      messages = messages.filter(m => new Date(m.created_at) <= new Date(filters.dateTo!));
    }

    return Promise.resolve(messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  }

  // Get a single message by ID
  async getMessage(id: string): Promise<ContactMessage | null> {
    const message = mockMessages.find(m => m.id === id);
    return Promise.resolve(message || null);
  }

  // Mark message as read
  async markAsRead(id: string): Promise<ContactMessage | null> {
    return this.updateMessageStatus(id, 'read');
  }

  // Update message status
  async updateMessageStatus(id: string, status: ContactMessage['status']): Promise<ContactMessage | null> {
    const messageIndex = mockMessages.findIndex(m => m.id === id);
    if (messageIndex !== -1) {
      mockMessages[messageIndex].status = status;
      return Promise.resolve(mockMessages[messageIndex]);
    }
    return Promise.resolve(null);
  }

  // Reply to a message
  async replyToMessage(messageReply: MessageReply): Promise<ContactMessage | null> {
    const originalMessageIndex = mockMessages.findIndex(m => m.id === messageReply.message_id);
    if (originalMessageIndex === -1) {
      return Promise.resolve(null);
    }

    const originalMessage = mockMessages[originalMessageIndex];
    originalMessage.status = 'replied';

    const newReply: ContactMessage = {
      id: String(Date.now()), // Simple unique ID for mock data
      conversation_id: originalMessage.conversation_id,
      parent_message_id: originalMessage.id,
      name: 'Admin User',
      email: 'admin@example.com',
      subject: `Re: ${originalMessage.subject}`,
      message: messageReply.reply_content,
      status: 'read', // The admin's own reply is 'read'
      created_at: new Date().toISOString(),
    };

    mockMessages.push(newReply);

    return Promise.resolve(newReply);
  }

  // Get conversation thread for a message
  async getConversationThread(conversationId: string): Promise<ContactMessage[]> {
    const thread = mockMessages.filter(m => m.conversation_id === conversationId);
    return Promise.resolve(thread.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
  }

  // Archive message
  async archiveMessage(id: string) {
    return this.updateMessageStatus(id, 'archived');
  }

  // Bulk update message statuses
  async bulkUpdateStatus(messageIds: string[], status: ContactMessage['status']): Promise<ContactMessage[]> {
    const updatedMessages: ContactMessage[] = [];
    messageIds.forEach(id => {
      const messageIndex = mockMessages.findIndex(m => m.id === id);
      if (messageIndex !== -1) {
        mockMessages[messageIndex].status = status;
        updatedMessages.push(mockMessages[messageIndex]);
      }
    });
    return Promise.resolve(updatedMessages);
  }

  // Get message statistics
  async getMessageStats(): Promise<any> {
    const stats = {
      total: mockMessages.length,
      unread: mockMessages.filter(m => m.status === 'unread').length,
      read: mockMessages.filter(m => m.status === 'read').length,
      replied: mockMessages.filter(m => m.status === 'replied').length,
      archived: mockMessages.filter(m => m.status === 'archived').length,
    };
    return Promise.resolve(stats);
  }

  // Response Templates Management
  async getResponseTemplates(): Promise<ResponseTemplate[]> {
    const mockTemplates: ResponseTemplate[] = [
      { id: '1', name: 'Standard Inquiry Response', subject: 'Re: Your Inquiry', content: 'Thank you for your inquiry. We will get back to you shortly.', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: '2', name: 'Support Follow-up', subject: 'Re: Your Support Ticket', content: 'We are following up on your support ticket. Please let us know if the issue is resolved.', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
    ];
    return Promise.resolve(mockTemplates);
  }

  async createResponseTemplate(template: Omit<ResponseTemplate, 'id' | 'created_at' | 'updated_at'>): Promise<ResponseTemplate> {
    console.log('Mock createResponseTemplate', template);
    const newTemplate = { ...template, id: String(Math.random()), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    return Promise.resolve(newTemplate);
  }

  async updateResponseTemplate(id: string, template: Partial<ResponseTemplate>): Promise<ResponseTemplate | null> {
    console.log('Mock updateResponseTemplate', id, template);
    return Promise.resolve(null); // Not implemented for mock
  }

  async deleteResponseTemplate(id: string): Promise<boolean> {
    console.log('Mock deleteResponseTemplate', id);
    return Promise.resolve(true);
  }
}

export const messageService = new MessageService();