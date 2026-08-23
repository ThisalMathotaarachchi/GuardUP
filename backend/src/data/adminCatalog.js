const SIMULATION_CATALOG = [
  {
    id: 'beginner-spear-phishing',
    title: 'Spear Phishing Detection',
    type: 'phishing',
    difficulty: 'Beginner',
    levelKey: 'beginner',
  },
  {
    id: 'advanced-ransomware',
    title: 'Ransomware Attack Response',
    type: 'ransomware',
    difficulty: 'Intermediate',
    levelKey: 'advanced',
  },
  {
    id: 'sim-the-breach',
    title: 'The Last Request',
    type: 'breach',
    difficulty: 'Advanced',
    levelKey: 'sim-the-breach',
  },
];

const CERTIFICATION_CATALOG = [
  {
    id: 'cert-phishing-defense',
    title: 'GUARDUP SECURITY FUNDAMENTALS',
    level: 'Beginner',
    simulationId: 'sim-1',
  },
  {
    id: 'cert-ransomware-response',
    title: 'RANSOMWARE INCIDENT RESPONSE',
    level: 'Intermediate',
    simulationId: 'sim-4',
  },
  {
    id: 'cert-advanced-threat',
    title: 'Advanced Cybersecurity Incident & Social Engineering',
    level: 'Advanced',
    simulationId: 'sim-the-breach',
  },
];

module.exports = {
  SIMULATION_CATALOG,
  CERTIFICATION_CATALOG,
};
