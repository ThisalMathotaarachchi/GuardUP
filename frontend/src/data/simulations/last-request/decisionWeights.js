export const DECISION_DEFINITIONS = {
  'daniel-request': {
    id: 'daniel-request',
    time: '09:08',
    label: 'Daniel\'s access request',
    prompt: 'Daniel needs you to approve vendor portal access and confirm your MFA code for the request.',
    options: [
      {
        id: 'share-mfa',
        label: 'Share the MFA code and approve the access request.',
        dimensions: { securityJudgment: -20, informationHandling: -18, socialPressureResistance: -14 },
        compromiseDelta: 24,
        narrative: 'You shared an MFA code and approved access without verification.',
      },
      {
        id: 'verify-portal',
        label: 'Ask Daniel to submit the request through the official vendor portal.',
        dimensions: { securityJudgment: 14, informationHandling: 12, socialPressureResistance: 8 },
        compromiseDelta: 0,
        narrative: 'You redirected the request to the approved vendor workflow.',
      },
      {
        id: 'verify-manager',
        label: 'Say you need manager approval before any access changes.',
        dimensions: { securityJudgment: 10, socialPressureResistance: 6, escalationQuality: 4 },
        compromiseDelta: 2,
        narrative: 'You required additional authorization before acting.',
      },
      {
        id: 'ignore-request',
        label: 'Ignore the message and continue working.',
        dimensions: { situationalAwareness: -6, socialPressureResistance: 4 },
        compromiseDelta: 8,
        narrative: 'You deferred the request without addressing it.',
      },
    ],
  },
  'auth-incident': {
    id: 'auth-incident',
    time: '09:32',
    label: 'Authentication anomaly',
    prompt: 'A sign-in from an unknown location was detected on your account.',
    options: [
      {
        id: 'report-immediately',
        label: 'Report the alert to Security Operations immediately.',
        dimensions: { threatRecognition: 16, escalationQuality: 14, incidentResponse: 12 },
        compromiseDelta: -8,
        evidence: { unexpectedAuthenticationObserved: true, securityReportSubmitted: true },
        narrative: 'You reported suspicious authentication activity immediately.',
      },
      {
        id: 'investigate-first',
        label: 'Review session details before deciding.',
        dimensions: { situationalAwareness: 8, threatRecognition: 4 },
        compromiseDelta: 2,
        evidence: { unexpectedAuthenticationObserved: true },
        narrative: 'You investigated the alert before taking further action.',
      },
      {
        id: 'dismiss',
        label: 'Dismiss the alert — this happens sometimes.',
        dimensions: { threatRecognition: -20, securityJudgment: -14 },
        compromiseDelta: 18,
        evidence: { unexpectedAuthenticationObserved: true },
        narrative: 'You treated a serious authentication anomaly as routine noise.',
      },
    ],
  },
  'it-verification': {
    id: 'it-verification',
    time: '09:45',
    label: 'IT verification request',
    prompt: 'Someone claiming to be IT Support needs the verification code sent to your account.',
    options: [
      {
        id: 'share-code',
        label: 'Share the verification code.',
        dimensions: { securityJudgment: -25, socialPressureResistance: -22, informationHandling: -20 },
        compromiseDelta: 35,
        evidence: { fakeITContactObserved: true },
        narrative: 'You disclosed a verification code to an unverified contact.',
      },
      {
        id: 'verify-request',
        label: 'Verify their identity through the employee directory first.',
        dimensions: { securityJudgment: 12, situationalAwareness: 10 },
        compromiseDelta: 0,
        evidence: { fakeITContactObserved: true, itContactVerified: true },
        narrative: 'You attempted to verify the contact before responding.',
      },
      {
        id: 'contact-it-directly',
        label: 'Contact IT through the official help desk portal.',
        dimensions: { securityJudgment: 18, socialPressureResistance: 16, incidentResponse: 10 },
        compromiseDelta: -4,
        evidence: { fakeITContactObserved: true, itContactVerified: true },
        narrative: 'You refused to verify over chat and used the official channel.',
      },
      {
        id: 'report-impersonation',
        label: 'Report a suspected impersonation attempt to Security.',
        dimensions: { threatRecognition: 14, escalationQuality: 16, incidentResponse: 14 },
        compromiseDelta: -6,
        evidence: { fakeITContactObserved: true, securityReportSubmitted: true },
        narrative: 'You escalated a suspected impersonation attempt.',
      },
    ],
  },
  'final-response': {
    id: 'final-response',
    time: '10:05',
    label: 'Incident response',
    prompt: 'Security Operations needs your final response to contain the incident.',
    options: [
      {
        id: 'report-security',
        label: 'Submit a full incident report with timeline and evidence.',
        dimensions: { escalationQuality: 16, incidentResponse: 14, informationHandling: 10 },
        compromiseDelta: -12,
        evidence: { securityReportSubmitted: true },
        narrative: 'You provided a structured incident report to Security Operations.',
      },
      {
        id: 'isolate-workstation',
        label: 'Disconnect from the network and preserve evidence.',
        dimensions: { incidentResponse: 14, securityJudgment: 10 },
        compromiseDelta: -8,
        narrative: 'You isolated your workstation to limit further exposure.',
      },
      {
        id: 'investigate-alone',
        label: 'Continue investigating on your own.',
        dimensions: { escalationQuality: -14, incidentResponse: -10 },
        compromiseDelta: 10,
        narrative: 'You delayed escalation to continue solo investigation.',
      },
      {
        id: 'ignore-event',
        label: 'Return to normal work.',
        dimensions: { threatRecognition: -18, escalationQuality: -20 },
        compromiseDelta: 20,
        narrative: 'You disengaged as the incident continued to develop.',
      },
    ],
  },
};

export const getDecisionById = (decisionId) => DECISION_DEFINITIONS[decisionId] || null;

export const applyDimensionDeltas = (dimensions, deltas = {}) => {
  const next = { ...dimensions };
  Object.entries(deltas).forEach(([key, delta]) => {
    if (typeof next[key] === 'number') {
      next[key] = Math.max(0, Math.min(100, next[key] + delta));
    }
  });
  return next;
};
