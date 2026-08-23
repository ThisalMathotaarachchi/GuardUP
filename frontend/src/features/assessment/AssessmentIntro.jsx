import { useNavigate } from 'react-router-dom';
import { Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import PageShell from '../../components/common/PageShell';

const AssessmentIntro = () => {
  const navigate = useNavigate();

  return (
    <PageShell variant="assessment">
      <div className="auth-glass workspace-card workspace-card--wide p-8 md:p-12">
        <div className="text-center mb-8">
          <Shield size={64} className="text-accent mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Initial Cybersecurity Assessment</h1>
          <p className="text-muted">Let&apos;s understand your current knowledge level so we can personalize your learning journey.</p>
        </div>
        <div className="surface-card-inner p-6 mb-8 space-y-4">
          <div className="flex items-center gap-3"><Clock size={20} className="text-accent" /><span>Takes approximately 5 minutes</span></div>
          <div className="flex items-center gap-3"><CheckCircle size={20} className="text-status-success" /><span>20 questions covering cybersecurity basics</span></div>
          <div className="flex items-center gap-3"><Shield size={20} className="text-status-warning" /><span>Get assigned to Beginner, Intermediate, or Advanced path</span></div>
        </div>
        <div className="text-center">
          <p className="text-muted text-sm mb-4">Answer honestly based on your current knowledge. This is not a test — it&apos;s a starting point.</p>
          <button type="button" onClick={() => navigate('/assessment')} className="btn-primary">
            Start Assessment<ArrowRight size={20} />
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default AssessmentIntro;
