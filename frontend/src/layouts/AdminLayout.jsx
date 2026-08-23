import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar, { AdminMobileToggle } from '../components/admin/AdminSidebar';
import Logo from '../components/common/Logo';
import SecurityAtmosphere from '../components/atmosphere/SecurityAtmosphere';

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-app dashboard-app flex h-dvh max-h-dvh overflow-hidden w-full">
      <SecurityAtmosphere variant="dashboard" className="admin-app__atmosphere" />

      <AdminSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <div className="admin-main dashboard-main flex flex-col flex-1 min-h-0 min-w-0 overflow-hidden">
        <header className="admin-topbar flex-shrink-0">
          <AdminMobileToggle onClick={() => setMobileOpen(true)} />
          <div className="admin-topbar__title">
            <Logo size="sm" />
            <span className="admin-topbar__subtitle">Administration</span>
          </div>
        </header>

        <main className="admin-content flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
