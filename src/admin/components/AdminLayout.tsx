import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Products', icon: '📦' },
    { path: '/admin/blog', label: 'Blog', icon: '📝' },
    { path: '/admin/messages', label: 'Messages', icon: '💬' },
    { path: '/admin/newsletter', label: 'Newsletter', icon: '📧' },
    { path: '/admin/contact', label: 'Contact Info', icon: '📞' },
    { path: '/admin/social', label: 'Social Media', icon: '🌐' },
    { path: '/admin/carousel', label: 'Carousel', icon: '🖼️' },
    { path: '/admin/flashcards', label: 'Flash Cards', icon: '💡' },
    { path: '/admin/notifications', label: 'Notifications', icon: '🔔' },
  ];

  const isActiveRoute = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/' }];
    
    if (pathSegments.length > 0) {
      breadcrumbs.push({ label: 'Admin', path: '/admin' });
      
      if (pathSegments.length > 1) {
        const currentPage = pathSegments[pathSegments.length - 1];
        const pageLabels: { [key: string]: string } = {
          'products': 'Products',
          'blog': 'Blog',
          'messages': 'Messages',
          'newsletter': 'Newsletter',
          'contact': 'Contact Info',
          'social': 'Social Media',
          'carousel': 'Carousel',
          'flashcards': 'Flash Cards',
          'notifications': 'Notifications',
          'profile': 'Profile',
          'settings': 'Settings'
        };
        
        breadcrumbs.push({ 
          label: pageLabels[currentPage] || currentPage.charAt(0).toUpperCase() + currentPage.slice(1), 
          path: location.pathname 
        });
      }
    }
    
    return breadcrumbs;
  };

  return (
    <div className="admin-layout">
      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Admin Sidebar */}
      <aside className={`admin-sidebar ${
        isMobile 
          ? (isMobileMenuOpen ? 'mobile-open' : 'mobile-closed') 
          : (isSidebarCollapsed ? 'collapsed' : '')
      }`}>
        <div className="sidebar-header">
          <Link to="/" className="admin-logo">
            <img src="/assets/logo.png" alt="Octa Node Engineering" />
            {!isSidebarCollapsed && <span>Admin</span>}
          </Link>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-item ${isActiveRoute(item.path) ? 'active' : ''}`}
                  title={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="nav-label">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {!isMobile && (
            <button
              className="collapse-btn"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
          )}
        </div>
      </aside>

      {/* Admin Main Content */}
      <div className="admin-main">
        {/* Admin Header */}
        <header className="admin-header">
          <div className="header-left">
            <button
              className="mobile-menu-btn"
              onClick={toggleSidebar}
              title={isMobile ? 'Toggle menu' : (isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar')}
            >
              {isMobile ? '☰' : (isSidebarCollapsed ? '→' : '←')}
            </button>
            <nav className="breadcrumb">
              {getBreadcrumbs().map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index > 0 && <span className="breadcrumb-separator">/</span>}
                  {index === getBreadcrumbs().length - 1 ? (
                    <span className="breadcrumb-current">{crumb.label}</span>
                  ) : (
                    <Link to={crumb.path} className="breadcrumb-link">{crumb.label}</Link>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="header-right">
            <div className="header-actions">
              <button onClick={toggleTheme} className="theme-toggle-btn" title="Toggle theme">
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button className="notification-btn" title="Notifications">
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">3</span>
              </button>
              
              <div className="user-menu">
                <div className="user-avatar">
                  <span>{user?.email?.charAt(0).toUpperCase() || 'A'}</span>
                </div>
                {!isMobile && (
                  <div className="user-info">
                    <span className="user-name">{user?.email || 'Admin User'}</span>
                    <span className="user-role">Administrator</span>
                  </div>
                )}
                <div className="user-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-user-info">
                      <span className="dropdown-user-name">{user?.email || 'Admin User'}</span>
                      <span className="dropdown-user-role">Administrator</span>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/admin/profile" className="dropdown-item">
                    <span className="dropdown-icon">👤</span>
                    Profile Settings
                  </Link>
                  <Link to="/admin/settings" className="dropdown-item">
                    <span className="dropdown-icon">⚙️</span>
                    Admin Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <span className="dropdown-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Admin Content Area */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;