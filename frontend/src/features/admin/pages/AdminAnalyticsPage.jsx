import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart3, Medal, Users, Shield } from 'lucide-react';
import adminApi from '../../../services/adminApi';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminStatCard from '../../../components/admin/AdminStatCard';
import AdminLoadingState from '../../../components/admin/AdminLoadingState';
import AdminErrorState from '../../../components/admin/AdminErrorState';
import { AdminBarChart } from '../../../components/admin/AdminCharts';

const AdminAnalyticsPage = () => {
  const location = useLocation();
  const simOnly = location.pathname.includes('/simulations');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminApi.get('/analytics');
        setData(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <AdminLoadingState message="Loading analytics..." />;
  if (error) return <AdminErrorState message={error} />;

  const { users, learning, simulations, achievements } = data;

  if (simOnly) {
    return (
      <div className="admin-page">
        <AdminPageHeader title="Simulation Analytics" subtitle="Attempts, completions, and performance metrics" />
        <div className="admin-stat-grid admin-stat-grid--3">
          <AdminStatCard icon={Shield} label="Total Completions" value={simulations.totalCompletions} color="#FFFFFF" />
          <AdminStatCard
            icon={BarChart3}
            label="Average Score"
            value={simulations.avgScore != null ? `${simulations.avgScore}%` : '—'}
            color="#A1A1AA"
          />
        </div>
        <section className="admin-panel">
          <h2 className="admin-panel__title">By Simulation</h2>
          <div className="admin-card-grid">
            {simulations.bySimulation.map((sim) => (
              <article key={sim.id} className="admin-card">
                <h3 className="admin-card__title">{sim.title}</h3>
                <div className="admin-card__metrics">
                  <div><span className="admin-card__metric-value">{sim.attempts}</span><span className="admin-card__metric-label">Attempts</span></div>
                  <div><span className="admin-card__metric-value">{sim.completions}</span><span className="admin-card__metric-label">Completions</span></div>
                  <div><span className="admin-card__metric-value">{sim.avgScore != null ? `${sim.avgScore}%` : '—'}</span><span className="admin-card__metric-label">Avg score</span></div>
                </div>
                {sim.attempts > 0 && (
                  <p className="admin-card__meta mt-3">
                    Success rate: {Math.round((sim.completions / sim.attempts) * 100)}%
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminPageHeader title="Platform Analytics" subtitle="Cross-platform learning and engagement metrics" />

      <section className="admin-analytics-section">
        <h2 className="admin-analytics-section__title"><Users size={18} /> User Analytics</h2>
        <div className="admin-stat-grid admin-stat-grid--3">
          <AdminStatCard icon={Users} label="Total Users" value={users.total} color="#C084FC" />
          <AdminStatCard icon={Users} label="Active Users" value={users.active} color="#22C55E" />
        </div>
        <div className="admin-panel mt-4">
          <h3 className="admin-panel__title">Registration Trend</h3>
          <AdminBarChart data={users.registrationTrend} />
        </div>
      </section>

      <section className="admin-analytics-section">
        <h2 className="admin-analytics-section__title"><Shield size={18} /> Learning Analytics</h2>
        <div className="admin-stat-grid admin-stat-grid--3">
          <AdminStatCard icon={Shield} label="Cert Completions" value={learning.certCompletions} color="#EAB308" />
        </div>
        <div className="admin-progress-list mt-4">
          {learning.certifications.map((cert) => {
            const rate = cert.enrolled > 0 ? Math.round((cert.completed / cert.enrolled) * 100) : 0;
            return (
              <div key={cert.id} className="admin-progress-item">
                <div className="admin-progress-item__head">
                  <span>{cert.title}</span>
                  <span>{cert.completed}/{cert.enrolled}</span>
                </div>
                <div className="admin-progress-bar">
                  <div className="admin-progress-bar__fill" style={{ width: `${rate}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="admin-analytics-section">
        <h2 className="admin-analytics-section__title"><BarChart3 size={18} /> Simulation Analytics</h2>
        <div className="admin-stat-grid admin-stat-grid--3">
          <AdminStatCard icon={Shield} label="Completions" value={simulations.totalCompletions} color="#FFFFFF" />
          <AdminStatCard icon={BarChart3} label="Avg Score" value={simulations.avgScore != null ? `${simulations.avgScore}%` : '—'} color="#EF4444" />
        </div>
      </section>

      <section className="admin-analytics-section">
        <h2 className="admin-analytics-section__title"><Medal size={18} /> Achievement Analytics</h2>
        <div className="admin-stat-grid admin-stat-grid--3">
          <AdminStatCard icon={Medal} label="Total Badges Awarded" value={achievements.totalBadges} color="#A855F7" />
        </div>
        {achievements.topBadges?.length ? (
          <div className="admin-panel mt-4">
            <h3 className="admin-panel__title">Most Earned Badges</h3>
            <div className="admin-mini-list">
              {achievements.topBadges.map((b) => (
                <div key={b.id} className="admin-mini-list__item">
                  <span className="admin-mini-list__label">{b.id.replace(/_/g, ' ')}</span>
                  <span className="admin-mini-list__stats">{b.count} earned</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="admin-text-muted mt-4">No badge data available yet</p>
        )}
      </section>
    </div>
  );
};

export default AdminAnalyticsPage;
