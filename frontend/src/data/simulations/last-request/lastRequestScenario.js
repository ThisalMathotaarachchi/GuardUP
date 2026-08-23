import { ADVANCED_BREACH_SIMULATION_ID } from '../../certifications';

export const lastRequestScenario = {
  id: ADVANCED_BREACH_SIMULATION_ID,
  title: 'The Last Request',
  description:
    'An interactive workplace simulation at Aurelia Systems. Investigate suspicious communications, authentication anomalies, and impersonation attempts as a normal workday unfolds.',
  companyName: 'Aurelia Systems',
  employeeName: 'You',
  employeeRole: 'Operations Analyst',
  location: 'Colombo',
  timeLimit: 600,
  passScore: 60,
  objectives: [
    'Investigate workplace communications and authentication events',
    'Verify identity before sharing sensitive information',
    'Correlate evidence across email, chat, and security tools',
    'Escalate and respond appropriately during a suspected incident',
  ],
};

export const BEHAVIOR_DIMENSIONS = [
  'threatRecognition',
  'securityJudgment',
  'socialPressureResistance',
  'informationHandling',
  'escalationQuality',
  'situationalAwareness',
  'incidentResponse',
];

export const OUTCOME_TYPES = {
  THREAT_CONTAINED: 'THREAT_CONTAINED',
  BREACH_CONTAINED: 'BREACH_CONTAINED',
  INCIDENT_ESCALATED: 'INCIDENT_ESCALATED',
};

export const OUTCOME_LABELS = {
  [OUTCOME_TYPES.THREAT_CONTAINED]: 'Threat Contained',
  [OUTCOME_TYPES.BREACH_CONTAINED]: 'Breach Contained',
  [OUTCOME_TYPES.INCIDENT_ESCALATED]: 'Incident Escalated',
};

export const INITIAL_DIMENSIONS = Object.fromEntries(
  BEHAVIOR_DIMENSIONS.map((key) => [key, 50])
);

export const SIM_START_MINUTES = 8 * 60 + 47;

export const formatSimTime = (totalMinutes, { twelveHour = false } = {}) => {
  const h24 = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (!twelveHour) {
    return `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  }
  const period = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  return `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`;
};
