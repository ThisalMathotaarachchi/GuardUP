import SimulationOrchestrator from './SimulationOrchestrator';
import LastRequestWorkspace from './the-last-request/LastRequestWorkspace';
import LastRequestReport from './the-last-request/LastRequestReport';
import { lastRequestScenario } from '../../data/simulations/last-request/lastRequestScenario';

const TheLastRequestSimulation = () => (
  <SimulationOrchestrator
    scenario={lastRequestScenario}
    WorkspaceComponent={LastRequestWorkspace}
    variant="breach"
    skipIntro
    ReportComponent={LastRequestReport}
  />
);

export default TheLastRequestSimulation;
