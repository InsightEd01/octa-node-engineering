import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import FeatureIcon, { type FeatureIconName } from './FeatureIcon';

type FeatureBlockProps = {
  id: FeatureIconName;
  title: string;
  body: string[];
  points: string[];
  productId: string;
  imageIndex: number;
  reversed?: boolean;
  onImageClick: (imageUrl: string, productName: string) => void;
};

const FeatureBlock: React.FC<FeatureBlockProps> = ({
  id,
  title,
  body,
  points,
  productId,
  imageIndex,
  reversed,
  onImageClick,
}) => {
  const product = products.find((item) => item.id === productId);
  const image = product?.images[imageIndex] || product?.images[0] || '';

  if (!product) {
    return null;
  }

  return (
    <section id={id} className={`octa-feature-block ${reversed ? 'is-reversed' : ''}`}>
      <div className="octa-feature-title">
        <FeatureIcon name={id} />
        <h3>{title}</h3>
      </div>
      <div className="octa-feature-body">
        <div className="octa-feature-copy">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="octa-point-grid">
            {points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
          <Link to={`/product/${product.id}`} className="octa-text-link">
            Explore {product.name}
          </Link>
        </div>
        <button
          type="button"
          className="octa-feature-media"
          onClick={() => onImageClick(image, product.name)}
        >
          <img src={image} alt={`${product.name} product preview`} loading="lazy" decoding="async" />
        </button>
      </div>
    </section>
  );
};

export default FeatureBlock;
