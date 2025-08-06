import React, { useState } from 'react';
import { MessageFilters } from '../services/messageService';

interface MessageFiltersProps {
  filters: MessageFilters;
  onFiltersChange: (filters: MessageFilters) => void;
  onClose: () => void;
}

const MessageFiltersComponent: React.FC<MessageFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose
}) => {
  const [localFilters, setLocalFilters] = useState<MessageFilters>(filters);

  // Handle filter changes
  const handleFilterChange = (key: keyof MessageFilters, value: string) => {
    const newFilters = {
      ...localFilters,
      [key]: value || undefined
    };
    setLocalFilters(newFilters);
  };

  // Apply filters
  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  // Clear filters
  const handleClearFilters = () => {
    const clearedFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // Reset to original filters
  const handleReset = () => {
    setLocalFilters(filters);
  };

  return (
    <div className="message-filters">
      <div className="filters-header">
        <h3>Filter Messages</h3>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="filters-content">
        <div className="filters-grid">
          {/* Status Filter */}
          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select
              id="status-filter"
              value={localFilters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="form-control"
            >
              <option value="">All Statuses</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Search Filter */}
          <div className="filter-group">
            <label htmlFor="search-filter">Search:</label>
            <input
              type="text"
              id="search-filter"
              value={localFilters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="form-control"
              placeholder="Search name, email, subject, or message..."
            />
          </div>

          {/* Date From Filter */}
          <div className="filter-group">
            <label htmlFor="date-from-filter">From Date:</label>
            <input
              type="date"
              id="date-from-filter"
              value={localFilters.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="form-control"
            />
          </div>

          {/* Date To Filter */}
          <div className="filter-group">
            <label htmlFor="date-to-filter">To Date:</label>
            <input
              type="date"
              id="date-to-filter"
              value={localFilters.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {/* Quick Filter Buttons */}
        <div className="quick-filters">
          <h4>Quick Filters:</h4>
          <div className="quick-filter-buttons">
            <button
              className={`btn btn-sm ${localFilters.status === 'unread' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleFilterChange('status', localFilters.status === 'unread' ? '' : 'unread')}
            >
              Unread Only
            </button>
            <button
              className={`btn btn-sm ${localFilters.status === 'replied' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleFilterChange('status', localFilters.status === 'replied' ? '' : 'replied')}
            >
              Replied Only
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                handleFilterChange('dateFrom', today);
              }}
            >
              Today
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                handleFilterChange('dateFrom', weekAgo.toISOString().split('T')[0]);
              }}
            >
              Last 7 Days
            </button>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => {
                const monthAgo = new Date();
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                handleFilterChange('dateFrom', monthAgo.toISOString().split('T')[0]);
              }}
            >
              Last Month
            </button>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="filters-actions">
          <div className="filters-actions-left">
            <button
              className="btn btn-outline"
              onClick={handleClearFilters}
            >
              Clear All
            </button>
            <button
              className="btn btn-outline"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
          <div className="filters-actions-right">
            <button
              className="btn btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {(localFilters.status || localFilters.search || localFilters.dateFrom || localFilters.dateTo) && (
          <div className="active-filters">
            <h4>Active Filters:</h4>
            <div className="filter-tags">
              {localFilters.status && (
                <span className="filter-tag">
                  Status: {localFilters.status}
                  <button onClick={() => handleFilterChange('status', '')}>×</button>
                </span>
              )}
              {localFilters.search && (
                <span className="filter-tag">
                  Search: "{localFilters.search}"
                  <button onClick={() => handleFilterChange('search', '')}>×</button>
                </span>
              )}
              {localFilters.dateFrom && (
                <span className="filter-tag">
                  From: {localFilters.dateFrom}
                  <button onClick={() => handleFilterChange('dateFrom', '')}>×</button>
                </span>
              )}
              {localFilters.dateTo && (
                <span className="filter-tag">
                  To: {localFilters.dateTo}
                  <button onClick={() => handleFilterChange('dateTo', '')}>×</button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageFiltersComponent;