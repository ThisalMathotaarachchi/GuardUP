import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Home,
  Award,
  Shield,
  Target,
  BookOpen,
  RefreshCw,
  Clock,
  Mail,
} from 'lucide-react';
import BadgePopup from './BadgePopup';

const formatDuration = (seconds) => {
  if (seconds == null || Number.isNaN(seconds)) return '—';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins <= 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
};

const SimulationReport = ({
  results,
  newBadges = [],
  variant = 'phishing',
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

  const safeResults = results || {};
  const score = safeResults.score ?? 0;
  const accuracy = safeResults.accuracy ?? score;
  const xpEarned = safeResults.xpEarned ?? 0;
  const breaches = safeResults.breaches ?? 0;
  const correct = safeResults.correct ?? 0;
  const total = safeResults.total ?? 0;
  const incorrect = Math.max(0, total - correct);
  const mistakes = Array.isArray(safeResults.mistakes) ? safeResults.mistakes : [];
  const status = safeResults.status || 'completed';
  const passed = score >= 60 && status === 'completed';

  const getGrade = (s) => {
    if (s >= 90) return { tone: 'text-accent-purple', Icon: Award, label: 'Cyber Elite' };
    if (s >= 80) return { tone: 'text-accent-gold', Icon: Shield, label: 'Security Guardian' };
    if (s >= 70) return { tone: 'text-status-success', Icon: Target, label: 'Phishing Spotter' };
    if (s >= 60) return { tone: 'text-status-warning', Icon: BookOpen, label: 'Security Learner' };
    return { tone: 'text-status-danger', Icon: RefreshCw, label: 'Needs Practice' };
  };

  const grade = getGrade(score);
  const GradeIcon = grade.Icon;
  const StatusIcon = passed ? CheckCircle : score >= 50 ? AlertTriangle : XCircle;
  const statusTone = passed ? 'text-status-success' : score >= 50 ? 'text-status-warning' : 'text-status-danger';

  const statusMessage =
    status === 'timeout'
      ? 'Time expired before all tasks were completed.'
      : status === 'breach_failure'
        ? 'A security breach was not recovered in time.'
        : passed
          ? 'You passed this simulation.'
          : 'More practice recommended before moving on.';

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

  const isRansomware = variant === 'ransomware';

  return (
    <div className="sim-layer-full z-[60] p-6 md:p-10 overflow-y-auto sim-report">
      <div className="max-w-3xl mx-auto sim-report__card p-6 md:p-8">
        <div className="text-center mb-8 pb-6 border-b border-white/10">
          <StatusIcon size={48} className={`${statusTone} mx-auto mb-4`} />
          <h1 className="text-3xl font-bold">Simulation Complete</h1>
          <p className="text-white/65 mt-1">Here&apos;s how you performed</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center card-inner py-3">
            <p className={`text-2xl font-bold ${grade.tone}`}>{score}%</p>
            <p className="text-white/65 text-sm">Score</p>
          </div>
          <div className="text-center card-inner py-3">
            <p className="text-2xl font-bold text-status-success">{accuracy}%</p>
            <p className="text-white/65 text-sm">Accuracy</p>
          </div>
          <div className="text-center card-inner py-3">
            <p className="text-2xl font-bold text-accent-purple">+{xpEarned}</p>
            <p className="text-white/65 text-sm">XP Earned</p>
          </div>
          <div className="text-center card-inner py-3">
            <p className="text-2xl font-bold text-accent-gold">{breaches}</p>
            <p className="text-white/65 text-sm">{isRansomware ? 'Systems Affected' : 'Breaches'}</p>
          </div>
        </div>

        <div className="text-center py-6 mb-8 card-inner">
          <GradeIcon size={40} className={`mx-auto mb-2 ${grade.tone}`} />
          <p className={`text-xl font-semibold ${grade.tone}`}>{grade.label}</p>
          <p className="text-sm text-white/65 mt-1">{statusMessage}</p>
        </div>

        {!isRansomware && total > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Mail size={18} />
              Email Assessment
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="card-inner py-3 text-center">
                <p className="text-xl font-bold">{total}</p>
                <p className="text-xs text-white/65 mt-1">Emails Assessed</p>
              </div>
              <div className="card-inner py-3 text-center">
                <p className="text-xl font-bold text-status-success">{correct}</p>
                <p className="text-xs text-white/65 mt-1">Correct</p>
              </div>
              <div className="card-inner py-3 text-center">
                <p className="text-xl font-bold text-status-danger">{incorrect}</p>
                <p className="text-xs text-white/65 mt-1">Incorrect</p>
              </div>
              {safeResults.totalTime != null && (
                <div className="card-inner py-3 text-center">
                  <p className="text-xl font-bold flex items-center justify-center gap-1">
                    <Clock size={16} />
                    {formatDuration(safeResults.totalTime)}
                  </p>
                  <p className="text-xs text-white/65 mt-1">Time Taken</p>
                </div>
              )}
            </div>
          </div>
        )}

        {isRansomware && (
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Incident Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {safeResults.systemsAffected != null && (
                <div className="card-inner py-3">
                  <p className="text-xs text-white/65">Systems Affected</p>
                  <p className="text-lg font-semibold mt-1">{safeResults.systemsAffected}</p>
                </div>
              )}
              {safeResults.dataLostGb != null && (
                <div className="card-inner py-3">
                  <p className="text-xs text-white/65">Data Lost</p>
                  <p className="text-lg font-semibold mt-1">{safeResults.dataLostGb} GB</p>
                </div>
              )}
              {safeResults.dataRecoveredGb != null && (
                <div className="card-inner py-3">
                  <p className="text-xs text-white/65">Data Recovered</p>
                  <p className="text-lg font-semibold mt-1">{safeResults.dataRecoveredGb} GB</p>
                </div>
              )}
              {safeResults.systemsRestored != null && (
                <div className="card-inner py-3">
                  <p className="text-xs text-white/65">Systems Restored</p>
                  <p className="text-lg font-semibold mt-1">{safeResults.systemsRestored}</p>
                </div>
              )}
              {safeResults.containmentTime != null && (
                <div className="card-inner py-3">
                  <p className="text-xs text-white/65">Time to Contain</p>
                  <p className="text-lg font-semibold mt-1">{formatDuration(safeResults.containmentTime)}</p>
                </div>
              )}
              {safeResults.ransomPaid != null && (
                <div className="card-inner py-3">
                  <p className="text-xs text-white/65">Ransom Paid</p>
                  <p className="text-lg font-semibold mt-1">{safeResults.ransomPaid ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {mistakes.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Areas for Improvement</h3>
            <div className="card-inner rounded-xl divide-y divide-white/10 overflow-hidden">
              {mistakes.map((m, i) => (
                <div key={i} className="p-4">
                  <p className="text-sm font-medium text-status-danger">{m.email || m.action || 'Decision'}</p>
                  <p className="text-xs text-white/65 mt-1">{m.error || m.lesson}</p>
                  {m.redFlags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {m.redFlags.map((f) => (
                        <span key={f} className="bg-white/10 text-white/80 px-2 py-0.5 rounded text-xs">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {Array.isArray(safeResults.learningPoints) && safeResults.learningPoints.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Key Takeaways</h3>
            <ul className="space-y-2 text-sm text-white/65">
              {safeResults.learningPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <BookOpen size={14} className="text-accent-purple flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-8">
          <h3 className="font-semibold mb-3">What to Do Next</h3>
          <ul className="space-y-2 text-sm text-white/65">
            {isRansomware ? (
              score >= 80 ? (
                <>
                  <li className="flex items-center gap-2 text-status-success">
                    <CheckCircle size={14} />
                    Strong incident response. Review containment timing for further improvement.
                  </li>
                  <li>Practice backup verification and communication workflows regularly.</li>
                </>
              ) : score >= 60 ? (
                <>
                  <li className="flex items-center gap-2 text-status-warning">
                    <AlertTriangle size={14} />
                    Good effort. Focus on faster isolation and recovery steps.
                  </li>
                  <li>Retry the simulation to improve containment and backup restore timing.</li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2 text-status-danger">
                    <AlertTriangle size={14} />
                    Review ransomware response procedures and retry this simulation.
                  </li>
                  <li>Prioritize isolating infected systems before attempting recovery.</li>
                </>
              )
            ) : score >= 80 ? (
              <>
                <li className="flex items-center gap-2 text-status-success">
                  <CheckCircle size={14} />
                  Excellent performance. Ready for the next simulation tier.
                </li>
                <li>Consider the Ransomware Attack Response simulation next.</li>
              </>
            ) : score >= 60 ? (
              <>
                <li className="flex items-center gap-2 text-status-warning">
                  <AlertTriangle size={14} />
                  Good effort. Review your mistakes above.
                </li>
                <li>Practice identifying suspicious URLs and urgency tactics.</li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2 text-status-danger">
                  <AlertTriangle size={14} />
                  More practice needed before advancing.
                </li>
                <li>Review phishing red flags and retry this simulation.</li>
              </>
            )}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/10">
          {certLaunch?.certificationId && (
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
          {!certLaunch?.certificationId && (
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

export default SimulationReport;
