import React, { useState, useEffect } from 'react';
import { BlogPost, BlogFilters } from '../types/blog';
import { blogService } from '../services/blogService';

interface BlogListProps {
  onEditPost: (post: BlogPost) => void;
  onCreatePost: () => void;
}

const BlogList: React.FC<BlogListProps> = ({ onEditPost, onCreatePost }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<BlogFilters>({
    search: '',
    status: 'all',
    author: '',
    tag: ''
  });
  const [authors, setAuthors] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const limit = 10;

  useEffect(() => {
    loadPosts();
    loadFiltersData();
  }, [currentPage, filters]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await blogService.getPosts(currentPage, limit, filters);
      setPosts(response.posts);
      setTotalPages(response.totalPages);
      setTotal(response.total);
      setError(null);
    } catch (err) {
      setError('Failed to load blog posts');
      console.error('Error loading blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadFiltersData = async () => {
    try {
      const [authorsData, tagsData] = await Promise.all([
        blogService.getAuthors(),
        blogService.getTags()
      ]);
      setAuthors(authorsData);
      setTags(tagsData);
    } catch (err) {
      console.error('Error loading filter data:', err);
    }
  };

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof BlogFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(posts.map(p => p.id));
    }
  };

  const handleBulkStatusUpdate = async (status: BlogPost['status']) => {
    if (selectedPosts.length === 0) return;

    try {
      setLoading(true);
      await blogService.updatePostsStatus(selectedPosts, status);
      setSelectedPosts([]);
      await loadPosts();
    } catch (err) {
      setError('Failed to update post status');
      console.error('Error updating post status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedPosts.length} blog post(s)?`)) {
      return;
    }

    try {
      setLoading(true);
      await blogService.deletePosts(selectedPosts);
      setSelectedPosts([]);
      await loadPosts();
    } catch (err) {
      setError('Failed to delete blog posts');
      console.error('Error deleting blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      setLoading(true);
      await blogService.deletePost(postId);
      await loadPosts();
    } catch (err) {
      setError('Failed to delete blog post');
      console.error('Error deleting blog post:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: BlogPost['status']) => {
    switch (status) {
      case 'published':
        return 'status-published';
      case 'draft':
        return 'status-draft';
      case 'scheduled':
        return 'status-scheduled';
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getContentPreview = (content: string, maxLength: number = 100) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };

  if (loading && posts.length === 0) {
    return (
      <div className="blog-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className="blog-list">
      <div className="blog-list-header">
        <div className="header-title">
          <h2>Blog Posts</h2>
          <span className="post-count">({total} posts)</span>
        </div>
        <button className="btn btn-primary" onClick={onCreatePost}>
          Write New Blog
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={loadPosts} className="btn btn-sm">Retry</button>
        </div>
      )}

      <div className="blog-filters">
        <div className="filter-row">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-selects">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value as BlogFilters['status'])}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>

            <select
              value={filters.author}
              onChange={(e) => handleFilterChange('author', e.target.value)}
              className="filter-select"
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>

            <select
              value={filters.tag}
              onChange={(e) => handleFilterChange('tag', e.target.value)}
              className="filter-select"
            >
              <option value="">All Tags</option>
              {tags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedPosts.length > 0 && (
          <div className="bulk-actions">
            <span className="selected-count">{selectedPosts.length} selected</span>
            <div className="bulk-buttons">
              <button
                onClick={() => handleBulkStatusUpdate('published')}
                className="btn btn-sm btn-success"
              >
                Publish
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('draft')}
                className="btn btn-sm btn-secondary"
              >
                Draft
              </button>
              <button
                onClick={() => handleBulkStatusUpdate('scheduled')}
                className="btn btn-sm btn-warning"
              >
                Schedule
              </button>
              <button
                onClick={handleBulkDelete}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="blog-table-container">
        <table className="blog-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedPosts.length === posts.length && posts.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Post</th>
              <th>Author</th>
              <th>Status</th>
              <th>Published</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(post.id)}
                    onChange={() => handleSelectPost(post.id)}
                  />
                </td>
                <td>
                  <div className="post-info">
                    {post.featured_image && (
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="post-thumbnail"
                      />
                    )}
                    <div className="post-details">
                      <h4>{post.title}</h4>
                      <p>{getContentPreview(post.excerpt)}</p>
                      <div className="post-tags">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="tag-small">{tag}</span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="tag-small">+{post.tags.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{post.author_name}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(post.status)}`}>
                    {post.status}
                  </span>
                  {post.status === 'scheduled' && post.scheduled_for && (
                    <div className="scheduled-info">
                      {formatDate(post.scheduled_for)}
                    </div>
                  )}
                </td>
                <td>
                  {post.published_at ? formatDate(post.published_at) : '-'}
                </td>
                <td>{formatDate(post.updated_at)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEditPost(post)}
                      className="btn btn-sm btn-outline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && !loading && (
          <div className="empty-state">
            <p>No blog posts found</p>
            <button onClick={onCreatePost} className="btn btn-primary">
              Write your first blog post
            </button>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${currentPage === page ? 'active' : ''}`}
              >
                {page}
              </button>
            ))}
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

      {loading && posts.length > 0 && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default BlogList;