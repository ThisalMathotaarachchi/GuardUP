import { createContext, useCallback, useContext, useState } from 'react';

const SimulationFeedbackContext = createContext(null);

export const SimulationFeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(null);

  const showFeedback = useCallback((message, options = {}) => {
    if (!message) return;
    setFeedback({
      message,
      tone: options.tone || 'error',
      duration: options.duration ?? 3200,
    });
    window.setTimeout(() => {
      setFeedback((current) => (current?.message === message ? null : current));
    }, options.duration ?? 3200);
  }, []);

  const clearFeedback = useCallback(() => setFeedback(null), []);

  return (
    <SimulationFeedbackContext.Provider value={{ showFeedback, clearFeedback }}>
      <div className="simulation-feedback-host">
        {children}
        {feedback && (
          <div
            className={`sim-shell-feedback sim-shell-feedback--${feedback.tone}`}
            role="status"
            onClick={clearFeedback}
          >
            {feedback.message}
          </div>
        )}
      </div>
    </SimulationFeedbackContext.Provider>
  );
};

export const useSimulationFeedback = () => {
  const ctx = useContext(SimulationFeedbackContext);
  return ctx || { showFeedback: () => {}, clearFeedback: () => {} };
};

export default SimulationFeedbackContext;
