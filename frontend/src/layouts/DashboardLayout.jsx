import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import PageShell from '../components/common/PageShell';

const isSimGameplayRoute = (pathname) =>
  /^\/dashboard\/simulations\/(phishing|ransomware)\/[^/]+/.test(pathname) ||
  /^\/dashboard\/simulations\/the-last-request\/?$/.test(pathname) ||
  /^\/dashboard\/simulations\/the-breach\/?$/.test(pathname);

const isReadingRoute = (pathname) =>
  /\/dashboard\/knowledge-center(\/|$)/.test(pathname) ||
  /\/dashboard\/resources\//.test(pathname);

const isCertWorkspaceRoute = (pathname) =>
  /\/dashboard\/certifications\/[^/]+\/activity/.test(pathname);

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const simGameplay = isSimGameplayRoute(pathname);
  const pageVariant = isReadingRoute(pathname)
    ? 'reading'
    : isCertWorkspaceRoute(pathname)
      ? 'cert-workspace'
      : 'dashboard';

  if (simGameplay) {
    return (
      <div className="simulation-route-host h-dvh w-full overflow-hidden">
        <Outlet />
      </div>
    );
  }

  const mainContent = (
    <main className="flex-1 min-h-0 overflow-hidden flex flex-col">
      <Outlet />
    </main>
  );

  return (
    <div className="dashboard-app flex flex-1 min-h-0 w-full overflow-hidden">
      <aside
        className={`dashboard-shell__sidebar hidden md:flex flex-col shrink-0 overflow-hidden ${
          collapsed ? 'dashboard-shell__sidebar--collapsed' : ''
        }`}
      >
        <div className="dashboard-shell__sidebar-toggle">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="gu-sidebar__collapse-btn"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <Sidebar collapsed={collapsed} />
      </aside>

      <div className="dashboard-main flex flex-col flex-1 min-h-0 min-w-0 overflow-hidden">
        <div className="dashboard-main__navbar flex-shrink-0">
          <Navbar />
        </div>
        <PageShell variant={pageVariant} className="flex-1 min-h-0 min-w-0 overflow-hidden">
          {mainContent}
        </PageShell>
      </div>
    </div>
  );
};

export default DashboardLayout;
