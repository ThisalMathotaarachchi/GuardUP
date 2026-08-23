import { Component } from 'react';
import { AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';

class SimulationErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Simulation error:', error, info);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
    this.props.onRetry?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="sim-layer-full sim-error-state">
          <div className="sim-error-state__card">
            <AlertTriangle size={40} className="sim-error-state__icon" />
            <h1 className="sim-error-state__title">Something went wrong</h1>
            <p className="sim-error-state__text">
              Something went wrong while finishing the simulation. Your progress may not have been saved.
            </p>
            <div className="sim-error-state__actions">
              <button type="button" className="btn-primary py-2.5 px-5" onClick={this.handleRetry}>
                <RotateCcw size={16} />
                Retry
              </button>
              <button
                type="button"
                className="sim-error-state__secondary"
                onClick={() => this.props.onExit?.()}
              >
                <ArrowLeft size={16} />
                Return to Simulations
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SimulationErrorBoundary;
