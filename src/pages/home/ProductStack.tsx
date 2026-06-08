import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';

const ProductStack: React.FC = () => {
  const highlightedProducts = useMemo(() => products.slice(0, 4), []);

  return (
    <section className="octa-product-pricing" aria-labelledby="stack-heading">
      <div className="octa-section-heading">
        <span>Solution stack</span>
        <h2 id="stack-heading">Pick <span className="octa-heading-glow">ONE Solution</span> - ONE Intelligence</h2>
      </div>
      <div className="octa-product-grid">
        {highlightedProducts.map((product) => (
          <article key={product.id} className="octa-product-card">
            <div>
              <span>{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
            <ul>
              {product.benefits.slice(0, 4).map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
            <div className="octa-product-actions">
              <Link to={`/product/${product.id}`}>Explore</Link>
              <a href={product.appUrl} target="_blank" rel="noopener noreferrer">Open App</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductStack;
