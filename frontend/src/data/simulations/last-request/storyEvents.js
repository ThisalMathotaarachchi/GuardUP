import { OUTCOME_TYPES } from './lastRequestScenario';
import { DANIEL } from './simIdentity';

export const STORY_EVENTS = [
  {
    id: 'act1-mail-notify',
    act: 1,
    delayMs: 10000,
    type: 'notification',
    payload: { app: 'mail', title: 'Mail', subtitle: 'Inbox', body: '1 new message' },
  },
  {
    id: 'daniel-chat-open',
    act: 2,
    delayMs: 48000,
    type: 'chat-message',
    payload: {
      channelId: 'daniel',
      message: {
        id: 'chat-d1',
        from: DANIEL.displayName,
        text: 'Hey, got a second?',
        time: '09:05',
        incoming: true,
      },
    },
    notification: {
      app: 'chat',
      title: 'Chat',
      subtitle: DANIEL.displayName,
      body: 'Hey, got a second?',
    },
  },
  {
    id: 'daniel-chat-request',
    act: 2,
    delayMs: 78000,
    type: 'chat-message',
    requires: (s) => s.flags.danielIntroSeen,
    payload: {
      channelId: 'daniel',
      message: {
        id: 'chat-d2',
        from: DANIEL.displayName,
        text: 'Finance needs vendor portal access updated before 11. Can you approve the request and confirm the MFA code when it pops up? My phone is dead.',
        time: '09:08',
        incoming: true,
      },
      prompt: {
        decisionId: 'daniel-request',
        context: 'chat',
      },
    },
    notification: {
      app: 'chat',
      title: 'Chat',
      subtitle: DANIEL.displayName,
      body: 'Can you approve the vendor access request?',
    },
  },
  {
    id: 'email-vendor',
    act: 2,
    delayMs: 92000,
    type: 'email',
    emailId: 'email-vendor-daniel',
    notification: {
      app: 'mail',
      title: 'Mail',
      subtitle: DANIEL.displayName,
      body: 'Updated Vendor Access',
    },
  },
  {
    id: 'email-suspicious',
    act: 3,
    delayMs: 152000,
    type: 'email',
    emailId: 'email-suspicious-reset',
    notification: { app: 'mail', title: 'Mail', subtitle: 'Inbox', body: 'Password reset confirmation' },
  },
  {
    id: 'auth-alert',
    act: 3,
    delayMs: 168000,
    type: 'auth-alert',
    notification: {
      app: 'security',
      title: 'Security Center',
      subtitle: 'Authentication alert',
      body: 'New sign-in detected',
    },
  },
  {
    id: 'it-chat',
    act: 4,
    delayMs: 212000,
    type: 'chat-message',
    payload: {
      channelId: 'it-fake',
      message: {
        id: 'chat-it1',
        from: 'IT Support',
        text: 'Hi — this is IT Support. We detected unusual sign-in activity on your account and need to verify your identity immediately.',
        time: '09:45',
        incoming: true,
      },
    },
    notification: {
      app: 'chat',
      title: 'Chat',
      subtitle: 'IT Support',
      body: 'We need to verify your account',
    },
  },
  {
    id: 'it-chat-code',
    act: 4,
    delayMs: 228000,
    type: 'chat-message',
    requires: (s) => s.flags.itIntroSeen,
    payload: {
      channelId: 'it-fake',
      message: {
        id: 'chat-it2',
        from: 'IT Support',
        text: 'We need the verification code that was just sent to your account. Please reply here so we can secure the session.',
        time: '09:46',
        incoming: true,
      },
      prompt: {
        decisionId: 'it-verification',
        context: 'chat',
      },
    },
  },
  {
    id: 'security-contact',
    act: 5,
    delayMs: 272000,
    type: 'chat-message',
    requires: (s) => s.flags.authAlertTriggered,
    payload: {
      channelId: 'security',
      message: {
        id: 'chat-sec1',
        from: 'Security Operations',
        text: 'We are seeing coordinated authentication anomalies. If you observed anything unusual today, please report through Security Center or reply here.',
        time: '10:00',
        incoming: true,
      },
    },
    notification: {
      app: 'security',
      title: 'Security Center',
      subtitle: 'Security Operations',
      body: 'Incident investigation in progress',
    },
  },
  {
    id: 'force-resolution',
    act: 6,
    delayMs: 540000,
    type: 'force-resolution',
  },
];

export const OUTCOME_MESSAGES = {
  [OUTCOME_TYPES.THREAT_CONTAINED]: {
    title: 'SECURITY OPERATIONS',
    body: 'Incident contained.\n\nAffected session revoked.\nAccount secured.\nEvidence preserved.',
  },
  [OUTCOME_TYPES.BREACH_CONTAINED]: {
    title: 'SECURITY OPERATIONS',
    body: 'The affected account has been secured.\n\nSome unauthorized activity occurred before containment.',
  },
  [OUTCOME_TYPES.INCIDENT_ESCALATED]: {
    title: 'SECURITY INCIDENT',
    body: 'Unauthorized access confirmed.\n\nSecurity Operations has initiated emergency containment.',
  },
};
