import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useActivityTracker = () => {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const updateActivity = () => {
      if (isAuthenticated) {
        localStorage.setItem('admin_last_activity', Date.now().toString());
      }
    };

    // Track user activity events
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const throttledUpdateActivity = throttle(updateActivity, 30000); // Update at most every 30 seconds

    events.forEach(event => {
      document.addEventListener(event, throttledUpdateActivity, true);
    });

    // Check auth status periodically
    const authCheckInterval = setInterval(() => {
      checkAuth();
    }, 60000); // Check every minute

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, throttledUpdateActivity, true);
      });
      clearInterval(authCheckInterval);
    };
  }, [isAuthenticated, checkAuth]);
};

// Throttle function to limit how often activity updates occur
function throttle<T extends (...args: any[]) => any>(func: T, limit: number): T {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }) as T;
}