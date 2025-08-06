import React, { useState, useEffect } from 'react';
import { AdminProduct, ProductFilters } from '../types/product';
import { productService } from '../services/productService';

interface ProductListProps {
  onEditProduct: (product: AdminProduct) => void;
  onCreateProduct: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ onEditProduct, onCreateProduct }) => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: '',
    status: 'all'
  });
  const [categories, setCategories] = useState<string[]>([]);

  const limit = 10;

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [currentPage, filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getProducts(currentPage, limit, filters);
      setProducts(response.products);
      setTotalPages(response.totalPages);
      setTotal(response.total);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const cats = productService.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const handleSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
    setCurrentPage(1);
  };

  const handleFilterChange = (key: keyof ProductFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const handleBulkStatusUpdate = async (status: AdminProduct['status']) => {
    if (selectedProducts.length === 0) return;

    try {
      setLoading(true);
      await productService.updateProductsStatus(selectedProducts, status);
      setSelectedProducts([]);
      await loadProducts();
    } catch (err) {
      setError('Failed to update product status');
      console.error('Error updating product status:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    
    if (!window.confirm(`Are you sure you want to delete ${selectedProducts.length} product(s)?`)) {
      return;
    }

    try {
      setLoading(true);
      await productService.deleteProducts(selectedProducts);
      setSelectedProducts([]);
      await loadProducts();
    } catch (err) {
      setError('Failed to delete products');
      console.error('Error deleting products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setLoading(true);
      await productService.deleteProduct(productId);
      await loadProducts();
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: AdminProduct['status']) => {
    switch (status) {
      case 'published':
        return 'status-published';
      case 'draft':
        return 'status-draft';
      case 'archived':
        return 'status-archived';
      default:
        return '';
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="product-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        <div className="header-title">
          <h2>Products</h2>
          <span className="product-count">({total} products)</span>
        </div>
        <button className="btn btn-primary" onClick={onCreateProduct}>
          Add New Product
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={loadProducts} className="btn btn-sm">Retry</button>
        </div>
      )}

      <div className="product-filters">
        <div className="filter-row">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-selects">
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value as ProductFilters['status'])}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="bulk-actions">
            <span className="selected-count">{selectedProducts.length} selected</span>
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
                onClick={() => handleBulkStatusUpdate('archived')}
                className="btn btn-sm btn-warning"
              >
                Archive
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

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Product</th>
              <th>Category</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </td>
                <td>
                  <div className="product-info">
                    {product.images.length > 0 && (
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt_text}
                        className="product-thumbnail"
                      />
                    )}
                    <div className="product-details">
                      <h4>{product.name}</h4>
                      <p>{product.description.substring(0, 100)}...</p>
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td>{new Date(product.updated_at).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="btn btn-sm btn-outline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
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

        {products.length === 0 && !loading && (
          <div className="empty-state">
            <p>No products found</p>
            <button onClick={onCreateProduct} className="btn btn-primary">
              Create your first product
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

      {loading && products.length > 0 && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default ProductList;