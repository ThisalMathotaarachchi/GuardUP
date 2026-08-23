export const EVIDENCE_KEYS = [
  'senderHeadersInspected',
  'employeeDirectoryVerified',
  'authAlertSeen',
  'suspiciousEmailOpened',
  'securityReportSubmitted',
  'itContactVerified',
  'suspiciousFileOpened',
  'unexpectedAuthenticationObserved',
  'passwordResetObserved',
  'fakeITContactObserved',
  'securityAlertObserved',
];

export const INITIAL_EVIDENCE = Object.fromEntries(
  EVIDENCE_KEYS.map((key) => [key, false])
);

export const EVIDENCE_BONUSES = {
  senderHeadersInspected: { situationalAwareness: 4 },
  employeeDirectoryVerified: { securityJudgment: 5, threatRecognition: 3 },
  authAlertSeen: { threatRecognition: 4, situationalAwareness: 3 },
  suspiciousEmailOpened: { situationalAwareness: 3 },
  securityReportSubmitted: { escalationQuality: 6, incidentResponse: 5 },
  itContactVerified: { securityJudgment: 6, socialPressureResistance: 4 },
  suspiciousFileOpened: { situationalAwareness: 2 },
};
