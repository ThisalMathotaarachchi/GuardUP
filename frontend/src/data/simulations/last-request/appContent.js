import { SIM_EMPLOYEE, DANIEL } from './simIdentity';

export { SIM_EMPLOYEE, DANIEL };

export const EMPLOYEES = [
  {
    id: 'daniel-perera',
    name: DANIEL.displayName,
    role: DANIEL.role,
    department: 'Finance',
    employeeId: DANIEL.employeeId,
    extension: DANIEL.extension,
    email: DANIEL.email,
    location: 'Colombo — Floor 3',
  },
  {
    id: 'alex-fernando',
    name: SIM_EMPLOYEE.displayName,
    role: SIM_EMPLOYEE.role,
    department: SIM_EMPLOYEE.department,
    employeeId: SIM_EMPLOYEE.employeeId,
    extension: '318',
    email: SIM_EMPLOYEE.email,
    location: 'Colombo — Floor 3',
  },
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Project Coordinator',
    department: 'Operations',
    employeeId: 'AU-1933',
    extension: '305',
    email: 'sarah.mitchell@aureliasystems.lk',
    location: 'Colombo — Floor 3',
  },
  {
    id: 'it-support',
    name: 'IT Help Desk',
    role: 'IT Support',
    department: 'Information Technology',
    employeeId: 'AU-0100',
    extension: '100',
    email: 'helpdesk@aureliasystems.lk',
    location: 'Colombo — Floor 2',
    officialPhone: '+94 11 555 0100',
  },
  {
    id: 'security-ops',
    name: 'Security Operations',
    role: 'Security Operations',
    department: 'Security',
    employeeId: 'AU-0099',
    extension: '911',
    email: 'security@aureliasystems.lk',
    location: 'Colombo — Floor 2',
  },
  {
    id: 'priya-r',
    name: 'Priya Rajapaksa',
    role: 'Operations Manager',
    department: 'Operations',
    employeeId: 'AU-1201',
    extension: '312',
    email: 'priya.rajapaksa@aureliasystems.lk',
    location: 'Colombo — Floor 3',
  },
];

export const INITIAL_EMAILS = [
  {
    id: 'email-standup',
    from: 'Operations Team',
    fromEmail: 'operations@aureliasystems.lk',
    subject: 'Daily Stand-up — 9:00 AM',
    body: 'Reminder: daily stand-up in Conference Room B at 9:00. Please bring your project status updates.',
    time: '08:12',
    read: false,
    folder: 'inbox',
    headers: { returnPath: 'operations@aureliasystems.lk', received: '08:12 AM — mail.aureliasystems.lk' },
  },
  {
    id: 'email-project',
    from: 'Priya Rajapaksa',
    fromEmail: 'priya.rajapaksa@aureliasystems.lk',
    subject: 'Project Status Update — Q3',
    body: 'Hi Alex,\n\nPlease review the Q3 operations dashboard before this afternoon\'s sync. Notes are on the intranet.\n\n— Priya',
    time: '08:28',
    read: false,
    folder: 'inbox',
    headers: { returnPath: 'priya.rajapaksa@aureliasystems.lk', received: '08:28 AM — mail.aureliasystems.lk' },
  },
  {
    id: 'email-facilities',
    from: 'Office Facilities',
    fromEmail: 'facilities@aureliasystems.lk',
    subject: 'Air conditioning maintenance — Floor 3',
    body: 'Facilities will perform HVAC maintenance on Floor 3 between 12:00 and 13:00 today. Minimal disruption expected.',
    time: '08:35',
    read: false,
    folder: 'inbox',
    headers: { returnPath: 'facilities@aureliasystems.lk', received: '08:35 AM — mail.aureliasystems.lk' },
  },
  {
    id: 'email-finance',
    from: 'Finance Team',
    fromEmail: 'finance@aureliasystems.lk',
    subject: 'Q2 variance report reminder',
    body: 'Reminder: the Q2 variance report is due by 11:00 today. Submit through the finance portal when complete.',
    time: '08:41',
    read: false,
    folder: 'inbox',
    headers: { returnPath: 'finance@aureliasystems.lk', received: '08:41 AM — mail.aureliasystems.lk' },
  },
];

export const STORY_EMAILS = {
  'email-vendor-daniel': {
    id: 'email-vendor-daniel',
    from: DANIEL.displayName,
    fromEmail: DANIEL.email,
    subject: 'Updated Vendor Access',
    body: 'Hi Alex — Finance needs the vendor portal updated before the 11:00 deadline. I sent the access form through chat. Can you approve when you get a chance?\n\n— Daniel',
    time: '09:12',
    read: false,
    folder: 'inbox',
    suspicious: false,
    headers: {
      returnPath: DANIEL.email,
      received: '09:12 AM — mail.aureliasystems.lk',
      replyTo: DANIEL.email,
    },
  },
  'email-suspicious-reset': {
    id: 'email-suspicious-reset',
    from: 'Microsoft Account Team',
    fromEmail: 'noreply@account-security-mail.com',
    subject: 'Password reset confirmation',
    body: 'Your password was successfully reset. If you did not request this change, contact support immediately.\n\nThis is an automated message.',
    time: '09:28',
    read: false,
    folder: 'inbox',
    suspicious: true,
    headers: {
      returnPath: 'bounce@account-security-mail.com',
      received: '09:28 AM — external relay',
      replyTo: 'support@account-security-mail.com',
      spf: 'FAIL',
    },
  },
};

export const FILES = [
  {
    id: 'vendor-access-pdf',
    name: 'Vendor_Access_Update.pdf',
    folder: 'Documents',
    size: '248 KB',
    modified: 'Friday',
    content: `Vendor Access Request Form\n\nRequested by: ${DANIEL.displayName}\nVendor: Apex Logistics\nAccess level: Finance portal — read/write\n\nNote: Form submitted outside approved workflow.`,
    suspicious: true,
  },
  {
    id: 'q3-access-xlsx',
    name: 'Q3_Access_List.xlsx',
    folder: 'Documents',
    size: '84 KB',
    modified: 'Last week',
    content: 'Q3 access review list — Operations department. No pending changes for your account.',
    suspicious: false,
  },
  {
    id: 'security-notice-pdf',
    name: 'Security_Notice.pdf',
    folder: 'Documents',
    size: '112 KB',
    modified: 'Monday',
    content: 'Security Notice: Never share MFA codes via chat or email. IT will never ask for your password or verification codes.',
    suspicious: false,
  },
  {
    id: 'it-migration-doc',
    name: 'IT_Migration_Notes.docx',
    folder: 'Documents',
    size: '56 KB',
    modified: 'Last month',
    content: 'IT migration notes — portal maintenance scheduled for next weekend. Official help desk: +94 11 555 0100.',
    suspicious: false,
  },
  {
    id: 'standup-notes',
    name: 'Standup_Notes_Monday.docx',
    folder: 'Documents',
    size: '42 KB',
    modified: 'Today',
    content: 'Stand-up notes — Q3 dashboard review, vendor portal tasks, facilities maintenance at noon.',
    suspicious: false,
  },
];

export const BROWSER_PAGES = {
  intranet: {
    id: 'intranet',
    url: 'https://intranet.aureliasystems.lk',
    title: 'Aurelia Systems Intranet',
    content: `Welcome, ${SIM_EMPLOYEE.displayName}.\n\nToday: Monday\nLocation: Colombo\nDepartment: Operations\n\nQuick links: Employee Portal · IT Support · Security Reporting · Team Calendar`,
  },
  itPortal: {
    id: 'itPortal',
    url: 'https://it.aureliasystems.lk/support',
    title: 'IT Support Portal',
    content: 'Official IT Help Desk\n\nPhone: +94 11 555 0100\nEmail: helpdesk@aureliasystems.lk\nExtension: 100\n\nIT will never ask for your password or MFA codes via chat or unsolicited calls.',
  },
  securityPortal: {
    id: 'securityPortal',
    url: 'https://security.aureliasystems.lk/report',
    title: 'Security Reporting Portal',
    content: 'Report a security incident through Security Operations.\n\nEmail: security@aureliasystems.lk\nExtension: 911\n\nFor authentication anomalies, include time, device, and location if available.',
  },
};

export const AUTH_EVENTS = [
  {
    id: 'auth-normal-1',
    time: '08:52',
    type: 'Successful login',
    account: SIM_EMPLOYEE.account,
    employee: SIM_EMPLOYEE.displayName,
    location: 'Colombo, Sri Lanka',
    device: 'Windows — Workstation',
    status: 'normal',
  },
];

export const SUSPICIOUS_AUTH_EVENT = {
  id: 'auth-suspicious-1',
  time: '09:17',
  type: 'Authentication attempt',
  account: SIM_EMPLOYEE.account,
  employee: SIM_EMPLOYEE.displayName,
  location: 'Unknown',
  device: 'Unrecognized device',
  status: 'alert',
  message: 'Sign-in attempt from an unusual location.',
};

export const ACTIVE_SESSIONS = [
  { id: 'session-local', device: 'Workstation — Floor 3', location: 'Colombo', active: true },
];

export const SUSPICIOUS_SESSION = {
  id: 'session-remote',
  device: 'Unknown browser',
  location: 'Southeast Asia',
  active: true,
  suspicious: true,
};

export const INITIAL_CHAT = {
  colleagues: [
    {
      id: 'chat-sarah-1',
      from: 'Sarah Mitchell',
      text: "Morning! Don't forget the 9:00 stand-up.",
      time: '08:44',
      incoming: true,
      read: false,
    },
  ],
  daniel: [],
  'it-fake': [],
  security: [],
};
