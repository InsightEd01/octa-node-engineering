import { Product } from '../../types';

export const validateProductStructuredData = (product: Product) => {
  const scriptContent = document.querySelector(
    'script[type="application/ld+json"]'
  )?.textContent;

  if (!scriptContent) {
    throw new Error('No structured data found on page');
  }

  const structuredData = JSON.parse(scriptContent);
  
  // Basic validation
  const requiredFields = [
    '@type', 'name', 'description', 'brand', 'image', 'offers'
  ];
  
  requiredFields.forEach(field => {
    if (!structuredData[field]) {
      throw new Error(`Missing required field in structured data: ${field}`);
    }
  });

  // Compare with product data
  if (structuredData.name !== product.name) {
    throw new Error('Product name mismatch in structured data');
  }

  return {
    isValid: true,
    structuredData,
    testUrl: `https://search.google.com/test/rich-results?url=${encodeURIComponent(window.location.href)}`
  };
};

export const openGoogleRichResultsTest = (url: string) => {
  window.open(
    `https://search.google.com/test/rich-results?url=${encodeURIComponent(url)}`,
    '_blank'
  );
};
