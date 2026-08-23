
const CERTIFICATION_ACTIVITY_IDS = {
  'cert-phishing-defense': [
    'phish-intro',
    'phish-art-8',
    'phish-vid-5',
    'phish-quiz-1',
    'phish-art-10',
    'phish-vid-8',
    'phish-sim-1',
    'phish-debrief',
    'phish-final',
  ],
  'cert-ransomware-response': [
    'rw-intro',
    'rw-art-11',
    'rw-vid-2',
    'rw-quiz-1',
    'rw-art-9',
    'rw-art-12',
    'rw-sim-4',
    'rw-debrief',
    'rw-quiz-2',
    'rw-final',
  ],
  'cert-advanced-threat': [
    'adv-intro',
    'adv-mod-1',
    'adv-mod-2',
    'adv-mod-3',
    'adv-mod-4',
    'adv-mod-5',
    'adv-sim-breach',
    'adv-debrief',
    'adv-final',
  ],
};


const CERTIFICATION_QUIZ_ACTIVITY_MAP = {
  'phish-quiz-1': 'quiz-phishing',
  'phish-final': 'quiz-phishing-final',
  'rw-quiz-1': 'quiz-ransomware',
  'rw-quiz-2': 'quiz-ransomware-final',
  'adv-final': 'quiz-advanced-decision-final',
};

const FINAL_ASSESSMENT_ACTIVITY_IDS = new Set([
  'phish-final',
  'rw-final',
  'adv-final',
]);

const DEFAULT_QUIZ_PASS_THRESHOLD = 60;

const getCertificationActivityIds = (certificationId) =>
  CERTIFICATION_ACTIVITY_IDS[certificationId] || [];

module.exports = {
  CERTIFICATION_ACTIVITY_IDS,
  CERTIFICATION_QUIZ_ACTIVITY_MAP,
  FINAL_ASSESSMENT_ACTIVITY_IDS,
  DEFAULT_QUIZ_PASS_THRESHOLD,
  getCertificationActivityIds,
};
