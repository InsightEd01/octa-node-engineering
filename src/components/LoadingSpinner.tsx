import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...', 
  size = 'medium',
  fullScreen = false 
}) => {
  const containerClass = fullScreen 
    ? 'loading-spinner-fullscreen'
    : 'loading-spinner-container';

  return (
    <div className={containerClass}>
      <div className={`loading-spinner ${size}`}></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;