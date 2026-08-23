import { useMemo } from 'react';

const TIP_COPY = {
  unread: {
    label: 'Tip',
    text: 'Check your unread messages.',
  },
  security: {
    label: 'Tip',
    text: 'Something unusual may be happening. Check Security Center.',
  },
  verify: {
    label: 'Tip',
    text: 'Verify unexpected requests before taking action.',
  },
  report: {
    label: 'Tip',
    text: 'If you believe this is an incident, Security Center can be used to report it.',
  },
};

const deriveActiveTip = (state, dismissedTips) => {
  if (state.completed) return null;
  if (dismissedTips.has('unread') === false && (state.unread.mail > 0 || state.unread.chat > 0) && state.act <= 1) {
    return 'unread';
  }
  if (!dismissedTips.has('security') && state.flags.authAlertTriggered && !state.flags.authAlertResolved) {
    return 'security';
  }
  if (
    !dismissedTips.has('verify') &&
    state.activePrompt &&
    (state.activePrompt.decisionId === 'daniel-request' || state.activePrompt.decisionId === 'it-verification')
  ) {
    return 'verify';
  }
  if (!dismissedTips.has('report') && state.flags.authAlertTriggered && !state.decisions.some((d) => d.decisionId === 'auth-incident')) {
    return 'report';
  }
  return null;
};

const WorkplaceGuidance = ({
  showWelcome,
  onDismissWelcome,
  state,
  dismissedTips,
  onDismissTip,
}) => {
  const activeTip = useMemo(
    () => (showWelcome ? null : deriveActiveTip(state, dismissedTips)),
    [showWelcome, state, dismissedTips]
  );

  if (showWelcome) {
    return (
      <div className="lr-welcome" role="dialog" aria-labelledby="lr-welcome-title">
        <div className="lr-welcome__card">
          <p className="lr-welcome__eyebrow">Aurelia Systems</p>
          <h2 id="lr-welcome-title" className="lr-welcome__title">
            Your workstation is ready.
          </h2>
          <p className="lr-welcome__body">
            You have unread messages and notifications waiting. Check your applications and investigate
            anything that seems unusual.
          </p>
          <button type="button" className="lr-welcome__btn" onClick={onDismissWelcome}>
            Got it
          </button>
        </div>
      </div>
    );
  }

  if (!activeTip) return null;

  const tip = TIP_COPY[activeTip];

  return (
    <div className="lr-tip" role="status">
      <p className="lr-tip__label">{tip.label}</p>
      <p className="lr-tip__text">{tip.text}</p>
      <button
        type="button"
        className="lr-tip__dismiss"
        onClick={() => onDismissTip(activeTip)}
        aria-label="Dismiss tip"
      >
        ×
      </button>
    </div>
  );
};

export default WorkplaceGuidance;
