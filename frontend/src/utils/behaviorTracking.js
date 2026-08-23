export const calculateBehaviorScore = (behaviorData) => {
  const {
    accuracy,
    breaches,
    recovered,
    hintsUsed,
    totalTime,
    timeLimit,
  } = behaviorData;

  const accuracyScore = (accuracy / 100) * 100;

  const speedRatio = totalTime / timeLimit;
  const speedScore = Math.max(0, Math.min(100, (1 - speedRatio) * 100));

  const breachScore = Math.max(0, 100 - (breaches * 20));

  const recoveryScore = recovered ? 100 : 0;

  const hintScore = Math.max(0, 100 - (hintsUsed * 10));

  const weightedScore = (
    (accuracyScore * 0.30) +
    (speedScore * 0.15) +
    (breachScore * 0.25) +
    (recoveryScore * 0.15) +
    (hintScore * 0.10) +
    (100 - (breaches * 5)) * 0.05
  );

  return Math.round(Math.max(0, Math.min(100, weightedScore)));
};

export const calculateLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

export const calculateXP = (score, level, streak) => {
  let multiplier = 1;
  if (score >= 95) multiplier = 3.0;
  else if (score >= 90) multiplier = 2.5;
  else if (score >= 80) multiplier = 2.0;
  else if (score >= 70) multiplier = 1.5;
  else if (score >= 60) multiplier = 1.0;
  else multiplier = 0.5;

  let streakBonus = 0;
  if (streak >= 15) streakBonus = 0.20;
  else if (streak >= 10) streakBonus = 0.15;
  else if (streak >= 5) streakBonus = 0.10;
  else if (streak >= 3) streakBonus = 0.05;

  const baseXP = level === 'BEGINNER' || level === 'beginner' ? 100 : 150;
  return Math.round(baseXP * multiplier * (1 + streakBonus));
};

export const getGrade = (score) => {
  if (score >= 95) return { grade: 'S-Tier', label: 'Perfect', tier: 'perfect' };
  if (score >= 90) return { grade: 'A-Tier', label: 'Cyber Elite', tier: 'elite' };
  if (score >= 80) return { grade: 'B-Tier', label: 'Security Guardian', tier: 'guardian' };
  if (score >= 70) return { grade: 'C-Tier', label: 'Phishing Spotter', tier: 'spotter' };
  if (score >= 60) return { grade: 'D-Tier', label: 'Security Learner', tier: 'learner' };
  return { grade: 'F-Tier', label: 'Needs Practice', tier: 'practice' };
};
