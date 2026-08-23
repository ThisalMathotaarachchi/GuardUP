import { Shield } from 'lucide-react';

const AdminLoadingState = ({ message = 'Loading...' }) => (
  <div className="admin-state admin-state--loading">
    <div className="admin-state__icon">
      <Shield size={28} className="admin-state__pulse" />
    </div>
    <p className="admin-state__text">{message}</p>
  </div>
);

export default AdminLoadingState;
