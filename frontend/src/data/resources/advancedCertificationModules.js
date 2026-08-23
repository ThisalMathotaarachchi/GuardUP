

export const advancedCertificationModules = [
  {
    id: 'art-adv-mod-1',
    title: 'The Human Attack Surface',
    category: 'Advanced Incident & Social Engineering',
    type: 'article',
    difficulty: 'Advanced',
    description:
      'Understand why people—not only systems—are the most exploited entry point in modern organizations, and how attackers manipulate behavior.',
    author: 'GuardUP Team',
    date: '2026-03-01',
    readTime: '12 min',
    content: 'Human behavior is a primary attack surface in modern cybersecurity.',
    sections: [
      {
        heading: 'People as the Primary Attack Surface',
        paragraphs: [
          'Firewalls, encryption, and patching matter—but most successful breaches still begin with a person making a decision under uncertainty. Attackers target attention, trust, routine, and stress because these human factors are harder to patch than software.',
          'A technically secure system can still fail when someone approves a fraudulent payment, shares credentials with someone impersonating IT support, or clicks a link because a message feels familiar. Security awareness at the advanced level means recognizing that human judgment is part of the infrastructure.',
        ],
      },
      {
        heading: 'Social Engineering and Trust Exploitation',
        paragraphs: [
          'Social engineering does not require advanced malware. It requires credibility. Attackers research org charts, mimic internal tone, reference real projects, and exploit the assumption that “someone legitimate would not ask for this.”',
          'Trust exploitation works because workplaces depend on cooperation. Advanced defenders learn to separate politeness from authorization—being helpful does not mean bypassing verification when sensitive actions are requested.',
        ],
        list: [
          'Impersonation of executives, vendors, or IT staff',
          'Fabricated urgency that discourages verification',
          'Requests that feel small but enable larger compromise',
          'Exploitation of familiarity (“as discussed on the call”)',
        ],
      },
      {
        heading: 'Authority and Urgency Manipulation',
        paragraphs: [
          'Authority cues—titles, branded signatures, executive names—short-circuit scrutiny. Urgency compresses the time available to think. Together they push people to act before they verify.',
          'In realistic incidents, the safest response is rarely the fastest response. Pausing to confirm through a trusted channel is a professional action, not a failure of teamwork.',
        ],
        callout: {
          type: 'info',
          title: 'Workplace scenario',
          text: 'A message appears from “Finance Director” requesting an immediate wire transfer before end of day. The domain looks correct at a glance. What is your first action—process the request, or verify through a known contact method?',
        },
      },
      {
        heading: 'Why Secure Systems Still Fail Through People',
        paragraphs: [
          'Multi-factor authentication, segmentation, and monitoring reduce risk—but they do not eliminate social pathways. MFA fatigue attacks, help-desk pretexting, and session hijacking after credential theft all target human-process gaps.',
          'Advanced certification focuses on decision quality: knowing when a situation is ambiguous, when to escalate, and when “normal” behavior is actually a coordinated indicator.',
        ],
      },
    ],
    keyTakeaways: [
      'Human judgment is part of the security perimeter.',
      'Trust and urgency are common manipulation tools.',
      'Verification through independent channels is a core professional control.',
      'Technical controls and human decisions must work together.',
    ],
    tags: ['advanced', 'social-engineering', 'human-factors', 'certification'],
    source: 'GuardUP Advanced Certification',
  },
  {
    id: 'art-adv-mod-2',
    title: 'Identity Under Attack',
    category: 'Advanced Incident & Social Engineering',
    type: 'article',
    difficulty: 'Advanced',
    description:
      'Learn how credential theft, session compromise, and authentication anomalies signal account takeover—and how to respond before damage spreads.',
    author: 'GuardUP Team',
    date: '2026-03-01',
    readTime: '12 min',
    content: 'Identity has become the primary security perimeter.',
    sections: [
      {
        heading: 'From Network Perimeter to Identity Perimeter',
        paragraphs: [
          'Remote work, cloud applications, and SaaS tools mean users authenticate from many locations and devices. The “inside the office network” boundary is largely gone. Identity—who is accessing what, from where, and with what session—is now the control point.',
          'Advanced defenders treat credentials, sessions, and authentication events as high-value signals, not administrative noise.',
        ],
      },
      {
        heading: 'Credential Theft and Account Compromise',
        paragraphs: [
          'Stolen passwords from phishing, infostealer malware, or third-party breaches are frequently tested against corporate login portals. A single reused password can grant access to email, file shares, and internal tools.',
          'Account compromise often begins quietly: an attacker reads mail, learns internal processes, and waits for the right moment to impersonate the user or request sensitive actions.',
        ],
        list: [
          'Unexpected password reset notifications',
          'Login alerts from unfamiliar locations or devices',
          'Mailbox rules that forward or hide messages',
          'Requests sent from a real account with unusual tone or timing',
        ],
      },
      {
        heading: 'Authentication Attacks and MFA Abuse',
        paragraphs: [
          'Multi-factor authentication significantly reduces risk, but attackers adapt. MFA fatigue (repeated push notifications), SIM swapping, and adversary-in-the-middle phishing kits target the authentication step itself.',
          'Suspicious authentication is not only “wrong password.” It includes impossible travel, new device enrollment, token replay patterns, and successful logins immediately followed by sensitive actions.',
        ],
      },
      {
        heading: 'Recognizing Unauthorized Access',
        paragraphs: [
          'When colleagues report odd account behavior—missing messages, sent items they did not create, or calendar invites they did not accept—treat it as a potential identity incident, not a minor glitch.',
          'Early containment for identity events (session revocation, password reset, device review) limits lateral movement and business email compromise.',
        ],
        callout: {
          type: 'warning',
          title: 'Decision point',
          text: 'You receive an alert that your account signed in from another country while you are at your desk. Do you dismiss it as a false positive, or report it immediately and avoid using the account until verified?',
        },
      },
    ],
    keyTakeaways: [
      'Identity and session integrity define the modern perimeter.',
      'Authentication anomalies are early compromise indicators.',
      'MFA helps but does not eliminate identity-targeted attacks.',
      'Report suspicious account activity before attempting self-fixes that destroy evidence.',
    ],
    tags: ['advanced', 'identity', 'authentication', 'certification'],
    source: 'GuardUP Advanced Certification',
  },
  {
    id: 'art-adv-mod-3',
    title: 'Social Engineering in the Real World',
    category: 'Advanced Incident & Social Engineering',
    type: 'article',
    difficulty: 'Advanced',
    description:
      'Practice recognizing impersonation, pretexting, and phone-based manipulation when stress and urgency reduce your ability to think clearly.',
    author: 'GuardUP Team',
    date: '2026-03-01',
    readTime: '13 min',
    content: 'Pressure is a deliberate feature of many social engineering attacks.',
    sections: [
      {
        heading: 'Why Pressure Changes Decision Quality',
        paragraphs: [
          'Under time pressure, people rely on heuristics: familiarity, authority, and emotional tone. Attackers engineer situations where verification feels rude, slow, or risky to the requester.',
          'Advanced awareness means having pre-decided habits—scripts for verification—that work even when you feel rushed.',
        ],
      },
      {
        heading: 'Impersonation and Pretexting',
        paragraphs: [
          'Impersonation uses a believable role: IT support, HR, legal, a vendor, or a senior leader. Pretexting supplies a coherent story that explains why normal procedures should be skipped.',
          'Phone-based social engineering adds voice tone and real-time adaptation, making it harder to inspect links or domains. Callers may reference internal tools, ticket numbers, or colleagues by name.',
        ],
        list: [
          'Caller ID and email display names are not proof of identity',
          '“I am from IT—what is your password so I can fix this?” is never legitimate',
          'Callbacks to official published numbers break most pretexts',
          'Sensitive data requests should follow policy, not caller insistence',
        ],
      },
      {
        heading: 'Authority, Urgency, and Familiarity Combined',
        paragraphs: [
          'The most effective manipulations combine multiple cues: a trusted name, a plausible crisis, and a specific instruction that seems small. “Just read me the MFA code” or “confirm your employee ID for the audit” are common escalation steps.',
          'Professional pushback is appropriate: “I will call you back through the help desk number on the intranet.” Legitimate staff accept verification; attackers often escalate pressure or hang up.',
        ],
        callout: {
          type: 'info',
          title: 'Under pressure',
          text: 'A caller claims the CEO needs an immediate file transfer for a confidential acquisition. They discourage you from confirming because “there is no time.” What organizational control should still apply?',
        },
      },
      {
        heading: 'Requests for Credentials or Sensitive Information',
        paragraphs: [
          'No legitimate support process requires you to disclose passwords, MFA codes, or full payment card data over phone or chat. Requests for remote access without a verified ticket should be refused and reported.',
          'When in doubt, pause and escalate to your security or IT team using known channels. Speed without verification is a common failure mode in business email compromise and help-desk fraud.',
        ],
      },
    ],
    keyTakeaways: [
      'Pressure is often manufactured—slow down when urgency appears.',
      'Verify identity through independent, organization-approved channels.',
      'Never share credentials or MFA codes based on unsolicited contact.',
      'Escalate ambiguous social engineering attempts early.',
    ],
    tags: ['advanced', 'pretexting', 'phone-fraud', 'certification'],
    source: 'GuardUP Advanced Certification',
  },
  {
    id: 'art-adv-mod-4',
    title: 'Investigating Suspicious Activity',
    category: 'Advanced Incident & Social Engineering',
    type: 'article',
    difficulty: 'Advanced',
    description:
      'Learn to correlate weak indicators—auth alerts, odd emails, device anomalies—into a coherent incident picture before damage escalates.',
    author: 'GuardUP Team',
    date: '2026-03-01',
    readTime: '13 min',
    content: 'Individual alerts rarely tell the full story; correlation does.',
    sections: [
      {
        heading: 'Weak Indicators Become Strong When Combined',
        paragraphs: [
          'A single odd login might be benign. A password reset request, a new device enrollment, and an unusual outbound email rule within the same hour suggest coordinated compromise. Advanced recognition is pattern-based, not checklist-based.',
          'Document what you observed and when. Timelines help security teams distinguish isolated mistakes from active intrusion.',
        ],
      },
      {
        heading: 'Suspicious Authentication and Session Activity',
        paragraphs: [
          'Review authentication alerts critically: geography, device fingerprint, application accessed, and time of day. Successful login to email followed immediately by file download or forwarding rules is a common post-compromise pattern.',
          'Users should report anomalies even if they later seem explainable—security teams need raw signals early.',
        ],
        list: [
          'Unexpected MFA prompts you did not initiate',
          'Sessions that remain active after you signed out',
          'Applications accessing mail or files you do not use',
          'Colleagues receiving mail “from you” that you did not send',
        ],
      },
      {
        heading: 'Suspicious Communications',
        paragraphs: [
          'Communications anomalies include sudden changes in writing style, unusual requests from familiar senders, and threads that move sensitive topics to personal email. Attackers who control an inbox often reply within existing conversations to appear legitimate.',
          'When a request involves money, credentials, or data exfiltration, apply enhanced verification regardless of thread history.',
        ],
      },
      {
        heading: 'Building an Incident Timeline',
        paragraphs: [
          'A simple timeline—who, what, when, where—accelerates response. Note the first suspicious event, subsequent alerts, actions you took, and people you notified.',
          'Escalate when indicators align, even if you cannot prove malicious intent yet. Waiting for certainty often means waiting too long.',
        ],
        callout: {
          type: 'warning',
          title: 'Correlation exercise',
          text: 'Monday: failed login alerts. Tuesday: help desk ticket about “locked account.” Wednesday: finance receives changed bank details from a vendor contact. What connects these events?',
        },
      },
    ],
    keyTakeaways: [
      'Correlate authentication, communication, and behavior anomalies.',
      'Timelines turn scattered alerts into actionable intelligence.',
      'Escalate on pattern alignment, not only on confirmed malware.',
      'Preserve observations—do not alter evidence while investigating alone.',
    ],
    tags: ['advanced', 'detection', 'correlation', 'certification'],
    source: 'GuardUP Advanced Certification',
  },
  {
    id: 'art-adv-mod-5',
    title: 'From Suspicion to Incident',
    category: 'Advanced Incident & Social Engineering',
    type: 'article',
    difficulty: 'Advanced',
    description:
      'Apply reporting, containment, communication, and evidence preservation practices when a suspected incident affects accounts, data, or business operations.',
    author: 'GuardUP Team',
    date: '2026-03-01',
    readTime: '14 min',
    content: 'How you escalate and communicate during an incident determines outcome.',
    sections: [
      {
        heading: 'Reporting Suspicious Activity',
        paragraphs: [
          'Know your organization’s reporting path: security mailbox, help desk category, or incident hotline. Reports should be factual—what happened, when, who is affected, and what actions were taken.',
          'Do not assume someone else already reported a similar alert. Duplicate reports are easier to merge than missing early warnings.',
        ],
      },
      {
        heading: 'Preserving Relevant Information',
        paragraphs: [
          'Preserve headers, screenshots, call details, and timestamps. Avoid forwarding phishing messages in ways that strip metadata unless instructed by security. Do not delete suspicious mail or wipe devices unless directed—evidence supports root cause analysis.',
        ],
        list: [
          'Forward suspicious email as an attachment when possible',
          'Record caller number, time, and claimed identity',
          'Note account changes you observed before remediation',
          'Avoid discussing sensitive incident details in open channels',
        ],
      },
      {
        heading: 'Account Containment and Session Isolation',
        paragraphs: [
          'When account compromise is suspected, containment may include forced sign-out, password reset, MFA re-enrollment, and device review. These steps are typically performed by IT or security—not ad hoc by untrained users.',
          'Your role is rapid reporting and avoiding actions that alert the attacker or destroy logs.',
        ],
      },
      {
        heading: 'Communicating With Security Teams',
        paragraphs: [
          'Clear, concise communication helps responders prioritize. State impact: “I cannot access mail,” “I see unauthorized forwards,” or “Finance received altered payment instructions.” Avoid speculation presented as fact.',
          'During active incidents, use approved communication channels. Public social media or personal messaging about internal incidents can aid attackers.',
        ],
      },
      {
        heading: 'Post-Incident Review',
        paragraphs: [
          'After resolution, participate in debriefs when invited. Lessons learned improve controls, training, and detection rules. Personal reflection: which indicator would you recognize faster next time?',
        ],
        callout: {
          type: 'info',
          title: 'Response habit',
          text: 'If you suspect account compromise, what three facts should you include in your first report to security?',
        },
      },
    ],
    keyTakeaways: [
      'Report early with timestamps and factual detail.',
      'Preserve evidence; avoid unguided “self-remediation.”',
      'Containment of accounts and sessions is a coordinated IT/security function.',
      'Post-incident review strengthens organizational resilience.',
    ],
    tags: ['advanced', 'incident-response', 'escalation', 'certification'],
    source: 'GuardUP Advanced Certification',
  },
];
