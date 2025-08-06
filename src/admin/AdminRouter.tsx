import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminLayout from './components/AdminLayout';
import AuthGuard from './components/AuthGuard';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import NewsletterPage from './pages/NewsletterPage';
import MessagesPage from './pages/MessagesPage';
import SocialMediaPage from './pages/SocialMediaPage';
import CarouselPage from './pages/CarouselPage';
import FlashCardPage from './pages/FlashCardPage';
import NotificationsPage from './pages/NotificationsPage';

const AdminRouter: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public admin routes (no auth required) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected admin routes */}
        <Route
          path="/*"
          element={
            <AuthGuard>
              <AdminLayout />
            </AuthGuard>
          }
        >
          {/* Dashboard */}
          <Route index element={<DashboardPage />} />

          {/* Product Management */}
          <Route path="products" element={<ProductsPage />} />
          
          {/* Blog Management */}
          <Route path="blog" element={<BlogPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="newsletter" element={<NewsletterPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="social" element={<SocialMediaPage />} />
          <Route path="carousel" element={<CarouselPage />} />
          <Route path="flashcards" element={<FlashCardPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<div>Profile Settings - Coming Soon</div>} />
          <Route path="settings" element={<div>Admin Settings - Coming Soon</div>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AdminRouter;