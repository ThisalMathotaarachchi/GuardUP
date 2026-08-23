import { AlertTriangle } from 'lucide-react';

const AdminErrorState = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="admin-state admin-state--error">
    <AlertTriangle size={28} className="text-red-400" />
    <p className="admin-state__text">{message}</p>
    {onRetry && (
      <button type="button" onClick={onRetry} className="btn-secondary mt-4">
        Try again
      </button>
    )}
  </div>
);

export default AdminErrorState;
