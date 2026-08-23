import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  X, Server, Monitor, Clock, Shield, AlertTriangle,
  Mail, MessageSquare, Database, FileText, Terminal,
  ChevronRight, GripVertical, Download,
  CreditCard, Scan, Unplug, Eye, Wifi,
} from 'lucide-react';
import Badge, { normalizeBadge } from '../../components/common/Badge';


const C = {
  bg: '#0B1120',
  card: '#1A2332',
  accent: '#06B6D4',
  green: '#22C55E',
  yellow: '#F59E0B',
  red: '#EF4444',
  text: '#F1F5F9',
  muted: '#94A3B8',
  border: '#2D3748',
};

const STATUS = {
  healthy: { label: 'Healthy', color: C.green, dot: '🟢' },
  suspicious: { label: 'Suspicious', color: C.yellow, dot: '🟡' },
  infected: { label: 'Infected', color: C.red, dot: '🔴' },
  isolated: { label: 'Isolated', color: '#6366F1', dot: '🟣' },
};

const SYSTEMS = [
  { id: 'srv-fin-01', name: 'SRV-FINANCE-01', role: 'Finance DB', ip: '192.168.10.10', type: 'server', status: 'healthy' },
  { id: 'srv-fin-02', name: 'SRV-FINANCE-02', role: 'Finance Files', ip: '192.168.10.11', type: 'server', status: 'healthy' },
  { id: 'srv-hr-01', name: 'SRV-HR-01', role: 'HR Server', ip: '192.168.10.20', type: 'server', status: 'healthy' },
  { id: 'srv-app-01', name: 'SRV-APP-01', role: 'App Server', ip: '192.168.10.30', type: 'server', status: 'healthy' },
  { id: 'srv-app-02', name: 'SRV-APP-02', role: 'Backup App', ip: '192.168.10.31', type: 'server', status: 'healthy' },
  { id: 'srv-db-01', name: 'SRV-DB-01', role: 'Prod DB', ip: '192.168.10.40', type: 'server', status: 'healthy' },
  { id: 'srv-sec-01', name: 'SRV-SEC-01', role: 'Security', ip: '192.168.10.50', type: 'server', status: 'healthy' },
  { id: 'ws-fin-01', name: 'WS-FINANCE-01', role: 'Finance', ip: '192.168.10.51', type: 'workstation', status: 'healthy' },
  { id: 'ws-fin-02', name: 'WS-FINANCE-02', role: 'Finance', ip: '192.168.10.52', type: 'workstation', status: 'healthy' },
  { id: 'ws-fin-03', name: 'WS-FINANCE-03', role: 'Finance', ip: '192.168.10.53', type: 'workstation', status: 'healthy' },
  { id: 'ws-fin-04', name: 'WS-FINANCE-04', role: 'Finance', ip: '192.168.10.54', type: 'workstation', status: 'healthy' },
  { id: 'ws-fin-05', name: 'WS-FINANCE-05', role: 'Finance', ip: '192.168.10.55', type: 'workstation', status: 'healthy' },
];

const INITIAL_ALERT = {
  id: 'a1',
  severity: 'Medium',
  title: 'Unusual activity detected on WS-FINANCE-03',
  description: 'Elevated CPU usage and suspicious process activity reported by EDR.',
  source: 'SRV-SEC-01 / EDR',
  timestamp: '14:32:08',
  countdown: 45,
};

const TRIGGER_TIPS = {
  simStart: 'Investigate systems on the network map — click a workstation to inspect its status.',
  alertAppears: 'Isolate infected systems quickly to stop lateral spread across the network.',
  spreadBackup: 'Open Backup Console to find clean restore points before attempting recovery.',
  useCommPortal: 'Use the Communication Portal to keep leadership and staff informed during the incident.',
  generateReportTip: 'Document your response — generate the incident report once containment is underway.',
  scheduleReviewTip: 'Schedule a post-incident review to capture lessons learned from this event.',
};

const RANSOMWARE_LEARNING_POINTS = [
  'Enable MFA on all admin accounts immediately',
  'Implement network segmentation for finance department',
  'Conduct phishing awareness training for all staff',
  'Verify backup integrity and test restore procedures monthly',
];

const COMM_MESSAGES = [
  {
    id: 'lisa',
    from: 'Lisa (Finance)',
    msg: 'My computer is running slow and files won\'t open. Please help!',
    time: '14:28',
    urgent: true,
    subject: 'Computer issues — files won\'t open',
    body: 'Hi IT, my workstation (WS-FINANCE-03) has been extremely slow since this morning. I tried opening my Q4 reports and Excel shows weird error messages. Some files on my desktop look different. Can someone check ASAP? — Lisa',
  },
  {
    id: 'ceo',
    from: 'CEO — James Mitchell',
    msg: 'What is the status of this incident? The board is asking questions.',
    time: '14:35',
    urgent: true,
    subject: 'Incident status request — board inquiry',
    body: 'IT team, I need an immediate status update on the situation affecting our finance systems. The board meeting is in two hours and I need to know: scope of impact, data at risk, and estimated recovery time. — James',
  },
  {
    id: 'hr',
    from: 'HR Director',
    msg: 'Are employee records affected? We need to know for compliance.',
    time: '14:40',
    urgent: false,
    subject: 'Compliance check — employee data',
    body: 'Hello, HR here. We need confirmation whether any employee PII or payroll records stored on finance systems have been compromised. Please advise so we can meet our regulatory notification obligations. — HR Director',
  },
];

const RANSOM_TIMER_START = 48 * 3600;

const INFECTED_PROCESSES = [
  { name: 'encrypt_dropper.exe', cpu: 40, suspicious: true },
  { name: 'svchost.exe', cpu: 25, suspicious: true },
  { name: 'explorer.exe', cpu: 5, suspicious: false },
];

const INFECTED_FILE_ACTIVITY = [
  'report_Q4.xlsx → report_Q4.xlsx.locked',
  'budget_2026.docx → budget_2026.docx.locked',
  'invoice_backup.pdf → invoice_backup.pdf.locked',
];

const SPREAD_ORDER = ['srv-fin-02', 'ws-fin-01', 'ws-fin-02', 'ws-fin-04', 'ws-fin-05', 'srv-fin-01'];
const SPREAD_INTERVAL = 10;
const RESPONSE_WINDOW_SECONDS = 45;


const EVENT_EMAIL_AT = 22;
const EVENT_ALERT_AT = 35;
const EVENT_SPREAD_AT = 50;
const EVENT_ESCALATION_AT = 75;

const SCORE = {
  detectAlert: 10,
  isolate: 15,
  restore: 20,
  communicate: 10,
  report: 5,
};
const MAX_SCORE = Object.values(SCORE).reduce((a, b) => a + b, 0);

const BADGE_DEFS = {
  firstResponder: { name: 'First Responder', description: 'Detected alert within 30 seconds', tier: 'uncommon' },
  zeroSpread: { name: 'Zero Spread', description: 'Isolated before infection spread', tier: 'rare' },
  backupHero: { name: 'Backup Hero', description: 'Restored from clean backups', tier: 'epic' },
  crisisMaster: { name: 'Crisis Master', description: 'Completed with no data loss', tier: 'legendary' },
};

const TRANSPARENT_MSG = 'We are actively responding to a security incident. Affected systems have been isolated.';

const COMM_TEMPLATES = [
  { id: 'transparent', label: 'Transparent update', desc: 'Builds trust', text: TRANSPARENT_MSG },
  { id: 'vague', label: 'Vague statement', desc: 'Causes confusion', text: 'We are experiencing technical difficulties. IT is working on it.' },
  { id: 'silent', label: 'Stay silent', desc: 'Panic spreads', text: 'We are monitoring the situation and will provide updates as needed.' },
];

const SYSTEM_PROFILES = {
  'srv-fin-01': {
    cpu: 78, memory: 65, diskIo: 22,
    processes: [
      { name: 'sqlservr.exe', cpu: 45, suspicious: false },
      { name: 'finance_db_svc.exe', cpu: 28, suspicious: false },
      { name: 'msdtc.exe', cpu: 5, suspicious: false },
    ],
    fileActivity: ['DB transaction log growth +12%', 'Nightly backup completed 02:00', 'No encryption events detected'],
    logs: [
      '[14:30:01] INFO: SQL Server batch requests/sec elevated (finance month-end)',
      '[14:28:44] INFO: Backup agent connected — finance_db_full.bak',
      '[14:25:12] WARNING: CPU spike on query FIN_Q4_REPORT',
    ],
  },
  'srv-fin-02': {
    cpu: 34, memory: 48, diskIo: 88,
    processes: [
      { name: 'System', cpu: 8, suspicious: false },
      { name: 'smbd.exe', cpu: 52, suspicious: false },
      { name: 'fileindexer.exe', cpu: 18, suspicious: false },
    ],
    fileActivity: ['High read/write on \\\\finance\\shared', '847 files accessed in last 5 min', 'SMB sessions from WS-FINANCE-03'],
    logs: [
      '[14:31:45] WARNING: Unusual SMB traffic from 192.168.10.53',
      '[14:31:20] INFO: Disk I/O threshold exceeded on volume D:',
      '[14:30:55] INFO: File share audit — bulk rename detected',
    ],
  },
  'srv-hr-01': {
    cpu: 12, memory: 38, diskIo: 8,
    processes: [
      { name: 'hrportal.exe', cpu: 6, suspicious: false },
      { name: 'w3wp.exe', cpu: 4, suspicious: false },
      { name: 'svchost.exe', cpu: 2, suspicious: false },
    ],
    fileActivity: ['Employee record sync completed', 'No anomalous file activity detected'],
    logs: ['[14:29:00] INFO: HR portal health check OK', '[14:15:00] INFO: Scheduled LDAP sync completed'],
  },
  'srv-app-01': {
    cpu: 22, memory: 55, diskIo: 15,
    processes: [
      { name: 'w3wp.exe', cpu: 14, suspicious: false },
      { name: 'dotnet.exe', cpu: 6, suspicious: false },
      { name: 'iisexpress.exe', cpu: 2, suspicious: false },
    ],
    fileActivity: ['App deployment v2.4.1 verified', 'No anomalous file activity detected'],
    logs: ['[14:20:00] INFO: Application pool recycling complete', '[14:00:00] INFO: Health endpoint 200 OK'],
  },
  'srv-app-02': {
    cpu: 18, memory: 42, diskIo: 25,
    processes: [
      { name: 'backup_agent.exe', cpu: 12, suspicious: false },
      { name: 'vssvc.exe', cpu: 4, suspicious: false },
      { name: 'svchost.exe', cpu: 2, suspicious: false },
    ],
    fileActivity: ['Incremental backup job running', 'Snapshot created for SRV-DB-01'],
    logs: ['[14:32:00] INFO: Backup job BACKUP-042 queued', '[14:00:00] INFO: VSS snapshot successful'],
  },
  'srv-db-01': {
    cpu: 45, memory: 72, diskIo: 35,
    processes: [
      { name: 'postgres.exe', cpu: 38, suspicious: false },
      { name: 'pgbouncer.exe', cpu: 5, suspicious: false },
      { name: 'checkpointer', cpu: 2, suspicious: false },
    ],
    fileActivity: ['WAL archive rotation normal', 'Replication lag: 0.2s'],
    logs: ['[14:31:00] INFO: Connection pool at 62% capacity', '[14:28:00] INFO: Autovacuum completed on orders table'],
  },
  'srv-sec-01': {
    cpu: 28, memory: 50, diskIo: 10,
    processes: [
      { name: 'edr_agent.exe', cpu: 18, suspicious: false },
      { name: 'siem_forwarder.exe', cpu: 8, suspicious: false },
      { name: 'sysmon.exe', cpu: 2, suspicious: false },
    ],
    fileActivity: ['Alert correlation engine active', '42 events processed/min'],
    logs: [
      '[14:32:08] CRITICAL: Ransomware signature match — WS-FINANCE-03',
      '[14:31:58] WARNING: EDR flagged process injection on 192.168.10.53',
    ],
  },
  'ws-fin-01': {
    cpu: 15, memory: 40, diskIo: 5,
    processes: [
      { name: 'outlook.exe', cpu: 8, suspicious: false },
      { name: 'excel.exe', cpu: 4, suspicious: false },
      { name: 'explorer.exe', cpu: 3, suspicious: false },
    ],
    fileActivity: ['No anomalous file activity detected'],
    logs: ['[14:25:00] INFO: User jsmith logged in', '[14:10:00] INFO: Windows Update check complete'],
  },
  'ws-fin-02': {
    cpu: 20, memory: 45, diskIo: 6,
    processes: [
      { name: 'outlook.exe', cpu: 10, suspicious: false },
      { name: 'teams.exe', cpu: 6, suspicious: false },
      { name: 'explorer.exe', cpu: 4, suspicious: false },
    ],
    fileActivity: ['No anomalous file activity detected'],
    logs: ['[14:22:00] INFO: User mwong logged in', '[14:05:00] INFO: Antivirus scan clean'],
  },
  'ws-fin-03': {
    cpu: 87, memory: 91, diskIo: 95,
    processes: [
      { name: 'svchost.exe', cpu: 60, suspicious: true },
      { name: 'encrypt_dropper.exe', cpu: 22, suspicious: true },
      { name: 'explorer.exe', cpu: 5, suspicious: false },
    ],
    fileActivity: [
      'report_Q4.xlsx → report_Q4.xlsx.locked',
      'budget_2026.docx → budget_2026.docx.locked',
      'invoice_backup.pdf → invoice_backup.pdf.locked',
      'READ_ME.txt created on Desktop',
    ],
    logs: [
      '[14:32:01] CRITICAL: File encryption event — C:\\Users\\Lisa\\Documents\\report.xlsx → report.xlsx.locked',
      '[14:31:58] WARNING: Process svchost.exe (PID 4892) spawned from unusual parent',
      '[14:31:30] WARNING: Defender real-time protection disabled by policy change',
      '[14:31:12] INFO: User lisa.f@apexglobal logged in via RDP',
    ],
  },
  'ws-fin-04': {
    cpu: 14, memory: 38, diskIo: 4,
    processes: [
      { name: 'chrome.exe', cpu: 9, suspicious: false },
      { name: 'explorer.exe', cpu: 3, suspicious: false },
      { name: 'winlogon.exe', cpu: 2, suspicious: false },
    ],
    fileActivity: ['No anomalous file activity detected'],
    logs: ['[14:18:00] INFO: User kpatel logged in', '[13:55:00] INFO: System idle'],
  },
  'ws-fin-05': {
    cpu: 16, memory: 41, diskIo: 5,
    processes: [
      { name: 'outlook.exe', cpu: 7, suspicious: false },
      { name: 'winword.exe', cpu: 5, suspicious: false },
      { name: 'explorer.exe', cpu: 4, suspicious: false },
    ],
    fileActivity: ['No anomalous file activity detected'],
    logs: ['[14:20:00] INFO: User rtaylor logged in', '[14:00:00] INFO: Patch compliance OK'],
  },
};

const DEFAULT_PROFILE = {
  cpu: 18, memory: 42, diskIo: 12,
  processes: [
    { name: 'svchost.exe', cpu: 4, suspicious: false },
    { name: 'explorer.exe', cpu: 5, suspicious: false },
    { name: 'winlogon.exe', cpu: 2, suspicious: false },
  ],
  fileActivity: ['No anomalous file activity detected'],
  logs: ['[14:00:00] INFO: System operating normally'],
};

const DEMO_LOGS = [
  '[14:32:01] CRITICAL: File encryption event detected',
  '[14:31:58] WARNING: Suspicious process activity',
  '[14:31:45] INFO: Network connection established',
];

const getSystemDetail = (sys, decrypted = new Set()) => {
  const profile = SYSTEM_PROFILES[sys.id] || DEFAULT_PROFILE;
  const statusMult = sys.status === 'infected' ? 1 : sys.status === 'suspicious' ? 0.75 : sys.status === 'healthy' ? 0.35 : 0.5;
  let processes = profile.processes;
  let fileActivity = profile.fileActivity;

  if (sys.status === 'healthy') {
    processes = processes.filter((p) => !p.suspicious);
    fileActivity = ['No anomalous file activity detected'];
  } else if (sys.status === 'infected') {
    processes = INFECTED_PROCESSES;
    fileActivity = decrypted.has(sys.id)
      ? [
          'Decryption key applied — files restored ✅',
          'Verifying file integrity on recovered volumes',
          'Encrypted .locked files removed',
        ]
      : [...INFECTED_FILE_ACTIVITY];
  } else if (sys.status === 'suspicious') {
    if (sys.id === 'ws-fin-03') {
      fileActivity = [
        'Unusual process spawn detected (encrypt_dropper.exe)',
        'Elevated disk I/O — EDR monitoring',
        'Outbound SMB connection to SRV-FINANCE-02',
      ];
    } else {
      fileActivity = profile.fileActivity.filter((f) => !f.includes('locked'));
    }
  }

  return {
    cpu: Math.min(99, Math.round(profile.cpu * (sys.status === 'healthy' ? 0.35 : statusMult))),
    memory: Math.min(99, Math.round(profile.memory * (sys.status === 'healthy' ? 0.35 : statusMult))),
    diskIo: Math.min(99, Math.round(profile.diskIo * (sys.status === 'healthy' ? 0.35 : statusMult))),
    processes,
    fileActivity,
    logs: profile.logs,
  };
};

const SEVERITY_STYLE = {
  Low: { bg: 'rgba(59,130,246,0.15)', border: '#3B82F6', text: '#60A5FA' },
  Medium: { bg: 'rgba(245,158,11,0.15)', border: C.yellow, text: C.yellow },
  High: { bg: 'rgba(249,115,22,0.15)', border: '#F97316', text: '#FB923C' },
  Critical: { bg: 'rgba(239,68,68,0.15)', border: C.red, text: C.red },
};

const formatRansomTimer = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};

const formatElapsed = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};



const StatusDot = ({ status }) => {
  const s = STATUS[status] || STATUS.healthy;
  return (
    <span className="text-sm leading-none" title={s.label}>{s.dot}</span>
  );
};

const Overlay = ({ open, onClose, children, className = '', style = {} }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(11, 17, 32, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div className={className} style={style} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const PanelHeader = ({ title, onClose }) => (
  <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: C.border }}>
    <h2 className="text-lg font-semibold" style={{ color: C.text }}>{title}</h2>
    <button type="button" onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition" style={{ color: C.muted }}>
      <X size={20} />
    </button>
  </div>
);

const BadgeToast = ({ badge, onClose }) => {
  useEffect(() => {
    if (!badge) return;
    const t = setTimeout(() => onClose?.(), 3000);
    return () => clearTimeout(t);
  }, [badge, onClose]);

  if (!badge) return null;
  const normalized = normalizeBadge(badge);

  return (
    <div className="fixed bottom-24 right-4 z-[155] pointer-events-none">
      <div
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg shadow-md"
        style={{ background: C.card, border: `1px solid ${C.border}` }}
      >
        <Badge badge={normalized} size="sm" interactive={false} pop={false} />
        <span className="text-[10px] font-semibold" style={{ color: C.text }}>{normalized.name}</span>
      </div>
    </div>
  );
};



const RansomwareWorkspace = ({ scenario, onComplete }) => {
  const companyName = scenario?.companyName || 'Apex Global';
  const role = scenario?.employeeRole || 'IT Administrator';

  const [elapsed, setElapsed] = useState(0);
  const [systems, setSystems] = useState(SYSTEMS);
  const [selectedId, setSelectedId] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [alertAt, setAlertAt] = useState(null);

  const [showRansomNote, setShowRansomNote] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showBackupConsole, setShowBackupConsole] = useState(false);
  const [showCommPortal, setShowCommPortal] = useState(false);
  const [showIncidentReport, setShowIncidentReport] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showEmailDetail, setShowEmailDetail] = useState(false);
  const [showRdp, setShowRdp] = useState(false);
  const [rdpInput, setRdpInput] = useState('');
  const [rdpHistory, setRdpHistory] = useState([
    { type: 'system', text: 'Microsoft Windows [Version 10.0.22631.3007]' },
    { type: 'system', text: '(c) Apex Global Corp. All rights reserved.' },
    { type: 'prompt', text: 'C:\\Users\\Administrator>' },
  ]);
  const [commMessage, setCommMessage] = useState('');
  const [scanMessage, setScanMessage] = useState(null);
  const [restoredIds, setRestoredIds] = useState(new Set());
  const [backupStatuses, setBackupStatuses] = useState({});
  const [responseDeadlineAt, setResponseDeadlineAt] = useState(null);
  const [scorePoints, setScorePoints] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [finished, setFinished] = useState(false);
  const [milestoneBadge, setMilestoneBadge] = useState(null);
  const [dataLostGb, setDataLostGb] = useState(0);
  const [paymentResult, setPaymentResult] = useState(null);
  const [ransomPaid, setRansomPaid] = useState(false);
  const [decryptedIds, setDecryptedIds] = useState(new Set());
  const [hasCommunicated, setHasCommunicated] = useState(false);
  const [hasGeneratedReport, setHasGeneratedReport] = useState(false);
  const [hasScheduledReview, setHasScheduledReview] = useState(false);
  const [showResolvedBanner, setShowResolvedBanner] = useState(false);
  const [simulationReadyToEnd, setSimulationReadyToEnd] = useState(false);
  const completionStartedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const [tipVisible, setTipVisible] = useState(false);
  const [ransomSecondsLeft, setRansomSecondsLeft] = useState(RANSOM_TIMER_START);
  const [selectedCommMessage, setSelectedCommMessage] = useState(null);
  const [commSentConfirmation, setCommSentConfirmation] = useState(false);
  const [restoreWarning, setRestoreWarning] = useState(null);
  const [backupVerifyMsg, setBackupVerifyMsg] = useState({});
  const [bottomToast, setBottomToast] = useState(null);
  const [containmentTime, setContainmentTime] = useState(null);
  const [sentMessages, setSentMessages] = useState([]);
  const [usedTemplateIds, setUsedTemplateIds] = useState(new Set());
  const pendingResultsRef = useRef(null);
  const completingRef = useRef(false);

  const [activeTip, setActiveTip] = useState(null);
  const shownTipsRef = useRef(new Set());
  const wsFin03InvestigatedRef = useRef(false);
  const spreadActiveRef = useRef(false);
  const spreadStoppedRef = useRef(false);
  const spreadIndexRef = useRef(0);
  const ransomNoteShownRef = useRef(false);
  const alertDetectedRef = useRef(false);
  const isolatedBeforeSpreadRef = useRef(false);
  const pointsAwardedRef = useRef(new Set());
  const spreadTickRef = useRef(0);
  const earnedBadgesRef = useRef([]);

  const awardPoints = useCallback((key, amount) => {
    if (pointsAwardedRef.current.has(key)) return;
    pointsAwardedRef.current.add(key);
    setScorePoints((p) => p + amount);
  }, []);

  const awardBadge = useCallback((key) => {
    const def = BADGE_DEFS[key];
    if (!def) return;
    setEarnedBadges((prev) => {
      if (prev.some((b) => b.name === def.name)) return prev;
      earnedBadgesRef.current = [...prev, def];
      setMilestoneBadge([def]);
      return [...prev, def];
    });
  }, []);

  const tryDetectAlert = useCallback(() => {
    if (alertAt == null || alertDetectedRef.current) return;
    if (elapsed <= alertAt + 30) {
      alertDetectedRef.current = true;
      awardPoints('detectAlert', SCORE.detectAlert);
      awardBadge('firstResponder');
    }
  }, [alertAt, elapsed, awardPoints, awardBadge]);

  const [badgePos, setBadgePos] = useState({ x: null, y: null });
  const [draggingBadge, setDraggingBadge] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const selectedSystem = systems.find((s) => s.id === selectedId);
  const onlineCount = systems.filter((s) => s.status !== 'isolated').length;
  const liveScore = Math.min(100, Math.round((scorePoints / MAX_SCORE) * 100));
  const liveXp = Math.round(liveScore * 1.5);
  const responseSecondsLeft =
    responseDeadlineAt != null ? Math.max(0, responseDeadlineAt - elapsed) : null;

  const systemsContained = !systems.some((s) => s.status === 'infected' || s.status === 'suspicious');
  const allRecoveryStepsComplete =
    systemsContained &&
    hasCommunicated &&
    hasGeneratedReport &&
    hasScheduledReview;

  const affectedSystems = useMemo(
    () => systems.filter((s) => ['infected', 'suspicious', 'isolated'].includes(s.status)),
    [systems]
  );

  const backupTargets = useMemo(
    () =>
      affectedSystems.map((sys) => ({
        systemId: sys.id,
        system: sys.name,
        lastBackup: sys.status === 'infected' ? 'Snapshot at risk' : 'Today 02:00',
        status:
          backupStatuses[sys.id]
          ?? (sys.status === 'infected' ? 'encrypted' : sys.status === 'suspicious' ? 'at_risk' : 'clean'),
      })),
    [affectedSystems, backupStatuses]
  );

  const showBottomToast = useCallback((message, duration = 4000) => {
    setBottomToast(message);
    setTimeout(() => setBottomToast(null), duration);
  }, []);

  const showTip = useCallback((key) => {
    if (shownTipsRef.current.has(key) || !TRIGGER_TIPS[key]) return;
    shownTipsRef.current.add(key);
    setActiveTip(TRIGGER_TIPS[key]);
    setTipVisible(true);
    setTimeout(() => {
      setTipVisible(false);
      setTimeout(() => setActiveTip(null), 500);
    }, 5000);
  }, []);

  const triggerRansomNote = useCallback(() => {
    if (ransomNoteShownRef.current) return;
    ransomNoteShownRef.current = true;
    setShowRansomNote(true);
  }, []);

  const infectNextSystem = useCallback(() => {
    if (spreadStoppedRef.current) return;
    const nextId = SPREAD_ORDER[spreadIndexRef.current];
    if (!nextId) return;
    spreadIndexRef.current += 1;
    setSystems((prev) =>
      prev.map((s) => {
        if (s.id !== nextId) return s;
        if (s.status === 'healthy' || s.status === 'suspicious') {
          setDataLostGb((d) => d + 2);
          return { ...s, status: 'infected' };
        }
        return s;
      })
    );
  }, []);

  const finishSim = useCallback(() => {
    if (finished || completingRef.current) return;
    completingRef.current = true;
    setFinished(true);
    spreadStoppedRef.current = true;
    const infectedCount = systems.filter((s) => s.status === 'infected' || s.status === 'isolated').length;
    const recovered = restoredIds.size;
    const noDataLoss = dataLostGb <= 4 && recovered >= 1;
    let finalBadges = [...earnedBadgesRef.current];
    if (noDataLoss && !finalBadges.some((b) => b.name === BADGE_DEFS.crisisMaster.name)) {
      finalBadges = [...finalBadges, BADGE_DEFS.crisisMaster];
      earnedBadgesRef.current = finalBadges;
      setEarnedBadges(finalBadges);
    }

    let totalPoints = scorePoints;
    if (!pointsAwardedRef.current.has('report')) {
      pointsAwardedRef.current.add('report');
      totalPoints += SCORE.report;
      setScorePoints(totalPoints);
    }
    const computedScore = Math.min(100, Math.round((totalPoints / MAX_SCORE) * 100));

    const results = {
      score: computedScore,
      accuracy: computedScore,
      correct: Math.round(totalPoints / 10),
      total: Math.round(MAX_SCORE / 10),
      breaches: systems.filter((s) => s.status === 'infected').length,
      recovered: recovered > 0,
      totalTime: containmentTime ?? elapsed,
      hintsUsed: 0,
      settingsActions: 0,
      avgReactionTime: alertAt != null ? (alertDetectedRef.current ? Math.min(30, elapsed - alertAt) : 45) : 0,
      xpEarned: Math.round(computedScore * 1.5),
      mistakes: [],
      status: 'completed',
      earnedBadges: finalBadges,
      dataLostGb,
      dataRecoveredGb: recovered * 4,
      systemsRestored: recovered,
      systemsAffected: infectedCount,
      ransomPaid,
      paymentSucceeded: paymentResult === 'key',
      containmentTime: containmentTime ?? elapsed,
      learningPoints: RANSOMWARE_LEARNING_POINTS,
    };
    pendingResultsRef.current = results;
  }, [finished, systems, restoredIds, dataLostGb, scorePoints, elapsed, alertAt, ransomPaid, paymentResult, containmentTime]);

  const handleCloseIncidentReport = useCallback(() => {
    setShowIncidentReport(false);
  }, []);

  const handleSelectSystem = useCallback((id) => {
    if (finished) return;
    setSelectedId(id);
    setScanMessage(null);

    if (id === 'ws-fin-03') {
      wsFin03InvestigatedRef.current = true;
      tryDetectAlert();
    }
  }, [finished, tryDetectAlert]);

  const handleIsolate = useCallback((id) => {
    if (finished) return;
    const wasThreat = systems.find((s) => s.id === id);
    if (!wasThreat || (wasThreat.status !== 'infected' && wasThreat.status !== 'suspicious')) return;

    if (!spreadActiveRef.current) {
      spreadStoppedRef.current = true;
      isolatedBeforeSpreadRef.current = true;
      awardBadge('zeroSpread');
    } else {
      spreadStoppedRef.current = true;
    }

    setSystems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'isolated' } : s))
    );
    awardPoints('isolate', SCORE.isolate);
  }, [finished, systems, awardPoints, awardBadge]);

  const handleRunScan = useCallback(() => {
    if (!selectedSystem) return;
    const st = selectedSystem.status;
    if (st === 'suspicious') setScanMessage('Malware detected! 🟡');
    else if (st === 'infected') setScanMessage('Ransomware confirmed! 🔴');
    else setScanMessage('System clean ✅');
  }, [selectedSystem]);

  const handleRdpCommand = (e) => {
    e.preventDefault();
    const cmd = rdpInput.trim().toLowerCase();
    if (!cmd) return;
    const responses = {
      whoami: 'apexglobal\\administrator',
      hostname: selectedSystem?.name || 'WS-FINANCE-03',
      ipconfig: `IPv4 Address: ${selectedSystem?.ip || '192.168.10.53'}`,
      tasklist: 'svchost.exe  4892  Services\nencrypt_dropper.exe  5102  Console\nexplorer.exe  2048  Console',
      systeminfo: `OS: Windows 11 Enterprise\nSystem Manufacturer: Dell Inc.\nTotal Physical Memory: 16,384 MB`,
    };
    const out = responses[cmd] || `'${cmd}' is not recognized as an internal or external command.`;
    setRdpHistory((prev) => [
      ...prev,
      { type: 'input', text: `> ${rdpInput}` },
      { type: 'output', text: out },
      { type: 'prompt', text: 'C:\\Users\\Administrator>' },
    ]);
    setRdpInput('');
  };

  const openBackupConsole = () => {
    setShowBackupConsole(true);
  };

  const openCommPortal = () => {
    setShowCommPortal(true);
  };

  const openIncidentReport = () => {
    setHasGeneratedReport(true);
    setShowIncidentReport(true);
  };

  const handleScheduleReview = () => {
    setHasScheduledReview(true);
  };

  const handleConfirmPayment = () => {
    if (paymentResult) return;
    const success = Math.random() < 0.5;
    setRansomPaid(true);
    setPaymentResult(success ? 'key' : 'scammed');
    if (success) {
      setDecryptedIds((prev) => {
        const next = new Set(prev);
        systems.filter((s) => s.status === 'infected').forEach((s) => next.add(s.id));
        return next;
      });
    }
  };

  const handleRestore = (target) => {
    const st = backupStatuses[target.systemId] ?? target.status;
    if (st !== 'clean') return;
    const hasUnisolatedThreats = systems.some((s) => s.status === 'infected' || s.status === 'suspicious');
    if (hasUnisolatedThreats) {
      setRestoreWarning('⚠️ Isolate infected systems first!');
      showBottomToast('⚠️ Isolate infected systems first!');
      setTimeout(() => setRestoreWarning(null), 4000);
      return;
    }
    setRestoredIds((prev) => new Set([...prev, target.systemId]));
    setSystems((prev) =>
      prev.map((s) =>
        s.id === target.systemId && (s.status === 'infected' || s.status === 'suspicious')
          ? { ...s, status: 'healthy' }
          : s
      )
    );
    awardPoints('restore', SCORE.restore);
    awardBadge('backupHero');
  };

  const handleVerifyBackup = (target) => {
    const sys = systems.find((s) => s.id === target.systemId);
    const st = backupStatuses[target.systemId] ?? target.status;
    let msg = st === 'clean' ? '✅ Backup verified clean' : '❌ Backup compromised — do not restore';
    if (sys?.status === 'isolated' && st !== 'clean') {
      setBackupStatuses((prev) => ({ ...prev, [target.systemId]: 'clean' }));
      msg = '✅ Backup verified clean after isolation';
    }
    setBackupVerifyMsg((prev) => ({ ...prev, [target.systemId]: msg }));
  };

  const handleSendMessage = () => {
    const msg = commMessage.trim();
    if (!msg) return;
    if (sentMessages.some((s) => s.text === msg)) return;

    const matchedTemplate = COMM_TEMPLATES.find((t) => t.text === msg);
    if (matchedTemplate && usedTemplateIds.has(matchedTemplate.id)) return;

    const timestamp = formatElapsed(elapsed);
    setSentMessages((prev) => [...prev, { text: msg, timestamp, label: matchedTemplate?.label || 'Custom message' }]);
    if (matchedTemplate) {
      setUsedTemplateIds((prev) => new Set([...prev, matchedTemplate.id]));
    }
    setCommSentConfirmation(true);
    if (msg === TRANSPARENT_MSG) {
      setHasCommunicated(true);
      awardPoints('communicate', SCORE.communicate);
    }
    setCommMessage('');
  };

  const markAlertEngaged = useCallback(() => {
    tryDetectAlert();
    handleSelectSystem('ws-fin-03');
  }, [tryDetectAlert, handleSelectSystem]);

  
  useEffect(() => {
    if (containmentTime != null || finished) return;
    const hasThreats = systems.some((s) => s.status === 'infected' || s.status === 'suspicious');
    const hasIsolated = systems.some((s) => s.status === 'isolated');
    if (!hasThreats && hasIsolated) {
      setContainmentTime(elapsed);
    }
  }, [systems, elapsed, containmentTime, finished]);

  
  useEffect(() => {
    affectedSystems.forEach((sys) => {
      setBackupStatuses((prev) => {
        if (sys.status === 'isolated') {
          if (prev[sys.id] === 'clean') return prev;
          return { ...prev, [sys.id]: 'clean' };
        }
        if (prev[sys.id]) return prev;
        const defaultStatus =
          sys.status === 'infected' ? 'encrypted' : sys.status === 'suspicious' ? 'at_risk' : 'clean';
        return { ...prev, [sys.id]: defaultStatus };
      });
    });
  }, [affectedSystems]);

  
  useEffect(() => {
    if (!showRansomNote || finished || simulationReadyToEnd) return;
    const t = setInterval(() => setRansomSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [showRansomNote, finished, simulationReadyToEnd]);

  
  useEffect(() => {
    if (finished || simulationReadyToEnd) return;
    const hasThreats = systems.some((s) => s.status === 'infected' || s.status === 'suspicious');
    const hasIsolated = systems.some((s) => s.status === 'isolated');
    if (!hasThreats && hasIsolated) showTip('useCommPortal');
  }, [systems, finished, showTip]);

  useEffect(() => {
    if (hasCommunicated) showTip('generateReportTip');
  }, [hasCommunicated, showTip]);

  useEffect(() => {
    if (hasGeneratedReport) showTip('scheduleReviewTip');
  }, [hasGeneratedReport, showTip]);

  
  useEffect(() => {
    if (finished || simulationReadyToEnd) return;
    const t = setInterval(() => setElapsed((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [finished, simulationReadyToEnd]);

  
  useEffect(() => {
    if (finished || simulationReadyToEnd) return;

    if (elapsed === 15) showTip('simStart');
    if (elapsed === EVENT_EMAIL_AT) setShowEmail(true);

    if (elapsed === EVENT_ALERT_AT && alertAt === null) {
      setAlertAt(EVENT_ALERT_AT);
      setResponseDeadlineAt(EVENT_ALERT_AT + RESPONSE_WINDOW_SECONDS);
      setAlerts([{ ...INITIAL_ALERT, countdown: RESPONSE_WINDOW_SECONDS }]);
      setSystems((prev) =>
        prev.map((s) => (s.id === 'ws-fin-03' ? { ...s, status: 'suspicious' } : s))
      );
      showTip('alertAppears');
    }

    if (elapsed === EVENT_SPREAD_AT) {
      showTip('spreadBackup');
    }

    if (elapsed === EVENT_SPREAD_AT && !spreadStoppedRef.current && !wsFin03InvestigatedRef.current) {
      spreadActiveRef.current = true;
      spreadTickRef.current = 0;
      setSystems((prev) =>
        prev.map((s) => (s.id === 'ws-fin-03' ? { ...s, status: 'infected' } : s))
      );
      setDataLostGb((d) => d + 4);
      infectNextSystem();
      triggerRansomNote();
    }

    if (
      spreadActiveRef.current &&
      !spreadStoppedRef.current &&
      elapsed > EVENT_SPREAD_AT &&
      (elapsed - EVENT_SPREAD_AT) % SPREAD_INTERVAL === 0
    ) {
      const tick = (elapsed - EVENT_SPREAD_AT) / SPREAD_INTERVAL;
      if (tick > spreadTickRef.current) {
        spreadTickRef.current = tick;
        infectNextSystem();
      }
    }

    if (elapsed === EVENT_ESCALATION_AT) {
      if (!spreadStoppedRef.current) {
        setSystems((prev) =>
          prev.map((s) =>
            s.id === 'ws-fin-03' && s.status === 'suspicious' ? { ...s, status: 'infected' } : s
          )
        );
        if (!spreadActiveRef.current) {
          spreadActiveRef.current = true;
          spreadTickRef.current = 0;
          infectNextSystem();
        }
      }
      triggerRansomNote();
    }
  }, [elapsed, finished, simulationReadyToEnd, alertAt, showTip, infectNextSystem, triggerRansomNote]);

  
  useEffect(() => {
    if (finished || simulationReadyToEnd) return;
    if (allRecoveryStepsComplete) {
      setSimulationReadyToEnd(true);
    }
  }, [allRecoveryStepsComplete, finished, simulationReadyToEnd]);

  useEffect(() => {
    if (!simulationReadyToEnd || completionStartedRef.current) return;
    completionStartedRef.current = true;
    spreadStoppedRef.current = true;

    setShowResolvedBanner(true);
    finishSim();

    const timer = window.setTimeout(() => {
      setShowResolvedBanner(false);
      if (pendingResultsRef.current) {
        onCompleteRef.current?.(pendingResultsRef.current);
      }
    }, 1800);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simulationReadyToEnd]);

  const handleBadgeMouseDown = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    dragOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDraggingBadge(true);
  };

  useEffect(() => {
    if (!draggingBadge) return;
    const onMove = (e) => {
      const w = 220;
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

  const dismissAlert = (id) => {
    markAlertEngaged();
    setResponseDeadlineAt(null);
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const scoreBadgeStyle =
    badgePos.x != null
      ? { left: badgePos.x, top: badgePos.y, right: 'auto', bottom: 'auto' }
      : { right: 16, bottom: 16, left: 'auto', top: 'auto' };

  return (
    <div className="sim-layer-full sim-workspace-root z-[60] flex flex-col overflow-hidden relative" style={{ background: C.bg, color: C.text }}>
      {}
      <header
        className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b"
        style={{ background: C.card, borderColor: C.border }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <Shield size={20} style={{ color: C.accent }} />
          <div>
            <p className="text-sm font-semibold truncate">{companyName}</p>
            <p className="text-xs" style={{ color: C.muted }}>{role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg" style={{ background: C.bg }}>
          <Clock size={16} style={{ color: C.accent }} />
          <span className="font-mono text-lg font-semibold tracking-wider">{formatElapsed(elapsed)}</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Wifi size={16} style={{ color: C.green }} />
            <span><strong>{onlineCount}</strong> <span style={{ color: C.muted }}>Online</span></span>
          </div>
          {alerts.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(239,68,68,0.15)', color: C.red, border: `1px solid ${C.red}` }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.red }} />
              Active Incident
            </div>
          )}
          {alerts.length === 0 && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(34,197,94,0.12)', color: C.green, border: `1px solid ${C.green}44` }}>
              <span className="w-2 h-2 rounded-full" style={{ background: C.green }} />
              All Systems Normal
            </div>
          )}
        </div>
      </header>

      {}
      <div className="flex-shrink-0 flex items-center gap-2 px-5 py-2 border-b overflow-x-auto relative z-[72]" style={{ borderColor: C.border, background: 'rgba(26,35,50,0.6)' }}>
        {[
          { label: 'Communicate', action: openCommPortal, icon: MessageSquare },
          { label: 'Backup Console', action: openBackupConsole, icon: Database },
          { label: 'Generate Report', action: openIncidentReport, icon: FileText },
        ].map(({ label, action, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition hover:brightness-110 whitespace-nowrap"
            style={{
              background: 'rgba(0,212,170,0.12)',
              color: C.accent,
              border: '1px solid rgba(0,212,170,0.3)',
            }}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {}
      {activeTip && (
        <div
          className="absolute left-1/2 -translate-x-1/2 z-[71] pointer-events-none transition-opacity duration-500 sim-ransom-tip"
          style={{ top: '5.5rem', opacity: tipVisible ? 1 : 0 }}
        >
          <p className="sim-ransom-tip__text">{activeTip}</p>
        </div>
      )}

      {}
      <div className="flex-1 flex overflow-hidden relative">
        {}
        <main className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-semibold">Network Map</h1>
              <p className="text-xs mt-0.5" style={{ color: C.muted }}>12 systems · Click a node to inspect</p>
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: C.muted }}>
              <span>🟢 Healthy</span>
              <span>🟡 Suspicious</span>
              <span>🔴 Infected</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {systems.map((sys) => {
              const st = STATUS[sys.status] || STATUS.healthy;
              const isSelected = selectedId === sys.id;
              const Icon = sys.type === 'server' ? Server : Monitor;
              return (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => handleSelectSystem(sys.id)}
                  className="text-left p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    background: C.card,
                    borderColor: isSelected ? C.accent : st.color + '55',
                    boxShadow: isSelected ? `0 0 0 2px ${C.accent}44` : undefined,
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon size={18} style={{ color: st.color }} />
                    <StatusDot status={sys.status} />
                  </div>
                  <p className="text-sm font-semibold truncate">{sys.name}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: C.muted }}>{sys.role}</p>
                  <p className="text-xs font-mono mt-2" style={{ color: C.accent }}>{sys.ip}</p>
                </button>
              );
            })}
          </div>
        </main>

        {}
        <aside
          className="flex-shrink-0 border-l transition-all duration-300 overflow-hidden"
          style={{
            width: selectedSystem ? 380 : 0,
            borderColor: C.border,
            background: C.card,
          }}
        >
          {selectedSystem && (() => {
            const detail = getSystemDetail(selectedSystem, decryptedIds);
            const st = STATUS[selectedSystem.status] || STATUS.healthy;
            return (
              <div className="w-[380px] h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: C.border }}>
                  <div>
                    <p className="font-semibold text-sm">{selectedSystem.name}</p>
                    <p className="text-xs font-mono" style={{ color: C.accent }}>{selectedSystem.ip}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusDot status={selectedSystem.status} />
                    <button type="button" onClick={() => setSelectedId(null)} className="p-1 rounded hover:bg-white/10" style={{ color: C.muted }}>
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.muted }}>System Stats</p>
                    {[
                      ['CPU Usage', detail.cpu, C.red],
                      ['Memory Usage', detail.memory, C.yellow],
                      ['Disk I/O', detail.diskIo, C.accent],
                    ].map(([label, val, color]) => (
                      <div key={label} className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: C.muted }}>{label}</span>
                          <span style={{ color }}>{val}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: C.bg }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${val}%`, background: color }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {}
                  {scanMessage && (
                    <div className="px-3 py-2 rounded-lg text-xs font-medium text-center" style={{ background: C.bg, border: `1px solid ${C.accent}44`, color: C.accent }}>
                      {scanMessage}
                    </div>
                  )}

                  {}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.muted }}>Recent Processes</p>
                    <div className="space-y-1.5">
                      {detail.processes.map((p) => (
                        <div
                          key={p.name}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs"
                          style={{ background: C.bg, border: p.suspicious ? `1px solid ${C.yellow}` : `1px solid ${C.border}` }}
                        >
                          <span className="font-mono">{p.name}</span>
                          <span style={{ color: p.suspicious ? C.yellow : C.muted }}>
                            CPU: {p.cpu}%{p.suspicious && ' · SUSPICIOUS'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.muted }}>Recent File Activity</p>
                    <div className="space-y-1.5">
                      {detail.fileActivity.map((f, i) => (
                        <div key={i} className="px-3 py-2 rounded-lg text-xs font-mono" style={{ background: C.bg, color: f.includes('locked') ? C.red : C.muted }}>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {}
                <div className="p-4 border-t grid grid-cols-2 gap-2" style={{ borderColor: C.border }}>
                  {[
                    { label: 'View Logs', icon: Terminal, action: () => setShowLogs(true) },
                    { label: 'Run Scan', icon: Scan, action: handleRunScan },
                    { label: 'Isolate', icon: Unplug, action: () => handleIsolate(selectedSystem.id), disabled: selectedSystem.status !== 'suspicious' && selectedSystem.status !== 'infected' },
                    { label: 'RDP Access', icon: Eye, action: () => setShowRdp(true), title: 'Use to inspect system details and run diagnostic commands' },
                  ].map(({ label, icon: Icon, action, disabled, title }) => (
                    <button
                      key={label}
                      type="button"
                      onClick={action}
                      disabled={disabled}
                      title={title}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: 'rgba(0,212,170,0.12)', color: C.accent, border: '1px solid rgba(0,212,170,0.25)' }}
                    >
                      <Icon size={14} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}
        </aside>
      </div>

      {}
      <div className="fixed bottom-6 left-6 z-[75] flex flex-col gap-2 max-w-[320px] w-[calc(100%-3rem)] sm:w-auto pointer-events-none">
        {bottomToast && (
          <div
            className="pointer-events-auto p-3 rounded-xl border text-xs font-medium shadow-lg"
            style={{ background: C.card, borderColor: C.accent, color: C.accent }}
          >
            {bottomToast}
          </div>
        )}

        {alerts.map((alert) => {
          const sev = SEVERITY_STYLE[alert.severity] || SEVERITY_STYLE.Medium;
          return (
            <button
              key={alert.id}
              type="button"
              onClick={() => { markAlertEngaged(); setSelectedAlert(alert); }}
              className="pointer-events-auto text-left p-3 rounded-xl border transition hover:scale-[1.01] shadow-lg"
              style={{ background: C.card, borderColor: sev.border, boxShadow: `0 4px 20px ${sev.border}33` }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ background: sev.bg, color: sev.text }}>
                  {alert.severity}
                </span>
                <span className="text-[10px] font-mono" style={{ color: C.red }}>
                  {responseSecondsLeft != null ? `${responseSecondsLeft}s` : `${alert.countdown}s`}
                </span>
              </div>
              <p className="text-sm font-semibold">{alert.title}</p>
              <p className="text-xs mt-0.5 line-clamp-2" style={{ color: C.muted }}>{alert.description}</p>
              <div className="flex items-center justify-between mt-2 text-[10px]" style={{ color: C.muted }}>
                <span>{alert.source}</span>
                <span>{alert.timestamp}</span>
              </div>
            </button>
          );
        })}

        {showEmail && !showEmailDetail && (
          <button
            type="button"
            onClick={() => setShowEmailDetail(true)}
            className="pointer-events-auto w-full text-left p-4 rounded-xl border shadow-lg transition hover:scale-[1.01]"
            style={{ background: C.card, borderColor: C.border, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
          >
            <div className="flex items-start gap-3">
              <Mail size={20} style={{ color: C.accent }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">📧 New email from Lisa (Finance)</p>
                <p className="text-xs mt-1 line-clamp-2" style={{ color: C.muted }}>
                  My computer is running slow and I can&apos;t open my files. Getting weird error messages...
                </p>
                <p className="text-[10px] mt-2" style={{ color: C.accent }}>Click to open →</p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowEmail(false); }}
                className="p-0.5 rounded hover:bg-white/10 flex-shrink-0 pointer-events-auto"
                style={{ color: C.muted }}
              >
                <X size={14} />
              </button>
            </div>
          </button>
        )}
      </div>

      {}
      <Overlay open={!!selectedAlert} onClose={() => setSelectedAlert(null)} className="w-full max-w-md rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        {selectedAlert && (
          <>
            <PanelHeader title="Alert Details" onClose={() => setSelectedAlert(null)} />
            <div className="p-5 space-y-3">
              <span className="text-xs font-bold uppercase px-2 py-1 rounded" style={{ background: SEVERITY_STYLE[selectedAlert.severity]?.bg, color: SEVERITY_STYLE[selectedAlert.severity]?.text }}>
                {selectedAlert.severity}
              </span>
              <h3 className="text-lg font-semibold">{selectedAlert.title}</h3>
              <p className="text-sm" style={{ color: C.muted }}>{selectedAlert.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg" style={{ background: C.bg }}><span style={{ color: C.muted }}>Source</span><p>{selectedAlert.source}</p></div>
                <div className="p-2 rounded-lg" style={{ background: C.bg }}><span style={{ color: C.muted }}>Time</span><p>{selectedAlert.timestamp}</p></div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)', border: `1px solid ${C.red}44` }}>
                <Clock size={16} style={{ color: C.red }} />
                <span className="text-sm">
                  Response timer: <strong>{responseSecondsLeft ?? selectedAlert.countdown}s</strong> remaining
                </span>
              </div>
              <button
                type="button"
                onClick={() => { dismissAlert(selectedAlert.id); setSelectedAlert(null); }}
                className="w-full py-2 rounded-lg text-sm font-medium transition hover:brightness-110"
                style={{ background: C.accent, color: C.bg }}
              >
                Acknowledge Alert
              </button>
            </div>
          </>
        )}
      </Overlay>

      {}
      <Overlay open={showLogs} onClose={() => setShowLogs(false)} className="w-full max-w-2xl rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <PanelHeader title={`System Logs — ${selectedSystem?.name || 'System'}`} onClose={() => setShowLogs(false)} />
        <div className="p-4 max-h-80 overflow-y-auto font-mono text-xs space-y-1" style={{ background: C.bg }}>
          {(selectedSystem ? getSystemDetail(selectedSystem, decryptedIds).logs : DEMO_LOGS).map((line, i) => (
            <p key={i} style={{ color: line.includes('CRITICAL') ? C.red : line.includes('WARNING') ? C.yellow : C.muted }}>{line}</p>
          ))}
        </div>
      </Overlay>

      {}
      <Overlay open={showRdp} onClose={() => setShowRdp(false)} className="w-full max-w-2xl rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <PanelHeader title={`RDP — ${selectedSystem?.name || 'Remote Desktop'}`} onClose={() => setShowRdp(false)} />
        <form onSubmit={handleRdpCommand} className="flex flex-col">
          <div className="p-4 max-h-72 overflow-y-auto font-mono text-xs space-y-1" style={{ background: '#0a0e17' }}>
            {rdpHistory.map((line, i) => (
              <p key={i} style={{ color: line.type === 'input' ? C.accent : line.type === 'prompt' ? C.green : C.muted, whiteSpace: 'pre-wrap' }}>
                {line.text}
              </p>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2" style={{ borderColor: C.border, background: C.bg }}>
            <input
              type="text"
              value={rdpInput}
              onChange={(e) => setRdpInput(e.target.value)}
              placeholder="Type a command (whoami, hostname, ipconfig, tasklist, systeminfo)..."
              className="flex-1 px-3 py-2 rounded-lg text-xs font-mono outline-none"
              style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}
              autoFocus
            />
            <button type="submit" className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: C.accent, color: C.bg }}>
              Run
            </button>
          </div>
        </form>
      </Overlay>

      {}
      <Overlay open={showRansomNote} onClose={() => setShowRansomNote(false)}>
        <div
          className="w-full max-w-lg rounded-2xl border-2 p-8 text-center relative"
          style={{ background: C.card, borderColor: C.red, boxShadow: `0 0 60px ${C.red}66, 0 0 120px ${C.red}33` }}
        >
          <button type="button" onClick={() => setShowRansomNote(false)} className="absolute top-4 right-4 p-1 rounded hover:bg-white/10" style={{ color: C.muted }}>
            <X size={20} />
          </button>
          <AlertTriangle size={48} className="mx-auto mb-4" style={{ color: C.red }} />
          <h2 className="text-2xl font-bold tracking-widest mb-2" style={{ color: C.red }}>YOUR FILES HAVE BEEN ENCRYPTED</h2>
          <p className="text-sm mb-6" style={{ color: C.muted }}>
            All your important files have been encrypted. Pay the ransom to recover your data.
          </p>
          <div className="p-4 rounded-xl mb-4 font-mono text-sm break-all" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
            <p className="text-xs mb-1" style={{ color: C.muted }}>Bitcoin Address</p>
            1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
          </div>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock size={18} style={{ color: C.red }} />
            <span className="font-mono text-xl font-bold" style={{ color: C.red }}>{formatRansomTimer(ransomSecondsLeft)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Pay Ransom', action: () => { setShowRansomNote(false); setShowPayment(true); }, danger: true },
              { label: 'Restore from Backups', action: () => setShowRansomNote(false) },
              { label: 'Negotiate with Attackers', action: () => { setShowRansomNote(false); openCommPortal(); } },
              { label: 'Ignore', action: () => setShowRansomNote(false) },
            ].map(({ label, action, danger }) => (
              <button
                key={label}
                type="button"
                onClick={action}
                className="px-3 py-2.5 rounded-lg text-xs font-medium transition hover:brightness-110"
                style={{
                  background: danger ? 'rgba(239,68,68,0.2)' : 'rgba(0,212,170,0.12)',
                  color: danger ? C.red : C.accent,
                  border: `1px solid ${danger ? C.red + '55' : C.accent + '44'}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Overlay>

      {}
      <Overlay open={showPayment} onClose={() => setShowPayment(false)} className="w-full max-w-md rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <PanelHeader title="Ransom Payment" onClose={() => setShowPayment(false)} />
        <div className="p-5 space-y-4">
          <div className="text-center p-4 rounded-xl" style={{ background: C.bg }}>
            <CreditCard size={32} className="mx-auto mb-2" style={{ color: C.red }} />
            <p className="text-2xl font-bold" style={{ color: C.red }}>2.5 BTC</p>
            <p className="text-xs mt-1" style={{ color: C.muted }}>≈ $175,000 USD</p>
          </div>
          <p className="text-xs text-center" style={{ color: C.muted }}>This is a simulation. No real payment will be processed.</p>
          {paymentResult === 'key' && (
            <div className="p-3 rounded-lg text-sm text-center font-medium" style={{ background: 'rgba(34,197,94,0.12)', color: C.green, border: `1px solid ${C.green}44` }}>
              Decryption key received ✅ — Files are being decrypted
            </div>
          )}
          {paymentResult === 'scammed' && (
            <div className="p-3 rounded-lg text-sm text-center font-medium" style={{ background: 'rgba(239,68,68,0.12)', color: C.red, border: `1px solid ${C.red}44` }}>
              Attackers took the money! No key received ❌ — Files remain encrypted
            </div>
          )}
          {!paymentResult ? (
            <button
              type="button"
              onClick={handleConfirmPayment}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition hover:brightness-110"
              style={{ background: C.red, color: C.text }}
            >
              Confirm Payment
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPayment(false)}
              className="w-full py-2.5 rounded-lg text-sm font-medium transition hover:brightness-110"
              style={{ background: C.accent, color: C.bg }}
            >
              Continue Incident Response
            </button>
          )}
        </div>
      </Overlay>

      {}

      {}
      <Overlay open={showEmailDetail} onClose={() => setShowEmailDetail(false)} className="w-full max-w-md rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        <PanelHeader title="Email" onClose={() => setShowEmailDetail(false)} />
        <div className="p-5 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: C.muted }}>From</p>
            <p className="text-sm font-semibold">Lisa (Finance)</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: C.muted }}>Subject</p>
            <p className="text-sm font-semibold">My computer is slow</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: C.muted }}>Body</p>
            <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
              IT team, my computer is running super slow and there are weird files appearing on my desktop. Can you check it? - Lisa
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowEmailDetail(false)}
            className="w-full py-2 rounded-lg text-sm font-medium transition hover:brightness-110"
            style={{ background: C.accent, color: C.bg }}
          >
            Close
          </button>
        </div>
      </Overlay>

      {}
      <Overlay open={showCommPortal} onClose={() => setShowCommPortal(false)} className="w-full max-w-2xl max-h-[85vh] rounded-2xl border overflow-hidden flex flex-col" style={{ background: C.card, borderColor: C.border }}>
        <PanelHeader title="Communication Portal" onClose={() => setShowCommPortal(false)} />
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.muted }}>Received Messages</p>
            <div className="space-y-3">
              {COMM_MESSAGES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedCommMessage(m)}
                  className="w-full text-left p-3 rounded-xl transition hover:brightness-110"
                  style={{ background: C.bg, border: m.urgent ? `1px solid ${C.yellow}44` : `1px solid ${C.border}` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{m.from}</span>
                    <span className="text-[10px]" style={{ color: C.muted }}>{m.time}</span>
                  </div>
                  <p className="text-xs" style={{ color: C.muted }}>{m.msg}</p>
                  <p className="text-[10px] mt-1" style={{ color: C.accent }}>Click to read →</p>
                </button>
              ))}
            </div>
          </div>

          {sentMessages.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: C.muted }}>Sent Messages</p>
              <div className="space-y-2">
                {sentMessages.map((s, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl text-xs"
                    style={{ background: 'rgba(0,212,170,0.08)', border: `1px solid rgba(0,212,170,0.25)` }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold" style={{ color: C.accent }}>{s.label}</span>
                      <span style={{ color: C.muted }}>{s.timestamp}</span>
                    </div>
                    <p style={{ color: C.muted }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t space-y-3" style={{ borderColor: C.border }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.muted }}>Message Templates</p>
          <div className="flex flex-wrap gap-2">
            {COMM_TEMPLATES.map((t) => {
              const isUsed = usedTemplateIds.has(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  disabled={isUsed}
                  onClick={() => setCommMessage(t.text)}
                  className="px-3 py-1.5 rounded-lg text-xs transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: C.bg, border: `1px solid ${isUsed ? C.green + '44' : C.border}`, color: C.text }}
                  title={t.desc}
                >
                  {isUsed ? '✓ Sent' : t.label} {!isUsed && <span style={{ color: C.muted }}>({t.desc})</span>}
                </button>
              );
            })}
          </div>
          <textarea
            value={commMessage}
            onChange={(e) => setCommMessage(e.target.value)}
            placeholder="Compose your message to employees and leadership..."
            rows={3}
            className="w-full px-3 py-2 rounded-lg text-sm resize-none outline-none"
            style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }}
          />
          {commSentConfirmation && (
            <p className="text-xs font-medium text-center" style={{ color: C.green }}>
              ✅ Message sent to all employees and leadership
            </p>
          )}
          <button
            type="button"
            onClick={handleSendMessage}
            disabled={!commMessage.trim() || sentMessages.some((s) => s.text === commMessage.trim()) || COMM_TEMPLATES.some((t) => t.text === commMessage.trim() && usedTemplateIds.has(t.id))}
            className="w-full py-2 rounded-lg text-sm font-medium transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: C.accent, color: C.bg }}
          >
            Send Message
          </button>
        </div>
      </Overlay>

      {}
      <Overlay open={!!selectedCommMessage} onClose={() => setSelectedCommMessage(null)} className="w-full max-w-md rounded-2xl border overflow-hidden" style={{ background: C.card, borderColor: C.border }}>
        {selectedCommMessage && (
          <>
            <PanelHeader title="Message" onClose={() => setSelectedCommMessage(null)} />
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: C.muted }}>From</p>
                <p className="text-sm font-semibold">{selectedCommMessage.from}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: C.muted }}>Subject</p>
                <p className="text-sm font-semibold">{selectedCommMessage.subject}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider mb-2" style={{ color: C.muted }}>Message</p>
                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{selectedCommMessage.body}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCommMessage(null)}
                className="w-full py-2 rounded-lg text-sm font-medium transition hover:brightness-110"
                style={{ background: C.accent, color: C.bg }}
              >
                Close
              </button>
            </div>
          </>
        )}
      </Overlay>

      {}
      <Overlay open={showBackupConsole} onClose={() => setShowBackupConsole(false)} className="w-full max-w-2xl max-h-[85vh] rounded-2xl border overflow-hidden flex flex-col" style={{ background: C.card, borderColor: C.border }}>
        <PanelHeader title="Backup Console" onClose={() => setShowBackupConsole(false)} />
        {restoreWarning && (
          <div className="mx-4 mt-3 p-3 rounded-lg text-xs font-medium text-center" style={{ background: 'rgba(245,158,11,0.12)', color: C.yellow, border: `1px solid ${C.yellow}44` }}>
            {restoreWarning}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {backupTargets.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: C.muted }}>
              No affected systems require backup recovery at this time.
            </p>
          ) : (
            backupTargets.map((b) => {
              const st = backupStatuses[b.systemId] ?? b.status;
              const statusLabel =
                st === 'clean' ? '✅ Clean' : st === 'encrypted' ? '❌ Encrypted' : st === 'at_risk' ? '⚠ At risk' : '❌ Corrupted';
              const statusColor = st === 'clean' ? C.green : st === 'at_risk' ? C.yellow : C.red;
              const restored = restoredIds.has(b.systemId);
              return (
                <div key={b.systemId} className="flex items-center justify-between p-3 rounded-xl" style={{ background: C.bg, border: `1px solid ${C.border}` }}>
                  <div>
                    <p className="text-sm font-semibold">{b.system}</p>
                    <p className="text-xs" style={{ color: C.muted }}>Last backup: {b.lastBackup}</p>
                    <p className="text-xs mt-0.5 font-medium" style={{ color: statusColor }}>{restored ? '✅ Restored' : statusLabel}</p>
                    {backupVerifyMsg[b.systemId] && (
                      <p className="text-xs mt-1 font-medium" style={{ color: backupVerifyMsg[b.systemId].includes('✅') ? C.green : C.red }}>
                        {backupVerifyMsg[b.systemId]}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={st !== 'clean' || restored}
                      onClick={() => handleRestore(b)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: 'rgba(0,212,170,0.12)', color: C.accent, border: '1px solid rgba(0,212,170,0.25)' }}
                    >
                      Restore
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVerifyBackup(b)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium transition hover:brightness-110"
                      style={{ background: C.bg, color: C.muted, border: `1px solid ${C.border}` }}
                    >
                      Verify Backup
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Overlay>

      {}
      <Overlay open={showIncidentReport} onClose={handleCloseIncidentReport} className="w-full max-w-3xl max-h-[90vh] rounded-2xl border overflow-hidden flex flex-col" style={{ background: C.card, borderColor: C.border }}>
        <PanelHeader title="Incident Report" onClose={handleCloseIncidentReport} />
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              ['Systems Affected', String(systems.filter((s) => s.status === 'infected' || s.status === 'isolated').length)],
              ['Data Lost', `${dataLostGb} GB`],
              ['Data Recovered', `${restoredIds.size * 4} GB`],
              ['Time to Contain', formatElapsed(containmentTime ?? elapsed)],
              ['Ransom Paid', ransomPaid ? 'Yes' : 'No'],
              ['Final Score', `${Math.min(100, Math.round((scorePoints / MAX_SCORE) * 100))}%`],
            ].map(([label, val]) => (
              <div key={label} className="p-3 rounded-xl" style={{ background: C.bg }}>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: C.muted }}>{label}</p>
                <p className="text-lg font-semibold mt-1">{val}</p>
              </div>
            ))}
          </div>
          {earnedBadges.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Badges Earned</p>
              <div className="flex flex-wrap gap-2">
                {earnedBadges.map((b) => (
                  <span key={b.name} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(0,212,170,0.12)', color: C.accent, border: '1px solid rgba(0,212,170,0.3)' }}>
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Recommendations</p>
            <ul className="space-y-2 text-sm" style={{ color: C.muted }}>
              <li className="flex items-start gap-2"><ChevronRight size={16} style={{ color: C.accent }} className="flex-shrink-0 mt-0.5" />Enable MFA on all admin accounts immediately</li>
              <li className="flex items-start gap-2"><ChevronRight size={16} style={{ color: C.accent }} className="flex-shrink-0 mt-0.5" />Implement network segmentation for finance department</li>
              <li className="flex items-start gap-2"><ChevronRight size={16} style={{ color: C.accent }} className="flex-shrink-0 mt-0.5" />Conduct phishing awareness training for all staff</li>
              <li className="flex items-start gap-2"><ChevronRight size={16} style={{ color: C.accent }} className="flex-shrink-0 mt-0.5" />Verify backup integrity and test restore procedures monthly</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition hover:brightness-110" style={{ background: C.accent, color: C.bg }}>
              <Download size={16} /> Download Report
            </button>
            <button
              type="button"
              onClick={handleScheduleReview}
              disabled={hasScheduledReview}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition hover:brightness-110 disabled:opacity-60"
              style={{ background: hasScheduledReview ? 'rgba(34,197,94,0.15)' : C.bg, color: hasScheduledReview ? C.green : C.text, border: `1px solid ${hasScheduledReview ? C.green + '44' : C.border}` }}
            >
              {hasScheduledReview ? '✅ Review Scheduled' : 'Schedule Post-Incident Review'}
            </button>
            <button
              type="button"
              onClick={handleCloseIncidentReport}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition hover:brightness-110"
              style={{ background: C.bg, color: C.muted, border: `1px solid ${C.border}` }}
            >
              <X size={16} /> Close Incident
            </button>
          </div>
        </div>
      </Overlay>

      {}
      <div
        className="absolute z-[150] px-3 py-2 rounded-full shadow-lg text-xs font-medium flex items-center gap-2 select-none"
        style={{ ...scoreBadgeStyle, background: C.card, color: C.text, border: `1px solid ${C.border}` }}
      >
        <button
          type="button"
          onMouseDown={handleBadgeMouseDown}
          className="cursor-grab active:cursor-grabbing p-0.5"
          style={{ color: C.accent }}
          title="Drag to move"
        >
          <GripVertical size={14} />
        </button>
        <span>Score: {liveScore}%</span>
        <span style={{ color: C.muted }}>|</span>
        <span style={{ color: C.accent }}>XP: +{liveXp}</span>
      </div>

      {}
      {milestoneBadge && (
        <BadgeToast badge={milestoneBadge[0]} onClose={() => setMilestoneBadge(null)} />
      )}

      {}
      {showResolvedBanner && (
        <div
          className="absolute top-20 left-1/2 -translate-x-1/2 z-[250] px-6 py-3 rounded-xl text-sm font-semibold shadow-lg pointer-events-none"
          style={{ background: 'rgba(34,197,94,0.15)', color: C.green, border: `1px solid ${C.green}` }}
        >
          ✅ Incident resolved successfully!
        </div>
      )}
    </div>
  );
};

export default RansomwareWorkspace;
