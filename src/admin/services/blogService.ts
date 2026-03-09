import { BlogPost, BlogFormData, BlogFilters, BlogListResponse } from '../types/blog';
import { siteBlogPosts } from '../../data/blogPosts';

class BlogService {
  private posts: BlogPost[] = [...siteBlogPosts];

  async getPosts(
    page: number = 1,
    limit: number = 10,
    filters: BlogFilters = { search: '', status: 'all', author: '', tag: '' }
  ): Promise<BlogListResponse> {
    let filteredPosts = [...this.posts];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.status === filters.status);
    }

    // Apply author filter
    if (filters.author) {
      filteredPosts = filteredPosts.filter(post => post.author_name === filters.author);
    }

    // Apply tag filter
    if (filters.tag) {
      filteredPosts = filteredPosts.filter(post => post.tags.includes(filters.tag));
    }

    // Sort by updated_at descending
    filteredPosts.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

    // Calculate pagination
    const total = filteredPosts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      posts: paginatedPosts,
      total,
      page,
      limit,
      totalPages
    };
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.posts.find(post => post.id === id) || null;
  }

  async createPost(data: BlogFormData): Promise<BlogPost> {
    const slug = this.generateSlug(data.title);
    const now = new Date().toISOString();
    
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      ...data,
      slug,
      author_id: 'admin-1', // In real app, get from auth context
      author_name: 'Admin User',
      published_at: data.status === 'published' ? now : data.published_at || null,
      created_at: now,
      updated_at: now
    };

    this.posts.unshift(newPost);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return newPost;
  }

  async updatePost(id: string, data: Partial<BlogFormData>): Promise<BlogPost> {
    const postIndex = this.posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error('Blog post not found');
    }

    const currentPost = this.posts[postIndex];
    const updatedPost = {
      ...currentPost,
      ...data,
      updated_at: new Date().toISOString()
    };

    // Update slug if title changed
    if (data.title && data.title !== currentPost.title) {
      updatedPost.slug = this.generateSlug(data.title);
    }

    // Handle status changes
    if (data.status === 'published' && currentPost.status !== 'published') {
      updatedPost.published_at = new Date().toISOString();
    } else if (data.status === 'draft') {
      updatedPost.published_at = null;
    }

    this.posts[postIndex] = updatedPost;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return updatedPost;
  }

  async deletePost(id: string): Promise<void> {
    const postIndex = this.posts.findIndex(p => p.id === id);
    if (postIndex === -1) {
      throw new Error('Blog post not found');
    }

    this.posts.splice(postIndex, 1);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  async deletePosts(ids: string[]): Promise<void> {
    this.posts = this.posts.filter(post => !ids.includes(post.id));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async updatePostStatus(id: string, status: BlogPost['status'], scheduledFor?: string): Promise<BlogPost> {
    const updateData: Partial<BlogFormData> = { status };
    if (status === 'scheduled' && scheduledFor) {
      updateData.scheduled_for = scheduledFor;
    }
    return this.updatePost(id, updateData);
  }

  async updatePostsStatus(ids: string[], status: BlogPost['status']): Promise<void> {
    ids.forEach(id => {
      const postIndex = this.posts.findIndex(p => p.id === id);
      if (postIndex !== -1) {
        this.posts[postIndex].status = status;
        this.posts[postIndex].updated_at = new Date().toISOString();
        
        if (status === 'published') {
          this.posts[postIndex].published_at = new Date().toISOString();
        } else if (status === 'draft') {
          this.posts[postIndex].published_at = null;
        }
      }
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  getAuthors(): string[] {
    const authors = [...new Set(this.posts.map(p => p.author_name))];
    return authors.sort();
  }

  getTags(): string[] {
    const allTags = this.posts.flatMap(p => p.tags);
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

export const blogService = new BlogService();
