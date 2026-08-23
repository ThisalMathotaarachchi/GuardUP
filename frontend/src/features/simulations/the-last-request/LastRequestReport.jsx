import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RotateCcw, Home, Clock, Shield } from 'lucide-react';
import BadgePopup from '../BadgePopup';

const formatDuration = (seconds) => {
  if (seconds == null || Number.isNaN(seconds)) return '—';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins <= 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
};

const LastRequestReport = ({
  results,
  newBadges = [],
  certLaunch = null,
  onContinueCertification,
}) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('report');
  const [celebrationShown, setCelebrationShown] = useState(false);

  useEffect(() => {
    if (celebrationShown) return;
    if (newBadges?.length > 0) {
      setPhase('celebration');
      setCelebrationShown(true);
    }
  }, [newBadges, celebrationShown]);

  const safe = results || {};
  const behavioralScores = safe.behavioralScores || {};
  const timeline = Array.isArray(safe.timeline) ? safe.timeline : [];
  const strengths = safe.strengths || [];
  const improvements = safe.improvements || [];
  const lessons = safe.learningPoints || [];
  const evidenceDiscovered = safe.evidenceDiscovered || [];

  if (phase === 'celebration') {
    return (
      <BadgePopup
        badges={newBadges}
        variant="celebration"
        autoDismissMs={3500}
        onClose={() => setPhase('report')}
      />
    );
  }

  return (
    <div className="sim-layer-full z-[60] p-6 md:p-10 overflow-y-auto sim-report lr-report">
      <div className="max-w-3xl mx-auto sim-report__card p-6 md:p-8">
        <div className="text-center mb-8 pb-6 border-b border-white/10">
          <Shield size={44} className="text-white/80 mx-auto mb-3" />
          <p className="text-xs uppercase tracking-[0.25em] text-white/45 mb-2">GuardUP Simulation</p>
          <h1 className="text-3xl font-bold">THE LAST REQUEST</h1>
          <p className="text-white/65 mt-3">Incident Outcome</p>
          <p className="text-xl font-semibold mt-1">{safe.outcomeLabel || 'Simulation Complete'}</p>
          {safe.narrative?.headline && (
            <p className="text-sm text-white/55 mt-2 max-w-xl mx-auto">{safe.narrative.headline}</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center card-inner py-3">
            <p className="text-2xl font-bold">{safe.score ?? '—'}%</p>
            <p className="text-white/65 text-sm">Overall Score</p>
          </div>
          <div className="text-center card-inner py-3">
            <p className="text-2xl font-bold text-accent-purple">+{safe.xpEarned ?? 0}</p>
            <p className="text-white/65 text-sm">XP Earned</p>
          </div>
          <div className="text-center card-inner py-3 col-span-2 md:col-span-1">
            <Clock size={18} className="mx-auto mb-1 text-white/50" />
            <p className="text-lg font-semibold">{formatDuration(safe.totalTime)}</p>
            <p className="text-white/65 text-sm">Time</p>
          </div>
        </div>

        {evidenceDiscovered.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3">Evidence Reviewed</h2>
            <ul className="space-y-2 text-sm text-white/75">
              {evidenceDiscovered.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        )}

        {Object.keys(behavioralScores).length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Behavioral Assessment</h2>
            <div className="space-y-3">
              {Object.entries(behavioralScores).map(([label, value]) => (
                <div key={label}>
                  <div className="breach-report__dimension-header">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="breach-report__dimension-bar">
                    <div className="breach-report__dimension-fill" style={{ width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {timeline.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Decision Timeline</h2>
            <ul className="breach-report__timeline">
              {timeline.map((entry) => (
                <li key={`${entry.time}-${entry.label}`} className="breach-report__timeline-item">
                  <span className="breach-report__timeline-time">{entry.time}</span>
                  <div>
                    <p className="breach-report__timeline-label">{entry.label}</p>
                    <p className="breach-report__timeline-choice">{entry.choice}</p>
                    {entry.consequence && (
                      <p className="breach-report__timeline-note">{entry.consequence}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">Strengths</h2>
            <ul className="space-y-2 text-sm text-white/75">
              {strengths.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-lg font-semibold mb-3">Areas for Improvement</h2>
            <ul className="space-y-2 text-sm text-white/75">
              {improvements.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3">Key Lessons</h2>
          <ul className="space-y-2 text-sm text-white/75">
            {lessons.map((s) => (
              <li key={s}>• {s}</li>
            ))}
          </ul>
        </section>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
          {certLaunch && (
            <button
              type="button"
              onClick={onContinueCertification}
              className="flex-1 btn-primary py-2.5 flex items-center justify-center gap-2"
            >
              <ArrowRight size={16} />
              Continue Certification
            </button>
          )}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex-1 card-inner hover:bg-white/12 py-2.5 rounded-lg transition flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Retry
          </button>
          {!certLaunch && (
            <button
              type="button"
              onClick={() => navigate('/dashboard/simulations')}
              className="flex-1 btn-primary py-2.5 flex items-center justify-center gap-2"
            >
              <ArrowRight size={16} />
              Simulations
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="flex-1 card-inner hover:bg-white/12 py-2.5 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default LastRequestReport;
