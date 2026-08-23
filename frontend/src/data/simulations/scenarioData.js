import { beginnerInboxEmails } from './inboxEmailData.js';

export const simulationScenarios = {
  BEGINNER: {
    id: 'beginner-spear-phishing',
    title: 'Spear Phishing Attack',
    description: 'You are a new employee. Learn to identify sophisticated spear phishing attempts.',
    companyName: 'NovaTech Solutions',
    employeeName: 'Alex Rivera',
    employeeRole: 'Junior Developer',
    timeLimit: 300,
    passScore: 60,
    maxBreaches: 2,
    objectives: ['Identify spear phishing emails', 'Report suspicious activity', 'Avoid opening malicious links', 'Complete within 5 minutes'],
    emails: beginnerInboxEmails,
  },
  ADVANCED: {
    id: 'advanced-ransomware',
    title: 'Ransomware Attack Response',
    description: 'You are an IT Administrator. A ransomware attack is spreading through the network. Act fast.',
    companyName: 'Apex Global Corp',
    employeeName: 'Sarah Chen',
    employeeRole: 'IT Administrator',
    timeLimit: 420,
    passScore: 50,
    maxBreaches: 3,
    objectives: ['Identify infected machine', 'Isolate infected system', 'Decide on ransom payment', 'Restore from backups', 'Communicate with stakeholders', 'Complete within 7 minutes'],
    events: [
      { id: 'e1', type: 'alert', title: 'ALERT: Ransomware Detected', description: 'Security system detected ransomware on SRV-FINANCE-02. Files being encrypted.', scheduledDelay: 0, options: [{ id: 'isolate', label: 'Isolate the machine immediately', isCorrect: true }, { id: 'ignore', label: 'Wait and monitor the situation', isCorrect: false }] },
      { id: 'e2', type: 'decision', title: 'Ransomware Demand', description: 'Attackers demand $500,000 in Bitcoin. They claim they will decrypt files if paid.', scheduledDelay: 60, options: [{ id: 'pay', label: 'Pay the ransom immediately', isCorrect: false }, { id: 'negotiate', label: 'Try to negotiate with attackers', isCorrect: false }, { id: 'not_pay', label: 'Refuse to pay and restore from backups', isCorrect: true }] },
      { id: 'e3', type: 'communication', title: 'Internal Communication', description: 'Employees are panicking. Asking for updates. How do you respond?', scheduledDelay: 120, options: [{ id: 'transparent', label: 'Send a transparent update about the situation', isCorrect: true }, { id: 'vague', label: 'Send a vague message saying "everything is under control"', isCorrect: false }, { id: 'ignore', label: 'Ignore them until the situation is resolved', isCorrect: false }] },
      { id: 'e4', type: 'restore', title: 'Data Restoration', description: 'You have backups. Some are corrupted. Which backup do you use?', scheduledDelay: 180, options: [{ id: 'full_backup', label: 'Use the full backup from last night', isCorrect: true }, { id: 'partial_backup', label: 'Use the partial backup from 2 days ago', isCorrect: false }, { id: 'incremental', label: 'Use incremental backup from 3 days ago', isCorrect: false }] },
      { id: 'e5', type: 'post_incident', title: 'Post-Incident Review', description: 'The incident is contained. What do you do next?', scheduledDelay: 240, options: [{ id: 'review', label: 'Conduct a thorough post-incident review', isCorrect: true }, { id: 'ignore', label: 'Move on and hope it doesn\'t happen again', isCorrect: false }, { id: 'blame', label: 'Blame a team member for the incident', isCorrect: false }] },
    ],
  },
};

export const getScenario = (l) => (l === 'beginner' ? simulationScenarios.BEGINNER : l === 'advanced' ? simulationScenarios.ADVANCED : simulationScenarios.BEGINNER);
