import { AdminProduct, ProductFormData, ProductFilters, ProductListResponse } from '../types/product';
import { products } from '../../data/products';

// Mock service - In a real app, this would connect to Supabase or another backend
class ProductService {
  private products: AdminProduct[] = [];

  constructor() {
    // Convert existing products to admin format with additional fields
    this.products = products.map((product) => ({
      ...product,
      images: product.images.map((url, imgIndex) => ({
        id: `img-${product.id}-${imgIndex}`,
        url,
        alt_text: `${product.name} image ${imgIndex + 1}`,
        order: imgIndex
      })),
      status: 'published' as const,
      created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      updated_at: new Date().toISOString()
    }));
  }

  async getProducts(
    page: number = 1,
    limit: number = 10,
    filters: ProductFilters = { search: '', category: '', status: 'all' }
  ): Promise<ProductListResponse> {
    let filteredProducts = [...this.products];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filteredProducts = filteredProducts.filter(product =>
        product.status === filters.status
      );
    }

    // Calculate pagination
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    return {
      products: paginatedProducts,
      total,
      page,
      limit,
      totalPages
    };
  }

  async getProductById(id: string): Promise<AdminProduct | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.products.find(product => product.id === id) || null;
  }

  async createProduct(data: ProductFormData): Promise<AdminProduct> {
    const newProduct: AdminProduct = {
      id: `product-${Date.now()}`,
      ...data,
      images: [], // Images will be added separately
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.products.unshift(newProduct);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return newProduct;
  }

  async updateProduct(id: string, data: Partial<ProductFormData>): Promise<AdminProduct> {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...data,
      updated_at: new Date().toISOString()
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return this.products[productIndex];
  }

  async deleteProduct(id: string): Promise<void> {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    this.products.splice(productIndex, 1);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  async deleteProducts(ids: string[]): Promise<void> {
    this.products = this.products.filter(product => !ids.includes(product.id));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async updateProductStatus(id: string, status: AdminProduct['status']): Promise<AdminProduct> {
    return this.updateProduct(id, { status });
  }

  async updateProductsStatus(ids: string[], status: AdminProduct['status']): Promise<void> {
    ids.forEach(id => {
      const productIndex = this.products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        this.products[productIndex].status = status;
        this.products[productIndex].updated_at = new Date().toISOString();
      }
    });

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async uploadProductImage(file: File): Promise<string> {
    // Simulate file upload - in real app, this would upload to cloud storage
    const imageUrl = URL.createObjectURL(file);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return imageUrl;
  }

  getCategories(): string[] {
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.sort();
  }
}

export const productService = new ProductService();