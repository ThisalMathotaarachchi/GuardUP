import { getAllCertificationSummaries, getCertificationProgressPercent } from '../../utils/certificationProgress';
import { useAuth } from '../../context/AuthContext';
import { Award, Shield } from 'lucide-react';
import CertificationCard from './CertificationCard';

const Certifications = () => {
  const { user } = useAuth();
  const summaries = getAllCertificationSummaries(user?.id, user);

  return (
    <div className="cert-page">
      <div className="cert-page__inner cert-page__inner--wide">
        <header className="cert-catalog-hero">
          <div className="cert-catalog-hero__icon">
            <Award size={28} />
          </div>
          <div>
            <h1 className="cert-catalog-hero__title">GuardUP Certifications</h1>
            <p className="cert-catalog-hero__subtitle">
              Progress through practical cybersecurity certifications that combine guided learning,
              knowledge checks, and realistic simulations — building skills you can apply immediately.
            </p>
          </div>
          <div className="cert-catalog-hero__badge" aria-hidden="true">
            <Shield size={48} className="opacity-20" />
          </div>
        </header>

        <div className="cert-catalog-grid">
          {summaries.map((summary) => (
            <CertificationCard
              key={summary.certification.id}
              summary={summary}
              progressPercent={getCertificationProgressPercent(user?.id, summary.certification.id, user)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
