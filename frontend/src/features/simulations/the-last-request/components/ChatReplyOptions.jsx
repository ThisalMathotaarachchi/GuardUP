import { getDecisionById } from '../../../../data/simulations/last-request/decisionWeights';
import { CHAT_REPLY_TEXT } from '../../../../data/simulations/last-request/chatReplyText';

const ChatReplyOptions = ({ decisionId, onSelect }) => {
  const decision = getDecisionById(decisionId);
  if (!decision) return null;

  return (
    <div className="lr-chat__composer" role="group" aria-label="Reply options">
      <p className="lr-chat__composer-label">Reply</p>
      <div className="lr-chat__replies">
        {decision.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="lr-chat__reply"
            onClick={() => onSelect(decision.id, option.id)}
          >
            {CHAT_REPLY_TEXT[option.id] || option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatReplyOptions;
