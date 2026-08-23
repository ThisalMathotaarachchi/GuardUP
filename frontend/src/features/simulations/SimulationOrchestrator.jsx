import { useCallback, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GlobalSimulationShell from '../../layouts/GlobalSimulationShell';
import SimulationErrorBoundary from './SimulationErrorBoundary';
import SimulationIntro from './SimulationIntro';
import SimulationCompleting from './SimulationCompleting';
import SimulationReport from './SimulationReport';
import {
  completeSimulationOnServer,
  syncCertificationAfterSimulation,
} from '../../services/simulationCompletionService';


const SimulationOrchestrator = ({
  scenario,
  WorkspaceComponent,
  variant = 'phishing',
  skipIntro = false,
  ReportComponent = SimulationReport,
  initialPhase = skipIntro ? 'playing' : 'intro',
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const certLaunch =
    location.state?.from === 'certification'
      ? {
          certificationId: location.state.certificationId,
          activityId: location.state.activityId,
        }
      : null;

  const [phase, setPhase] = useState(initialPhase);
  const [results, setResults] = useState(null);
  const [newBadges, setNewBadges] = useState([]);
  const [saveError, setSaveError] = useState(null);
  const completionLockRef = useRef(false);

  const handleStart = () => setPhase('playing');

  const persistCompletion = useCallback(
    async (data) => {
      const response = await completeSimulationOnServer(scenario.id, data);
      updateUser(response.user);
      if (user?.id && certLaunch?.certificationId) {
        syncCertificationAfterSimulation(user.id, certLaunch.certificationId, response.user);
      }
      return response;
    },
    [scenario.id, updateUser, user?.id, certLaunch]
  );

  const handleWorkspaceComplete = useCallback(
    async (data) => {
      if (completionLockRef.current) return;
      completionLockRef.current = true;
      setResults(data);
      setPhase('completing');
      setSaveError(null);

      try {
        const response = await persistCompletion(data);
        setNewBadges(response.newBadges || []);
        setPhase('results');
      } catch (err) {
        console.error(err);
        setSaveError(err?.message || 'Failed to save simulation results');
        setPhase('error');
      }
    },
    [persistCompletion]
  );

  const handleRetrySave = useCallback(async () => {
    if (!results) {
      completionLockRef.current = false;
      setPhase('playing');
      return;
    }

    setPhase('completing');
    setSaveError(null);

    try {
      const response = await persistCompletion(results);
      setNewBadges(response.newBadges || []);
      setPhase('results');
    } catch (err) {
      console.error(err);
      setSaveError(err?.message || 'Failed to save simulation results');
      setPhase('error');
    }
  }, [results, persistCompletion]);

  const handleExit = () => navigate('/dashboard/simulations');

  const handleContinueCertification = () => {
    if (!certLaunch?.certificationId) return;
    navigate(`/dashboard/certifications/${certLaunch.certificationId}/activity`, {
      state: { activityId: certLaunch.activityId },
    });
  };

  const handleBoundaryRetry = () => {
    if (phase === 'error') {
      handleRetrySave();
      return;
    }
    if (phase === 'results' && results) {
      setPhase('results');
      return;
    }
    setPhase('intro');
    completionLockRef.current = false;
  };

  if (!scenario) {
    return (
      <GlobalSimulationShell>
        <div className="sim-layer-full sim-error-state">
          <div className="sim-error-state__card">
            <AlertTriangle size={40} className="sim-error-state__icon" />
            <h1 className="sim-error-state__title">Simulation unavailable</h1>
            <p className="sim-error-state__text">This simulation scenario could not be loaded.</p>
            <button type="button" className="btn-primary py-2.5 px-5" onClick={handleExit}>
              <ArrowLeft size={16} />
              Return to Simulations
            </button>
          </div>
        </div>
      </GlobalSimulationShell>
    );
  }

  const renderPhase = () => {
    switch (phase) {
      case 'intro':
        return <SimulationIntro scenario={scenario} onStart={handleStart} />;
      case 'playing':
        return <WorkspaceComponent scenario={scenario} onComplete={handleWorkspaceComplete} />;
      case 'completing':
        return <SimulationCompleting />;
      case 'results':
        return (
          <ReportComponent
            results={results}
            newBadges={newBadges}
            variant={variant}
            certLaunch={certLaunch}
            onContinueCertification={handleContinueCertification}
          />
        );
      case 'error':
        return (
          <div className="sim-layer-full sim-error-state">
            <div className="sim-error-state__card">
              <AlertTriangle size={40} className="sim-error-state__icon" />
              <h1 className="sim-error-state__title">Something went wrong</h1>
              <p className="sim-error-state__text">
                Something went wrong while finishing the simulation.
                {saveError ? ` ${saveError}` : ''}
              </p>
              <div className="sim-error-state__actions">
                <button type="button" className="btn-primary py-2.5 px-5" onClick={handleRetrySave}>
                  <RotateCcw size={16} />
                  Retry
                </button>
                <button type="button" className="sim-error-state__secondary" onClick={handleExit}>
                  <ArrowLeft size={16} />
                  Return to Simulations
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="sim-layer-full sim-completing">
            <p className="sim-completing__subtitle">Loading simulation…</p>
          </div>
        );
    }
  };

  return (
    <GlobalSimulationShell>
      <SimulationErrorBoundary onRetry={handleBoundaryRetry} onExit={handleExit}>
        {renderPhase()}
      </SimulationErrorBoundary>
    </GlobalSimulationShell>
  );
};

export default SimulationOrchestrator;
