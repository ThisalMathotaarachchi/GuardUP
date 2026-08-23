import { OUTCOME_TYPES } from './lastRequestScenario';

export const COMPROMISE_TIERS = {
  CONTAINED_EARLY: 'CONTAINED_EARLY',
  LIMITED_COMPROMISE: 'LIMITED_COMPROMISE',
  SIGNIFICANT_COMPROMISE: 'SIGNIFICANT_COMPROMISE',
};

export const averageDimensions = (dimensions) => {
  const values = Object.values(dimensions);
  if (!values.length) return 50;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
};

export const deriveCompromiseTier = (compromiseScore, dimensions) => {
  const avg = averageDimensions(dimensions);
  if (compromiseScore <= 15 && avg >= 62) return COMPROMISE_TIERS.CONTAINED_EARLY;
  if (compromiseScore >= 45 || avg < 42) return COMPROMISE_TIERS.SIGNIFICANT_COMPROMISE;
  return COMPROMISE_TIERS.LIMITED_COMPROMISE;
};

export const deriveOutcomeType = (compromiseTier, dimensions, evidence, internalCompromiseScore = 0) => {
  const avg = averageDimensions(dimensions);
  const evidenceCount = Object.values(evidence).filter(Boolean).length;
  const escalation = dimensions.escalationQuality ?? 50;
  const incident = dimensions.incidentResponse ?? 50;

  if (compromiseTier === COMPROMISE_TIERS.CONTAINED_EARLY && escalation >= 58 && incident >= 55) {
    return OUTCOME_TYPES.THREAT_CONTAINED;
  }
  if (
    compromiseTier === COMPROMISE_TIERS.SIGNIFICANT_COMPROMISE
    || avg < 40
    || internalCompromiseScore >= 45
    || evidenceCount >= 5
  ) {
    return OUTCOME_TYPES.INCIDENT_ESCALATED;
  }
  return OUTCOME_TYPES.BREACH_CONTAINED;
};

export const getOutcomeNarrative = (outcomeType, compromiseTier) => {
  const narratives = {
    [OUTCOME_TYPES.THREAT_CONTAINED]: {
      headline: 'Security contained the threat before it spread further.',
      body: 'Suspicious sessions were revoked. Your account was secured. The coordinated attempt was interrupted early.',
      colleague: 'Good catch. That could have gone a lot further.',
      mood: 'relief',
    },
    [OUTCOME_TYPES.BREACH_CONTAINED]: {
      headline: 'Limited access was obtained, but the incident was eventually contained.',
      body: 'Security identified the scope, isolated affected accounts, and began recovery. The atmosphere remains serious.',
      colleague: 'We got it in time — mostly. There\'s still a lot to review.',
      mood: 'serious',
    },
    [OUTCOME_TYPES.INCIDENT_ESCALATED]: {
      headline: 'The attack obtained significant access before containment.',
      body: 'Security launched a broader incident response. Several systems and accounts require extended review.',
      colleague: 'They got further than we wanted. We\'ll walk through what happened.',
      mood: 'grave',
    },
  };

  return {
    ...narratives[outcomeType],
    compromiseTier,
  };
};

export const computeSimulationScore = (dimensions, compromiseScore, outcomeType) => {
  const avg = averageDimensions(dimensions);
  const outcomeBonus = {
    [OUTCOME_TYPES.THREAT_CONTAINED]: 12,
    [OUTCOME_TYPES.BREACH_CONTAINED]: 4,
    [OUTCOME_TYPES.INCIDENT_ESCALATED]: -8,
  }[outcomeType] ?? 0;

  const penalty = Math.min(30, compromiseScore * 0.35);
  return Math.max(0, Math.min(100, Math.round(avg + outcomeBonus - penalty)));
};
