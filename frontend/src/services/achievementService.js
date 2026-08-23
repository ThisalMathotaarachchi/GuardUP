import api from './api';


export const awardAchievement = async (payload) => {
  const response = await api.post('/achievements/award', payload);
  if (!response.data?.success) return null;
  return response.data.data;
};


export const CERTIFICATION_ACHIEVEMENT_BADGE_IDS = {
  'cert-phishing-defense': 'cert_security_fundamentals',
  'cert-ransomware-response': 'cert_threat_defender',
  'cert-advanced-threat': 'cert_advanced_threat',
};

export const getCertificationBadgeFromUser = (user, certificationId) => {
  const badgeId = CERTIFICATION_ACHIEVEMENT_BADGE_IDS[certificationId];
  if (!badgeId || !user?.badges) return null;
  return user.badges.find((b) => b.id === badgeId) || null;
};


export const QUIZ_PASS_THRESHOLD = 60;

export const awardQuizAchievements = async (quizId, percentage, passThreshold = QUIZ_PASS_THRESHOLD) => {
  const passed = percentage >= passThreshold;
  if (!passed) return null;

  return awardAchievement({
    type: 'quiz',
    quizId,
    percentage,
    passed: true,
  });
};

export const awardCertificationAchievement = async (certificationId) => awardAchievement({
  type: 'certification',
  certificationId,
});
