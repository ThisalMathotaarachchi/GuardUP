import { useEffect, useState } from 'react';
import { Gamepad2 } from 'lucide-react';
import adminApi from '../../../services/adminApi';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminLoadingState from '../../../components/admin/AdminLoadingState';
import AdminErrorState from '../../../components/admin/AdminErrorState';
import { formatDate } from '../../../components/admin/AdminCharts';

const AdminSimulationsPage = () => {
  const [simulations, setSimulations] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminApi.get('/simulations');
        setSimulations(res.data.data.simulations);
        setRecentActivity(res.data.data.recentActivity);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load simulations');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <AdminLoadingState message="Loading simulation analytics..." />;
  if (error) return <AdminErrorState message={error} />;

  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Simulations"
        subtitle="Platform simulation usage and completion analytics"
      />

      <div className="admin-card-grid">
        {simulations.map((sim) => (
          <article key={sim.id} className="admin-card">
            <div className="admin-card__icon"><Gamepad2 size={22} className="text-accent-soft" /></div>
            <h3 className="admin-card__title">{sim.title}</h3>
            <p className="admin-card__meta">{sim.difficulty} · {sim.type}</p>

            <div className="admin-card__metrics admin-card__metrics--4">
              <div>
                <span className="admin-card__metric-value">{sim.attempts}</span>
                <span className="admin-card__metric-label">Attempts</span>
              </div>
              <div>
                <span className="admin-card__metric-value">{sim.completions}</span>
                <span className="admin-card__metric-label">Completions</span>
              </div>
              <div>
                <span className="admin-card__metric-value">{sim.usersCompletedLevel}</span>
                <span className="admin-card__metric-label">Users completed</span>
              </div>
              <div>
                <span className="admin-card__metric-value">
                  {sim.avgScore != null ? `${sim.avgScore}%` : '—'}
                </span>
                <span className="admin-card__metric-label">Avg score</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="admin-panel mt-8">
        <h2 className="admin-panel__title">Recent Simulation Activity</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Simulation</th>
                <th>Score</th>
                <th>Result</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity?.length ? recentActivity.map((row, i) => (
                <tr key={`${row.userId}-${row.completedAt}-${i}`}>
                  <td>
                    <p className="admin-table__primary">{row.userName}</p>
                    <p className="admin-table__secondary">{row.email}</p>
                  </td>
                  <td>{row.simulationId?.replace(/-/g, ' ')}</td>
                  <td>{row.score}%</td>
                  <td>
                    <span className={`admin-status ${row.passed !== false ? 'admin-status--active' : 'admin-status--pending_assessment'}`}>
                      {row.passed !== false ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                  <td className="admin-table__secondary">{formatDate(row.completedAt)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="admin-table__empty">No simulation activity recorded yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminSimulationsPage;
