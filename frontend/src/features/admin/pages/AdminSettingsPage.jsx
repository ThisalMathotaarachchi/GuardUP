import { useEffect, useState } from 'react';
import { Shield, Server, LogOut } from 'lucide-react';
import adminApi from '../../../services/adminApi';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminLoadingState from '../../../components/admin/AdminLoadingState';
import AdminErrorState from '../../../components/admin/AdminErrorState';

const AdminSettingsPage = () => {
  const { admin, logout } = useAdminAuth();
  const [platform, setPlatform] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminApi.get('/settings');
        setPlatform(res.data.data.platform);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <AdminLoadingState message="Loading settings..." />;

  return (
    <div className="admin-page">
      <AdminPageHeader title="Settings" subtitle="Administrator account and platform configuration" />

      {error && <AdminErrorState message={error} />}

      <section className="admin-panel">
        <h2 className="admin-panel__title"><Shield size={18} className="inline mr-2" />Administrator Account</h2>
        {admin && (
          <dl className="admin-dl">
            <div><dt>Name</dt><dd>{admin.firstName} {admin.lastName}</dd></div>
            <div><dt>Email</dt><dd>{admin.email}</dd></div>
            <div><dt>Role</dt><dd>{admin.role}</dd></div>
          </dl>
        )}
        <button type="button" onClick={logout} className="btn-secondary mt-6 inline-flex items-center gap-2">
          <LogOut size={16} /> Sign out of admin console
        </button>
        <p className="admin-footnote mt-4">
          Password changes are managed via server environment variables (ADMIN_EMAIL, ADMIN_PASSWORD). No password change UI is exposed in this in-memory deployment.
        </p>
      </section>

      <section className="admin-panel">
        <h2 className="admin-panel__title"><Server size={18} className="inline mr-2" />Platform Configuration</h2>
        {platform ? (
          <dl className="admin-dl">
            <div><dt>Storage backend</dt><dd>{platform.storage}</dd></div>
            <div><dt>Registered users</dt><dd>{platform.userCount}</dd></div>
            <div><dt>Admin configured</dt><dd>{platform.adminConfigured ? 'Yes' : 'No'}</dd></div>
          </dl>
        ) : (
          <p className="admin-text-muted">Platform configuration unavailable</p>
        )}
      </section>
    </div>
  );
};

export default AdminSettingsPage;
