import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Award,
  Shield,
  BarChart3,
  Medal,
  ChevronRight,
} from 'lucide-react';
import adminApi from '../../../services/adminApi';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminStatCard from '../../../components/admin/AdminStatCard';
import AdminLoadingState from '../../../components/admin/AdminLoadingState';
import AdminErrorState from '../../../components/admin/AdminErrorState';
import { AdminBarChart, formatEventType, formatDate } from '../../../components/admin/AdminCharts';

const AdminDashboardHome = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await adminApi.get('/dashboard');
      setData(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <AdminLoadingState message="Loading platform overview..." />;
  if (error) return <AdminErrorState message={error} onRetry={load} />;

  const { stats, registrationTrend, simulationOverview, certificationOverview, recentUsers, recentActivity } = data;

  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Dashboard"
        subtitle="Platform overview and operational metrics"
      />

      <div className="admin-stat-grid">
        <AdminStatCard icon={Users} label="Total Users" value={stats.totalUsers} color="#C084FC" />
        <AdminStatCard icon={UserCheck} label="Active Users" value={stats.activeUsers} color="#22C55E" sublabel="Assessment or activity in 30d" />
        <AdminStatCard icon={Award} label="Certifications Completed" value={stats.certificationsCompleted} color="#EAB308" />
        <AdminStatCard icon={Shield} label="Simulations Completed" value={stats.simulationsCompleted} color="#FFFFFF" />
        <AdminStatCard
          icon={BarChart3}
          label="Avg Simulation Score"
          value={stats.avgSimulationScore != null ? `${stats.avgSimulationScore}%` : '—'}
          color="#EF4444"
        />
        <AdminStatCard icon={Medal} label="Badges Earned" value={stats.badgesEarned} color="#A855F7" />
      </div>

      <div className="admin-panel-grid admin-panel-grid--2">
        <section className="admin-panel">
          <h2 className="admin-panel__title">User Registration Trend</h2>
          <AdminBarChart data={registrationTrend} emptyLabel="Registration data will appear as users sign up" />
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel__title">Simulation Overview</h2>
          <div className="admin-mini-list">
            {simulationOverview?.map((sim) => (
              <div key={sim.id} className="admin-mini-list__item">
                <div>
                  <p className="admin-mini-list__label">{sim.title}</p>
                  <p className="admin-mini-list__meta">{sim.difficulty} · {sim.type}</p>
                </div>
                <div className="admin-mini-list__stats">
                  <span>{sim.completions} completed</span>
                  <span>{sim.avgScore != null ? `${sim.avgScore}% avg` : '—'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="admin-panel-grid admin-panel-grid--2">
        <section className="admin-panel">
          <div className="admin-panel__header">
            <h2 className="admin-panel__title">Certification Progress</h2>
            <Link to="/admin/certifications" className="admin-link-inline">View all <ChevronRight size={14} /></Link>
          </div>
          <div className="admin-progress-list">
            {certificationOverview?.map((cert) => {
              const rate = cert.enrolled > 0 ? Math.round((cert.completed / cert.enrolled) * 100) : 0;
              return (
                <div key={cert.id} className="admin-progress-item">
                  <div className="admin-progress-item__head">
                    <span>{cert.title}</span>
                    <span className="admin-progress-item__value">{cert.completed}/{cert.enrolled}</span>
                  </div>
                  <div className="admin-progress-bar">
                    <div className="admin-progress-bar__fill" style={{ width: `${rate}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel__header">
            <h2 className="admin-panel__title">Recent Users</h2>
            <Link to="/admin/users" className="admin-link-inline">Manage <ChevronRight size={14} /></Link>
          </div>
          <div className="admin-mini-list">
            {recentUsers?.length ? recentUsers.map((user) => (
              <Link key={user.id} to={`/admin/users/${user.id}`} className="admin-mini-list__item admin-mini-list__item--link">
                <div>
                  <p className="admin-mini-list__label">{user.firstName} {user.lastName}</p>
                  <p className="admin-mini-list__meta">{user.email}</p>
                </div>
                <span className={`admin-status admin-status--${user.status}`}>{user.status?.replace('_', ' ')}</span>
              </Link>
            )) : (
              <p className="admin-chart-empty">No users registered yet</p>
            )}
          </div>
        </section>
      </div>

      <section className="admin-panel">
        <div className="admin-panel__header">
          <h2 className="admin-panel__title">Recent Platform Activity</h2>
          <Link to="/admin/activity" className="admin-link-inline">Full log <ChevronRight size={14} /></Link>
        </div>
        <div className="admin-timeline">
          {recentActivity?.length ? recentActivity.map((event) => (
            <div key={event.id} className={`admin-timeline__item admin-timeline__item--${event.actorType}`}>
              <div className="admin-timeline__dot" />
              <div>
                <p className="admin-timeline__summary">{event.summary || formatEventType(event.type)}</p>
                <p className="admin-timeline__meta">
                  {formatEventType(event.type)} · {formatDate(event.timestamp)}
                  {event.actorType === 'admin' && ' · Admin action'}
                </p>
              </div>
            </div>
          )) : (
            <p className="admin-chart-empty">Activity will appear as users interact with the platform</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardHome;
