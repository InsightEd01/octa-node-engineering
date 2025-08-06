import React, { useState } from 'react';
import { BlogPost, BlogFormData } from '../types/blog';
import { blogService } from '../services/blogService';
import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';

type ViewMode = 'list' | 'create' | 'edit';

const BlogPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePost = () => {
    setSelectedPost(null);
    setViewMode('create');
    setError(null);
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setViewMode('edit');
    setError(null);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedPost(null);
    setError(null);
  };

  const handleSubmitPost = async (data: BlogFormData) => {
    try {
      setLoading(true);
      setError(null);

      if (selectedPost) {
        // Update existing post
        await blogService.updatePost(selectedPost.id, data);
      } else {
        // Create new post
        await blogService.createPost(data);
      }

      // Return to list view
      handleBackToList();
    } catch (err) {
      setError(selectedPost ? 'Failed to update blog post' : 'Failed to create blog post');
      console.error('Error submitting blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blog-page">
      {viewMode === 'list' && (
        <BlogList
          onCreatePost={handleCreatePost}
          onEditPost={handleEditPost}
        />
      )}

      {(viewMode === 'create' || viewMode === 'edit') && (
        <BlogForm
          post={selectedPost || undefined}
          onSubmit={handleSubmitPost}
          onCancel={handleBackToList}
          loading={loading}
        />
      )}

      {error && (
        <div className="error-notification">
          <div className="error-content">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;