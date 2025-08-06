import React, { useState } from 'react';
import { NewsletterSubscriber, SubscriberFilters } from '../types/newsletter';
import { newsletterService } from '../services/newsletterService';
import SubscriberList from '../components/SubscriberList';
import SubscriberAnalytics from '../components/SubscriberAnalytics';
import SubscriberExport from '../components/SubscriberExport';

const NewsletterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'analytics'>('list');
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<NewsletterSubscriber | null>(null);
  const [filters, setFilters] = useState<SubscriberFilters>({
    search: '',
    status: 'all',
    source: ''
  });

  const handleBulkAction = async (action: string, ids: string[]) => {
    try {
      switch (action) {
        case 'activate':
          await newsletterService.bulkUpdateStatus(ids, 'active');
          break;
        case 'unsubscribe':
          await newsletterService.bulkUpdateStatus(ids, 'unsubscribed');
          break;
        case 'delete':
          if (confirm(`Are you sure you want to delete ${ids.length} subscribers? This action cannot be undone.`)) {
            await newsletterService.bulkDeleteSubscribers(ids);
          }
          break;
      }
      // Refresh the list by updating a key or triggering a reload
      window.location.reload();
    } catch (error) {
      console.error('Bulk action failed:', error);
      alert('Action failed. Please try again.');
    }
  };

  const handleSubscriberSelect = (subscriber: NewsletterSubscriber) => {
    setSelectedSubscriber(subscriber);
  };

  const closeSubscriberModal = () => {
    setSelectedSubscriber(null);
  };

  return (
    <div className="newsletter-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Newsletter Management</h1>
          <p>Manage newsletter subscribers, view analytics, and export data</p>
        </div>
        <div className="header-actions">
          <button
            onClick={() => setShowExportModal(true)}
            className="btn btn-secondary"
          >
            📊 Export Data
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-navigation">
        <button
          onClick={() => setActiveTab('list')}
          className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
        >
          📧 Subscribers ({filters.status === 'all' ? 'All' : filters.status})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`tab-button ${activeTab === 'analytics' ? 'active' : ''}`}
        >
          📈 Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'list' && (
          <SubscriberList
            onSubscriberSelect={handleSubscriberSelect}
            onBulkAction={handleBulkAction}
            filters={filters}
            onFiltersChange={setFilters}
          />
        )}

        {activeTab === 'analytics' && (
          <SubscriberAnalytics />
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <SubscriberExport
          filters={filters}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Subscriber Detail Modal */}
      {selectedSubscriber && (
        <div className="modal-overlay">
          <div className="modal-content subscriber-modal">
            <div className="modal-header">
              <h2>Subscriber Details</h2>
              <button onClick={closeSubscriberModal} className="modal-close">×</button>
            </div>

            <div className="modal-body">
              <div className="subscriber-details">
                <div className="detail-group">
                  <label>Email Address</label>
                  <div className="detail-value">{selectedSubscriber.email}</div>
                </div>

                <div className="detail-group">
                  <label>Name</label>
                  <div className="detail-value">{selectedSubscriber.name || 'Not provided'}</div>
                </div>

                <div className="detail-group">
                  <label>Status</label>
                  <div className="detail-value">
                    <span className={`status-badge status-${selectedSubscriber.status}`}>
                      {selectedSubscriber.status}
                    </span>
                  </div>
                </div>

                <div className="detail-group">
                  <label>Source</label>
                  <div className="detail-value">
                    {selectedSubscriber.source.charAt(0).toUpperCase() + selectedSubscriber.source.slice(1).replace('-', ' ')}
                  </div>
                </div>

                <div className="detail-group">
                  <label>Subscribed Date</label>
                  <div className="detail-value">
                    {new Date(selectedSubscriber.subscribed_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {selectedSubscriber.unsubscribed_at && (
                  <div className="detail-group">
                    <label>Unsubscribed Date</label>
                    <div className="detail-value">
                      {new Date(selectedSubscriber.unsubscribed_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                )}

                {selectedSubscriber.preferences && (
                  <div className="detail-group">
                    <label>Preferences</label>
                    <div className="detail-value">
                      <div className="preference-item">
                        <strong>Frequency:</strong> {selectedSubscriber.preferences.frequency}
                      </div>
                      {selectedSubscriber.preferences.topics.length > 0 && (
                        <div className="preference-item">
                          <strong>Topics:</strong> {selectedSubscriber.preferences.topics.join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button
                onClick={closeSubscriberModal}
                className="btn btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const newStatus = selectedSubscriber.status === 'active' ? 'unsubscribed' : 'active';
                  newsletterService.updateSubscriberStatus(selectedSubscriber.id, newStatus)
                    .then(() => {
                      setSelectedSubscriber({ ...selectedSubscriber, status: newStatus });
                      // Optionally refresh the list
                    })
                    .catch(error => {
                      console.error('Failed to update status:', error);
                      alert('Failed to update subscriber status');
                    });
                }}
                className={`btn ${selectedSubscriber.status === 'active' ? 'btn-warning' : 'btn-success'}`}
              >
                {selectedSubscriber.status === 'active' ? 'Unsubscribe' : 'Reactivate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterPage;