import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Award, Shield, Target, Activity } from 'lucide-react';
import adminApi from '../../../services/adminApi';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminLoadingState from '../../../components/admin/AdminLoadingState';
import AdminErrorState from '../../../components/admin/AdminErrorState';
import Badge, { normalizeBadge } from '../../../components/common/Badge';
import { formatDate } from '../../../components/admin/AdminCharts';

const AdminUserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await adminApi.get(`/users/${id}`);
        setUser(res.data.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'User not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <AdminLoadingState message="Loading user profile..." />;
  if (error) {
    return (
      <div className="admin-page">
        <Link to="/admin/users" className="admin-back-link"><ArrowLeft size={16} /> Back to users</Link>
        <AdminErrorState message={error} />
      </div>
    );
  }

  const certs = Object.entries(user.certificationsCompleted || {});
  const simHistory = user.simulationHistory || [];

  return (
    <div className="admin-page">
      <Link to="/admin/users" className="admin-back-link"><ArrowLeft size={16} /> Back to users</Link>

      <AdminPageHeader
        title={`${user.firstName} ${user.lastName}`}
        subtitle={user.email}
      />

      <div className="admin-detail-grid">
        <section className="admin-panel">
          <h2 className="admin-panel__title">Profile</h2>
          <dl className="admin-dl">
            <div><dt>Name</dt><dd>{user.firstName} {user.lastName}</dd></div>
            <div><dt>Email</dt><dd>{user.email}</dd></div>
            <div><dt>Status</dt><dd><span className={`admin-status admin-status--${user.status}`}>{user.status?.replace('_', ' ')}</span></dd></div>
            <div><dt>Skill Level</dt><dd>{user.skillLevel?.replace('_', ' ') || 'Not assigned'}</dd></div>
            <div><dt>Registered</dt><dd>{formatDate(user.createdAt)}</dd></div>
            <div><dt>Last Updated</dt><dd>{formatDate(user.updatedAt)}</dd></div>
          </dl>
        </section>

        <section className="admin-panel">
          <h2 className="admin-panel__title">Learning Progress</h2>
          <div className="admin-stat-row">
            <div className="admin-stat-inline"><Target size={16} /> Level {user.level}</div>
            <div className="admin-stat-inline"><Award size={16} /> {user.xp} XP</div>
            <div className="admin-stat-inline"><Shield size={16} /> {user.totalSimulations || 0} simulations</div>
          </div>
          <p className="admin-panel__subtitle mt-4">Initial Assessment</p>
          <p className="admin-text-muted">
            {user.hasTakenAssessment ? 'Completed' : 'Not yet completed'}
          </p>
          <p className="admin-panel__subtitle mt-4">Certifications ({certs.length})</p>
          {certs.length ? (
            <ul className="admin-tag-list">
              {certs.map(([certId, completedAt]) => (
                <li key={certId} className="admin-tag">{certId.replace('cert-', '').replace(/-/g, ' ')} · {formatDate(completedAt)}</li>
              ))}
            </ul>
          ) : (
            <p className="admin-text-muted">No certifications completed</p>
          )}
        </section>
      </div>

      <section className="admin-panel">
        <h2 className="admin-panel__title">Achievements</h2>
        {user.badges?.length ? (
          <div className="admin-badge-grid">
            {user.badges.map((badge, i) => {
              const normalized = normalizeBadge(typeof badge === 'string' ? { id: badge, name: badge } : badge);
              return (
                <div key={normalized.name || i} className="admin-badge-item">
                  <Badge badge={normalized} size="md" />
                  <span className="admin-badge-item__label">{normalized.name}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="admin-text-muted">No badges earned yet</p>
        )}
      </section>

      <section className="admin-panel">
        <h2 className="admin-panel__title"><Activity size={18} className="inline mr-2" />Simulation Activity</h2>
        {simHistory.length ? (
          <div className="admin-timeline">
            {[...simHistory].reverse().map((entry, i) => (
              <div key={`${entry.simulationId}-${entry.completedAt}-${i}`} className="admin-timeline__item">
                <div className="admin-timeline__dot" />
                <div>
                  <p className="admin-timeline__summary">{entry.simulationId?.replace(/-/g, ' ')}</p>
                  <p className="admin-timeline__meta">
                    Score: {entry.score}% · {entry.passed !== false ? 'Passed' : 'Failed'} · {formatDate(entry.completedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="admin-text-muted">No simulation history recorded on server</p>
        )}
      </section>

      {user.stats && (
        <section className="admin-panel">
          <h2 className="admin-panel__title">Performance Stats</h2>
          <div className="admin-stat-grid admin-stat-grid--compact">
            <div className="admin-stat-inline">Phishing accuracy: {user.stats.phishingAccuracy}%</div>
            <div className="admin-stat-inline">Ransomware accuracy: {user.stats.ransomwareAccuracy}%</div>
            <div className="admin-stat-inline">Highest score: {user.stats.highestAccuracy}%</div>
            <div className="admin-stat-inline">Perfect scores: {user.stats.perfectScores}</div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminUserDetailPage;
