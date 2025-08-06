import React, { useState } from 'react';
import { AdminProduct } from '../types/product';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

type ViewMode = 'list' | 'create' | 'edit';

const ProductsPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | undefined>();

  const handleCreateProduct = () => {
    setSelectedProduct(undefined);
    setViewMode('create');
  };

  const handleEditProduct = (product: AdminProduct) => {
    setSelectedProduct(product);
    setViewMode('edit');
  };

  const handleSaveProduct = () => {
    // Product has been saved, return to list view
    setViewMode('list');
    setSelectedProduct(undefined);
  };

  const handleCancel = () => {
    setViewMode('list');
    setSelectedProduct(undefined);
  };

  return (
    <div className="products-page">
      {viewMode === 'list' && (
        <ProductList
          onCreateProduct={handleCreateProduct}
          onEditProduct={handleEditProduct}
        />
      )}

      {(viewMode === 'create' || viewMode === 'edit') && (
        <ProductForm
          product={selectedProduct}
          onSave={handleSaveProduct}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProductsPage;