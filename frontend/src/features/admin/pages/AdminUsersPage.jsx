import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import adminApi from '../../../services/adminApi';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminLoadingState from '../../../components/admin/AdminLoadingState';
import AdminErrorState from '../../../components/admin/AdminErrorState';
import AdminEmptyState from '../../../components/admin/AdminEmptyState';
import { formatDate } from '../../../components/admin/AdminCharts';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'xp', label: 'Highest XP' },
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await adminApi.get('/users', { params: { search: search || undefined, sort } });
      setUsers(res.data.data.users);
      setTotal(res.data.data.total);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(load, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [search, sort]);

  const certCount = (user) => Object.keys(user.certificationsCompleted || {}).length;

  return (
    <div className="admin-page">
      <AdminPageHeader title="Users" subtitle={`${total} registered account${total !== 1 ? 's' : ''}`} />

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={16} />
          <input
            type="search"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="admin-select">
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <AdminLoadingState message="Loading users..." />
      ) : error ? (
        <AdminErrorState message={error} onRetry={load} />
      ) : !users.length ? (
        <AdminEmptyState title="No users found" description={search ? 'Try a different search term.' : 'Users will appear here after registration.'} />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Level / XP</th>
                <th>Simulations</th>
                <th>Certs</th>
                <th>Badges</th>
                <th>Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-table__user">
                      <p className="admin-table__primary">{user.firstName} {user.lastName}</p>
                      <p className="admin-table__secondary">{user.email}</p>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-status admin-status--${user.status}`}>
                      {user.status?.replace('_', ' ')}
                    </span>
                  </td>
                  <td>Lv {user.level} · {user.xp} XP</td>
                  <td>{user.totalSimulations || 0}</td>
                  <td>{certCount(user)}</td>
                  <td>{user.badgeCount || 0}</td>
                  <td className="admin-table__secondary">{formatDate(user.createdAt)}</td>
                  <td>
                    <Link to={`/admin/users/${user.id}`} className="admin-table__action">
                      View <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
