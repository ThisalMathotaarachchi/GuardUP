import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Award,
  Gamepad2,
  Library,
  BarChart3,
  LineChart,
  ScrollText,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import Logo from '../common/Logo';

const sections = [
  {
    title: 'Overview',
    items: [{ to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true }],
  },
  {
    title: 'Users',
    items: [
      { to: '/admin/users', label: 'Users', icon: Users },
      { to: '/admin/user-activity', label: 'User Activity', icon: UserCheck },
    ],
  },
  {
    title: 'Learning',
    items: [
      { to: '/admin/certifications', label: 'Certifications', icon: Award },
      { to: '/admin/simulations', label: 'Simulations', icon: Gamepad2 },
      { to: '/admin/knowledge', label: 'Knowledge Center', icon: Library },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { to: '/admin/analytics', label: 'Platform Analytics', icon: BarChart3, end: true },
      { to: '/admin/analytics/simulations', label: 'Simulation Analytics', icon: LineChart },
    ],
  },
  {
    title: 'System',
    items: [
      { to: '/admin/activity', label: 'Activity Logs', icon: ScrollText },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
];

function NavItem({ item, collapsed, onNavigate }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        ['gu-sidebar__link', isActive ? 'gu-sidebar__link--active' : ''].join(' ')
      }
      title={collapsed ? item.label : undefined}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );
}

const AdminSidebar = ({ mobileOpen, onMobileClose }) => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const sidebarContent = (collapsed = false) => (
    <div className="gu-sidebar__body">
      <div className="gu-sidebar__logo">
        {!collapsed && (
          <>
            <Logo size="sm" />
            <p className="admin-sidebar__brand-meta">Administration</p>
          </>
        )}
        {collapsed && <Logo size="sm" showText={false} />}
      </div>

      <nav className="gu-sidebar__nav admin-sidebar__nav" aria-label="Admin navigation">
        {sections.map((section) => (
          <div key={section.title} className="admin-sidebar__section">
            {!collapsed && <p className="admin-sidebar__section-title">{section.title}</p>}
            {section.items.map((item) => (
              <NavItem key={item.to} item={item} collapsed={collapsed} onNavigate={onMobileClose} />
            ))}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar__footer gu-sidebar__nav--bottom">
        {!collapsed && admin && (
          <div className="admin-sidebar__identity">
            <p className="admin-sidebar__identity-name">
              {admin.firstName} {admin.lastName}
            </p>
            <p className="admin-sidebar__identity-email">{admin.email}</p>
          </div>
        )}
        <button type="button" onClick={handleLogout} className="admin-sidebar__logout">
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
        {!collapsed && (
          <button type="button" onClick={() => navigate('/login')} className="admin-sidebar__back-link">
            Back to User Login
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside className="admin-sidebar dashboard-shell__sidebar admin-sidebar--desktop hidden lg:flex flex-col">{sidebarContent(false)}</aside>

      {mobileOpen && (
        <div className="admin-sidebar__overlay lg:hidden" onClick={onMobileClose} role="presentation" />
      )}

      <aside className={`admin-sidebar dashboard-shell__sidebar admin-sidebar--mobile lg:hidden ${mobileOpen ? 'admin-sidebar--open' : ''}`}>
        <button type="button" className="admin-sidebar__close" onClick={onMobileClose} aria-label="Close menu">
          <X size={20} />
        </button>
        {sidebarContent(false)}
      </aside>
    </>
  );
};

export const AdminMobileToggle = ({ onClick }) => (
  <button type="button" onClick={onClick} className="admin-mobile-toggle lg:hidden" aria-label="Open menu">
    <Menu size={22} />
  </button>
);

export default AdminSidebar;
