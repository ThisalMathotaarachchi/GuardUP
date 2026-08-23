import { NavLink } from 'react-router-dom';
import Logo from '../common/Logo';
import {
  BarChart3,
  BookOpen,
  Award,
  LayoutDashboard,
  Library,
  Settings as SettingsIcon,
  User,
} from 'lucide-react';

const primaryItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/learning-path', label: 'Learning Path', icon: BookOpen },
  { to: '/dashboard/certifications', label: 'Certifications', icon: Award },
  { to: '/dashboard/knowledge-center', label: 'Knowledge Center', icon: Library },
];

const secondaryItems = [
  { to: '/dashboard/statistics', label: 'Statistics', icon: BarChart3 },
];

const tertiaryItems = [
  { to: '/dashboard/profile', label: 'Profile', icon: User },
  { to: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
];

function SidebarNavItem({ item, collapsed }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.end}
      className={({ isActive }) =>
        [
          'gu-sidebar__link',
          isActive ? 'gu-sidebar__link--active' : '',
          collapsed ? 'gu-sidebar__link--collapsed' : '',
        ].join(' ')
      }
      title={collapsed ? item.label : undefined}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      {!collapsed && <span>{item.label}</span>}
    </NavLink>
  );
}

const Sidebar = ({ collapsed = false }) => {
  return (
    <div className="gu-sidebar__body">
      {!collapsed && (
        <div className="gu-sidebar__logo">
          <Logo size="sm" />
        </div>
      )}

      <nav className="gu-sidebar__nav" aria-label="Primary navigation">
        {primaryItems.map((item) => (
          <SidebarNavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="gu-sidebar__separator" role="separator" />

      <nav className="gu-sidebar__nav" aria-label="Analytics navigation">
        {secondaryItems.map((item) => (
          <SidebarNavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <div className="gu-sidebar__separator" role="separator" />

      <nav className="gu-sidebar__nav gu-sidebar__nav--bottom" aria-label="Account navigation">
        {tertiaryItems.map((item) => (
          <SidebarNavItem key={item.to} item={item} collapsed={collapsed} />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
