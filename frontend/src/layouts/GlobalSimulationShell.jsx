import { SimulationFeedbackProvider } from '../features/simulations/SimulationFeedbackContext';


const GlobalSimulationShell = ({ children }) => (
  <div className="global-simulation-shell">
    <SimulationFeedbackProvider>
      <div className="global-simulation-shell__stage">
        {children}
      </div>
    </SimulationFeedbackProvider>
  </div>
);

export default GlobalSimulationShell;
