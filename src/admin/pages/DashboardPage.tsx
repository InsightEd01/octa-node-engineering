import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  products: { total: number; published: number; drafts: number };
  blog: { total: number; published: number; drafts: number };
  messages: { total: number; unread: number; replied: number };
  subscribers: { total: number; active: number; thisMonth: number };
  carousel: { total: number; active: number };
  flashcards: { total: number; active: number };
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    products: { total: 2, published: 2, drafts: 0 },
    blog: { total: 0, published: 0, drafts: 0 },
    messages: { total: 0, unread: 0, replied: 0 },
    subscribers: { total: 0, active: 0, thisMonth: 0 },
    carousel: { total: 3, active: 3 },
    flashcards: { total: 0, active: 0 }
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock data loading - in real implementation, this would fetch from API
  useEffect(() => {
    // Simulate loading stats from API
    const loadStats = async () => {
      // This would be replaced with actual API calls
      setStats({
        products: { total: 2, published: 2, drafts: 0 },
        blog: { total: 3, published: 2, drafts: 1 },
        messages: { total: 5, unread: 2, replied: 3 },
        subscribers: { total: 47, active: 45, thisMonth: 12 },
        carousel: { total: 4, active: 3 },
        flashcards: { total: 2, active: 1 }
      });
    };

    loadStats();
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1>Dashboard</h1>
            <p>Welcome back! Here's what's happening with your site.</p>
          </div>
          <div className="header-info">
            <div className="current-time">
              <div className="time">{formatTime(currentTime)}</div>
              <div className="date">{formatDate(currentTime)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="dashboard-grid">
        <div className="dashboard-card metric-card">
          <div className="card-header">
            <h3>Products</h3>
            <span className="card-icon">📦</span>
          </div>
          <div className="card-content">
            <div className="metric-value">{stats.products.total}</div>
            <div className="metric-label">Total Products</div>
            <div className="metric-details">
              <span className="metric-detail">{stats.products.published} Published</span>
              {stats.products.drafts > 0 && (
                <span className="metric-detail">{stats.products.drafts} Drafts</span>
              )}
            </div>
          </div>
          <Link to="/admin/products" className="card-action">Manage Products →</Link>
        </div>

        <div className="dashboard-card metric-card">
          <div className="card-header">
            <h3>Blog Posts</h3>
            <span className="card-icon">📝</span>
          </div>
          <div className="card-content">
            <div className="metric-value">{stats.blog.total}</div>
            <div className="metric-label">Total Posts</div>
            <div className="metric-details">
              <span className="metric-detail">{stats.blog.published} Published</span>
              {stats.blog.drafts > 0 && (
                <span className="metric-detail">{stats.blog.drafts} Drafts</span>
              )}
            </div>
          </div>
          <Link to="/admin/blog" className="card-action">Manage Blog →</Link>
        </div>

        <div className="dashboard-card metric-card">
          <div className="card-header">
            <h3>Messages</h3>
            <span className="card-icon">💬</span>
          </div>
          <div className="card-content">
            <div className="metric-value">{stats.messages.unread}</div>
            <div className="metric-label">Unread Messages</div>
            <div className="metric-details">
              <span className="metric-detail">{stats.messages.total} Total</span>
              <span className="metric-detail">{stats.messages.replied} Replied</span>
            </div>
          </div>
          <Link to="/admin/messages" className="card-action">View Messages →</Link>
        </div>

        <div className="dashboard-card metric-card">
          <div className="card-header">
            <h3>Subscribers</h3>
            <span className="card-icon">📧</span>
          </div>
          <div className="card-content">
            <div className="metric-value">{stats.subscribers.total}</div>
            <div className="metric-label">Newsletter Subscribers</div>
            <div className="metric-details">
              <span className="metric-detail">{stats.subscribers.active} Active</span>
              <span className="metric-detail success">+{stats.subscribers.thisMonth} This Month</span>
            </div>
          </div>
          <Link to="/admin/newsletter" className="card-action">Manage Subscribers →</Link>
        </div>

        <div className="dashboard-card metric-card">
          <div className="card-header">
            <h3>Carousel</h3>
            <span className="card-icon">🖼️</span>
          </div>
          <div className="card-content">
            <div className="metric-value">{stats.carousel.active}</div>
            <div className="metric-label">Active Images</div>
            <div className="metric-details">
              <span className="metric-detail">{stats.carousel.total} Total Images</span>
            </div>
          </div>
          <Link to="/admin/carousel" className="card-action">Manage Carousel →</Link>
        </div>

        <div className="dashboard-card metric-card">
          <div className="card-header">
            <h3>Flash Cards</h3>
            <span className="card-icon">💡</span>
          </div>
          <div className="card-content">
            <div className="metric-value">{stats.flashcards.active}</div>
            <div className="metric-label">Active Cards</div>
            <div className="metric-details">
              <span className="metric-detail">{stats.flashcards.total} Total Cards</span>
            </div>
          </div>
          <Link to="/admin/flashcards" className="card-action">Manage Flash Cards →</Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/admin/products" className="action-card">
            <div className="action-icon">📦</div>
            <div className="action-content">
              <span className="action-label">Add Product</span>
              <span className="action-description">Create a new product listing</span>
            </div>
          </Link>
          <Link to="/admin/blog" className="action-card">
            <div className="action-icon">📝</div>
            <div className="action-content">
              <span className="action-label">Write Blog Post</span>
              <span className="action-description">Create new blog content</span>
            </div>
          </Link>
          <Link to="/admin/messages" className="action-card">
            <div className="action-icon">💬</div>
            <div className="action-content">
              <span className="action-label">View Messages</span>
              <span className="action-description">Check customer inquiries</span>
            </div>
          </Link>
          <Link to="/admin/carousel" className="action-card">
            <div className="action-icon">🖼️</div>
            <div className="action-content">
              <span className="action-label">Update Carousel</span>
              <span className="action-description">Manage hero images</span>
            </div>
          </Link>
          <Link to="/admin/flashcards" className="action-card">
            <div className="action-icon">💡</div>
            <div className="action-content">
              <span className="action-label">Flash Cards</span>
              <span className="action-description">Manage promotional content</span>
            </div>
          </Link>
          <Link to="/admin/notifications" className="action-card">
            <div className="action-icon">🔔</div>
            <div className="action-content">
              <span className="action-label">Send Notification</span>
              <span className="action-description">Notify users of updates</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <Link to="/admin/activity" className="section-action">View All</Link>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📦</div>
            <div className="activity-content">
              <div className="activity-main">
                <span className="activity-action">Product updated</span>
                <span className="activity-target">Stylus AI</span>
              </div>
              <div className="activity-meta">
                <span className="activity-user">by Admin</span>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">💬</div>
            <div className="activity-content">
              <div className="activity-main">
                <span className="activity-action">New message received</span>
                <span className="activity-target">from john@example.com</span>
              </div>
              <div className="activity-meta">
                <span className="activity-user">Contact Form</span>
                <span className="activity-time">4 hours ago</span>
              </div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📧</div>
            <div className="activity-content">
              <div className="activity-main">
                <span className="activity-action">New subscriber</span>
                <span className="activity-target">sarah@example.com</span>
              </div>
              <div className="activity-meta">
                <span className="activity-user">Newsletter</span>
                <span className="activity-time">1 day ago</span>
              </div>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">🖼️</div>
            <div className="activity-content">
              <div className="activity-main">
                <span className="activity-action">Carousel image updated</span>
                <span className="activity-target">Hero section</span>
              </div>
              <div className="activity-meta">
                <span className="activity-user">by Admin</span>
                <span className="activity-time">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="dashboard-section">
        <h2>System Status</h2>
        <div className="status-grid">
          <div className="status-card">
            <div className="status-indicator success"></div>
            <div className="status-content">
              <span className="status-label">Website</span>
              <span className="status-value">Online</span>
            </div>
          </div>
          <div className="status-card">
            <div className="status-indicator success"></div>
            <div className="status-content">
              <span className="status-label">Database</span>
              <span className="status-value">Connected</span>
            </div>
          </div>
          <div className="status-card">
            <div className="status-indicator success"></div>
            <div className="status-content">
              <span className="status-label">Email Service</span>
              <span className="status-value">Active</span>
            </div>
          </div>
          <div className="status-card">
            <div className="status-indicator warning"></div>
            <div className="status-content">
              <span className="status-label">Backup</span>
              <span className="status-value">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;