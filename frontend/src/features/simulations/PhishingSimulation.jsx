import { useParams } from 'react-router-dom';
import SimulationOrchestrator from './SimulationOrchestrator';
import SimulationWorkspace from './SimulationWorkspace';
import { getScenario } from '../../data/simulations/scenarioData';

const PhishingSimulation = () => {
  const { level } = useParams();
  const scenario = getScenario(level);

  return (
    <SimulationOrchestrator
      scenario={scenario}
      WorkspaceComponent={SimulationWorkspace}
      variant="phishing"
    />
  );
};

export default PhishingSimulation;
