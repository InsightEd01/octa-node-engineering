import React, { useState, useEffect } from 'react';
import { messageService, ResponseTemplate } from '../services/messageService';

interface ResponseTemplatesProps {
  onClose: () => void;
}

const ResponseTemplates: React.FC<ResponseTemplatesProps> = ({ onClose }) => {
  const [templates, setTemplates] = useState<ResponseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ResponseTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: ''
  });

  // Load templates
  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageService.getResponseTemplates();
      setTemplates(data);
    } catch (err) {
      console.error('Error loading templates:', err);
      setError('Failed to load templates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) return;

    try {
      if (editingTemplate) {
        await messageService.updateResponseTemplate(editingTemplate.id, formData);
      } else {
        await messageService.createResponseTemplate(formData);
      }
      
      setFormData({ name: '', subject: '', content: '' });
      setShowForm(false);
      setEditingTemplate(null);
      loadTemplates();
    } catch (err) {
      console.error('Error saving template:', err);
      setError('Failed to save template. Please try again.');
    }
  };

  // Handle edit
  const handleEdit = (template: ResponseTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      subject: template.subject,
      content: template.content
    });
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      await messageService.deleteResponseTemplate(id);
      loadTemplates();
    } catch (err) {
      console.error('Error deleting template:', err);
      setError('Failed to delete template. Please try again.');
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({ name: '', subject: '', content: '' });
    setShowForm(false);
    setEditingTemplate(null);
  };

  return (
    <div className="response-templates-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Response Templates</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            {error}
            <button className="alert-close" onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="modal-body">
          {!showForm ? (
            <>
              <div className="templates-header">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowForm(true)}
                >
                  <span className="btn-icon">➕</span>
                  New Template
                </button>
              </div>

              {loading ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <p>Loading templates...</p>
                </div>
              ) : templates.length === 0 ? (
                <div className="no-templates">
                  <span className="no-templates-icon">📝</span>
                  <h3>No templates found</h3>
                  <p>Create your first response template to get started</p>
                </div>
              ) : (
                <div className="templates-list">
                  {templates.map((template) => (
                    <div key={template.id} className="template-item">
                      <div className="template-content">
                        <h4 className="template-name">{template.name}</h4>
                        {template.subject && (
                          <p className="template-subject">Subject: {template.subject}</p>
                        )}
                        <p className="template-preview">
                          {template.content.length > 100
                            ? template.content.substring(0, 100) + '...'
                            : template.content}
                        </p>
                        <div className="template-meta">
                          <span className="template-date">
                            Updated: {new Date(template.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="template-actions">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => handleEdit(template)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(template.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <form onSubmit={handleSubmit} className="template-form">
              <h3>{editingTemplate ? 'Edit Template' : 'New Template'}</h3>

              <div className="form-group">
                <label htmlFor="template-name">Template Name:</label>
                <input
                  type="text"
                  id="template-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-control"
                  placeholder="e.g., Thank you for inquiry"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="template-subject">Default Subject (optional):</label>
                <input
                  type="text"
                  id="template-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-control"
                  placeholder="e.g., Thank you for your inquiry"
                />
              </div>

              <div className="form-group">
                <label htmlFor="template-content">Template Content:</label>
                <textarea
                  id="template-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="form-control"
                  rows={8}
                  placeholder="Enter your template content here..."
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!formData.name.trim() || !formData.content.trim()}
                >
                  {editingTemplate ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseTemplates;