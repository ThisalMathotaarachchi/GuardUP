import { getDecisionById } from '../../../../data/simulations/last-request/decisionWeights';

const ActionPrompt = ({ prompt, onSelect }) => {
  if (!prompt?.decisionId) return null;
  const decision = getDecisionById(prompt.decisionId);
  if (!decision) return null;

  return (
    <div className={`lr-prompt lr-prompt--${prompt.context || 'default'}`} role="group" aria-label={decision.label}>
      <p className="lr-prompt__label">{decision.label}</p>
      <p className="lr-prompt__text">{decision.prompt}</p>
      <div className="lr-prompt__actions">
        {decision.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="lr-prompt__action"
            onClick={() => onSelect(decision.id, option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionPrompt;
