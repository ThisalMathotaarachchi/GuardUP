export const NPC_RESPONSES = {
  daniel: {
    afterVerifyPortal: 'Fine, I\'ll put it through the portal. Finance is going to ask why this is taking so long.',
    afterVerifyManager: 'Okay — I\'ll check with Priya. Just need this done before 11.',
    afterShareMfa: 'Perfect, that worked. Thanks — I owe you one.',
    afterIgnore: 'Hello? Still there?',
    defaultReply: 'Can you check when you get a moment?',
  },
  itFake: {
    afterShareCode: 'Thank you. Verification complete. Please stand by.',
    afterVerify: 'We don\'t have time for that. The session expires in 2 minutes. We need the code now.',
    afterReport: 'This line will disconnect.',
    afterContactOfficial: '...',
    urgent: 'We need the verification code that was just sent to your account. This is urgent.',
  },
  security: {
    afterReport: 'Thank you. We are reviewing authentication events on your account. Do not share any codes.',
    afterFinalReport: 'Incident report received. Stand by for containment actions.',
    contained: 'Incident contained. Affected session revoked. Account secured. Evidence preserved.',
    limited: 'The affected account has been secured. Some unauthorized activity occurred before containment.',
    escalated: 'Unauthorized access confirmed. Security Operations has initiated emergency containment.',
  },
};

export const getDanielReply = (decisionId, optionId) => {
  if (optionId === 'verify-portal') return NPC_RESPONSES.daniel.afterVerifyPortal;
  if (optionId === 'verify-manager') return NPC_RESPONSES.daniel.afterVerifyManager;
  if (optionId === 'share-mfa') return NPC_RESPONSES.daniel.afterShareMfa;
  if (optionId === 'ignore-request') return NPC_RESPONSES.daniel.afterIgnore;
  return NPC_RESPONSES.daniel.defaultReply;
};

export const getSecurityOutcomeMessage = (outcomeType) => {
  if (outcomeType === 'THREAT_CONTAINED') return NPC_RESPONSES.security.contained;
  if (outcomeType === 'BREACH_CONTAINED') return NPC_RESPONSES.security.limited;
  return NPC_RESPONSES.security.escalated;
};
