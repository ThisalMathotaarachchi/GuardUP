import { Inbox } from 'lucide-react';

const AdminEmptyState = ({ title = 'No data yet', description }) => (
  <div className="admin-state admin-state--empty">
    <Inbox size={28} className="text-white/40" />
    <p className="admin-state__title">{title}</p>
    {description && <p className="admin-state__text">{description}</p>}
  </div>
);

export default AdminEmptyState;
