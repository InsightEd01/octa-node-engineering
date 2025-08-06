import React, { useState, useEffect } from 'react';
import { NewsletterSubscriber, SubscriberFilters } from '../types/newsletter';
import { newsletterService } from '../services/newsletterService';

interface SubscriberListProps {
  onSubscriberSelect?: (subscriber: NewsletterSubscriber) => void;
  onBulkAction?: (action: string, ids: string[]) => void;
  filters: SubscriberFilters;
  onFiltersChange: (filters: SubscriberFilters) => void;
}

const SubscriberList: React.FC<SubscriberListProps> = ({
  onSubscriberSelect,
  onBulkAction,
  filters,
  onFiltersChange
}) => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sources, setSources] = useState<string[]>([]);

  const limit = 10;

  useEffect(() => {
    loadSubscribers();
    loadSources();
  }, [currentPage, filters]);

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      const response = await newsletterService.getSubscribers(currentPage, limit, filters);
      setSubscribers(response.subscribers);
      setTotalPages(response.totalPages);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to load subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSources = async () => {
    try {
      const sourcesData = newsletterService.getSources();
      setSources(sourcesData);
    } catch (error) {
      console.error('Failed to load sources:', error);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(subscribers.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectSubscriber = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) return;
    onBulkAction?.(action, selectedIds);
    setSelectedIds([]);
  };

  const handleStatusChange = async (id: string, status: 'active' | 'unsubscribed') => {
    try {
      await newsletterService.updateSubscriberStatus(id, status);
      loadSubscribers();
    } catch (error) {
      console.error('Failed to update subscriber status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-badge status-active';
      case 'unsubscribed':
        return 'status-badge status-unsubscribed';
      default:
        return 'status-badge';
    }
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search });
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: 'all' | 'active' | 'unsubscribed') => {
    onFiltersChange({ ...filters, status });
    setCurrentPage(1);
  };

  const handleSourceFilter = (source: string) => {
    onFiltersChange({ ...filters, source });
    setCurrentPage(1);
  };

  if (loading && subscribers.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading subscribers...</p>
      </div>
    );
  }

  return (
    <div className="subscriber-list">
      {/* Filters */}
      <div className="list-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search subscribers..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={filters.status}
            onChange={(e) => handleStatusFilter(e.target.value as any)}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={filters.source}
            onChange={(e) => handleSourceFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Sources</option>
            {sources.map(source => (
              <option key={source} value={source}>
                {source.charAt(0).toUpperCase() + source.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bulk-actions">
          <span className="bulk-count">{selectedIds.length} selected</span>
          <div className="bulk-buttons">
            <button
              onClick={() => handleBulkAction('activate')}
              className="btn btn-sm btn-success"
            >
              Activate
            </button>
            <button
              onClick={() => handleBulkAction('unsubscribe')}
              className="btn btn-sm btn-warning"
            >
              Unsubscribe
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="btn btn-sm btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="list-summary">
        <p>Showing {subscribers.length} of {total} subscribers</p>
      </div>

      {/* Subscribers Table */}
      <div className="table-container">
        <table className="subscribers-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedIds.length === subscribers.length && subscribers.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>Email</th>
              <th>Name</th>
              <th>Status</th>
              <th>Source</th>
              <th>Subscribed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(subscriber.id)}
                    onChange={(e) => handleSelectSubscriber(subscriber.id, e.target.checked)}
                  />
                </td>
                <td>
                  <div className="subscriber-email">
                    <span className="email">{subscriber.email}</span>
                  </div>
                </td>
                <td>
                  <span className="subscriber-name">
                    {subscriber.name || '-'}
                  </span>
                </td>
                <td>
                  <span className={getStatusBadgeClass(subscriber.status)}>
                    {subscriber.status}
                  </span>
                </td>
                <td>
                  <span className="subscriber-source">
                    {subscriber.source.replace('-', ' ')}
                  </span>
                </td>
                <td>
                  <span className="subscriber-date">
                    {formatDate(subscriber.subscribed_at)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {subscriber.status === 'active' ? (
                      <button
                        onClick={() => handleStatusChange(subscriber.id, 'unsubscribed')}
                        className="btn btn-sm btn-warning"
                        title="Unsubscribe"
                      >
                        Unsubscribe
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(subscriber.id, 'active')}
                        className="btn btn-sm btn-success"
                        title="Reactivate"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => onSubscriberSelect?.(subscriber)}
                      className="btn btn-sm btn-primary"
                      title="View Details"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            Previous
          </button>
          
          <div className="page-info">
            <span>Page {currentPage} of {totalPages}</span>
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      )}

      {subscribers.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">📧</div>
          <h3>No subscribers found</h3>
          <p>No subscribers match your current filters.</p>
        </div>
      )}
    </div>
  );
};

export default SubscriberList;