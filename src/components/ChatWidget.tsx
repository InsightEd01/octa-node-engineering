import { ReactNode, useState } from 'react';

interface ChatWidgetProps {
  className?: string;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const SHARED_AGENT_BASE_URL =
  import.meta.env.VITE_SHARED_AGENT_BASE_URL?.replace(/\/$/, '') || 'https://web-production-816e1.up.railway.app';
const INITIAL_ASSISTANT_MESSAGE =
  "Hello. I'm the Octa Node website assistant. I can help you with our products, demos, company information, and the best next step for your needs.";

const createInitialMessages = (): ChatMessage[] => [
  {
    id: 1,
    text: INITIAL_ASSISTANT_MESSAGE,
    sender: 'ai',
    timestamp: new Date()
  }
];

const normalizeMarkdown = (text: string): string =>
  text
    .replace(/\r\n/g, '\n')
    .replace(/([^\n])\s(\*\s+(?=\*\*|\[|[A-Za-z0-9]))/g, '$1\n$2')
    .replace(/([^\n])\s(-\s+(?=\*\*|\[|[A-Za-z0-9]))/g, '$1\n$2');

const renderInlineMarkdown = (text: string, keyPrefix: string): ReactNode[] => {
  const pattern = /(\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\([^)]+\))/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={`${keyPrefix}-${match.index}`}>
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(
        <em key={`${keyPrefix}-${match.index}`}>
          {token.slice(1, -1)}
        </em>
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

      if (linkMatch) {
        nodes.push(
          <a
            key={`${keyPrefix}-${match.index}`}
            className="message-link"
            href={linkMatch[2]}
            target="_blank"
            rel="noreferrer"
          >
            {linkMatch[1]}
          </a>
        );
      } else {
        nodes.push(token);
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

const renderMarkdown = (text: string): ReactNode => {
  const normalized = normalizeMarkdown(text);
  const lines = normalized.split('\n');
  const blocks: ReactNode[] = [];
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (!paragraphLines.length) return;

    const paragraph = paragraphLines.join(' ').trim();
    blocks.push(
      <p className="message-paragraph" key={`paragraph-${blocks.length}`}>
        {renderInlineMarkdown(paragraph, `paragraph-${blocks.length}`)}
      </p>
    );
    paragraphLines = [];
  };

  const flushList = () => {
    if (!listItems.length) return;

    blocks.push(
      <ul className="message-list" key={`list-${blocks.length}`}>
        {listItems.map((item, index) => (
          <li key={`list-item-${blocks.length}-${index}`}>
            {renderInlineMarkdown(item, `list-item-${blocks.length}-${index}`)}
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      listItems.push(trimmed.replace(/^[-*]\s+/, ''));
      return;
    }

    flushList();
    paragraphLines.push(trimmed);
  });

  flushParagraph();
  flushList();

  if (!blocks.length) {
    return <p className="message-paragraph">{text}</p>;
  }

  return <div className="message-text">{blocks}</div>;
};

const ChatWidget: React.FC<ChatWidgetProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(createInitialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const clearChat = () => {
    if (isSending) return;

    setMessages(createInitialMessages());
    setInputMessage('');
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    const trimmedMessage = inputMessage.trim();

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: trimmedMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      setIsSending(true);

      if (!SHARED_AGENT_BASE_URL) {
        throw new Error('The shared AI agent is not configured yet.');
      }

      const response = await fetch(`${SHARED_AGENT_BASE_URL}/octanode/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: trimmedMessage,
          history: messages.map((message) => ({
            role: message.sender === 'ai' ? 'assistant' : 'user',
            content: message.text
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'The assistant could not respond right now.');
      }

      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        text: data.response || 'I could not generate a response right now.',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const fallbackMessage: ChatMessage = {
        id: messages.length + 2,
        text: error instanceof Error
          ? `${error.message} You can also contact Octa Node directly at info@octanode.co.`
          : 'The assistant is unavailable right now. Please contact Octa Node at info@octanode.co.',
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className={`chat-widget-button ${className}`} onClick={toggleChat}>
        <div className="chat-icon">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
          )}
        </div>
        <div className="chat-notification">
          <span>Ask our AI assistant!</span>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H5V21H19V9Z"/>
                </svg>
              </div>
              <div>
                <h4>AI Assistant</h4>
                <span className="status">Online</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                type="button"
                className="chat-reset"
                onClick={clearChat}
                disabled={isSending}
              >
                Clear chat
              </button>
              <button type="button" className="chat-close" onClick={toggleChat}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {renderMarkdown(message.text)}
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form className="chat-input-form" onSubmit={sendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isSending ? 'Assistant is replying...' : 'Type your message...'}
              className="chat-input"
              disabled={isSending}
            />
            <button type="submit" className="chat-send-button" disabled={isSending}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
