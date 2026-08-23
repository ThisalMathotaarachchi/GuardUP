export const additionalResources = [
  {
    id: 'art-14',
    title: 'Software Updates and Patching Essentials',
    category: 'Cybersecurity Basics',
    type: 'article',
    difficulty: 'Beginner',
    description: 'Learn why keeping software updated is one of the most effective defenses against cyber attacks.',
    author: 'GuardUp Team',
    date: '2024-11-05',
    readTime: '7 min',
    content: 'Software updates and patches fix security flaws that attackers exploit to break into systems.',
    fullContent: [
      'Software updates and security patches are fixes released by vendors to address bugs, performance issues, and—most critically—vulnerabilities that attackers can exploit. Unpatched software remains one of the most common root causes of successful cyber attacks, from ransomware outbreaks to data breaches affecting millions of users.',
      'Patches work by closing known security holes in operating systems, applications, browsers, and firmware. When vendors discover a flaw—either through internal testing or responsible disclosure—they publish an update. Delaying installation gives attackers a window to scan for and exploit systems running outdated versions.',
      'Enable automatic updates wherever possible on your operating system, browser, and trusted applications. For work devices, follow your organization\'s patch schedule and restart when prompted—postponing reboots often leaves critical fixes unapplied. On mobile devices, keep both the OS and apps updated through official app stores only.',
      'Not every update notification is legitimate. Attackers sometimes disguise malware as fake update prompts. Always apply updates through built-in system settings, official vendor websites, or managed corporate tools—not through pop-ups, email links, or unsolicited downloads.',
    ],
    sections: [
      {
        heading: 'Why Patching Matters',
        paragraphs: [
          'Software updates and security patches are fixes released by vendors to address bugs, performance issues, and—most critically—vulnerabilities that attackers can exploit. Unpatched software remains one of the most common root causes of successful cyber attacks, from ransomware outbreaks to data breaches affecting millions of users.',
        ],
      },
      {
        heading: 'How Patches Protect You',
        paragraphs: [
          'Patches work by closing known security holes in operating systems, applications, browsers, and firmware. When vendors discover a flaw—either through internal testing or responsible disclosure—they publish an update. Delaying installation gives attackers a window to scan for and exploit systems running outdated versions.',
        ],
      },
      {
        heading: 'Building Good Update Habits',
        paragraphs: [
          'Enable automatic updates wherever possible on your operating system, browser, and trusted applications. For work devices, follow your organization\'s patch schedule and restart when prompted—postponing reboots often leaves critical fixes unapplied. On mobile devices, keep both the OS and apps updated through official app stores only.',
        ],
      },
      {
        heading: 'Avoiding Fake Update Scams',
        paragraphs: [
          'Not every update notification is legitimate. Attackers sometimes disguise malware as fake update prompts. Always apply updates through built-in system settings, official vendor websites, or managed corporate tools—not through pop-ups, email links, or unsolicited downloads.',
        ],
      },
    ],
    keyTakeaways: [
      'Unpatched software is a leading cause of successful cyber attacks.',
      'Enable automatic updates on operating systems, browsers, and apps.',
      'Restart devices when prompted so patches take full effect.',
      'Apply updates only through official channels, never via email links or pop-ups.',
    ],
    tags: ['patching', 'updates', 'vulnerabilities', 'basics'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-15',
    title: 'Account Takeover Prevention',
    category: 'Identity & Accounts',
    type: 'article',
    difficulty: 'Intermediate',
    description: 'Understand how account takeover attacks work and the controls that stop attackers from hijacking your accounts.',
    author: 'GuardUp Team',
    date: '2024-11-18',
    readTime: '9 min',
    content: 'Account takeover occurs when an attacker gains unauthorized control of a user account to steal data or commit fraud.',
    fullContent: [
      'Account takeover (ATO) occurs when an attacker gains unauthorized control of a legitimate user account. Once inside, they may steal sensitive data, send phishing messages from a trusted identity, make fraudulent purchases, or use the compromised account to pivot into other systems—especially when victims reuse passwords across services.',
      'Common ATO entry points include credential stuffing (testing stolen username/password pairs from past breaches), phishing that captures login details, SIM-swapping to intercept SMS verification codes, and session hijacking through stolen browser cookies or tokens. Attackers also exploit weak recovery options, such as predictable security questions or email accounts lacking their own strong protections.',
      'Defense starts with unique, strong passwords stored in a password manager and multi-factor authentication on every important account. Prefer authenticator apps or hardware security keys over SMS when possible. Monitor accounts for unfamiliar login alerts, new devices, or changed recovery settings—and act immediately if something looks wrong.',
      'Organizations should enforce MFA, detect impossible-travel logins, limit failed authentication attempts, and require re-authentication for sensitive actions like password changes or payment approvals. Users should treat unexpected password-reset emails as suspicious and verify them through official app or website channels rather than embedded links.',
    ],
    sections: [
      {
        heading: 'What Is Account Takeover?',
        paragraphs: [
          'Account takeover (ATO) occurs when an attacker gains unauthorized control of a legitimate user account. Once inside, they may steal sensitive data, send phishing messages from a trusted identity, make fraudulent purchases, or use the compromised account to pivot into other systems—especially when victims reuse passwords across services.',
        ],
      },
      {
        heading: 'How Attackers Gain Access',
        paragraphs: [
          'Common ATO entry points include credential stuffing (testing stolen username/password pairs from past breaches), phishing that captures login details, SIM-swapping to intercept SMS verification codes, and session hijacking through stolen browser cookies or tokens. Attackers also exploit weak recovery options, such as predictable security questions or email accounts lacking their own strong protections.',
        ],
      },
      {
        heading: 'Personal Protective Measures',
        paragraphs: [
          'Defense starts with unique, strong passwords stored in a password manager and multi-factor authentication on every important account. Prefer authenticator apps or hardware security keys over SMS when possible. Monitor accounts for unfamiliar login alerts, new devices, or changed recovery settings—and act immediately if something looks wrong.',
        ],
      },
      {
        heading: 'Organizational Controls',
        paragraphs: [
          'Organizations should enforce MFA, detect impossible-travel logins, limit failed authentication attempts, and require re-authentication for sensitive actions like password changes or payment approvals. Users should treat unexpected password-reset emails as suspicious and verify them through official app or website channels rather than embedded links.',
        ],
      },
    ],
    keyTakeaways: [
      'Account takeover lets attackers abuse trusted identities for fraud and lateral movement.',
      'Credential stuffing and phishing are the most common ATO attack paths.',
      'Unique passwords, MFA, and authenticator apps significantly reduce ATO risk.',
      'Investigate login alerts and password-reset messages immediately.',
    ],
    tags: ['account-takeover', 'identity', 'mfa', 'credentials'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-16',
    title: 'Browser Security Best Practices',
    category: 'Privacy & Safe Browsing',
    type: 'article',
    difficulty: 'Intermediate',
    description: 'Harden your web browser against malware, tracking, and credential theft with practical configuration steps.',
    author: 'GuardUp Team',
    date: '2024-12-02',
    readTime: '8 min',
    content: 'Your browser is a primary gateway to the internet and a frequent target for attackers.',
    fullContent: [
      'Modern web browsers process untrusted content from across the internet, making them a primary attack surface for malware delivery, credential theft, and cross-site scripting. Because nearly all work and personal activity flows through the browser, small configuration mistakes can have outsized security consequences.',
      'Keep your browser updated to the latest stable version and remove extensions you no longer use. Each extension increases your attack surface—some have been caught harvesting browsing data or injecting malicious ads. Install extensions only from official stores, review permissions carefully, and prefer well-maintained tools from reputable publishers.',
      'Use built-in protections such as safe browsing warnings, pop-up blockers, and HTTPS-only modes where available. Before entering credentials or payment details, verify the URL in the address bar, confirm the padlock icon, and watch for typosquatting domains like "paypa1.com" instead of "paypal.com". Consider using separate browser profiles for work and personal use to limit cross-contamination.',
      'Clear sensitive session data on shared computers, disable password saving on public devices, and log out of web applications when finished. For high-risk browsing, use private/incognito mode combined with a VPN on untrusted networks—but remember that private mode alone does not make you anonymous or immune to phishing.',
    ],
    sections: [
      {
        heading: 'Why the Browser Is a Target',
        paragraphs: [
          'Modern web browsers process untrusted content from across the internet, making them a primary attack surface for malware delivery, credential theft, and cross-site scripting. Because nearly all work and personal activity flows through the browser, small configuration mistakes can have outsized security consequences.',
        ],
      },
      {
        heading: 'Updates and Extensions',
        paragraphs: [
          'Keep your browser updated to the latest stable version and remove extensions you no longer use. Each extension increases your attack surface—some have been caught harvesting browsing data or injecting malicious ads. Install extensions only from official stores, review permissions carefully, and prefer well-maintained tools from reputable publishers.',
        ],
      },
      {
        heading: 'Built-In Protections and URL Verification',
        paragraphs: [
          'Use built-in protections such as safe browsing warnings, pop-up blockers, and HTTPS-only modes where available. Before entering credentials or payment details, verify the URL in the address bar, confirm the padlock icon, and watch for typosquatting domains like "paypa1.com" instead of "paypal.com". Consider using separate browser profiles for work and personal use to limit cross-contamination.',
        ],
      },
      {
        heading: 'Safe Habits on Shared and Public Devices',
        paragraphs: [
          'Clear sensitive session data on shared computers, disable password saving on public devices, and log out of web applications when finished. For high-risk browsing, use private/incognito mode combined with a VPN on untrusted networks—but remember that private mode alone does not make you anonymous or immune to phishing.',
        ],
      },
    ],
    keyTakeaways: [
      'Browsers are a primary attack vector for malware and credential theft.',
      'Minimize extensions and keep the browser updated.',
      'Verify URLs and HTTPS before entering sensitive information.',
      'Use separate profiles and log out on shared devices.',
    ],
    tags: ['browser', 'extensions', 'https', 'browsing'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-17',
    title: 'Secure File Handling in the Workplace',
    category: 'Data Protection',
    type: 'article',
    difficulty: 'Intermediate',
    description: 'Learn how to share, store, and dispose of files safely to prevent data leaks and malware infections.',
    author: 'GuardUp Team',
    date: '2024-12-15',
    readTime: '8 min',
    content: 'Improper file handling is a leading cause of accidental data exposure and malware infections.',
    fullContent: [
      'Files containing business data, customer records, or intellectual property require careful handling throughout their lifecycle—from creation and storage to sharing and deletion. Mishandled files are a leading cause of accidental data leaks, regulatory violations, and malware infections spread through infected attachments or shared drives.',
      'Classify files by sensitivity before sharing them. Public marketing materials can be distributed broadly, but confidential reports, payroll data, and credentials should be restricted to authorized recipients only. Use approved corporate storage platforms with access controls and audit logging rather than personal cloud accounts, USB drives, or unapproved file-sharing services.',
      'When sharing files externally, use encrypted channels and verify recipient identities. Password-protect sensitive documents when email encryption is unavailable, and transmit passwords through a separate communication method. Be cautious with compressed archives (.zip, .rar)—attackers use them to bypass email scanners, and unexpected archives from unknown senders should never be opened.',
      'Secure deletion matters as much as secure storage. Moving files to the recycle bin or reformatting a USB drive does not permanently erase data. Follow your organization\'s data retention and disposal policies, use approved wiping tools for sensitive media, and report lost devices containing work files immediately so remote wipe and credential rotation can begin.',
    ],
    sections: [
      {
        heading: 'Why File Handling Matters',
        paragraphs: [
          'Files containing business data, customer records, or intellectual property require careful handling throughout their lifecycle—from creation and storage to sharing and deletion. Mishandled files are a leading cause of accidental data leaks, regulatory violations, and malware infections spread through infected attachments or shared drives.',
        ],
      },
      {
        heading: 'Classification and Approved Storage',
        paragraphs: [
          'Classify files by sensitivity before sharing them. Public marketing materials can be distributed broadly, but confidential reports, payroll data, and credentials should be restricted to authorized recipients only. Use approved corporate storage platforms with access controls and audit logging rather than personal cloud accounts, USB drives, or unapproved file-sharing services.',
        ],
      },
      {
        heading: 'Sharing Files Safely',
        paragraphs: [
          'When sharing files externally, use encrypted channels and verify recipient identities. Password-protect sensitive documents when email encryption is unavailable, and transmit passwords through a separate communication method. Be cautious with compressed archives (.zip, .rar)—attackers use them to bypass email scanners, and unexpected archives from unknown senders should never be opened.',
        ],
      },
      {
        heading: 'Retention and Secure Disposal',
        paragraphs: [
          'Secure deletion matters as much as secure storage. Moving files to the recycle bin or reformatting a USB drive does not permanently erase data. Follow your organization\'s data retention and disposal policies, use approved wiping tools for sensitive media, and report lost devices containing work files immediately so remote wipe and credential rotation can begin.',
        ],
      },
    ],
    keyTakeaways: [
      'Classify files by sensitivity before storing or sharing them.',
      'Use approved corporate storage with access controls and audit logs.',
      'Verify recipients and be skeptical of unexpected archive attachments.',
      'Follow retention policies and securely wipe sensitive media before disposal.',
    ],
    tags: ['files', 'data-protection', 'sharing', 'encryption'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-18',
    title: 'Zero Trust Security Fundamentals',
    category: 'Security Operations',
    type: 'article',
    difficulty: 'Advanced',
    description: 'Explore the zero trust model and why organizations are moving away from perimeter-only security.',
    author: 'GuardUp Team',
    date: '2025-01-10',
    readTime: '10 min',
    content: 'Zero trust assumes no user or device is trustworthy by default, regardless of network location.',
    fullContent: [
      'Zero trust is a security framework built on the principle that no user, device, or network connection should be trusted by default—even if it originates inside the corporate perimeter. Traditional "castle and moat" models assumed that anyone inside the network was safe, but cloud adoption, remote work, and sophisticated lateral movement techniques have rendered that assumption obsolete.',
      'The core zero trust mantra is "never trust, always verify." Every access request must be authenticated, authorized, and continuously validated based on identity, device health, location, and the sensitivity of the resource being accessed. Network location alone is no longer sufficient proof of legitimacy.',
      'Key zero trust pillars include strong identity verification (MFA and conditional access), micro-segmentation to limit lateral movement, least-privilege access so users receive only the permissions they need, and continuous monitoring to detect anomalous behavior in real time. Data-centric controls such as encryption and classification extend protection beyond network boundaries.',
      'Implementing zero trust is a journey, not a single product purchase. Organizations typically start by inventorying assets and data flows, enforcing MFA everywhere, segmenting critical systems, and replacing implicit trust in flat networks with explicit policy-based access decisions. Even individual users benefit from zero trust thinking: verify every request for access or sensitive data, regardless of who appears to be asking.',
    ],
    sections: [
      {
        heading: 'Beyond the Perimeter',
        paragraphs: [
          'Zero trust is a security framework built on the principle that no user, device, or network connection should be trusted by default—even if it originates inside the corporate perimeter. Traditional "castle and moat" models assumed that anyone inside the network was safe, but cloud adoption, remote work, and sophisticated lateral movement techniques have rendered that assumption obsolete.',
        ],
      },
      {
        heading: 'Never Trust, Always Verify',
        paragraphs: [
          'The core zero trust mantra is "never trust, always verify." Every access request must be authenticated, authorized, and continuously validated based on identity, device health, location, and the sensitivity of the resource being accessed. Network location alone is no longer sufficient proof of legitimacy.',
        ],
      },
      {
        heading: 'Core Pillars of Zero Trust',
        paragraphs: [
          'Key zero trust pillars include strong identity verification (MFA and conditional access), micro-segmentation to limit lateral movement, least-privilege access so users receive only the permissions they need, and continuous monitoring to detect anomalous behavior in real time. Data-centric controls such as encryption and classification extend protection beyond network boundaries.',
        ],
      },
      {
        heading: 'Putting Zero Trust into Practice',
        paragraphs: [
          'Implementing zero trust is a journey, not a single product purchase. Organizations typically start by inventorying assets and data flows, enforcing MFA everywhere, segmenting critical systems, and replacing implicit trust in flat networks with explicit policy-based access decisions. Even individual users benefit from zero trust thinking: verify every request for access or sensitive data, regardless of who appears to be asking.',
        ],
      },
    ],
    keyTakeaways: [
      'Zero trust removes implicit trust based on network location.',
      'Every access request must be authenticated, authorized, and continuously validated.',
      'Micro-segmentation and least privilege limit lateral movement after a breach.',
      'Zero trust adoption is incremental—start with identity, MFA, and asset inventory.',
    ],
    tags: ['zero-trust', 'architecture', 'least-privilege', 'segmentation'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-19',
    title: 'Security Monitoring Essentials',
    category: 'Security Operations',
    type: 'article',
    difficulty: 'Advanced',
    description: 'Learn how security monitoring detects threats early and what role employees play in the detection chain.',
    author: 'GuardUp Team',
    date: '2025-01-22',
    readTime: '9 min',
    content: 'Security monitoring collects and analyzes signals to detect suspicious activity before damage spreads.',
    fullContent: [
      'Security monitoring is the continuous collection and analysis of logs, alerts, and telemetry from networks, endpoints, applications, and cloud services to detect suspicious or unauthorized activity. Effective monitoring shortens the time between an attacker\'s initial access and detection—often called "dwell time"—which directly limits the scope of damage.',
      'Common monitoring data sources include firewall and proxy logs, authentication records, endpoint detection alerts, email security gateways, and cloud audit trails. Security teams correlate events across these sources to identify patterns that individual alerts might miss, such as a login from an unusual location followed by large data downloads.',
      'Automated tools handle volume and speed, but human judgment remains essential. Security analysts investigate alerts, filter false positives, and escalate confirmed incidents. Employees outside the security team also contribute as human sensors—reporting phishing attempts, unexpected password resets, or unusual system behavior feeds valuable signals into the monitoring ecosystem.',
      'Organizations should define what "normal" looks like for their environment through baselines, establish clear escalation paths for suspicious activity, and conduct regular reviews of alert coverage. Privacy and compliance requirements must govern what data is collected and how long it is retained. When in doubt, report anomalies early rather than waiting for certainty.',
    ],
    sections: [
      {
        heading: 'What Security Monitoring Does',
        paragraphs: [
          'Security monitoring is the continuous collection and analysis of logs, alerts, and telemetry from networks, endpoints, applications, and cloud services to detect suspicious or unauthorized activity. Effective monitoring shortens the time between an attacker\'s initial access and detection—often called "dwell time"—which directly limits the scope of damage.',
        ],
      },
      {
        heading: 'Key Data Sources',
        paragraphs: [
          'Common monitoring data sources include firewall and proxy logs, authentication records, endpoint detection alerts, email security gateways, and cloud audit trails. Security teams correlate events across these sources to identify patterns that individual alerts might miss, such as a login from an unusual location followed by large data downloads.',
        ],
      },
      {
        heading: 'People and Automation Together',
        paragraphs: [
          'Automated tools handle volume and speed, but human judgment remains essential. Security analysts investigate alerts, filter false positives, and escalate confirmed incidents. Employees outside the security team also contribute as human sensors—reporting phishing attempts, unexpected password resets, or unusual system behavior feeds valuable signals into the monitoring ecosystem.',
        ],
      },
      {
        heading: 'Building Effective Monitoring Programs',
        paragraphs: [
          'Organizations should define what "normal" looks like for their environment through baselines, establish clear escalation paths for suspicious activity, and conduct regular reviews of alert coverage. Privacy and compliance requirements must govern what data is collected and how long it is retained. When in doubt, report anomalies early rather than waiting for certainty.',
        ],
      },
    ],
    keyTakeaways: [
      'Monitoring reduces attacker dwell time by detecting anomalies early.',
      'Logs from firewalls, endpoints, and authentication systems are core data sources.',
      'Employees act as human sensors by reporting suspicious activity promptly.',
      'Define baselines, escalation paths, and retention policies for monitoring data.',
    ],
    tags: ['monitoring', 'siem', 'detection', 'logging'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-20',
    title: 'Identity and Access Management (IAM)',
    category: 'Identity & Accounts',
    type: 'article',
    difficulty: 'Advanced',
    description: 'Understand how IAM frameworks govern who can access what, when, and under which conditions.',
    author: 'GuardUp Team',
    date: '2025-02-05',
    readTime: '10 min',
    content: 'IAM ensures the right people have appropriate access to technology resources across an organization.',
    fullContent: [
      'Identity and Access Management (IAM) is the discipline and set of technologies that ensure the right individuals access the right resources at the right times for the right reasons. IAM spans the entire identity lifecycle: provisioning accounts when employees join, adjusting permissions as roles change, and revoking access promptly when people depart or no longer need specific privileges.',
      'Core IAM components include a central directory or identity provider (such as Active Directory, Azure AD, or Okta), single sign-on (SSO) to reduce password sprawl, multi-factor authentication, role-based access control (RBAC), and privileged access management (PAM) for administrative accounts. Together, these tools create a consistent, auditable access layer across on-premises and cloud systems.',
      'The principle of least privilege is the foundation of sound IAM. Users should receive the minimum permissions required to perform their job—no more. Standing administrative access should be rare; just-in-time elevation grants temporary elevated rights with approval workflows and full audit trails. Regular access reviews ensure accumulated permissions do not outlive their business justification.',
      'IAM failures have outsized impact. Orphaned accounts from former employees, excessive admin rights, and shared credentials are common findings in breach investigations. Users should never share accounts, should request access through official channels, and should notify IT when their role changes so permissions can be updated. Strong IAM protects both the organization and individual users from unauthorized access.',
    ],
    sections: [
      {
        heading: 'What IAM Covers',
        paragraphs: [
          'Identity and Access Management (IAM) is the discipline and set of technologies that ensure the right individuals access the right resources at the right times for the right reasons. IAM spans the entire identity lifecycle: provisioning accounts when employees join, adjusting permissions as roles change, and revoking access promptly when people depart or no longer need specific privileges.',
        ],
      },
      {
        heading: 'Core IAM Components',
        paragraphs: [
          'Core IAM components include a central directory or identity provider (such as Active Directory, Azure AD, or Okta), single sign-on (SSO) to reduce password sprawl, multi-factor authentication, role-based access control (RBAC), and privileged access management (PAM) for administrative accounts. Together, these tools create a consistent, auditable access layer across on-premises and cloud systems.',
        ],
      },
      {
        heading: 'Least Privilege and Access Reviews',
        paragraphs: [
          'The principle of least privilege is the foundation of sound IAM. Users should receive the minimum permissions required to perform their job—no more. Standing administrative access should be rare; just-in-time elevation grants temporary elevated rights with approval workflows and full audit trails. Regular access reviews ensure accumulated permissions do not outlive their business justification.',
        ],
      },
      {
        heading: 'Common IAM Failures to Avoid',
        paragraphs: [
          'IAM failures have outsized impact. Orphaned accounts from former employees, excessive admin rights, and shared credentials are common findings in breach investigations. Users should never share accounts, should request access through official channels, and should notify IT when their role changes so permissions can be updated. Strong IAM protects both the organization and individual users from unauthorized access.',
        ],
      },
    ],
    keyTakeaways: [
      'IAM manages the full identity lifecycle from provisioning to deprovisioning.',
      'SSO, MFA, RBAC, and PAM are foundational IAM components.',
      'Least privilege and regular access reviews prevent permission creep.',
      'Never share accounts; report role changes so access stays accurate.',
    ],
    tags: ['iam', 'access-control', 'sso', 'least-privilege'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-21',
    title: 'Social Media Safety and Privacy',
    category: 'Privacy & Safe Browsing',
    type: 'article',
    difficulty: 'Beginner',
    description: 'Protect your personal information and reputation while using social media platforms safely.',
    author: 'GuardUp Team',
    date: '2025-02-18',
    readTime: '7 min',
    content: 'Social media platforms connect us but also expose personal data to attackers and scammers.',
    fullContent: [
      'Social media platforms make it easy to share life updates, but they also expose personal information that attackers use for social engineering, identity theft, and targeted scams. Details like your employer, birthday, travel plans, and family connections help criminals craft convincing phishing messages and answer password recovery questions.',
      'Review privacy settings on every platform and restrict who can see your posts, friend lists, and profile details. Default settings often favor public visibility to drive engagement—not your privacy. Treat anything posted online as potentially permanent, even on "private" accounts, because screenshots and data breaches can expose content you intended to keep restricted.',
      'Be skeptical of messages from contacts asking for money, gift cards, or login credentials—their account may be compromised. Verify unusual requests through a separate channel like a phone call. Avoid clicking links in direct messages from strangers, and never participate in quizzes or games that ask for personal details like your first pet\'s name or street you grew up on—common password reset answers.',
      'Separate personal and professional personas where possible. Posting about internal company projects, client names, or security practices can leak confidential information. Enable two-factor authentication on all social accounts, use unique passwords, and report impersonation accounts that mimic you or your organization.',
    ],
    sections: [
      {
        heading: 'The Privacy Risks of Social Media',
        paragraphs: [
          'Social media platforms make it easy to share life updates, but they also expose personal information that attackers use for social engineering, identity theft, and targeted scams. Details like your employer, birthday, travel plans, and family connections help criminals craft convincing phishing messages and answer password recovery questions.',
        ],
      },
      {
        heading: 'Configuring Privacy Settings',
        paragraphs: [
          'Review privacy settings on every platform and restrict who can see your posts, friend lists, and profile details. Default settings often favor public visibility to drive engagement—not your privacy. Treat anything posted online as potentially permanent, even on "private" accounts, because screenshots and data breaches can expose content you intended to keep restricted.',
        ],
      },
      {
        heading: 'Recognizing Social Media Scams',
        paragraphs: [
          'Be skeptical of messages from contacts asking for money, gift cards, or login credentials—their account may be compromised. Verify unusual requests through a separate channel like a phone call. Avoid clicking links in direct messages from strangers, and never participate in quizzes or games that ask for personal details like your first pet\'s name or street you grew up on—common password reset answers.',
        ],
      },
      {
        heading: 'Professional Boundaries Online',
        paragraphs: [
          'Separate personal and professional personas where possible. Posting about internal company projects, client names, or security practices can leak confidential information. Enable two-factor authentication on all social accounts, use unique passwords, and report impersonation accounts that mimic you or your organization.',
        ],
      },
    ],
    keyTakeaways: [
      'Personal details on social media fuel targeted phishing and identity theft.',
      'Tighten privacy settings and assume posted content may become public.',
      'Verify unusual requests from contacts through a separate channel.',
      'Enable MFA and avoid sharing work-confidential information on social platforms.',
    ],
    tags: ['social-media', 'privacy', 'scams', 'reputation'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'vid-9',
    title: 'Browser Security',
    category: 'Privacy & Safe Browsing',
    type: 'video',
    difficulty: 'Intermediate',
    description: 'Intermediate guide to hardening your browser against common web-based threats and misconfigurations.',
    author: 'GuardUp Team',
    date: '2024-11-12',
    readTime: '11 min',
    videoUnavailable: true,
    content: 'Browser security settings and habits protect against malware, phishing, and unauthorized data access.',
    summary: 'Written guidance on browser hardening, extension hygiene, HTTPS verification, and safe download practices. A dedicated SANS or NCSC embed is not currently linked; use the companion article art-16 for expanded reading.',
    fullContent: [
      'Browsers sit at the center of modern work and personal computing, processing content from thousands of untrusted sources daily. Without proper configuration, they become the easiest path for attackers to deliver malware, steal session cookies, or trick users into entering credentials on fake login pages.',
      'Start by enabling automatic browser updates and removing unused extensions. Malicious or abandoned extensions have been used to inject ads, harvest form data, and redirect traffic. Review each extension\'s permissions—an ad blocker does not need access to every website you visit plus your clipboard.',
      'Configure security settings such as blocking third-party cookies where appropriate, enabling safe browsing warnings, and disabling automatic downloads from untrusted sites. Before submitting passwords or payment information, manually verify the domain in the address bar and look for valid HTTPS indicators.',
      'Use separate browser profiles or containers for work and personal activity to reduce cross-site tracking and limit the blast radius if one profile is compromised. On shared machines, always log out of web applications and avoid saving passwords in the browser. Combine these habits with network-level protections like VPNs on public Wi-Fi.',
    ],
    keyTakeaways: [
      'Keep browsers updated and minimize installed extensions.',
      'Review extension permissions and remove anything unused.',
      'Verify HTTPS and domain names before entering credentials.',
      'Use separate profiles and avoid saving passwords on shared devices.',
    ],
    tags: ['browser', 'security', 'video', 'hardening'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'vid-10',
    title: 'Account Security',
    category: 'Identity & Accounts',
    type: 'video',
    difficulty: 'Beginner',
    description: 'NCSC training on account protection, password hygiene, and practicing good cyber security habits.',
    author: 'NCSC (UK)',
    date: '2024-11-25',
    readTime: '12 min',
    videoUrl: 'https://www.youtube.com/embed/C2aMb_10Lf0',
    externalVideoUrl: 'https://www.youtube.com/watch?v=C2aMb_10Lf0',
    content: 'Strong account security practices protect your identity, finances, and organizational data from takeover.',
    summary: 'This NCSC cyber security training video explains how attacks happen and provides practical steps for protecting accounts through good cyber hygiene at work and at home, including password practices and awareness of common threats.',
    fullContent: [
      'Account security begins with understanding that your login credentials are valuable targets. Attackers collect passwords from data breaches and test them across banking, email, and work portals—a technique called credential stuffing. A single reused password can compromise multiple accounts in minutes.',
      'Use a unique, strong password for every account and store them in a reputable password manager so you do not need to memorize dozens of credentials. Enable multi-factor authentication on email, banking, and work accounts first, since email is often the recovery path for everything else.',
      'Be alert to phishing messages that impersonate IT support, banks, or popular services and ask you to "verify" your account. Legitimate organizations rarely request credentials via email links. When you receive unexpected login alerts or password-reset messages, investigate immediately through official app or website channels.',
      'At work, follow your organization\'s acceptable use and security policies. Report suspicious account activity to your IT or security team without delay. Good account hygiene at home translates directly into stronger protection for professional systems accessed from personal devices.',
    ],
    keyTakeaways: [
      'Never reuse passwords—credential stuffing exploits breached password lists.',
      'Use a password manager and enable MFA on email and banking first.',
      'Verify unexpected login alerts through official channels, not email links.',
      'Report suspicious account activity to your IT security team promptly.',
    ],
    tags: ['accounts', 'passwords', 'mfa', 'video', 'ncsc'],
    source: 'NCSC (UK National Cyber Security Centre)',
  },
  {
    id: 'vid-11',
    title: 'Threat Intelligence Overview',
    category: 'Threat Intelligence',
    type: 'video',
    difficulty: 'Advanced',
    description: 'Introduction to threat intelligence—how organizations collect, analyze, and act on information about adversaries.',
    author: 'GuardUp Team',
    date: '2025-01-08',
    readTime: '13 min',
    videoUnavailable: true,
    content: 'Threat intelligence transforms raw data about attackers into actionable decisions that improve defenses.',
    summary: 'Written overview of threat intelligence types, sources, the intelligence cycle, and how teams use indicators of compromise to prioritize defenses. A dedicated video resource is not currently available.',
    fullContent: [
      'Threat intelligence is evidence-based information about existing or emerging threats that helps organizations make informed security decisions. Rather than reacting blindly to every alert, teams use intelligence to understand who is targeting them, which techniques those adversaries employ, and which vulnerabilities or assets are most at risk.',
      'Intelligence is commonly categorized by scope: strategic (high-level trends for executives), operational (campaign details for security managers), and tactical (technical indicators like malicious IP addresses, file hashes, and domain names for analysts and automated tools). Each level serves different audiences but should connect back to actionable outcomes.',
      'The intelligence cycle—direction, collection, processing, analysis, dissemination, and feedback—keeps programs focused on decisions, not data hoarding. Sources include open-source feeds, industry sharing groups (ISACs), commercial providers, internal incident data, and government advisories. Quality matters more than quantity; unverified indicators create alert fatigue.',
      'Indicators of compromise (IOCs) such as known-bad domains or malware signatures feed into firewalls, email gateways, and endpoint tools—but intelligence value extends beyond blocking lists. Understanding attacker motivation and tradecraft helps prioritize patching, adjust monitoring rules, and design tabletop exercises that reflect realistic scenarios.',
    ],
    keyTakeaways: [
      'Threat intelligence supports informed prioritization, not just blocking bad IPs.',
      'Strategic, operational, and tactical intelligence serve different decision-makers.',
      'Follow the intelligence cycle to keep collection aligned with business needs.',
      'Combine external feeds with internal incident data for context-rich analysis.',
    ],
    tags: ['threat-intelligence', 'ioc', 'analysis', 'video'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'vid-12',
    title: 'Security Operations Center Basics',
    category: 'Security Operations',
    type: 'video',
    difficulty: 'Advanced',
    description: 'Learn what a Security Operations Center does and how it coordinates detection, response, and recovery.',
    author: 'GuardUp Team',
    date: '2025-02-10',
    readTime: '12 min',
    videoUnavailable: true,
    content: 'A Security Operations Center (SOC) provides 24/7 monitoring and coordinated response to cyber threats.',
    summary: 'Written introduction to SOC roles, tools, processes, and how non-security staff interact with the SOC during incidents. A dedicated video resource is not currently available.',
    fullContent: [
      'A Security Operations Center (SOC) is a centralized function—often a physical team or virtual service—that continuously monitors an organization\'s IT environment for signs of cyber attack. SOC analysts triage alerts, investigate suspicious activity, coordinate containment with IT teams, and document findings for compliance and post-incident review.',
      'SOC teams rely on layered tooling: Security Information and Event Management (SIEM) platforms aggregate logs; Endpoint Detection and Response (EDR) tools reveal malware and lateral movement on devices; threat intelligence feeds provide context; and ticketing systems track incidents through resolution. Playbooks standardize responses for common scenarios like phishing, ransomware, and unauthorized access.',
      'SOC operations typically follow defined severity levels. Critical incidents—active ransomware encryption or confirmed data exfiltration—trigger immediate escalation and may activate an incident response plan. Lower-severity alerts may be queued for investigation during business hours. Clear communication channels between the SOC, IT, legal, and leadership prevent confusion during fast-moving events.',
      'Employees interact with the SOC primarily through reporting. Prompt reports of phishing emails, lost devices, or unusual system behavior give analysts starting points for investigation. When the SOC contacts you during an investigation, cooperate fully: provide timestamps, screenshots, and descriptions of what you observed. Early collaboration between staff and the SOC dramatically reduces incident impact.',
    ],
    keyTakeaways: [
      'The SOC provides continuous monitoring and coordinated incident response.',
      'SIEM, EDR, and threat intelligence are core SOC technology pillars.',
      'Incidents are prioritized by severity with defined escalation paths.',
      'Employee reports and cooperation are critical inputs to SOC investigations.',
    ],
    tags: ['soc', 'security-operations', 'incident-response', 'video'],
    source: 'GuardUp Knowledge Base',
  },
];
