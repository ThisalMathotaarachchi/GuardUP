import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, Search, Settings, PenSquare, Inbox, Star, Clock, Send, FileText,
  ChevronDown, ChevronUp, AlertTriangle, Archive, Trash2, Mail, MailOpen,
  Reply, ReplyAll, Forward, Shield, Globe, Lock, MoreVertical, Tag, Flag, Lightbulb, GripVertical,
} from 'lucide-react';
import BadgePopup from './BadgePopup';
import { useSimulationFeedback } from './SimulationFeedbackContext';

const SIDEBAR_FOLDERS = [
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'starred', label: 'Starred', icon: Star },
  { id: 'snoozed', label: 'Snoozed', icon: Clock },
  { id: 'sent', label: 'Sent', icon: Send },
  { id: 'drafts', label: 'Drafts', icon: FileText },
  { id: 'important', label: 'Important', icon: Flag },
  { id: 'scheduled', label: 'Scheduled', icon: Clock },
  { id: 'spam', label: 'Spam', icon: AlertTriangle },
  { id: 'trash', label: 'Trash', icon: Trash2 },
];

const MORE_FOLDER_IDS = ['important', 'scheduled', 'spam', 'trash'];

const TABS = ['Primary', 'Social', 'Promotions', 'Updates'];

const FOLDER_LABELS = {
  inbox: 'Inbox',
  starred: 'Starred',
  snoozed: 'Snoozed',
  sent: 'Sent',
  drafts: 'Drafts',
  important: 'Important',
  scheduled: 'Scheduled',
  spam: 'Spam',
  trash: 'Trash',
};

const BREACH_TIMER_SECONDS = 45;

const SCORE_POINTS = { CORRECT: 10, WRONG: -5, SETTING: 5, SPEED: 5 };
const MAX_POINTS = 15 * SCORE_POINTS.CORRECT + 4 * SCORE_POINTS.SETTING + SCORE_POINTS.SPEED;

const BREACH_RECOVERY_OPTIONS = [
  { id: 'password', label: 'Change password immediately', correct: true },
  { id: '2fa', label: 'Enable two-factor authentication', correct: true },
  { id: 'it', label: 'Report to IT Department', correct: true },
  {
    id: 'ignore',
    label: 'Ignore and continue',
    correct: false,
    consequence: 'The breach spread to connected systems. Sensitive data is still being exfiltrated.',
  },
];


const RECEIVED_AT_OFFSETS = {
  p1: -2 * 86400000 - 4 * 3600000,
  p2: -86400000 - 2 * 3600000,
  p3: -86400000 + 1 * 3600000,
  p6: -20 * 3600000,
  p7: -18 * 3600000,
  p9: -15 * 3600000,
  p10: -12 * 3600000,
  s1: -2 * 86400000 - 2 * 3600000,
  s3: -86400000 - 6 * 3600000,
  pr1: -3 * 86400000,
  pr3: -2 * 86400000 - 3 * 3600000,
  u1: -5 * 3600000,
  u2: -3 * 3600000,
  star1: -36 * 3600000,
  imp1: -6 * 3600000,
  sched1: -86400000 + 4 * 3600000,
  sent1: -3 * 86400000,
  sent2: -2 * 86400000 - 5 * 3600000,
  draft1: -2 * 3600000,
};


const buildArrivalDelays = (incomingEmails) => {
  const delays = {};
  const ids = incomingEmails.map((e) => e.id);
  let t = 10 + Math.floor(Math.random() * 12);
  let i = 0;
  while (i < ids.length) {
    if (Math.random() < 0.28 && i < ids.length - 1) {
      delays[ids[i]] = t;
      delays[ids[i + 1]] = t;
      i += 2;
    } else {
      delays[ids[i]] = t;
      i += 1;
    }
    t += 14 + Math.floor(Math.random() * 22);
    if (t > 285 && i < ids.length) t = 285 - (ids.length - i) * 6;
  }
  return delays;
};

const pointsToPercent = (points) => Math.max(0, Math.min(100, Math.round((points / MAX_POINTS) * 100)));

const computeXpFromPoints = (points, streak) => {
  let mult = 1;
  if (points >= MAX_POINTS * 0.9) mult = 3;
  else if (points >= MAX_POINTS * 0.75) mult = 2.5;
  else if (points >= MAX_POINTS * 0.6) mult = 2;
  else if (points >= MAX_POINTS * 0.45) mult = 1.5;
  if (streak >= 5) mult += 0.5;
  else if (streak >= 3) mult += 0.25;
  return Math.round((points / MAX_POINTS) * 100 * mult);
};

const MILESTONE_BADGES = [
  { id: 'streak3', check: (s) => s.streak >= 3, name: 'Hot Streak', description: '3 correct decisions in a row!', tier: 'epic' },
  { id: 'streak5', check: (s) => s.streak >= 5, name: 'On Fire', description: '5 correct decisions in a row!', tier: 'epic' },
  { id: 'correct5', check: (s) => s.correctCount >= 5, name: 'Sharp Eye', description: '5 emails handled correctly', tier: 'rare' },
  { id: 'correct10', check: (s) => s.correctCount >= 10, name: 'Phishing Hunter', description: '10 emails handled correctly', tier: 'rare' },
];

const CONTEXT_TIPS = {
  taskIntro: 'Review unread categories, open each message, and decide whether it is safe or suspicious.',
  unreadCategories: 'Check Primary, Social, Promotions, and Updates — new messages may arrive in any category.',
  sender: 'Before deciding, verify whether the sender address matches the organization it claims to represent.',
  link: 'Inspect where the link leads before trusting it. Hover to preview the URL.',
  urgent: 'Urgency is a common phishing tactic. Slow down before acting on pressure to respond immediately.',
  settings: 'Security settings can earn bonus points — try enabling them in Settings.',
  inactive: 'Start by checking unread categories, then open an email and review its sender, subject, and content.',
  firstOpen: 'Open the message, then inspect the sender domain, subject line, and any links or requests.',
  firstClassification: 'Take your time — review sender, message context, and links before choosing Safe or Report Phishing.',
  wrongSafe: 'When marking safe, verify the sender domain matches who they claim to be.',
  wrongReport: 'Before reporting, look for mismatched domains, suspicious links, or unusual requests.',
  remaining: 'Unread messages remain — continue reviewing each one before the timer runs out.',
  checkLinks: 'Links can hide their true destination — hover to inspect before making your decision.',
};

const parseSender = (from) => {
  const match = from.match(/^(.+?)\s*<(.+)>$/);
  return match ? { name: match[1].trim(), email: match[2] } : { name: from, email: from };
};

const getInitials = (name) =>
  name.split(' ').filter(Boolean).map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return '';
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.round((startOfToday - startOfDate) / 86400000);

  if (dayDiff === 1) return `Yesterday at ${timeStr}`;
  if (dayDiff < 7) return `${dayDiff} days ago`;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
};

const avatarColor = (name) => {
  const colors = ['#1a73e8', '#e37400', '#0b8043', '#d50000', '#8e24aa', '#039be5', '#616161'];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const isScoredEmail = (email) =>
  email.scored !== false && email.type !== 'decoy' && (email.type === 'safe' || email.type === 'phishing');

const BrandHeader = ({ brand }) => {
  if (!brand) return null;
  return (
    <div
      className="mb-5 p-4 rounded-lg border"
      style={{ borderColor: `${brand.color}33`, backgroundColor: `${brand.color}08` }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-md flex items-center justify-center text-sm font-bold shadow-sm"
          style={{ backgroundColor: brand.color, color: brand.textColor || '#fff' }}
        >
          {brand.logoText}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#202124]">{brand.name}</p>
          <p className="text-xs text-[#5f6368]">Official notification</p>
        </div>
      </div>
    </div>
  );
};

const SimulationWorkspace = ({ scenario, onComplete }) => {
  const { showFeedback } = useSimulationFeedback();
  const [emails, setEmails] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState('mail');
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [activeTab, setActiveTab] = useState('Primary');
  const [searchQuery, setSearchQuery] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(scenario.timeLimit || 300);
  const [active, setActive] = useState(true);
  const [breach, setBreach] = useState(false);
  const [breachTimer, setBreachTimer] = useState(0);
  const [breachMaxTimer, setBreachMaxTimer] = useState(BREACH_TIMER_SECONDS);
  const [breachMessage, setBreachMessage] = useState('');
  const [breachFeedback, setBreachFeedback] = useState(null);
  const [settingsActions, setSettingsActions] = useState([]);
  const [settingsEnabled, setSettingsEnabled] = useState({ '2fa': false, privacy: false, encryption: false, alerts: false });
  const [breaches, setBreaches] = useState(0);
  const [recovered, setRecovered] = useState(false);
  const [metrics, setMetrics] = useState({ accuracy: 0, avgReactionTime: 0, totalEmails: 0 });
  const [finished, setFinished] = useState(false);
  const [readIds, setReadIds] = useState(new Set());
  const [starredIds, setStarredIds] = useState(new Set());
  const [settingsTab, setSettingsTab] = useState('general');
  const [reportNotice, setReportNotice] = useState(null);
  const [scorePoints, setScorePoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [shownTips, setShownTips] = useState(new Set());
  const [activeTip, setActiveTip] = useState(null);
  const [milestoneBadge, setMilestoneBadge] = useState(null);
  const [earnedMilestones, setEarnedMilestones] = useState(new Set());
  const [badgePos, setBadgePos] = useState({ x: null, y: null });
  const [draggingBadge, setDraggingBadge] = useState(false);
  const lastActivityRef = useRef(Date.now());
  const emailOpenTimeRef = useRef(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const arrivalTimersRef = useRef([]);
  const completingRef = useRef(false);
  const firstEmailOpenedRef = useRef(false);
  const wrongSafeCountRef = useRef(0);
  const wrongReportCountRef = useRef(0);
  const firstClassificationRef = useRef(false);
  const linkHoverTipRef = useRef(false);

  const employeeInitials = getInitials(scenario.employeeName || 'User');

  const showTip = useCallback((tipId) => {
    setShownTips((prev) => {
      if (prev.has(tipId)) return prev;
      setActiveTip({ id: tipId, text: CONTEXT_TIPS[tipId] });
      setTimeout(() => setActiveTip((t) => (t?.id === tipId ? null : t)), 6000);
      return new Set([...prev, tipId]);
    });
  }, []);

  const touchActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
  }, []);

  const checkMilestones = useCallback((nextStreak, nextCorrect) => {
    const snapshot = { streak: nextStreak, correctCount: nextCorrect };
    MILESTONE_BADGES.forEach((m) => {
      if (m.check(snapshot)) {
        setEarnedMilestones((prev) => {
          if (prev.has(m.id)) return prev;
          setMilestoneBadge([{ name: m.name, description: m.description, tier: m.tier }]);
          return new Set([...prev, m.id]);
        });
      }
    });
  }, []);

  const applyScoreDelta = useCallback((delta, isCorrect) => {
    setScorePoints((p) => Math.max(0, p + delta));
    if (isCorrect) {
      setStreak((s) => {
        const next = s + 1;
        setCorrectCount((c) => {
          const nc = c + 1;
          checkMilestones(next, nc);
          return nc;
        });
        return next;
      });
    } else {
      setStreak(0);
    }
  }, [checkMilestones]);

  useEffect(() => {
    const now = Date.now();
    const incoming = scenario.emails.filter((e) => e.incoming === true);
    const delays = buildArrivalDelays(incoming);
    const init = scenario.emails.map((e, i) => {
      const isIncoming = e.incoming === true;
      return {
        ...e,
        index: i,
        delivered: !isIncoming,
        receivedAt: isIncoming ? null : now + (RECEIVED_AT_OFFSETS[e.id] ?? -(i + 1) * 3600000),
        currentFolder: e.folder || 'inbox',
        opened: false,
        response: null,
        actionTaken: null,
        scheduledDelay: isIncoming ? delays[e.id] : null,
      };
    });
    setEmails(init);
    setStarredIds(new Set(init.filter((e) => e.starred).map((e) => e.id)));
    setReadIds(new Set(init.filter((e) => e.delivered).map((e) => e.id)));
    setStartTime(now);
    lastActivityRef.current = now;

    arrivalTimersRef.current.forEach(clearTimeout);
    arrivalTimersRef.current = incoming.map((email) =>
      setTimeout(() => {
        setEmails((prev) =>
          prev.map((e) => (e.id === email.id ? { ...e, delivered: true, receivedAt: Date.now() } : e))
        );
      }, (delays[email.id] || 30) * 1000)
    );

    return () => arrivalTimersRef.current.forEach(clearTimeout);
  }, [scenario]);

  useEffect(() => {
    const onAct = () => {
      lastActivityRef.current = Date.now();
    };
    window.addEventListener('mousedown', onAct);
    window.addEventListener('keydown', onAct);
    return () => {
      window.removeEventListener('mousedown', onAct);
      window.removeEventListener('keydown', onAct);
    };
  }, []);

  useEffect(() => {
    if (finished) return;
    showTip('taskIntro');
    const timer = window.setTimeout(() => showTip('unreadCategories'), 8000);
    return () => window.clearTimeout(timer);
  }, [finished, showTip]);

  useEffect(() => {
    if (finished || breach) return;
    const interval = setInterval(() => {
      if (Date.now() - lastActivityRef.current > 45000) showTip('inactive');
    }, 5000);
    return () => clearInterval(interval);
  }, [finished, breach, showTip]);

  useEffect(() => {
    if (finished || !emails.length) return;
    const remaining = emails.filter((e) => isScoredEmail(e) && !e.response && e.delivered).length;
    if (remaining > 0 && remaining <= 3) showTip('remaining');
  }, [emails, finished, showTip]);

  useEffect(() => {
    if (!selectedId || finished) return;
    const email = emails.find((e) => e.id === selectedId);
    if (!email) return;
    emailOpenTimeRef.current = Date.now();
    const interval = setInterval(() => {
      if (emailOpenTimeRef.current && Date.now() - emailOpenTimeRef.current > 30000) showTip('urgent');
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedId, finished, emails, showTip]);

  useEffect(() => {
    if (!finished && active && emails.length > 0) {
      const scored = emails.filter(isScoredEmail);
      if (scored.length > 0 && scored.every((e) => e.response) && !breach) finishSim('complete');
    }
  }, [emails, finished, active, breach]);

  useEffect(() => {
    if (timeLeft > 0 && active && !breach && !finished) {
      const t = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(t);
            finishSim('timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [timeLeft, active, breach, finished]);

  useEffect(() => {
    if (breach && breachTimer > 0) {
      const t = setInterval(() => {
        setBreachTimer((prev) => {
          if (prev <= 1) {
            clearInterval(t);
            finishSim('breach_failure');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [breach, breachTimer]);

  const handleBadgeMouseDown = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    dragOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDraggingBadge(true);
  };

  useEffect(() => {
    if (!draggingBadge) return;
    const onMove = (e) => {
      const w = 240;
      const h = 44;
      const x = Math.max(8, Math.min(window.innerWidth - w - 8, e.clientX - dragOffsetRef.current.x));
      const y = Math.max(8, Math.min(window.innerHeight - h - 8, e.clientY - dragOffsetRef.current.y));
      setBadgePos({ x, y });
    };
    const onUp = () => setDraggingBadge(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [draggingBadge]);

  const moveToFolder = (id, folder) => {
    setEmails((prev) => prev.map((e) => (e.id === id ? { ...e, currentFolder: folder } : e)));
  };

  const handleAction = (id, action) => {
    if (breach || finished) return;
    touchActivity();
    const email = emails.find((e) => e.id === id);
    if (!email || email.response) return;

    if (email.type === 'decoy' || email.scored === false) {
      if (action === 'delete') moveToFolder(id, 'trash');
      if (action === 'report') moveToFolder(id, 'spam');
      if (action === 'open') moveToFolder(id, 'inbox');
      setEmails((prev) =>
        prev.map((e) => (e.id === id ? { ...e, response: true, actionTaken: action, isDecoy: true } : e))
      );
      return;
    }

    const reactionTime = Math.round((Date.now() - startTime) / 1000);
    let isCorrect = false;
    let pointsDelta = 0;

    if (action === 'report') {
      isCorrect = email.type === 'phishing';
      pointsDelta = isCorrect ? SCORE_POINTS.CORRECT : SCORE_POINTS.WRONG;
    } else if (action === 'safe') {
      isCorrect = email.type === 'safe';
      pointsDelta = isCorrect ? SCORE_POINTS.CORRECT : SCORE_POINTS.WRONG;
    } else if (action === 'delete') {
      isCorrect = email.type === 'safe';
      pointsDelta = 0;
    } else if (action === 'open') {
      isCorrect = email.type === 'safe';
      pointsDelta = 0;
    }

    let triggered = false;
    if (email.type === 'phishing' && (action === 'open' || action === 'open_link' || action === 'open_attachment')) {
      triggered = true;
      setBreach(true);
      setBreachTimer(email.consequence?.timer || BREACH_TIMER_SECONDS);
      setBreachMaxTimer(email.consequence?.timer || BREACH_TIMER_SECONDS);
      setBreachMessage(email.consequence?.message || 'You clicked a malicious link. Your account may be compromised.');
      setBreachFeedback(null);
      setBreaches((prev) => prev + 1);
    }

    if (action === 'delete' && (email.type === 'decoy' || email.scored === false)) {
      moveToFolder(id, 'trash');
    }

    if (action === 'report' || action === 'safe') {
      applyScoreDelta(pointsDelta, isCorrect);
      if (!firstClassificationRef.current) {
        firstClassificationRef.current = true;
        showTip('firstClassification');
      }
      if (!isCorrect) {
        if (action === 'safe' && email.type === 'phishing') {
          wrongSafeCountRef.current += 1;
          if (wrongSafeCountRef.current >= 2) showTip('wrongSafe');
        }
        if (action === 'report' && email.type === 'safe') {
          wrongReportCountRef.current += 1;
          if (wrongReportCountRef.current >= 2) showTip('wrongReport');
        }
      }
    }

    setEmails((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, response: true, actionTaken: action, isCorrect, reactionTime, breachTriggered: triggered }
          : e
      )
    );
    setMetrics((prev) => ({
      totalEmails: prev.totalEmails + (action === 'report' || action === 'safe' ? 1 : 0),
      accuracy: prev.accuracy + (isCorrect && (action === 'report' || action === 'safe') ? 1 : 0),
      avgReactionTime:
        action === 'report' || action === 'safe'
          ? (prev.avgReactionTime * prev.totalEmails + reactionTime) / (prev.totalEmails + 1)
          : prev.avgReactionTime,
    }));

    if (!triggered && (action === 'report' || action === 'safe')) {
      const next = emails.find((e) => isScoredEmail(e) && !e.response && e.id !== id && e.delivered);
      if (next) setSelectedId(next.id);
    }
  };

  const showMisclassFeedback = useCallback((message) => {
    showFeedback(message, { tone: 'error', duration: 3500 });
  }, [showFeedback]);

  const handleMarkSafe = (id) => {
    const email = emails.find((e) => e.id === id);
    if (!email) return;
    handleAction(id, 'safe');
    if (isScoredEmail(email)) {
      if (email.type === 'phishing') {
        showMisclassFeedback(
          'That decision was incorrect. Phishing emails often mimic trusted senders — verify the domain before marking safe.'
        );
      } else {
        setReportNotice('Email marked as safe ✅');
        setTimeout(() => setReportNotice(null), 4000);
      }
    }
  };

  const handleReportPhishing = (id) => {
    const email = emails.find((e) => e.id === id);
    if (!email) return;
    handleAction(id, 'report');
    if (isScoredEmail(email)) {
      if (email.type === 'safe') {
        showMisclassFeedback(
          'That decision was incorrect. Legitimate emails can look unusual — check the sender domain before reporting.'
        );
      } else {
        setReportNotice('Email reported as phishing ✅');
        setTimeout(() => setReportNotice(null), 4000);
      }
    }
  };

  const handleRecovery = (option) => {
    if (option.correct) {
      setBreach(false);
      setRecovered(true);
      setBreachFeedback(null);
      const scored = emails.filter(isScoredEmail);
      if (scored.every((e) => e.response)) setTimeout(() => finishSim('complete'), 500);
    } else {
      setBreachFeedback(option.consequence || 'That action made the situation worse.');
      setBreachTimer((prev) => Math.max(0, prev - 10));
    }
  };

  const handleSettingsToggle = (key, label) => {
    if (settingsEnabled[key]) return;
    touchActivity();
    setSettingsEnabled((prev) => ({ ...prev, [key]: true }));
    setSettingsActions((prev) => [...prev, label]);
    setScorePoints((p) => p + SCORE_POINTS.SETTING);
  };

  const openSettings = () => {
    touchActivity();
    showTip('settings');
    setView('settings');
  };

  const finishSim = (reason) => {
    if (finished || completingRef.current) return;
    completingRef.current = true;
    setFinished(true);
    setActive(false);
    const scored = emails.filter(isScoredEmail);
    const total = scored.length;
    const correct = scored.filter((e) => e.isCorrect).length;
    const breachCount = emails.filter((e) => e.breachTriggered).length;
    const mistakes = scored
      .filter((e) => e.isCorrect === false)
      .map((e) => ({
        email: e.subject,
        error:
          e.actionTaken === 'report'
            ? 'Reported safe email as phishing'
            : e.actionTaken === 'safe'
              ? 'Marked phishing email as safe'
              : 'Missed phishing email',
        redFlags: e.redFlags || [],
      }));
    const totalTime = Math.round((Date.now() - startTime) / 1000);
    let finalPoints = scorePoints;
    if (reason === 'complete' && timeLeft > 0) finalPoints += SCORE_POINTS.SPEED;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const weightedScore = pointsToPercent(finalPoints);
    const xpEarned = computeXpFromPoints(finalPoints, streak);
    const earnedBadges = [];
    if (accuracy >= 80) earnedBadges.push({ name: 'Phishing Spotter', description: 'Complete phishing with 80%+ accuracy' });
    if (accuracy >= 90) earnedBadges.push({ name: 'Security Sentinel', description: 'Complete ANY simulation with 90%+ accuracy' });
    if (breachCount === 0) earnedBadges.push({ name: 'Zero Breach Hero', description: 'Complete with 0 breaches' });
    if (weightedScore >= 95) earnedBadges.push({ name: 'Perfect Score', description: 'Get 95%+ on a simulation' });
    [...earnedMilestones].forEach((id) => {
      const m = MILESTONE_BADGES.find((b) => b.id === id);
      if (m) earnedBadges.push({ name: m.name, description: m.description });
    });
    onComplete({
      score: weightedScore,
      accuracy,
      correct,
      total,
      breaches: breachCount,
      recovered,
      totalTime,
      hintsUsed: 0,
      settingsActions: settingsActions.length,
      avgReactionTime: metrics.avgReactionTime,
      xpEarned,
      mistakes,
      status: reason === 'timeout' ? 'timeout' : reason === 'breach_failure' ? 'breach_failure' : 'completed',
      earnedBadges,
      streak,
      scorePoints: finalPoints,
    });
  };

  const selectEmail = (id) => {
    touchActivity();
    setSelectedId(id);
    setReadIds((prev) => new Set([...prev, id]));
    const email = emails.find((e) => e.id === id);
    if (!firstEmailOpenedRef.current) {
      firstEmailOpenedRef.current = true;
      showTip('firstOpen');
    }
    if (email && isScoredEmail(email) && email.type === 'phishing') showTip('sender');
  };

  const matchesFolder = (email) => {
    switch (activeFolder) {
      case 'inbox':
        return email.currentFolder === 'inbox';
      case 'starred':
        return starredIds.has(email.id) || email.starred;
      case 'snoozed':
        return false;
      case 'sent':
        return email.currentFolder === 'sent';
      case 'drafts':
        return email.currentFolder === 'drafts';
      case 'important':
        return email.important;
      case 'scheduled':
        return email.scheduled;
      case 'spam':
        return email.currentFolder === 'spam';
      case 'trash':
        return email.currentFolder === 'trash';
      default:
        return email.currentFolder === 'inbox';
    }
  };

  const inboxUnread = emails.filter(
    (e) => e.currentFolder === 'inbox' && !readIds.has(e.id) && !e.response
  ).length;

  const currentEmail = emails.find((e) => e.id === selectedId);

  const getUnreadCountForTab = (tab) =>
    emails.filter(
      (email) =>
        email.delivered
        && email.currentFolder === 'inbox'
        && (email.category || 'Primary') === tab
        && !readIds.has(email.id)
    ).length;

  const filteredEmails = emails
    .filter((email) => email.delivered && matchesFolder(email))
    .filter((email) => {
      if (activeFolder !== 'inbox') return true;
      return (email.category || 'Primary') === activeTab;
    })
    .filter((email) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        email.from.toLowerCase().includes(q) ||
        email.subject.toLowerCase().includes(q) ||
        email.body.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (b.receivedAt || 0) - (a.receivedAt || 0));

  const liveXP = computeXpFromPoints(scorePoints, streak);
  const speedMult = streak >= 5 ? 1.5 : streak >= 3 ? 1.25 : 1;

  const renderEmailBody = (email) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = email.body.split(urlRegex);
    return parts.map((part, i) =>
      part.match(/^https?:\/\//) ? (
        <a
          key={i}
          href="#"
          title={part}
          onMouseEnter={() => {
            showTip('link');
            if (!linkHoverTipRef.current) {
              linkHoverTipRef.current = true;
              showTip('checkLinks');
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            touchActivity();
            if (!email.response) handleAction(email.id, 'open_link');
          }}
          className="text-[#1a73e8] hover:underline break-all"
        >
          {part}
        </a>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const renderStatusBadge = (email) => {
    if (!email.response || !isScoredEmail(email)) return null;
    if (email.actionTaken === 'report') {
      return (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#fce8e6] text-[#d93025] font-medium flex-shrink-0">
          Reported ✅
        </span>
      );
    }
    if (email.actionTaken === 'safe') {
      return (
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#e6f4ea] text-[#137333] font-medium flex-shrink-0">
          Safe ✅
        </span>
      );
    }
    return null;
  };

  const renderEmailRow = (email, compact = false) => {
    const sender = parseSender(email.from);
    const isUnread = !readIds.has(email.id) && !email.response;
    const isSelected = selectedId === email.id;
    const preview = email.body.replace(/\n/g, ' ').slice(0, compact ? 40 : 80);

    if (compact) {
      return (
        <div
          key={email.id}
          role="button"
          tabIndex={0}
          onClick={() => selectEmail(email.id)}
          className={`px-4 py-3 border-b border-[#f1f3f4] cursor-pointer transition ${
            isSelected ? 'bg-[#d3e3fd]' : 'hover:bg-[#f1f3f4]'
          }`}
        >
          <p className={`text-sm truncate ${isUnread ? 'font-semibold' : ''}`}>{sender.name}</p>
          <p className="text-xs text-[#5f6368] truncate mt-0.5">{email.subject}</p>
          {renderStatusBadge(email)}
        </div>
      );
    }

    return (
      <div
        key={email.id}
        role="button"
        tabIndex={0}
        onClick={() => selectEmail(email.id)}
        onKeyDown={(e) => e.key === 'Enter' && selectEmail(email.id)}
        className={`flex items-center gap-3 px-4 py-2 border-b border-[#f1f3f4] cursor-pointer transition-colors ${
          isUnread ? 'bg-white' : 'bg-[#f2f6fc]'
        } hover:shadow-[inset_1px_0_0_#dadce0,inset_-1px_0_0_#dadce0,inset_0_1px_0_#dadce0] hover:z-10 hover:relative`}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setStarredIds((prev) => {
              const next = new Set(prev);
              if (next.has(email.id)) next.delete(email.id);
              else next.add(email.id);
              return next;
            });
          }}
          className="p-1 text-[#5f6368] hover:text-[#e37400] flex-shrink-0"
        >
          <Star size={18} className={starredIds.has(email.id) ? 'fill-[#e37400] text-[#e37400]' : ''} />
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0"
          style={{ backgroundColor: avatarColor(sender.name) }}
        >
          {getInitials(sender.name)}
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-4">
          <span className={`w-36 truncate text-sm flex-shrink-0 ${isUnread ? 'font-semibold' : ''}`}>{sender.name}</span>
          <div className="flex-1 min-w-0 flex items-baseline gap-1">
            <span className={`text-sm truncate ${isUnread ? 'font-semibold' : ''}`}>{email.subject}</span>
            <span className="text-[#5f6368] hidden sm:inline"> — </span>
            <span className="text-sm text-[#5f6368] truncate hidden sm:inline">{preview}</span>
          </div>
          {renderStatusBadge(email)}
        </div>
        <span className={`text-xs flex-shrink-0 ${isUnread ? 'font-semibold' : 'text-[#5f6368]'}`}>
          {formatRelativeTime(email.receivedAt)}
        </span>
      </div>
    );
  };

  const emptyMessage =
    activeFolder === 'inbox'
      ? `No messages in ${activeTab}`
      : `No messages in ${FOLDER_LABELS[activeFolder] || 'this folder'}`;

  const renderBreachOverlay = () => (
    <div className="fixed inset-0 z-[200] bg-red-950/90 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl border-2 border-red-400 p-8">
        <div className="text-center mb-6">
          <AlertTriangle size={64} className="text-red-500 animate-pulse mx-auto mb-3" />
          <h1 className="text-2xl font-semibold text-red-600 mb-2">SECURITY BREACH DETECTED</h1>
          <p className="text-sm text-[#5f6368]">{breachMessage || 'Malicious activity detected on your account.'}</p>
        </div>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#5f6368] font-medium">Time to contain breach</span>
            <span className={`font-bold text-lg ${breachTimer < 15 ? 'text-red-600' : 'text-[#e37400]'}`}>{breachTimer}s</span>
          </div>
          <div className="h-2 bg-[#e8eaed] rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-1000"
              style={{ width: `${breachMaxTimer > 0 ? (breachTimer / breachMaxTimer) * 100 : 0}%` }}
            />
          </div>
        </div>
        {breachFeedback && (
          <div className="mb-4 px-4 py-3 bg-[#fce8e6] border border-red-300 rounded-lg text-sm text-red-700">
            {breachFeedback}
          </div>
        )}
        <p className="text-sm font-medium text-[#202124] mb-3">Choose a recovery action:</p>
        <div className="space-y-2">
          {BREACH_RECOVERY_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleRecovery(option)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition ${
                option.correct
                  ? 'border-[#dadce0] hover:bg-[#e6f4ea] hover:border-green-400 text-[#202124]'
                  : 'border-red-200 hover:bg-[#fce8e6] text-red-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTipPopup = () => {
    if (!activeTip) return null;
    return (
      <div className="absolute bottom-4 left-4 z-[160] bg-[#202124] text-white px-4 py-3 rounded-lg shadow-lg max-w-xs text-sm border border-[#3c4043] animate-slide-up">
        <div className="flex items-start gap-2">
          <Lightbulb size={16} className="text-[#fdd663] flex-shrink-0 mt-0.5" />
          <span>{activeTip.text}</span>
        </div>
      </div>
    );
  };
  
  const liveScore = pointsToPercent(scorePoints);

  const renderScoreBadge = () => {
    const style = badgePos.x != null
      ? { left: badgePos.x, top: badgePos.y, right: 'auto', bottom: 'auto' }
      : { right: 16, bottom: 16, left: 'auto', top: 'auto' };
  
    return (
      <div
        className="absolute z-[150] bg-[#202124] text-white px-3 py-2 rounded-full shadow-lg text-xs font-medium flex items-center gap-2 border border-[#3c4043]"
        style={style}
      >
        <button
          type="button"
          onMouseDown={handleBadgeMouseDown}
          className="cursor-grab active:cursor-grabbing text-[#8ab4f8] hover:text-white p-0.5"
          title="Drag to move"
        >
          <GripVertical size={14} />
        </button>
        <span>Score: {liveScore}%</span>
        <span className="text-[#8ab4f8]">|</span>
        <span className="text-[#81c995]">XP: {liveXP}</span>
        {streak >= 2 && (
          <>
            <span className="text-[#8ab4f8]">|</span>
            <span className="text-[#fdd663]">🔥 {streak}</span>
            {speedMult > 1 && <span className="text-[#fdd663]"> x{speedMult}</span>}
          </>
        )}
      </div>
    );
  };
  
  const renderOverlays = () => (
    <>
      {renderScoreBadge()}
      {renderTipPopup()}
      {milestoneBadge && (
        <BadgePopup
          badges={milestoneBadge}
          variant="toast"
          autoDismissMs={4000}
          onClose={() => setMilestoneBadge(null)}
        />
      )}
      {breach && renderBreachOverlay()}
    </>
  );


  if (view === 'settings') {
    return (
      <div className="sim-layer-full sim-workspace-root z-[60] bg-[#f6f8fc] flex flex-col font-['Roboto',_'Segoe_UI',_sans-serif]">
        <header className="bg-white border-b border-[#dadce0] px-4 py-3 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setView('mail')}
            className="text-[#1a73e8] hover:bg-[#e8f0fe] px-3 py-1.5 rounded-full text-sm font-medium transition"
          >
            ← Back to Inbox
          </button>
          <h1 className="text-lg text-[#202124] font-normal">Settings</h1>
        </header>
        <div className="flex flex-1 overflow-hidden">
          <nav className="w-56 bg-white border-r border-[#dadce0] py-4 flex-shrink-0">
            {[
              { id: 'general', label: 'General', icon: Globe },
              { id: 'security', label: 'Security', icon: Lock },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSettingsTab(id)}
                className={`w-full text-left px-6 py-2.5 text-sm flex items-center gap-3 transition ${
                  settingsTab === id ? 'bg-[#e8f0fe] text-[#1a73e8] font-medium' : 'text-[#202124] hover:bg-[#f1f3f4]'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </nav>
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl">
              {settingsTab === 'general' && (
                <>
                  <h2 className="text-xl text-[#202124] font-normal mb-6">General settings</h2>
                  <div className="space-y-6">
                    {[
                      ['Language', 'Choose your display language', ['English (US)', 'English (UK)', 'Spanish']],
                      ['Time zone', 'Set your local time zone', ['(UTC+05:30) India Standard Time', '(UTC+00:00) GMT', '(UTC-05:00) Eastern Time']],
                      ['Maximum page size', 'Number of conversations per page', ['50 conversations', '100 conversations']],
                    ].map(([title, desc, options]) => (
                      <div key={title} className="flex items-center justify-between py-4 border-b border-[#dadce0]">
                        <div>
                          <p className="text-sm font-medium text-[#202124]">{title}</p>
                          <p className="text-xs text-[#5f6368] mt-0.5">{desc}</p>
                        </div>
                        <select className="border border-[#dadce0] rounded px-3 py-2 text-sm text-[#202124] bg-white focus:outline-none focus:border-[#1a73e8]">
                          {options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {settingsTab === 'security' && (
                <>
                  <h2 className="text-xl text-[#202124] font-normal mb-6">Security settings</h2>
                  <div className="space-y-4">
                    {[
                      { key: '2fa', label: '2-Step Verification', desc: 'Add an extra layer of security to your account' },
                      { key: 'privacy', label: 'Privacy checkup', desc: 'Review and adjust your privacy settings' },
                      { key: 'encryption', label: 'Encrypted connections', desc: 'Always use HTTPS when available' },
                      { key: 'alerts', label: 'Security alerts', desc: 'Get notified about suspicious activity' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#dadce0] shadow-sm">
                        <div>
                          <p className="text-sm font-medium text-[#202124]">{item.label}</p>
                          <p className="text-xs text-[#5f6368] mt-0.5">{item.desc}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSettingsToggle(item.key, item.label)}
                          disabled={settingsEnabled[item.key]}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                            settingsEnabled[item.key]
                              ? 'bg-[#e6f4ea] text-[#137333]'
                              : 'bg-[#1a73e8] text-white hover:bg-[#1765cc] hover:shadow'
                          }`}
                        >
                          {settingsEnabled[item.key] ? 'On' : 'Turn on'}
                        </button>
                      </div>
                    ))}
                    <div className="p-4 bg-white rounded-lg border border-[#dadce0] shadow-sm">
                      <p className="text-sm font-medium text-[#202124] mb-1">Password</p>
                      <p className="text-xs text-[#5f6368] mb-3">Last changed 3 months ago</p>
                      <button type="button" className="text-[#1a73e8] text-sm font-medium hover:underline">
                        Change password
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {renderOverlays()}
      </div>
    );
  }
  const mainSidebarFolders = SIDEBAR_FOLDERS.filter((f) => !MORE_FOLDER_IDS.includes(f.id));
  const moreSidebarFolders = SIDEBAR_FOLDERS.filter((f) => MORE_FOLDER_IDS.includes(f.id));

  return (
    <div className="sim-layer-full sim-workspace-root z-[60] bg-[#f6f8fc] flex flex-col font-['Roboto',_'Segoe_UI',_sans-serif] text-[#202124]">
      <header className="bg-[#f6f8fc] px-2 py-2 flex items-center gap-2 flex-shrink-0">
        <button type="button" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-3 rounded-full hover:bg-[#e8eaed] transition text-[#5f6368]">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-1 min-w-[180px]">
          <Mail size={28} className="text-[#ea4335]" />
          <span className="text-[#5f6368] text-xl font-normal tracking-tight">Mail</span>
        </div>
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center bg-[#eaf1fb] hover:bg-white hover:shadow-md focus-within:bg-white focus-within:shadow-md rounded-full px-4 py-2.5 transition-shadow">
            <Search size={20} className="text-[#5f6368] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search mail"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 ml-3 bg-transparent outline-none text-sm text-[#202124] placeholder:text-[#5f6368]"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 ml-auto pr-2">
          <span className="text-xs text-[#5f6368] hidden sm:inline font-mono">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
          </span>
          <button type="button" onClick={openSettings} className="p-2 rounded-full hover:bg-[#e8eaed] transition text-[#5f6368]">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: '#1a73e8' }} title={scenario.employeeName}>
            {employeeInitials}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden px-2 pb-2 gap-2">
        <aside className={`${sidebarCollapsed ? 'w-[72px]' : 'w-[256px]'} flex-shrink-0 flex flex-col transition-all duration-200`}>
          <button
            type="button"
            className={`mb-4 flex items-center gap-3 bg-[#c2e7ff] hover:shadow-md text-[#001d35] rounded-2xl transition-shadow ${
              sidebarCollapsed ? 'w-14 h-14 justify-center mx-auto' : 'px-6 py-4 ml-2'
            }`}
          >
            <PenSquare size={sidebarCollapsed ? 22 : 20} />
            {!sidebarCollapsed && <span className="text-sm font-medium">Compose</span>}
          </button>

          <nav className="space-y-0.5 px-1">
            {mainSidebarFolders.map(({ id, label, icon: Icon }) => {
              const isActive = activeFolder === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveFolder(id);
                    setSelectedId(null);
                    if (id === 'inbox') setActiveTab('Primary');
                  }}
                  className={`w-full flex items-center gap-4 rounded-r-full py-1.5 transition text-sm ${
                    sidebarCollapsed ? 'justify-center px-0' : 'pl-4 pr-3'
                  } ${isActive ? 'bg-[#d3e3fd] text-[#001d35] font-medium' : 'text-[#202124] hover:bg-[#eceff1]'}`}
                >
                  <Icon size={18} className={isActive ? 'text-[#001d35]' : 'text-[#5f6368]'} />
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{label}</span>
                      {id === 'inbox' && inboxUnread > 0 && <span className="text-xs font-medium">{inboxUnread}</span>}
                    </>
                  )}
                </button>
              );
            })}

            {!sidebarCollapsed && (
              <>
                <button
                  type="button"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className="w-full flex items-center gap-4 pl-4 pr-3 py-1.5 rounded-r-full text-sm text-[#202124] hover:bg-[#eceff1] transition"
                >
                  {moreOpen ? <ChevronUp size={18} className="text-[#5f6368]" /> : <ChevronDown size={18} className="text-[#5f6368]" />}
                  <span className="flex-1 text-left">More</span>
                </button>
                {moreOpen &&
                  moreSidebarFolders.map(({ id, label, icon: Icon }) => {
                    const isActive = activeFolder === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setActiveFolder(id);
                          setSelectedId(null);
                        }}
                        className={`w-full flex items-center gap-4 pl-8 pr-3 py-1.5 rounded-r-full text-sm transition ${
                          isActive ? 'bg-[#d3e3fd] text-[#001d35] font-medium' : 'text-[#202124] hover:bg-[#eceff1]'
                        }`}
                      >
                        <Icon size={16} className={isActive ? 'text-[#001d35]' : 'text-[#5f6368]'} />
                        <span className="flex-1 text-left">{label}</span>
                      </button>
                    );
                  })}
              </>
            )}
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded-xl shadow-sm border border-[#dadce0] overflow-hidden flex min-w-0">
          {!selectedId ? (
            <div className="flex-1 flex flex-col min-w-0">
              {activeFolder === 'inbox' && (
                <div className="flex border-b border-[#dadce0] px-2 flex-shrink-0">
                  {TABS.map((tab) => {
                    const unreadCount = getUnreadCountForTab(tab);
                    return (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-sm transition relative flex items-center gap-2 ${
                        activeTab === tab ? 'text-[#1a73e8] font-medium' : 'text-[#5f6368] hover:bg-[#f1f3f4]'
                      }`}
                    >
                      {tab}
                      {unreadCount > 0 && (
                        <span
                          className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[11px] font-semibold ${
                            activeTab === tab ? 'bg-[#1a73e8] text-white' : 'bg-[#dadce0] text-[#3c4043]'
                          }`}
                        >
                          {unreadCount}
                        </span>
                      )}
                      {activeTab === tab && <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-[#1a73e8] rounded-t-full" />}
                    </button>
                    );
                  })}
                </div>
              )}

              <div className="flex-1 overflow-y-auto">
                {filteredEmails.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-[#5f6368] py-16">
                    <Inbox size={48} className="mb-3 opacity-40" />
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                ) : (
                  filteredEmails.map((email) => renderEmailRow(email))
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="w-[340px] border-r border-[#dadce0] flex flex-col flex-shrink-0 hidden lg:flex">
                <div className="px-4 py-3 border-b border-[#dadce0] flex items-center gap-2">
                  <button type="button" onClick={() => setSelectedId(null)} className="text-[#5f6368] hover:bg-[#f1f3f4] p-1.5 rounded-full transition">
                    ←
                  </button>
                  <span className="text-sm text-[#5f6368]">{filteredEmails.length} messages</span>
                </div>
                <div className="flex-1 overflow-y-auto">{filteredEmails.map((email) => renderEmailRow(email, true))}</div>
              </div>

              <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {currentEmail && (
                  <>
                    <div className="px-4 py-2 border-b border-[#dadce0] flex items-center gap-1 flex-shrink-0 lg:hidden">
                      <button type="button" onClick={() => setSelectedId(null)} className="text-[#1a73e8] text-sm font-medium px-2 py-1">
                        ← Back
                      </button>
                    </div>

                    {reportNotice && (
                      <div className="mx-4 mt-3 px-4 py-2.5 bg-[#e6f4ea] border border-[#ceead6] rounded-lg flex items-center gap-2 text-sm text-[#137333]">
                        <Shield size={16} />
                        {reportNotice}
                      </div>
                    )}

                    {currentEmail.response && currentEmail.actionTaken === 'report' && !reportNotice && (
                      <div className="mx-4 mt-3 px-4 py-2.5 bg-[#e6f4ea] border border-[#ceead6] rounded-lg flex items-center gap-2 text-sm text-[#137333]">
                        <Shield size={16} />
                        Reported ✅
                      </div>
                    )}

                    {currentEmail.response && currentEmail.actionTaken === 'safe' && !reportNotice && (
                      <div className="mx-4 mt-3 px-4 py-2.5 bg-[#e6f4ea] border border-[#ceead6] rounded-lg flex items-center gap-2 text-sm text-[#137333]">
                        <Reply size={16} />
                        Safe ✅
                      </div>
                    )}

                    <div className="px-2 py-1.5 border-b border-[#dadce0] flex items-center gap-0.5 flex-wrap flex-shrink-0">
                      {[
                        { icon: Archive, label: 'Archive', action: () => !currentEmail.response && handleAction(currentEmail.id, 'open') },
                        { icon: Trash2, label: 'Delete', action: () => handleAction(currentEmail.id, 'delete') },
                        {
                          icon: MailOpen,
                          label: 'Mark as unread',
                          action: () => setReadIds((prev) => { const n = new Set(prev); n.delete(currentEmail.id); return n; }),
                        },
                        { icon: Tag, label: 'Move to', action: null },
                      ].map(({ icon: Icon, label, action }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={action || undefined}
                          disabled={!action}
                          title={label}
                          className="p-2 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] transition disabled:opacity-40"
                        >
                          <Icon size={18} />
                        </button>
                      ))}
                      <div className="flex-1" />
                      <button
                        type="button"
                        onClick={() => !currentEmail.response && handleReportPhishing(currentEmail.id)}
                        disabled={!!currentEmail.response}
                        className="px-3 py-1.5 text-sm text-[#d93025] hover:bg-[#fce8e6] rounded transition disabled:opacity-40 font-medium"
                      >
                        Report phishing
                      </button>
                    </div>

                    <div className="px-6 py-4 flex-shrink-0">
                      <h1 className="text-xl text-[#202124] font-normal mb-4 leading-snug">{currentEmail.subject}</h1>
                      <div className="flex items-start gap-3">
                        {(() => {
                          const sender = parseSender(currentEmail.from);
                          return (
                            <>
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0"
                                style={{ backgroundColor: avatarColor(sender.name) }}
                              >
                                {getInitials(sender.name)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                  <div>
                                    <p className="text-sm font-medium text-[#202124]">{sender.name}</p>
                                    <p className="text-xs text-[#5f6368]">&lt;{sender.email}&gt;</p>
                                  </div>
                                  <span className="text-xs text-[#5f6368]">{formatRelativeTime(currentEmail.receivedAt)}</span>
                                </div>
                                <p className="text-xs text-[#5f6368] mt-1">to me</p>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 pb-4">
                      <BrandHeader brand={currentEmail.brand} />
                      <div className="text-sm text-[#202124] leading-relaxed whitespace-pre-wrap">{renderEmailBody(currentEmail)}</div>
                      {currentEmail.attachments?.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {currentEmail.attachments.map((att) => (
                            <button
                              key={att}
                              type="button"
                              onClick={() => !currentEmail.response && handleAction(currentEmail.id, 'open_attachment')}
                              className="flex items-center gap-2 px-3 py-2 border border-[#dadce0] rounded-lg hover:shadow-sm transition text-sm text-[#202124] bg-[#f8f9fa]"
                            >
                              <FileText size={16} className="text-[#5f6368]" />
                              {att}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-4 border-t border-[#dadce0] flex flex-wrap gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          !currentEmail.response && isScoredEmail(currentEmail) && handleMarkSafe(currentEmail.id)
                        }
                        disabled={!!currentEmail.response || !isScoredEmail(currentEmail)}
                        className="flex items-center gap-2 px-5 py-2 bg-[#137333] text-white rounded-full text-sm hover:bg-[#0d652d] hover:shadow-sm transition disabled:opacity-40 disabled:bg-[#e8eaed] disabled:text-[#5f6368]"
                      >
                        <Reply size={16} /> Reply
                      </button>
                      <button type="button" className="flex items-center gap-2 px-5 py-2 border border-[#dadce0] rounded-full text-sm text-[#202124] hover:shadow-sm transition">
                        <ReplyAll size={16} /> Reply all
                      </button>
                      <button type="button" className="flex items-center gap-2 px-5 py-2 border border-[#dadce0] rounded-full text-sm text-[#202124] hover:shadow-sm transition">
                        <Forward size={16} /> Forward
                      </button>
                      <button
                        type="button"
                        onClick={() => !currentEmail.response && handleReportPhishing(currentEmail.id)}
                        disabled={!!currentEmail.response}
                        className="flex items-center gap-2 px-5 py-2 border border-[#d93025] text-[#d93025] rounded-full text-sm hover:bg-[#fce8e6] transition disabled:opacity-40 ml-auto"
                      >
                        <Shield size={16} /> Report phishing
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </main>
      </div>
      {renderOverlays()}
    </div>
  );
};

export default SimulationWorkspace;
