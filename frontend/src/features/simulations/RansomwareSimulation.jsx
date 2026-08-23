import { useParams } from 'react-router-dom';
import SimulationOrchestrator from './SimulationOrchestrator';
import RansomwareWorkspace from './RansomwareWorkspace';
import { getScenario } from '../../data/simulations/scenarioData';

const RansomwareSimulation = () => {
  const { level } = useParams();
  const scenario = getScenario(level);

  return (
    <SimulationOrchestrator
      scenario={scenario}
      WorkspaceComponent={RansomwareWorkspace}
      variant="ransomware"
    />
  );
};

export default RansomwareSimulation;
