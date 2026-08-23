import { Loader2, ShieldCheck } from 'lucide-react';

const SimulationCompleting = () => (
  <div className="sim-layer-full sim-completing">
    <div className="sim-completing__content">
      <ShieldCheck size={48} className="sim-completing__icon" />
      <h1 className="sim-completing__title">Simulation Complete</h1>
      <p className="sim-completing__subtitle">Your results are ready.</p>
      <div className="sim-completing__status">
        <Loader2 size={18} className="sim-completing__spinner" />
        <span>Processing your results…</span>
      </div>
    </div>
  </div>
);

export default SimulationCompleting;
