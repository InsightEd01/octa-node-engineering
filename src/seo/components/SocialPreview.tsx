import React from 'react';
import { SocialMetaProps } from '../types';

interface SocialPreviewProps extends Omit<SocialMetaProps, 'twitterHandle' | 'facebookAppId'> {
  platform: 'facebook' | 'twitter' | 'linkedin';
  showPreview?: boolean;
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({
  title,
  description,
  image,
  url,
  platform,
  showPreview = false
}) => {
  if (!showPreview) return null;

  const previewStyles = {
    facebook: {
      container: 'border border-gray-300 rounded-lg overflow-hidden max-w-md bg-white shadow-sm',
      image: 'w-full h-48 object-cover',
      content: 'p-3',
      title: 'font-semibold text-gray-900 text-sm mb-1 line-clamp-2',
      description: 'text-gray-600 text-xs line-clamp-2 mb-1',
      url: 'text-gray-500 text-xs uppercase'
    },
    twitter: {
      container: 'border border-gray-300 rounded-2xl overflow-hidden max-w-md bg-white',
      image: 'w-full h-48 object-cover',
      content: 'p-3',
      title: 'font-semibold text-gray-900 text-sm mb-1 line-clamp-2',
      description: 'text-gray-600 text-sm line-clamp-2 mb-2',
      url: 'text-gray-500 text-sm'
    },
    linkedin: {
      container: 'border border-gray-300 rounded overflow-hidden max-w-md bg-white shadow-sm',
      image: 'w-full h-48 object-cover',
      content: 'p-3',
      title: 'font-semibold text-gray-900 text-sm mb-1 line-clamp-2',
      description: 'text-gray-600 text-xs line-clamp-3 mb-1',
      url: 'text-gray-500 text-xs'
    }
  };

  const styles = previewStyles[platform];
  const domain = new URL(url).hostname;

  return (
    <div className={styles.container}>
      <img 
        src={image} 
        alt={title}
        className={styles.image}
        onError={(e) => {
          // Fallback to default image if social image fails to load
          e.currentTarget.src = '/assets/logo.png';
        }}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.url}>{domain}</span>
      </div>
    </div>
  );
};

export default SocialPreview;