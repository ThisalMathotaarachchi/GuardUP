import { useEffect, useState } from 'react';
import adminApi from '../../../services/adminApi';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminLoadingState from '../../../components/admin/AdminLoadingState';
import AdminErrorState from '../../../components/admin/AdminErrorState';
import AdminEmptyState from '../../../components/admin/AdminEmptyState';
import { formatEventType, formatDate } from '../../../components/admin/AdminCharts';

const EVENT_FILTERS = [
  { value: '', label: 'All events' },
  { value: 'user', label: 'User activity' },
  { value: 'admin', label: 'Admin actions' },
];

const AdminActivityPage = ({ userOnly = false }) => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState(userOnly ? 'user' : '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { limit: 100 };
      const res = await adminApi.get('/activity', { params });
      let list = res.data.data.events;
      if (filter === 'user') list = list.filter((e) => e.actorType === 'user');
      if (filter === 'admin') list = list.filter((e) => e.actorType === 'admin');
      setEvents(list);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load activity');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [filter]);

  return (
    <div className="admin-page">
      <AdminPageHeader
        title={userOnly ? 'User Activity' : 'Activity Logs'}
        subtitle={userOnly ? 'User registrations, logins, completions, and achievements' : 'Platform audit trail including administrative actions'}
      />

      {!userOnly && (
        <div className="admin-toolbar">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="admin-select">
            {EVENT_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      )}

      {loading ? (
        <AdminLoadingState message="Loading activity..." />
      ) : error ? (
        <AdminErrorState message={error} onRetry={load} />
      ) : !events.length ? (
        <AdminEmptyState title="No activity recorded" description="Events appear as users register, complete simulations, earn badges, and administrators sign in." />
      ) : (
        <div className="admin-timeline admin-timeline--full">
          {events.map((event) => (
            <div key={event.id} className={`admin-timeline__item admin-timeline__item--${event.actorType}`}>
              <div className="admin-timeline__dot" />
              <div className="admin-timeline__content">
                <div className="admin-timeline__head">
                  <span className={`admin-event-type admin-event-type--${event.type}`}>
                    {formatEventType(event.type)}
                  </span>
                  <span className="admin-timeline__time">{formatDate(event.timestamp)}</span>
                </div>
                <p className="admin-timeline__summary">{event.summary || formatEventType(event.type)}</p>
                {(event.userEmail || event.actorEmail) && (
                  <p className="admin-timeline__meta">{event.userEmail || event.actorEmail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminActivityPage;
