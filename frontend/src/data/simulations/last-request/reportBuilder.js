import {
  BEHAVIOR_DIMENSIONS,
  OUTCOME_LABELS,
} from './lastRequestScenario';
import {
  computeSimulationScore,
  deriveCompromiseTier,
  deriveOutcomeType,
  getOutcomeNarrative,
} from './outcomeEngine';
import { getDecisionById } from './decisionWeights';

const DIMENSION_LABELS = {
  threatRecognition: 'Threat Recognition',
  securityJudgment: 'Security Judgment',
  socialPressureResistance: 'Social Engineering Resistance',
  informationHandling: 'Information Handling',
  escalationQuality: 'Escalation Quality',
  situationalAwareness: 'Situational Awareness',
  incidentResponse: 'Incident Response',
};

const EVIDENCE_LABELS = {
  senderHeadersInspected: 'Email sender headers reviewed',
  employeeDirectoryVerified: 'Employee directory used for verification',
  authAlertSeen: 'Authentication alert investigated',
  suspiciousEmailOpened: 'Suspicious email examined',
  securityReportSubmitted: 'Incident reported to Security',
  itContactVerified: 'IT contact verified through official channels',
  suspiciousFileOpened: 'Suspicious file reviewed',
  unexpectedAuthenticationObserved: 'Unexpected authentication noted',
  passwordResetObserved: 'Password reset activity observed',
  fakeITContactObserved: 'Fake IT interaction identified',
  securityAlertObserved: 'Security alert acknowledged',
};

const buildStrengths = (dimensions) => {
  const strengths = [];
  if (dimensions.securityJudgment >= 60) strengths.push('You applied sound security judgment when handling sensitive requests.');
  if (dimensions.socialPressureResistance >= 58) strengths.push('You resisted social pressure and verified identity through appropriate channels.');
  if (dimensions.escalationQuality >= 58) strengths.push('You escalated suspicious activity rather than handling it alone.');
  if (dimensions.situationalAwareness >= 58) strengths.push('You connected seemingly unrelated events into a coherent picture.');
  if (dimensions.incidentResponse >= 58) strengths.push('You took containment-oriented actions that limited further exposure.');
  if (dimensions.threatRecognition >= 58) strengths.push('You recognized authentication and communication anomalies as potential threats.');
  if (strengths.length === 0) strengths.push('You completed the full incident narrative, which provides a baseline for targeted improvement.');
  return strengths.slice(0, 4);
};

const buildImprovements = (dimensions, evidence) => {
  const improvements = [];
  if (dimensions.securityJudgment < 50) improvements.push('Verify sensitive requests through independent, organization-approved channels.');
  if (dimensions.socialPressureResistance < 50) improvements.push('Slow down when urgency or authority cues appear — pressure is often manufactured.');
  if (dimensions.escalationQuality < 50) improvements.push('Report suspicious authentication and impersonation attempts earlier.');
  if (dimensions.situationalAwareness < 50) improvements.push('Correlate weak indicators across email, authentication, and colleague messages.');
  if (dimensions.informationHandling < 50) improvements.push('Avoid sharing credentials, MFA codes, or unverified files with others.');
  if (!evidence.authAlertSeen) improvements.push('Review authentication alerts when they appear in Security Center.');
  if (improvements.length === 0) improvements.push('Continue practicing verification habits under time pressure.');
  return improvements.slice(0, 4);
};

const KEY_LESSONS = [
  'Human behavior and trust are primary attack surfaces in modern organizations.',
  'Authentication anomalies should be reported early — waiting for certainty often means waiting too long.',
  'IT support will never ask for MFA codes through chat or unsolicited messages.',
  'Cross-referencing directory, email headers, and security alerts helps reveal impersonation.',
];

export const buildLastRequestReport = (state) => {
  const { dimensions, evidence, decisions, compromiseScore, startedAt } = state;
  const totalTime = Math.round((Date.now() - startedAt) / 1000);
  const compromiseTier = deriveCompromiseTier(compromiseScore, dimensions);
  const outcomeType = deriveOutcomeType(compromiseTier, dimensions, evidence, compromiseScore);
  const score = computeSimulationScore(dimensions, compromiseScore, outcomeType);
  const narrative = getOutcomeNarrative(outcomeType, compromiseTier);

  const timeline = decisions.map((entry) => {
    const def = getDecisionById(entry.decisionId);
    const option = def?.options.find((o) => o.id === entry.optionId);
    return {
      time: entry.time || def?.time || '—',
      label: entry.label || def?.label || entry.decisionId,
      choice: option?.label || entry.optionId,
      consequence: option?.narrative || '',
    };
  });

  const evidenceDiscovered = Object.entries(evidence)
    .filter(([, v]) => v)
    .map(([key]) => EVIDENCE_LABELS[key] || key);

  const behavioralScores = Object.fromEntries(
    BEHAVIOR_DIMENSIONS.map((key) => [DIMENSION_LABELS[key] || key, dimensions[key] ?? 50])
  );

  return {
    score,
    accuracy: score,
    xpEarned: Math.round(score * 1.5),
    passed: score >= 60,
    breaches: compromiseScore >= 35 ? 1 : 0,
    totalTime,
    timeLimit: 600,
    status: 'completed',
    recovered: outcomeType !== 'INCIDENT_ESCALATED',
    outcomeType,
    outcomeLabel: OUTCOME_LABELS[outcomeType],
    compromiseTier,
    narrative,
    behavioralScores,
    dimensions,
    evidence,
    evidenceDiscovered,
    timeline,
    strengths: buildStrengths(dimensions),
    improvements: buildImprovements(dimensions, evidence),
    learningPoints: KEY_LESSONS,
    behaviorData: {
      accuracy: score,
      breaches: compromiseScore >= 35 ? 1 : 0,
      totalTime,
      timeLimit: 600,
      hintsUsed: 0,
      breachesContained: outcomeType === 'THREAT_CONTAINED' ? 1 : 0,
      dimensions,
      evidence,
      outcomeType,
    },
  };
};
