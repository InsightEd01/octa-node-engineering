import React, { useState, useEffect } from 'react';
import { BlogPost, BlogFormData } from '../types/blog';
import RichTextEditor from './RichTextEditor';

interface BlogFormProps {
  post?: BlogPost;
  onSubmit: (data: BlogFormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({
  post,
  onSubmit,
  onCancel,
  loading = false
}) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    content: '',
    excerpt: '',
    featured_image: '',
    status: 'draft',
    tags: [],
    meta_title: '',
    meta_description: '',
    scheduled_for: ''
  });

  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        featured_image: post.featured_image || '',
        status: post.status,
        tags: post.tags,
        meta_title: post.meta_title,
        meta_description: post.meta_description,
        scheduled_for: post.scheduled_for || ''
      });
    }
  }, [post]);

  const handleInputChange = (field: keyof BlogFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Auto-generate meta title if not manually set
    if (field === 'title' && !formData.meta_title) {
      setFormData(prev => ({ ...prev, meta_title: value as string }));
    }

    // Auto-generate excerpt from content if not manually set
    if (field === 'content' && !formData.excerpt) {
      const textContent = (value as string).replace(/<[^>]*>/g, '');
      const autoExcerpt = textContent.substring(0, 160) + (textContent.length > 160 ? '...' : '');
      setFormData(prev => ({ ...prev, excerpt: autoExcerpt }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      const newTags = [...formData.tags, tagInput.trim()];
      setFormData(prev => ({ ...prev, tags: newTags }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = formData.tags.filter(tag => tag !== tagToRemove);
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    }

    if (formData.status === 'scheduled' && !formData.scheduled_for) {
      newErrors.scheduled_for = 'Scheduled date is required for scheduled posts';
    }

    if (!formData.meta_title.trim()) {
      newErrors.meta_title = 'Meta title is required for SEO';
    }

    if (!formData.meta_description.trim()) {
      newErrors.meta_description = 'Meta description is required for SEO';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting blog form:', error);
    }
  };

  return (
    <div className="blog-form">
      <div className="form-header">
        <h2>{post ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="blog-form"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </div>

      <form id="blog-form" onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter blog post title"
              disabled={loading}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt *</label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => handleInputChange('excerpt', e.target.value)}
              className={`form-textarea ${errors.excerpt ? 'error' : ''}`}
              placeholder="Brief description of the blog post"
              rows={3}
              disabled={loading}
            />
            {errors.excerpt && <span className="error-text">{errors.excerpt}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Content *</label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => handleInputChange('content', value)}
              placeholder="Write your blog post content here..."
            />
            {errors.content && <span className="error-text">{errors.content}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="featured_image">Featured Image URL</label>
            <input
              type="url"
              id="featured_image"
              value={formData.featured_image}
              onChange={(e) => handleInputChange('featured_image', e.target.value)}
              className="form-input"
              placeholder="https://example.com/image.jpg"
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tags</label>
            <div className="tag-input-container">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                className="form-input"
                placeholder="Add a tag and press Enter"
                disabled={loading}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn btn-sm btn-secondary"
                disabled={loading}
              >
                Add Tag
              </button>
            </div>
            <div className="tags-list">
              {formData.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="tag-remove"
                    disabled={loading}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as BlogFormData['status'])}
              className="form-select"
              disabled={loading}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          {formData.status === 'scheduled' && (
            <div className="form-group">
              <label htmlFor="scheduled_for">Scheduled For *</label>
              <input
                type="datetime-local"
                id="scheduled_for"
                value={formData.scheduled_for}
                onChange={(e) => handleInputChange('scheduled_for', e.target.value)}
                className={`form-input ${errors.scheduled_for ? 'error' : ''}`}
                disabled={loading}
              />
              {errors.scheduled_for && <span className="error-text">{errors.scheduled_for}</span>}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>SEO Settings</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="meta_title">Meta Title *</label>
              <input
                type="text"
                id="meta_title"
                value={formData.meta_title}
                onChange={(e) => handleInputChange('meta_title', e.target.value)}
                className={`form-input ${errors.meta_title ? 'error' : ''}`}
                placeholder="SEO title for search engines"
                maxLength={60}
                disabled={loading}
              />
              <small className="form-help">
                {formData.meta_title.length}/60 characters
              </small>
              {errors.meta_title && <span className="error-text">{errors.meta_title}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="meta_description">Meta Description *</label>
              <textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => handleInputChange('meta_description', e.target.value)}
                className={`form-textarea ${errors.meta_description ? 'error' : ''}`}
                placeholder="SEO description for search engines"
                rows={3}
                maxLength={160}
                disabled={loading}
              />
              <small className="form-help">
                {formData.meta_description.length}/160 characters
              </small>
              {errors.meta_description && <span className="error-text">{errors.meta_description}</span>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;