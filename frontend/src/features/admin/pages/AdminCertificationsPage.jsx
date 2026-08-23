import { useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import adminApi from '../../../services/adminApi';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminLoadingState from '../../../components/admin/AdminLoadingState';
import AdminErrorState from '../../../components/admin/AdminErrorState';

const AdminCertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminApi.get('/certifications');
        setCertifications(res.data.data.certifications);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load certifications');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <AdminLoadingState message="Loading certification data..." />;
  if (error) return <AdminErrorState message={error} />;

  return (
    <div className="admin-page">
      <AdminPageHeader
        title="Certifications"
        subtitle="Administrative overview of certification enrollment and completion"
      />

      <div className="admin-card-grid">
        {certifications.map((cert) => (
          <article key={cert.id} className="admin-card">
            <div className="admin-card__icon"><Award size={22} className="text-accent-soft" /></div>
            <h3 className="admin-card__title">{cert.title}</h3>
            <p className="admin-card__meta">{cert.level} · Linked sim: {cert.simulationId}</p>

            <div className="admin-card__metrics">
              <div>
                <span className="admin-card__metric-value">{cert.enrolled}</span>
                <span className="admin-card__metric-label">Enrolled</span>
              </div>
              <div>
                <span className="admin-card__metric-value">{cert.completed}</span>
                <span className="admin-card__metric-label">Completed</span>
              </div>
              <div>
                <span className="admin-card__metric-value">
                  {cert.completionRate != null ? `${cert.completionRate}%` : '—'}
                </span>
                <span className="admin-card__metric-label">Completion rate</span>
              </div>
            </div>

            <div className="admin-progress-bar mt-4">
              <div
                className="admin-progress-bar__fill"
                style={{ width: `${cert.completionRate || 0}%` }}
              />
            </div>
          </article>
        ))}
      </div>

      <p className="admin-footnote">
        Certification progress is tracked via backend completion records. Detailed module progress may remain in user-local storage until synced through completion flows.
      </p>
    </div>
  );
};

export default AdminCertificationsPage;
