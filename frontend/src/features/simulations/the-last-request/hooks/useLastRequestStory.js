import { useCallback, useReducer } from 'react';
import { INITIAL_DIMENSIONS, SIM_START_MINUTES } from '../../../../data/simulations/last-request/lastRequestScenario';
import { INITIAL_EVIDENCE, EVIDENCE_BONUSES } from '../../../../data/simulations/last-request/evidenceModel';
import {
  applyDimensionDeltas,
  getDecisionById,
} from '../../../../data/simulations/last-request/decisionWeights';
import {
  deriveCompromiseTier,
  deriveOutcomeType,
} from '../../../../data/simulations/last-request/outcomeEngine';
import { INITIAL_EMAILS, STORY_EMAILS, AUTH_EVENTS, ACTIVE_SESSIONS, INITIAL_CHAT } from '../../../../data/simulations/last-request/appContent';
import { SIM_EMPLOYEE, DANIEL } from '../../../../data/simulations/last-request/simIdentity';
import { getDanielReply } from '../../../../data/simulations/last-request/npcResponses';
import { CHAT_REPLY_TEXT } from '../../../../data/simulations/last-request/chatReplyText';

const formatChatTime = (simMinutes) => {
  const h = Math.floor(simMinutes / 60);
  const m = simMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

const countUnreadChat = (chat) => {
  let count = 0;
  Object.values(chat).forEach((channel) => {
    channel.forEach((m) => {
      if (m.incoming && !m.read) count += 1;
    });
  });
  return count;
};

const markChatRead = (chat) => {
  const next = {};
  Object.entries(chat).forEach(([channelId, messages]) => {
    next[channelId] = messages.map((m) => (m.incoming ? { ...m, read: true } : m));
  });
  return next;
};

const initialChat = () => ({
  colleagues: [...INITIAL_CHAT.colleagues],
  daniel: [],
  'it-fake': [],
  security: [],
});

const initialState = () => ({
  simMinutes: SIM_START_MINUTES,
  phase: 'workday',
  act: 1,
  dimensions: { ...INITIAL_DIMENSIONS },
  evidence: { ...INITIAL_EVIDENCE },
  decisions: [],
  compromiseScore: 0,
  startedAt: Date.now(),
  outcomeType: null,
  completed: false,
  emails: [...INITIAL_EMAILS],
  chat: initialChat(),
  authEvents: [...AUTH_EVENTS],
  sessions: [...ACTIVE_SESSIONS],
  notifications: [],
  flags: {
    danielIntroSeen: false,
    danielRequestResolved: false,
    itIntroSeen: false,
    itRequestResolved: false,
    authAlertTriggered: false,
    authAlertResolved: false,
    resolutionStarted: false,
  },
  activePrompt: null,
  unread: { mail: 4, chat: 1, security: 0 },
  triggeredEvents: [],
});

const clampEvidence = (evidence, deltas = {}) => {
  const next = { ...evidence, ...deltas };
  return next;
};

const lastRequestReducer = (state, action) => {
  switch (action.type) {
    case 'TICK': {
      const simMinutes = state.simMinutes + (action.minutes || 1);
      return { ...state, simMinutes };
    }

    case 'SET_FLAG':
      return { ...state, flags: { ...state.flags, [action.key]: action.value } };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications.slice(-4), action.notification],
      };

    case 'DISMISS_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.id),
      };

    case 'ADD_EMAIL': {
      const email = STORY_EMAILS[action.emailId];
      if (!email || state.emails.some((e) => e.id === email.id)) return state;
      return {
        ...state,
        emails: [email, ...state.emails],
        unread: { ...state.unread, mail: state.unread.mail + 1 },
      };
    }

    case 'READ_EMAIL': {
      const email = state.emails.find((e) => e.id === action.emailId);
      if (!email) return state;
      let evidence = { ...state.evidence };
      let dimensions = state.dimensions;
      if (email.suspicious) {
        evidence = clampEvidence(evidence, { suspiciousEmailOpened: true });
      }
      if (action.inspectHeaders) {
        evidence = clampEvidence(evidence, { senderHeadersInspected: true });
        dimensions = applyDimensionDeltas(dimensions, EVIDENCE_BONUSES.senderHeadersInspected);
      }
      return {
        ...state,
        emails: state.emails.map((e) =>
          e.id === action.emailId ? { ...e, read: true, headersVisible: action.inspectHeaders || e.headersVisible } : e
        ),
        unread: { ...state.unread, mail: Math.max(0, state.unread.mail - (email.read ? 0 : 1)) },
        evidence,
        dimensions,
      };
    }

    case 'ADD_CHAT': {
      const { channelId, message } = action;
      const channel = state.chat[channelId] || [];
      if (channel.some((m) => m.id === message.id)) return state;
      const flags = { ...state.flags };
      if (channelId === 'daniel' && message.incoming) flags.danielIntroSeen = true;
      if (channelId === 'it-fake' && message.incoming) flags.itIntroSeen = true;
      const chat = {
        ...state.chat,
        [channelId]: [...channel, { ...message, read: message.incoming ? false : true }],
      };
      return {
        ...state,
        chat,
        flags,
        unread: {
          ...state.unread,
          chat: countUnreadChat(chat),
        },
      };
    }

    case 'SEND_CHAT': {
      const { channelId, text } = action;
      const message = {
        id: `out-${Date.now()}`,
        from: 'You',
        text,
        time: formatChatTime(state.simMinutes),
        incoming: false,
        read: true,
      };
      return {
        ...state,
        chat: { ...state.chat, [channelId]: [...(state.chat[channelId] || []), message] },
      };
    }

    case 'SET_PROMPT':
      return { ...state, activePrompt: action.prompt };

    case 'CLEAR_PROMPT':
      return { ...state, activePrompt: null };

    case 'MARK_EVENT':
      return {
        ...state,
        triggeredEvents: [...state.triggeredEvents, action.eventId],
      };

    case 'AUTH_ALERT': {
      if (state.flags.authAlertTriggered) return state;
      return {
        ...state,
        flags: { ...state.flags, authAlertTriggered: true },
        authEvents: [
          ...state.authEvents,
          {
            id: 'auth-suspicious-1',
            time: '09:17',
            type: 'Authentication attempt',
            account: SIM_EMPLOYEE.account,
            employee: SIM_EMPLOYEE.displayName,
            location: 'Unknown',
            device: 'Unrecognized device',
            status: 'alert',
            message: 'Sign-in attempt from an unusual location.',
          },
          {
            id: 'auth-mfa-1',
            time: '09:18',
            type: 'MFA challenge issued',
            account: SIM_EMPLOYEE.account,
            employee: SIM_EMPLOYEE.displayName,
            location: 'Unknown',
            device: 'Unrecognized device',
            status: 'alert',
            message: 'Multi-factor authentication challenge triggered.',
          },
        ],
        sessions: [
          ...state.sessions,
          { id: 'session-remote', device: 'Unknown browser', location: 'Southeast Asia', active: true, suspicious: true },
        ],
        evidence: clampEvidence(state.evidence, {
          authAlertSeen: true,
          unexpectedAuthenticationObserved: true,
          securityAlertObserved: true,
        }),
        dimensions: applyDimensionDeltas(state.dimensions, EVIDENCE_BONUSES.authAlertSeen || { situationalAwareness: 3 }),
        unread: { ...state.unread, security: state.unread.security + 1 },
      };
    }

    case 'VERIFY_DIRECTORY':
      return {
        ...state,
        evidence: clampEvidence(state.evidence, { employeeDirectoryVerified: true }),
        dimensions: applyDimensionDeltas(state.dimensions, EVIDENCE_BONUSES.employeeDirectoryVerified),
      };

    case 'OPEN_FILE': {
      let evidence = { ...state.evidence };
      let dimensions = state.dimensions;
      if (action.suspicious) {
        evidence = clampEvidence(evidence, { suspiciousFileOpened: true });
        dimensions = applyDimensionDeltas(dimensions, EVIDENCE_BONUSES.suspiciousFileOpened);
      }
      return { ...state, evidence, dimensions };
    }

    case 'REPORT_INCIDENT':
      return {
        ...state,
        evidence: clampEvidence(state.evidence, { securityReportSubmitted: true }),
        dimensions: applyDimensionDeltas(state.dimensions, EVIDENCE_BONUSES.securityReportSubmitted),
        flags: { ...state.flags, authAlertResolved: true },
      };

    case 'MAKE_DECISION': {
      const def = getDecisionById(action.decisionId);
      const option = def?.options.find((o) => o.id === action.optionId);
      if (!def || !option) return state;

      let dimensions = applyDimensionDeltas(state.dimensions, option.dimensions);
      const evidence = clampEvidence(state.evidence, option.evidence || {});
      const compromiseScore = Math.max(0, Math.min(100, state.compromiseScore + (option.compromiseDelta || 0)));

      const flags = { ...state.flags };
      if (action.decisionId === 'daniel-request') flags.danielRequestResolved = true;
      if (action.decisionId === 'it-verification') flags.itRequestResolved = true;
      if (action.decisionId === 'auth-incident') flags.authAlertResolved = true;

      let chat = state.chat;
      const chatDecisionChannels = {
        'daniel-request': 'daniel',
        'it-verification': 'it-fake',
      };
      const chatChannelId = chatDecisionChannels[action.decisionId];
      const replyText = CHAT_REPLY_TEXT[action.optionId];

      if (chatChannelId && replyText) {
        chat = {
          ...chat,
          [chatChannelId]: [
            ...(chat[chatChannelId] || []),
            {
              id: `user-${action.decisionId}-${action.optionId}`,
              from: 'You',
              text: replyText,
              time: formatChatTime(state.simMinutes),
              incoming: false,
              read: true,
            },
          ],
        };
      }

      if (action.decisionId === 'daniel-request') {
        const reply = getDanielReply(action.decisionId, action.optionId);
        chat = {
          ...chat,
          daniel: [
            ...(chat.daniel || []),
            {
              id: `daniel-reply-${action.optionId}`,
              from: DANIEL.displayName,
              text: reply,
              time: '09:09',
              incoming: true,
              read: true,
            },
          ],
        };
      }

      return {
        ...state,
        dimensions,
        evidence,
        compromiseScore,
        flags,
        chat,
        activePrompt: null,
        decisions: [
          ...state.decisions,
          {
            decisionId: action.decisionId,
            optionId: action.optionId,
            time: def.time,
            label: def.label,
          },
        ],
      };
    }

    case 'START_RESOLUTION':
      return { ...state, phase: 'resolution', flags: { ...state.flags, resolutionStarted: true } };

    case 'SET_OUTCOME': {
      const compromiseTier = deriveCompromiseTier(state.compromiseScore, state.dimensions);
      const outcomeType = deriveOutcomeType(
        compromiseTier,
        state.dimensions,
        state.evidence,
        state.compromiseScore
      );
      return { ...state, outcomeType, compromiseTier, phase: 'complete', completed: true };
    }

    case 'CLEAR_UNREAD': {
      if (action.app === 'chat') {
        const chat = markChatRead(state.chat);
        return {
          ...state,
          chat,
          unread: { ...state.unread, chat: 0 },
        };
      }
      return { ...state, unread: { ...state.unread, [action.app]: 0 } };
    }

    default:
      return state;
  }
};

export const useLastRequestStory = () => {
  const [state, dispatch] = useReducer(lastRequestReducer, undefined, initialState);

  const makeDecision = useCallback((decisionId, optionId) => {
    dispatch({ type: 'MAKE_DECISION', decisionId, optionId });
  }, []);

  return { state, dispatch, makeDecision };
};

export default useLastRequestStory;
