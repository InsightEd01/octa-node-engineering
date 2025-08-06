import React, { useState } from 'react';
import { ExportOptions, SubscriberFilters } from '../types/newsletter';
import { newsletterService } from '../services/newsletterService';

interface SubscriberExportProps {
  filters: SubscriberFilters;
  onClose: () => void;
}

const SubscriberExport: React.FC<SubscriberExportProps> = ({ filters, onClose }) => {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'csv',
    fields: ['email', 'name', 'status', 'source', 'subscribed_at'],
    filters
  });
  const [isExporting, setIsExporting] = useState(false);

  const availableFields = [
    { key: 'email', label: 'Email Address' },
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'source', label: 'Source' },
    { key: 'subscribed_at', label: 'Subscription Date' },
    { key: 'unsubscribed_at', label: 'Unsubscription Date' }
  ];

  const handleFieldToggle = (fieldKey: string) => {
    setExportOptions(prev => ({
      ...prev,
      fields: prev.fields.includes(fieldKey)
        ? prev.fields.filter(f => f !== fieldKey)
        : [...prev.fields, fieldKey]
    }));
  };

  const handleExport = async () => {
    if (exportOptions.fields.length === 0) {
      alert('Please select at least one field to export');
      return;
    }

    try {
      setIsExporting(true);
      const data = await newsletterService.exportSubscribers(exportOptions);
      
      // Create and download file
      const blob = new Blob([data], { 
        type: exportOptions.format === 'csv' ? 'text/csv' : 'application/json' 
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `subscribers_${new Date().toISOString().split('T')[0]}.${exportOptions.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content export-modal">
        <div className="modal-header">
          <h2>Export Subscribers</h2>
          <button onClick={onClose} className="modal-close">×</button>
        </div>

        <div className="modal-body">
          {/* Format Selection */}
          <div className="form-group">
            <label>Export Format</label>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="format"
                  value="csv"
                  checked={exportOptions.format === 'csv'}
                  onChange={() => setExportOptions(prev => ({ ...prev, format: 'csv' }))}
                />
                <span>CSV (Excel compatible)</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="format"
                  value="json"
                  checked={exportOptions.format === 'json'}
                  onChange={() => setExportOptions(prev => ({ ...prev, format: 'json' }))}
                />
                <span>JSON (Developer friendly)</span>
              </label>
            </div>
          </div>

          {/* Field Selection */}
          <div className="form-group">
            <label>Fields to Export</label>
            <div className="checkbox-group">
              {availableFields.map(field => (
                <label key={field.key} className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={exportOptions.fields.includes(field.key)}
                    onChange={() => handleFieldToggle(field.key)}
                  />
                  <span>{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Current Filters Info */}
          <div className="form-group">
            <label>Current Filters Applied</label>
            <div className="filter-summary">
              {filters.search && (
                <div className="filter-item">
                  <strong>Search:</strong> "{filters.search}"
                </div>
              )}
              {filters.status !== 'all' && (
                <div className="filter-item">
                  <strong>Status:</strong> {filters.status}
                </div>
              )}
              {filters.source && (
                <div className="filter-item">
                  <strong>Source:</strong> {filters.source.replace('-', ' ')}
                </div>
              )}
              {filters.dateRange && (
                <div className="filter-item">
                  <strong>Date Range:</strong> {filters.dateRange.start} to {filters.dateRange.end}
                </div>
              )}
              {!filters.search && filters.status === 'all' && !filters.source && !filters.dateRange && (
                <div className="filter-item">
                  <em>No filters applied - exporting all subscribers</em>
                </div>
              )}
            </div>
          </div>

          {/* Export Preview */}
          <div className="form-group">
            <label>Export Preview</label>
            <div className="export-preview">
              <div className="preview-info">
                <span>Format: {exportOptions.format.toUpperCase()}</span>
                <span>Fields: {exportOptions.fields.length} selected</span>
              </div>
              {exportOptions.format === 'csv' && (
                <div className="preview-sample">
                  <code>
                    {exportOptions.fields.join(',')}
                    <br />
                    "user@example.com","John Doe","active","website","2024-01-15"
                  </code>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            onClick={onClose}
            className="btn btn-secondary"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="btn btn-primary"
            disabled={isExporting || exportOptions.fields.length === 0}
          >
            {isExporting ? (
              <>
                <span className="loading-spinner small"></span>
                Exporting...
              </>
            ) : (
              'Export Data'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriberExport;