import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Session timeout duration (30 minutes)
  const SESSION_TIMEOUT = 30 * 60 * 1000;

  useEffect(() => {
    // Check for existing session on mount
    checkExistingSession();
    
    // Set up session timeout check
    const interval = setInterval(checkSessionTimeout, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const checkExistingSession = () => {
    try {
      const authData = localStorage.getItem('admin_auth');
      const lastActivity = localStorage.getItem('admin_last_activity');
      
      if (authData && lastActivity) {
        const parsedAuth = JSON.parse(authData);
        const lastActivityTime = parseInt(lastActivity);
        const now = Date.now();
        
        // Check if session has expired
        if (now - lastActivityTime < SESSION_TIMEOUT) {
          setUser(parsedAuth.user);
          updateLastActivity();
        } else {
          // Session expired, clear storage
          clearAuthData();
        }
      }
    } catch (error) {
      console.error('Error checking existing session:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const checkSessionTimeout = () => {
    const lastActivity = localStorage.getItem('admin_last_activity');
    if (lastActivity) {
      const lastActivityTime = parseInt(lastActivity);
      const now = Date.now();
      
      if (now - lastActivityTime >= SESSION_TIMEOUT) {
        logout();
      }
    }
  };

  const updateLastActivity = () => {
    localStorage.setItem('admin_last_activity', Date.now().toString());
  };

  const clearAuthData = () => {
    localStorage.removeItem('admin_auth');
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_last_activity');
    setUser(null);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // TODO: Replace with actual API call to authentication service
      // For demo purposes, using hardcoded credentials
      if (email === 'admin@octanode.online' && password === 'admin123') {
        const userData: User = {
          id: '1',
          email: 'admin@octanode.online',
          role: 'admin',
          name: 'Admin User'
        };
        
        // Store auth data
        const authData = {
          user: userData,
          timestamp: Date.now()
        };
        
        localStorage.setItem('admin_auth', JSON.stringify(authData));
        localStorage.setItem('admin_authenticated', 'true');
        updateLastActivity();
        
        setUser(userData);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    // Redirect will be handled by the component using this hook
  };

  const checkAuth = (): boolean => {
    if (!user) return false;
    
    const lastActivity = localStorage.getItem('admin_last_activity');
    if (!lastActivity) return false;
    
    const lastActivityTime = parseInt(lastActivity);
    const now = Date.now();
    
    if (now - lastActivityTime >= SESSION_TIMEOUT) {
      logout();
      return false;
    }
    
    // Update activity on auth check
    updateLastActivity();
    return true;
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};