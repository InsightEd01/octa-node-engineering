import { ContactMessage } from './messageService';

export const mockMessages: ContactMessage[] = [
  // Conversation 1
  {
    id: '1',
    conversation_id: 'conv-1',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    subject: 'Inquiry about Product X',
    message: 'Hi, I would like to know more about the features of Product X. Can you provide a detailed brochure?',
    status: 'unread',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    company: 'Innovate Corp',
    phone: '123-456-7890',
        replied_at: undefined,
        reply_content: undefined,
  },
  {
    id: '2',
    conversation_id: 'conv-1',
    name: 'Admin',
    email: 'admin@example.com',
    subject: 'Re: Inquiry about Product X',
    message: 'Hi Alice, thank you for your interest. I have attached the brochure for Product X. Please let me know if you have any other questions.',
    status: 'replied',
    created_at: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(), // 23 hours ago
    company: 'Innovate Corp',
    phone: '123-456-7890',
    replied_at: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    reply_content: 'Hi Alice, thank you for your interest. I have attached the brochure for Product X. Please let me know if you have any other questions.',
  },

  // Conversation 2
  {
    id: '3',
    conversation_id: 'conv-2',
    name: 'Bob Williams',
    email: 'bob.w@example.com',
    subject: 'Support Request - Login Issue',
    message: 'I am unable to log into my account. I have tried resetting my password but it did not work.',
    status: 'read',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    company: 'Tech Solutions',
    phone: '987-654-3210',
        replied_at: undefined,
        reply_content: undefined,
  },

  // Conversation 3 (Single message)
  {
    id: '4',
    conversation_id: 'conv-3',
    name: 'Charlie Brown',
    email: 'charlie.b@example.com',
    subject: 'Feedback on the new UI',
    message: 'I love the new user interface! It is very intuitive and easy to navigate. Great job!',
    status: 'archived',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    company: '',
    phone: '',
        replied_at: undefined,
        reply_content: undefined,
  },
  
  // Conversation 4
  {
    id: '5',
    conversation_id: 'conv-4',
    name: 'Diana Prince',
    email: 'diana.p@example.com',
    subject: 'Partnership Proposal',
    message: 'We are interested in a potential partnership. Who can I speak to about this?',
    status: 'unread',
    created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 minutes ago
    company: 'Global United',
    phone: '555-123-4567',
        replied_at: undefined,
        reply_content: undefined,
  },
];
