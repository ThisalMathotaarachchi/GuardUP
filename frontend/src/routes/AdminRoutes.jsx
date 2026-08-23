import { Navigate, Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedAdminRoute from '../components/admin/ProtectedAdminRoute';
import AdminLogin from '../features/admin/AdminLogin';
import AdminDashboardHome from '../features/admin/pages/AdminDashboardHome';
import AdminUsersPage from '../features/admin/pages/AdminUsersPage';
import AdminUserDetailPage from '../features/admin/pages/AdminUserDetailPage';
import AdminCertificationsPage from '../features/admin/pages/AdminCertificationsPage';
import AdminSimulationsPage from '../features/admin/pages/AdminSimulationsPage';
import AdminAnalyticsPage from '../features/admin/pages/AdminAnalyticsPage';
import AdminActivityPage from '../features/admin/pages/AdminActivityPage';
import AdminSettingsPage from '../features/admin/pages/AdminSettingsPage';
import AdminKnowledgePage from '../features/admin/pages/AdminKnowledgePage';

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin"
      element={
        <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
      }
    >
      <Route index element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="dashboard" element={<AdminDashboardHome />} />
      <Route path="users" element={<AdminUsersPage />} />
      <Route path="users/:id" element={<AdminUserDetailPage />} />
      <Route path="certifications" element={<AdminCertificationsPage />} />
      <Route path="simulations" element={<AdminSimulationsPage />} />
      <Route path="knowledge" element={<AdminKnowledgePage />} />
      <Route path="analytics" element={<AdminAnalyticsPage />} />
      <Route path="analytics/simulations" element={<AdminAnalyticsPage />} />
      <Route path="user-activity" element={<AdminActivityPage userOnly />} />
      <Route path="activity" element={<AdminActivityPage />} />
      <Route path="settings" element={<AdminSettingsPage />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
