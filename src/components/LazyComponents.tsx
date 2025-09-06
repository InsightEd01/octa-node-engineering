import { lazy } from 'react';

// Lazy load page components for code splitting
export const LazyProductPage = lazy(() => 
  import('../pages/ProductPage').then(module => ({ default: module.default }))
);

export const LazyPrivacy = lazy(() => 
  import('../pages/Privacy').then(module => ({ default: module.default }))
);

export const LazyTerms = lazy(() => 
  import('../pages/Terms').then(module => ({ default: module.default }))
);

export const LazyBlog = lazy(() => 
  import('../pages/Blog').then(module => ({ default: module.default }))
);

export const LazyAdminRouter = lazy(() => 
  import('../admin/AdminRouter').then(module => ({ default: module.default }))
);

// Lazy load heavy components
export const LazyChatWidget = lazy(() => 
  import('./ChatWidget').then(module => ({ default: module.default }))
);

// Preload components that are likely to be used soon
export const preloadComponent = (componentImport: () => Promise<any>) => {
  const componentPromise = componentImport();
  return componentPromise;
};

// Preload critical components
export const preloadCriticalComponents = () => {
  // Preload ProductPage as it's commonly accessed
  preloadComponent(() => import('../pages/ProductPage'));
  
  // Preload ChatWidget as it's used on all pages
  preloadComponent(() => import('./ChatWidget'));
};