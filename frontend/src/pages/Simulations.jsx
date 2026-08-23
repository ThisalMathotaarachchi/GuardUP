import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Play, Clock, Target, ChevronRight, Lock, Shield, Crosshair, CheckCircle, XCircle } from 'lucide-react';

const getLastSimResult = (user, simId) => {
  const history = user?.simulationHistory || [];
  const entries = history.filter((h) => {
    if (simId === 'beginner') {
      return h.simulationId?.includes('phishing') || h.simulationId?.includes('beginner');
    }
    return h.simulationId?.includes('ransomware') || h.simulationId?.includes('advanced');
  });
  const last = entries[entries.length - 1];
  if (last) {
    return { attempted: true, passed: (last.score ?? 0) >= 60, score: last.score };
  }
  const completed = simId === 'beginner'
    ? user?.simulationsCompleted?.beginner
    : user?.simulationsCompleted?.advanced;
  if (completed) {
    const score = simId === 'beginner' ? user?.phishingAccuracy : user?.ransomwareAccuracy;
    return { attempted: true, passed: (score ?? 0) >= 60, score };
  }
  return { attempted: false };
};

const isRansomwareUnlocked = (user) => {
  const skillLevel = (user?.skillLevel || 'BEGINNER').toUpperCase();
  const completedBeginner = user?.simulationsCompleted?.beginner || false;
  return skillLevel === 'ADVANCED' || completedBeginner;
};

const Simulations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const advancedUnlocked = isRansomwareUnlocked(user);

  const sims = [
    {
      id: 'beginner',
      title: 'Spear Phishing Attack',
      description: 'Learn to identify sophisticated spear phishing attempts.',
      difficulty: 'Beginner',
      timeEstimate: '5 min',
      Icon: Crosshair,
      locked: false,
      lockReason: null,
      route: '/dashboard/simulations/phishing/beginner',
    },
    {
      id: 'advanced',
      title: 'Ransomware Attack Response',
      description: 'Contain a spreading ransomware attack as an IT administrator.',
      difficulty: 'Intermediate',
      timeEstimate: '7 min',
      Icon: Shield,
      locked: !advancedUnlocked,
      lockReason: advancedUnlocked ? null : 'Complete Spear Phishing first',
      route: '/dashboard/simulations/ransomware/advanced',
    },
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold page-heading mb-2">Simulations</h1>
        <p className="page-subheading mb-8">Practice your cybersecurity skills in realistic, immersive scenarios.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sims.map((sim) => {
            const locked = sim.locked;
            const result = getLastSimResult(user, sim.id);
            const SimIcon = sim.Icon;
            return (
              <div
                key={sim.id}
                className={`glass-card p-6 transition ${locked ? 'opacity-60' : 'glass-card-hover'} ${result.attempted && result.passed ? 'ring-2 ring-[#10B981]/50' : result.attempted && !result.passed ? 'ring-2 ring-[#EF4444]/40' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{sim.title}</h3>
                    <p className="text-white/65 text-sm mt-1">{sim.description}</p>
                  </div>
                  <SimIcon size={28} className="text-[#F59E0B]" />
                </div>
                <div className="flex items-center gap-4 text-sm text-white/65 mb-4 flex-wrap">
                  <div className="flex items-center gap-1"><Clock size={16} /><span>{sim.timeEstimate}</span></div>
                  <div className="flex items-center gap-1"><Target size={16} /><span>{sim.difficulty}</span></div>
                  {locked && sim.lockReason && (
                    <div className="flex items-center gap-1 text-white/50"><Lock size={16} /><span>{sim.lockReason}</span></div>
                  )}
                  {!locked && result.attempted && result.passed && (
                    <span className="text-status-success font-medium flex items-center gap-1"><CheckCircle size={14} />Passed</span>
                  )}
                  {!locked && result.attempted && !result.passed && (
                    <span className="text-status-danger font-medium flex items-center gap-1"><XCircle size={14} />Failed</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => !locked && navigate(sim.route)}
                  disabled={locked}
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg transition ${locked ? 'card-inner text-white/40 cursor-not-allowed' : 'btn-primary py-2'}`}
                >
                  <Play size={18} />
                  {locked ? 'Locked' : result.attempted ? 'Retry Simulation' : 'Start Simulation'}
                  <ChevronRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Simulations;
