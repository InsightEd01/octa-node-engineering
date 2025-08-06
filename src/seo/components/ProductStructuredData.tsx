import React from 'react';
import { ProductData } from '../types';

interface ProductStructuredDataProps {
  product: ProductData;
  customData?: Partial<ProductData>;
}

const ProductStructuredData: React.FC<ProductStructuredDataProps> = ({ 
  product, 
  customData 
}) => {
  const structuredData = {
    ...product,
    ...customData,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

export default ProductStructuredData;