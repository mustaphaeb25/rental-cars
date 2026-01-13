import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import AuthProvider from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

// Page Components
import HomePage from './pages/HomePage';
import CarListingPage from './pages/CarListingPage';
import AuthPage from './pages/AuthPage';
import MyReservationsPage from './pages/MyReservationsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ManageCarsPage from './pages/ManageCarsPage';
import ManageReservationsPage from './pages/ManageReservationsPage';
import CarDetailPage from './pages/CarDetailPage';
import ContactPage from './pages/ContactPage';
import AdminContactMessagesPage from './pages/AdminContactMessagesPage';
import AboutPage from './pages/AoutUsPage'
import FAQsPage from './pages/FAQsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotFoundPage from './pages/NotFoundPage'; 

// Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AboutUsPage from './pages/AoutUsPage';

// ProtectedRoute component to guard routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();

 


  if (loading) {
    return <div>Loading authentication...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />; 
  }

 
  if (allowedRoles && allowedRoles.length > 0) {
    const hasRequiredRole =
      (allowedRoles.includes('admin') && isAdmin) ||
      (allowedRoles.includes('client') && !isAdmin); 

    if (!hasRequiredRole) {
      return <Navigate to="/" replace />; 
    }
  }

  return children ? children : <Outlet />; 
};

function App() {
  const location = useLocation();
  
  // Hide navbar and footer on 404 page
  const hideNavbarFooter = location.pathname === '*' || !isValidRoute(location.pathname);
  
  return (
    <ThemeProvider>
      <AuthProvider>
        {!hideNavbarFooter && <Navbar />}
        <main style={{ flexGrow: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/cars" element={<CarListingPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/faqs" element={<FAQsPage />} />

            {/* Authenticated User Routes (accessible by clients and admins) */}
            <Route element={<ProtectedRoute allowedRoles={['client', 'admin']} />}>
              <Route path="/my-reservations" element={<MyReservationsPage />} />
            </Route>

           
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/messages" element={<AdminContactMessagesPage />} />
              <Route path="/admin/manage-cars" element={<ManageCarsPage />} />
              <Route path="/admin/manage-reservations" element={<ManageReservationsPage />} />
              <Route path="/admin/analytics" element={<AnalyticsPage />} /> {/* New analytics route */}
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {!hideNavbarFooter && <Footer />}
      </AuthProvider>
    </ThemeProvider>
  );
}

// Helper function to check if route is valid
const isValidRoute = (pathname) => {
  const validRoutes = [
    '/',
    '/cars',
    '/auth',
    '/contact',
    '/about',
    '/faqs',
    '/my-reservations',
    '/admin',
    '/admin/messages',
    '/admin/manage-cars',
    '/admin/manage-reservations',
    '/admin/analytics',
  ];
  
  // Check exact matches
  if (validRoutes.includes(pathname)) return true;
  
  // Check for parameterized routes like /cars/:id
  if (pathname.startsWith('/cars/') && pathname !== '/cars') return true;
  
  return false;
};

export default App;