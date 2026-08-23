

export const CERTIFICATION_STATUS = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};

export const ACTIVITY_TYPES = {
  INTRO: 'intro',
  ARTICLE: 'article',
  VIDEO: 'video',
  QUIZ: 'quiz',
  SIMULATION: 'simulation',
  DEBRIEF: 'debrief',
  FINAL_ASSESSMENT: 'final_assessment',
};


export const ADVANCED_BREACH_SIMULATION_ID = 'sim-the-breach';
export const ADVANCED_BREACH_SIMULATION_ROUTE = '/dashboard/simulations/the-last-request';
export const ADVANCED_FINAL_QUIZ_ID = 'quiz-advanced-decision-final';

export const certifications = [
  {
    id: 'cert-phishing-defense',
    title: 'GUARDUP SECURITY FUNDAMENTALS',
    shortDescription: 'Build the instincts required to recognize and stop everyday cyber threats.',
    description:
      'Build the instincts required to recognize and stop everyday cyber threats. Through guided lessons, knowledge checks, and a live spear phishing simulation, you will learn to identify red flags, verify suspicious messages, and apply safe email habits.',
    level: 'Beginner',
    estimatedDuration: '75 min',
    activityCount: 9,
    prerequisites: [],
    learningObjectives: [
      'Identify common phishing tactics and social engineering red flags',
      'Apply safe verification steps before clicking links or opening attachments',
      'Report suspicious messages using organizational procedures',
      'Demonstrate phishing recognition in a simulated spear phishing scenario',
    ],
    badge: {
      id: 'badge-phishing-defense',
      name: 'Security Fundamentals',
      tier: 'foundation',
      icon: 'shield-mail',
    },
    certificate: {
      id: 'certificate-phishing-defense',
      title: 'GUARDUP Security Fundamentals Certificate',
      issuer: 'GuardUp',
    },
    status: 'available',
    activities: [
      {
        id: 'phish-intro',
        type: 'intro',
        title: 'Welcome to Phishing Defense',
        description: 'Overview of phishing threats and how this certification builds your detection skills.',
        estimatedDuration: '5 min',
        metadata: {
          overview: 'Phishing remains the most common initial access method. This journey moves from concepts to practice.',
        },
      },
      {
        id: 'phish-art-8',
        type: 'article',
        title: 'Phishing Awareness: Recognizing the Hook',
        description: 'Learn to spot urgency, impersonation, and malicious links before they compromise your accounts.',
        resourceId: 'art-8',
        estimatedDuration: '8 min',
      },
      {
        id: 'phish-vid-5',
        type: 'video',
        title: 'Phishing: Email and Messaging Attacks',
        description: 'SANS Security Awareness overview of phishing tactics and practical avoidance steps.',
        resourceId: 'vid-5',
        estimatedDuration: '5 min',
      },
      {
        id: 'phish-quiz-1',
        type: 'quiz',
        title: 'Knowledge Check: Phishing Fundamentals',
        description: 'Confirm your understanding of phishing red flags and safe response habits.',
        quizId: 'quiz-phishing',
        estimatedDuration: '10 min',
        metadata: { passThreshold: 60 },
      },
      {
        id: 'phish-art-10',
        type: 'article',
        title: 'Email Security Best Practices',
        description: 'Strengthen email account protection, attachment handling, and secure communication habits.',
        resourceId: 'art-10',
        estimatedDuration: '7 min',
      },
      {
        id: 'phish-vid-8',
        type: 'video',
        title: 'Phishing Delivery Methods Explained',
        description: 'Understand how attackers reach victims through email, SMS, voice, and QR codes.',
        resourceId: 'vid-8',
        estimatedDuration: '6 min',
      },
      {
        id: 'phish-sim-1',
        type: 'simulation',
        title: 'Spear Phishing Attack Simulation',
        description: 'Apply your skills in a realistic spear phishing scenario in a safe environment.',
        simulationId: 'sim-1',
        estimatedDuration: '20 min',
        metadata: {
          route: '/dashboard/simulations/phishing/beginner',
          simulationLabel: 'Spear Phishing Attack',
        },
      },
      {
        id: 'phish-debrief',
        type: 'debrief',
        title: 'Simulation Debrief: Phishing Response',
        description: 'Review decision points from the simulation and reinforce reporting procedures.',
        estimatedDuration: '8 min',
        metadata: {
          focusAreas: [
            'Verifying sender identity before acting on requests',
            'Recognizing urgency and authority manipulation',
            'Reporting suspicious messages to security teams',
          ],
        },
      },
      {
        id: 'phish-final',
        type: 'final_assessment',
        title: 'Final Assessment: Phishing Defense',
        description: 'Demonstrate phishing recognition and safe response with a comprehensive knowledge check.',
        quizId: 'quiz-phishing-final',
        estimatedDuration: '10 min',
        metadata: { passThreshold: 60, requiresPriorActivities: true },
      },
    ],
  },
  {
    id: 'cert-ransomware-response',
    title: 'GUARDUP THREAT DEFENDER',
    shortDescription: 'Detect, analyze, and respond to phishing, social engineering, and ransomware threats.',
    description:
      'Detect, analyze, and respond to phishing, social engineering, and ransomware threats. Move from prevention concepts to incident response procedures, then practice in a ransomware attack simulation.',
    level: 'Intermediate',
    estimatedDuration: '90 min',
    activityCount: 10,
    prerequisites: ['cert-phishing-defense'],
    learningObjectives: [
      'Explain how ransomware enters and spreads through environments',
      'Apply prevention controls including backups, patching, and segmentation',
      'Execute initial containment steps when ransomware is suspected',
      'Complete a simulated ransomware incident response scenario',
    ],
    badge: {
      id: 'badge-ransomware-response',
      name: 'Threat Defender',
      tier: 'professional',
      icon: 'shield-lock',
    },
    certificate: {
      id: 'certificate-ransomware-response',
      title: 'GUARDUP Threat Defender Certificate',
      issuer: 'GuardUp',
    },
    status: 'available',
    activities: [
      {
        id: 'rw-intro',
        type: 'intro',
        title: 'Welcome to Ransomware Response',
        description: 'Understand the ransomware threat landscape and your response responsibilities.',
        estimatedDuration: '5 min',
        metadata: {
          overview: 'Ransomware combines encryption, extortion, and often data theft. Response speed matters.',
        },
      },
      {
        id: 'rw-art-11',
        type: 'article',
        title: 'Ransomware: Prevention and Response',
        description: 'Learn how ransomware works, spreads, and what to do when systems are affected.',
        resourceId: 'art-11',
        estimatedDuration: '10 min',
      },
      {
        id: 'rw-vid-2',
        type: 'video',
        title: 'Malware Prevention and Protection',
        description: 'Review malware and ransomware trends with practical defense strategies.',
        resourceId: 'vid-2',
        estimatedDuration: '15 min',
      },
      {
        id: 'rw-quiz-1',
        type: 'quiz',
        title: 'Knowledge Check: Ransomware Basics',
        description: 'Validate understanding of ransomware entry points and prevention priorities.',
        quizId: 'quiz-ransomware',
        estimatedDuration: '12 min',
        metadata: { passThreshold: 60 },
      },
      {
        id: 'rw-art-9',
        type: 'article',
        title: 'Social Engineering: The Human Attack Vector',
        description: 'Understand how social engineering enables ransomware initial access.',
        resourceId: 'art-9',
        estimatedDuration: '9 min',
      },
      {
        id: 'rw-art-12',
        type: 'article',
        title: 'Security Incident Response Basics',
        description: 'Learn the incident response lifecycle and your role when ransomware is suspected.',
        resourceId: 'art-12',
        estimatedDuration: '11 min',
      },
      {
        id: 'rw-sim-4',
        type: 'simulation',
        title: 'Ransomware Attack Response Simulation',
        description: 'Practice detection, containment, and communication during a ransomware incident.',
        simulationId: 'sim-4',
        estimatedDuration: '35 min',
        metadata: {
          route: '/dashboard/simulations/ransomware/advanced',
          simulationLabel: 'Ransomware Attack Response',
        },
      },
      {
        id: 'rw-debrief',
        type: 'debrief',
        title: 'Simulation Debrief: Ransomware Response',
        description: 'Review containment decisions, escalation paths, and recovery priorities.',
        estimatedDuration: '10 min',
        metadata: {
          focusAreas: [
            'Isolating affected systems without destroying evidence',
            'Escalating to security and IT leadership promptly',
            'Avoiding ransom payment and following backup recovery plans',
          ],
        },
      },
      {
        id: 'rw-quiz-2',
        type: 'quiz',
        title: 'Knowledge Check: Incident Response',
        description: 'Reinforce reporting, documentation, and containment principles.',
        quizId: 'quiz-social-engineering',
        estimatedDuration: '12 min',
        metadata: { passThreshold: 60 },
      },
      {
        id: 'rw-final',
        type: 'final_assessment',
        title: 'Final Assessment: Ransomware Response',
        description: 'Demonstrate ransomware prevention and response knowledge to earn certification.',
        quizId: 'quiz-ransomware-final',
        estimatedDuration: '12 min',
        metadata: { passThreshold: 60, requiresPriorActivities: true },
      },
    ],
  },
  {
    id: 'cert-advanced-threat',
    title: 'Advanced Cybersecurity Incident & Social Engineering',
    shortDescription:
      'Investigate identity attacks and social engineering through realistic workplace scenarios and interactive incident response.',
    description:
      'The highest-level GuardUP certification tests whether you can investigate suspicious workplace activity, recognize identity compromise, and respond appropriately. Move through focused learning modules, complete the interactive simulation The Last Request, and demonstrate applied judgment in a final assessment.',
    level: 'Advanced',
    estimatedDuration: '110 min',
    activityCount: 9,
    prerequisites: ['cert-ransomware-response'],
    learningObjectives: [
      'Recognize human behavior and social engineering as primary attack surfaces',
      'Investigate authentication anomalies and identity compromise indicators',
      'Verify requests through independent channels before acting',
      'Correlate evidence across email, chat, and security tools',
      'Escalate, contain, and communicate effectively during suspected incidents',
    ],
    badge: {
      id: 'badge-advanced-threat',
      name: 'Incident Response Specialist',
      tier: 'expert',
      icon: 'shield-alert',
    },
    certificate: {
      id: 'certificate-advanced-threat',
      title: 'Advanced Cybersecurity Incident & Social Engineering Certificate',
      issuer: 'GuardUp',
    },
    status: 'available',
    activities: [
      {
        id: 'adv-intro',
        type: 'intro',
        title: 'Welcome to Advanced Incident & Social Engineering',
        description:
          'Overview of identity attacks, workplace investigation, and the certification journey—including The Last Request simulation.',
        estimatedDuration: '5 min',
        metadata: {
          overview:
            'Advanced certification focuses on observation, verification, and escalation when workplace communications and authentication events do not add up.',
        },
      },
      {
        id: 'adv-mod-1',
        type: 'article',
        title: 'Module 1: The Human Attack Surface',
        description:
          'Understand why people—not only systems—are exploited, and how trust, authority, and urgency are manipulated.',
        resourceId: 'art-adv-mod-1',
        estimatedDuration: '12 min',
      },
      {
        id: 'adv-mod-2',
        type: 'article',
        title: 'Module 2: Identity Under Attack',
        description:
          'Learn how credential theft, MFA abuse, and suspicious authentication signal account compromise.',
        resourceId: 'art-adv-mod-2',
        estimatedDuration: '12 min',
      },
      {
        id: 'adv-mod-3',
        type: 'article',
        title: 'Module 3: Social Engineering in the Real World',
        description:
          'Recognize impersonation, pretexting, and pressure-based manipulation in everyday workplace channels.',
        resourceId: 'art-adv-mod-3',
        estimatedDuration: '13 min',
      },
      {
        id: 'adv-mod-4',
        type: 'article',
        title: 'Module 4: Investigating Suspicious Activity',
        description:
          'Correlate email headers, authentication alerts, directory records, and chat messages into an incident picture.',
        resourceId: 'art-adv-mod-4',
        estimatedDuration: '13 min',
      },
      {
        id: 'adv-mod-5',
        type: 'article',
        title: 'Module 5: From Suspicion to Incident',
        description:
          'Apply reporting, evidence preservation, account containment, and clear communication during incidents.',
        resourceId: 'art-adv-mod-5',
        estimatedDuration: '14 min',
      },
      {
        id: 'adv-sim-breach',
        type: 'simulation',
        title: 'Module 6: The Last Request',
        description:
          'An interactive workplace simulation. Investigate suspicious communications and authentication events as an incident unfolds.',
        simulationId: ADVANCED_BREACH_SIMULATION_ID,
        estimatedDuration: '25 min',
        metadata: {
          route: ADVANCED_BREACH_SIMULATION_ROUTE,
          simulationLabel: 'The Last Request',
        },
      },
      {
        id: 'adv-debrief',
        type: 'debrief',
        title: 'Simulation Debrief: The Last Request',
        description:
          'Review investigation choices, verification habits, and escalation patterns from the simulation.',
        estimatedDuration: '10 min',
        metadata: {
          focusAreas: [
            'Investigating authentication alerts before acting on requests',
            'Verifying IT and colleague contacts through official channels',
            'Correlating email, chat, and security center evidence',
            'Reporting incidents early with clear timelines',
          ],
          requiresSimulation: ADVANCED_BREACH_SIMULATION_ID,
        },
      },
      {
        id: 'adv-final',
        type: 'final_assessment',
        title: 'Module 7: Advanced Incident Assessment',
        description:
          'Demonstrate applied judgment on identity attacks, MFA abuse, investigation, escalation, and containment.',
        quizId: ADVANCED_FINAL_QUIZ_ID,
        estimatedDuration: '15 min',
        metadata: { passThreshold: 60, requiresPriorActivities: true },
      },
    ],
  },
];

export const getAllCertifications = () => certifications;

export const getCertificationById = (certificationId) =>
  certifications.find((cert) => cert.id === certificationId) || null;

export const getCertificationActivities = (certificationId) => {
  const cert = getCertificationById(certificationId);
  return cert?.activities ?? [];
};

export const getCertificationActivityById = (certificationId, activityId) => {
  const activities = getCertificationActivities(certificationId);
  return activities.find((activity) => activity.id === activityId) || null;
};
