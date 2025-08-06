export interface AdminProduct {
  id: string;
  name: string;
  images: ProductImage[];
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  techSpecs: {
    platform: string;
    compatibility: string;
    requirements: string;
  };
  appUrl: string;
  demoUrl?: string;
  category: string;
  launchDate: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt_text: string;
  order: number;
}

export interface ProductFormData {
  name: string;
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  techSpecs: {
    platform: string;
    compatibility: string;
    requirements: string;
  };
  appUrl: string;
  demoUrl?: string;
  category: string;
  launchDate: string;
  status: 'draft' | 'published' | 'archived';
}

export interface ProductFilters {
  search: string;
  category: string;
  status: 'all' | 'draft' | 'published' | 'archived';
}

export interface ProductListResponse {
  products: AdminProduct[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}