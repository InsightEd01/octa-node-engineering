import React from 'react';

interface MessageStatsProps {
  stats: {
    total: number;
    unread: number;
    read: number;
    replied: number;
    archived: number;
  };
}

const MessageStats: React.FC<MessageStatsProps> = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Messages',
      value: stats.total,
      icon: '💬',
      color: '#007bff',
      bgColor: '#e3f2fd'
    },
    {
      label: 'Unread',
      value: stats.unread,
      icon: '●',
      color: '#ff6b6b',
      bgColor: '#ffebee'
    },
    {
      label: 'Read',
      value: stats.read,
      icon: '○',
      color: '#4ecdc4',
      bgColor: '#e0f2f1'
    },
    {
      label: 'Replied',
      value: stats.replied,
      icon: '↩️',
      color: '#45b7d1',
      bgColor: '#e1f5fe'
    },
    {
      label: 'Archived',
      value: stats.archived,
      icon: '📁',
      color: '#96ceb4',
      bgColor: '#f1f8e9'
    }
  ];

  return (
    <div className="message-stats">
      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card" style={{ backgroundColor: stat.bgColor }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="stat-label">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageStats;