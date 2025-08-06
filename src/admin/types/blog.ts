export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  author_id: string;
  author_name: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  scheduled_for?: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  excerpt: string;
  featured_image?: string;
  status: 'draft' | 'published' | 'scheduled';
  published_at?: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  scheduled_for?: string;
}

export interface BlogFilters {
  search: string;
  status: 'all' | 'draft' | 'published' | 'scheduled';
  author: string;
  tag: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}