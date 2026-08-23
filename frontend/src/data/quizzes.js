export const quizzes = [
  {
    id: 'quiz-phishing',
    title: 'Phishing Awareness',
    description: 'Test your ability to recognize phishing emails, links, and common social engineering tricks.',
    difficulty: 'Beginner',
    timeEstimate: '10 min',
    icon: 'mail',
    questions: [
      {
        id: 'phishing-1',
        question: 'What is the safest first step when you receive an unexpected email asking you to verify your account?',
        options: [
          'Click the link and log in quickly before the link expires',
          'Reply to confirm whether the email is legitimate',
          'Contact the organization using a known official phone number or website',
          'Forward the email to coworkers for their opinion',
        ],
        correctAnswer: 2,
        explanation: 'Always verify suspicious requests through official contact channels you look up yourself, not through links or numbers in the email.',
      },
      {
        id: 'phishing-2',
        question: 'Which detail is a common red flag in a phishing email?',
        options: [
          'A personalized greeting using your full name',
          'Urgent language demanding immediate action',
          'A company logo in the email header',
          'A professional email signature',
        ],
        correctAnswer: 1,
        explanation: 'Attackers often create urgency to pressure victims into acting before thinking critically.',
      },
      {
        id: 'phishing-3',
        question: 'You hover over a link and see "https://paypa1-secure.com/login". What should you do?',
        options: [
          'Click it because it contains the word "secure"',
          'Treat it as suspicious and avoid clicking',
          'Copy the link into your browser manually',
          'Disable your antivirus and proceed',
        ],
        correctAnswer: 1,
        explanation: 'Look-alike domains use small spelling changes to trick users. Always verify the full URL carefully.',
      },
      {
        id: 'phishing-4',
        question: 'What is spear phishing?',
        options: [
          'Sending spam to thousands of random users',
          'A targeted attack aimed at a specific person or organization',
          'A type of antivirus scan',
          'Phishing that only happens on mobile devices',
        ],
        correctAnswer: 1,
        explanation: 'Spear phishing uses personalized details to make fraudulent messages appear more credible.',
      },
      {
        id: 'phishing-5',
        question: 'An email attachment arrives as "Invoice.pdf.exe". What is the best response?',
        options: [
          'Open it to see which invoice it refers to',
          'Rename the file to remove ".exe" and open it',
          'Do not open it and report it as suspicious',
          'Forward it to your personal email to scan later',
        ],
        correctAnswer: 2,
        explanation: 'Double extensions are a classic trick to disguise executable malware as harmless documents.',
      },
      {
        id: 'phishing-6',
        question: 'Which practice helps protect you from phishing on social media?',
        options: [
          'Accepting all connection requests to expand your network',
          'Clicking shortened links from unknown senders',
          'Verifying unusual messages through a separate trusted channel',
          'Sharing login credentials with platform support via chat',
        ],
        correctAnswer: 2,
        explanation: 'If a message seems unusual, confirm it independently before clicking links or sharing information.',
      },
      {
        id: 'phishing-7',
        question: 'What does HTTPS in a browser address bar indicate?',
        options: [
          'The website is guaranteed to be trustworthy',
          'Communication between your browser and the site is encrypted',
          'The site cannot contain malware',
          'You should never enter credentials on HTTPS sites',
        ],
        correctAnswer: 1,
        explanation: 'HTTPS encrypts traffic, but attackers can also use HTTPS on fake sites. Always verify the domain too.',
      },
      {
        id: 'phishing-8',
        question: 'A text message says your package delivery failed and asks you to click a link. You are not expecting a package. What should you do?',
        options: [
          'Click the link to reschedule delivery',
          'Reply STOP to unsubscribe',
          'Ignore or delete the message and avoid the link',
          'Provide your address to confirm delivery',
        ],
        correctAnswer: 2,
        explanation: 'Smishing (SMS phishing) often uses fake delivery notices. Avoid clicking links in unexpected texts.',
      },
      {
        id: 'phishing-9',
        question: 'Why should you report suspected phishing emails to your IT or security team?',
        options: [
          'So they can block similar attacks for others in the organization',
          'To automatically refund any money you lost',
          'Because it removes the email from the internet permanently',
          'Reporting is only required for executives',
        ],
        correctAnswer: 0,
        explanation: 'Reporting helps security teams warn others, investigate threats, and improve email filtering.',
      },
      {
        id: 'phishing-10',
        question: 'Which habit best reduces your risk of falling for phishing?',
        options: [
          'Using the same password everywhere for convenience',
          'Pausing to verify unexpected requests before acting',
          'Disabling email spam filters to see all messages',
          'Saving passwords in plain text notes on your desktop',
        ],
        correctAnswer: 1,
        explanation: 'A brief pause to verify unexpected requests is one of the most effective defenses against phishing.',
      },
    ],
  },
  {
    id: 'quiz-phishing-final',
    title: 'Phishing Defense Final Assessment',
    description: 'Comprehensive certification assessment covering phishing indicators, verification, reporting, and safe response decisions.',
    difficulty: 'Beginner',
    timeEstimate: '12 min',
    icon: 'mail',
    questions: [
      {
        id: 'phish-final-1',
        question: 'A message from "it-support@yourcompany-secure.net" asks you to reset your password within 10 minutes. What is the strongest response?',
        options: [
          'Click the link because the domain contains your company name',
          'Reply with your employee ID to verify the request',
          'Open the company password portal through a bookmarked URL or IT help desk',
          'Forward the email to your personal account to review later',
        ],
        correctAnswer: 2,
        explanation: 'Look-alike domains mimic legitimate brands. Use known official channels rather than links in the message.',
      },
      {
        id: 'phish-final-2',
        question: 'Which combination of indicators most strongly suggests a spear phishing attempt?',
        options: [
          'Generic greeting, no links, and a long signature',
          'Personalized details, urgent financial request, and a mismatched reply-to address',
          'Company logo, HTTPS link, and a professional tone',
          'Internal distribution list and a routine policy reminder',
        ],
        correctAnswer: 1,
        explanation: 'Targeted phishing often blends personalization and urgency with subtle sender anomalies.',
      },
      {
        id: 'phish-final-3',
        question: 'You hover over a button labeled "View Invoice" and see https://accounts-payable-login.xyz/verify. What should you do?',
        options: [
          'Proceed because HTTPS means the site is safe',
          'Copy the URL into a private browser window',
          'Do not click; report or delete and verify through finance or IT',
          'Disable your browser security settings to load the page',
        ],
        correctAnswer: 2,
        explanation: 'Attackers use HTTPS on malicious sites. The domain and context—not the padlock alone—determine trust.',
      },
      {
        id: 'phish-final-4',
        question: 'During a simulation, an email impersonates your CFO requesting a confidential wire transfer today. Best action?',
        options: [
          'Process quickly to avoid executive frustration',
          'Verify the request through a separate trusted channel before any action',
          'Reply to the email asking for account details',
          'Forward to a colleague and wait for them to decide',
        ],
        correctAnswer: 1,
        explanation: 'Business email compromise relies on authority and urgency. Out-of-band verification is essential.',
      },
      {
        id: 'phish-final-5',
        question: 'Which attachment behavior is highest risk in a workplace context?',
        options: [
          'A PDF shared through the internal document portal',
          'An unexpected .zip from an unknown sender with "Payroll Update" in the subject',
          'A calendar invite from your manager',
          'A signed contract from a known vendor contact',
        ],
        correctAnswer: 1,
        explanation: 'Unexpected compressed files from unknown senders are a common malware delivery vector.',
      },
      {
        id: 'phish-final-6',
        question: 'What is the primary purpose of reporting a suspected phishing email to your security team?',
        options: [
          'To automatically refund any lost funds',
          'To enable investigation, filtering, and organization-wide protection',
          'To remove the sender from the internet permanently',
          'To bypass normal approval workflows',
        ],
        correctAnswer: 1,
        explanation: 'Reporting helps security teams analyze threats, warn others, and improve defenses.',
      },
      {
        id: 'phish-final-7',
        question: 'A QR code in a parking ticket scam text leads to a login page. What principle applies?',
        options: [
          'QR codes are always safer than email links',
          'Quishing uses QR codes to bypass link inspection—verify before scanning',
          'Mobile browsers cannot display phishing pages',
          'Only executives are targeted by QR scams',
        ],
        correctAnswer: 1,
        explanation: 'Quishing directs victims to credential harvesting pages outside normal email link checks.',
      },
      {
        id: 'phish-final-8',
        question: 'After clicking a suspicious link, what is the most appropriate immediate step?',
        options: [
          'Clear browser history and continue working',
          'Disconnect if advised, report to IT/security, and follow credential reset guidance',
          'Share the link with coworkers as a warning without reporting',
          'Wait to see if anything unusual happens',
        ],
        correctAnswer: 1,
        explanation: 'Prompt reporting and guided response limit credential theft and lateral movement.',
      },
      {
        id: 'phish-final-9',
        question: 'Which practice best supports safe email habits learned in this certification?',
        options: [
          'Trusting messages that pass spam filters without review',
          'Verifying unexpected requests, inspecting sender details, and using official portals',
          'Saving all passwords in the browser for speed',
          'Disabling multi-factor authentication for convenience',
        ],
        correctAnswer: 1,
        explanation: 'The certification emphasizes verification, inspection, and official channels over speed or convenience.',
      },
      {
        id: 'phish-final-10',
        question: 'In the spear phishing simulation, marking a legitimate vendor email as phishing primarily teaches you to:',
        options: [
          'Report every external email automatically',
          'Balance recognition of red flags with context and sender verification',
          'Ignore all financial emails',
          'Disable the report button to avoid penalties',
        ],
        correctAnswer: 1,
        explanation: 'Effective defense requires accurate judgment—not reflexive reporting of all external mail.',
      },
    ],
  },
  {
    id: 'quiz-password',
    title: 'Password & Account Security',
    description: 'Evaluate your knowledge of strong passwords, account protection, and authentication best practices.',
    difficulty: 'Beginner',
    timeEstimate: '10 min',
    icon: 'key',
    questions: [
      {
        id: 'password-1',
        question: 'Which password is generally the strongest?',
        options: [
          'Summer2024!',
          'P@ssw0rd',
          'Tr0ub4dour&3!Xk9',
          'iloveyou123',
        ],
        correctAnswer: 2,
        explanation: 'Long, unique passwords with mixed character types are harder to crack than common patterns.',
      },
      {
        id: 'password-2',
        question: 'Why is reusing the same password across multiple sites risky?',
        options: [
          'It makes passwords harder to remember',
          'A breach on one site can expose your accounts on other sites',
          'Websites automatically delete reused passwords',
          'It slows down your internet connection',
        ],
        correctAnswer: 1,
        explanation: 'Credential stuffing attacks use leaked passwords from one breach to access accounts elsewhere.',
      },
      {
        id: 'password-3',
        question: 'What is the primary purpose of two-factor authentication (2FA)?',
        options: [
          'To eliminate the need for passwords entirely',
          'To require a second form of verification beyond your password',
          'To encrypt all files on your computer',
          'To share login access with a colleague',
        ],
        correctAnswer: 1,
        explanation: '2FA adds another verification step, so a stolen password alone is not enough to access your account.',
      },
      {
        id: 'password-4',
        question: 'Which is the safest way to manage many unique passwords?',
        options: [
          'Write them on a sticky note under your keyboard',
          'Use a reputable password manager',
          'Email them to yourself for backup',
          'Use your birthdate with small variations',
        ],
        correctAnswer: 1,
        explanation: 'Password managers generate and store strong unique passwords securely.',
      },
      {
        id: 'password-5',
        question: 'You receive a notification of a login from an unknown location. What should you do first?',
        options: [
          'Ignore it if you can still access your account',
          'Change your password and review account security settings immediately',
          'Share the alert on social media',
          'Wait a week to see if it happens again',
        ],
        correctAnswer: 1,
        explanation: 'Unexpected login alerts may indicate unauthorized access. Act quickly to secure the account.',
      },
      {
        id: 'password-6',
        question: 'Which authentication method is generally more secure than SMS codes?',
        options: [
          'Security questions with public answers',
          'An authenticator app or hardware security key',
          'Emailing yourself a one-time code',
          'Using the same PIN for every account',
        ],
        correctAnswer: 1,
        explanation: 'Authenticator apps and hardware keys are less vulnerable to SIM-swapping than SMS-based codes.',
      },
      {
        id: 'password-7',
        question: 'When is it appropriate to share your work account password?',
        options: [
          'When a manager asks over email',
          'When a coworker needs temporary access',
          'Never — each person should use their own account',
          'When IT support requests it in a chat message',
        ],
        correctAnswer: 2,
        explanation: 'Shared credentials reduce accountability and increase risk. Use proper access controls instead.',
      },
      {
        id: 'password-8',
        question: 'What makes a passphrase a good alternative to a traditional password?',
        options: [
          'It uses only lowercase letters',
          'It is a long sequence of random or unrelated words that is easy to remember but hard to guess',
          'It is always exactly eight characters',
          'It must match your username',
        ],
        correctAnswer: 1,
        explanation: 'Long passphrases can be both memorable and resistant to brute-force attacks.',
      },
      {
        id: 'password-9',
        question: 'Why should you enable 2FA on your email account first?',
        options: [
          'Email is rarely targeted by attackers',
          'Email is often used to reset passwords for other accounts',
          'Email accounts do not store personal information',
          '2FA on email slows down phishing attacks globally',
        ],
        correctAnswer: 1,
        explanation: 'Compromised email can lead to password resets and takeover of many other services.',
      },
      {
        id: 'password-10',
        question: 'A website offers to save your password in the browser on a shared computer. What should you do?',
        options: [
          'Accept to save time',
          'Decline and never save passwords on shared or public devices',
          'Save it but change the password later',
          'Write the password on paper instead',
        ],
        correctAnswer: 1,
        explanation: 'Saved credentials on shared devices can be accessed by the next user of that machine.',
      },
    ],
  },
  {
    id: 'quiz-social-engineering',
    title: 'Social Engineering',
    description: 'Learn how attackers manipulate people and how to defend against psychological tactics.',
    difficulty: 'Intermediate',
    timeEstimate: '12 min',
    icon: 'users',
    questions: [
      {
        id: 'social-1',
        question: 'What is social engineering in cybersecurity?',
        options: [
          'Building secure social media platforms',
          'Manipulating people into revealing information or taking unsafe actions',
          'Engineering software for social networks',
          'A method of encrypting social media messages',
        ],
        correctAnswer: 1,
        explanation: 'Social engineering targets human psychology rather than technical vulnerabilities.',
      },
      {
        id: 'social-2',
        question: 'A caller claims to be from IT and asks for your password to "fix an urgent issue." What should you do?',
        options: [
          'Provide it quickly to resolve the issue',
          'Ask for their employee ID and give them half the password',
          'Refuse and verify the request through official IT channels',
          'Change your password to something simpler first',
        ],
        correctAnswer: 2,
        explanation: 'Legitimate IT staff will never ask for your password. Verify through known official channels.',
      },
      {
        id: 'social-3',
        question: 'What is pretexting?',
        options: [
          'Encrypting text messages before sending',
          'Creating a fabricated scenario to trick someone into sharing information',
          'Testing network speed before a video call',
          'Previewing emails before clicking links',
        ],
        correctAnswer: 1,
        explanation: 'Pretexting involves inventing a believable story to gain a victim\'s trust and extract data.',
      },
      {
        id: 'social-4',
        question: 'An attacker leaves infected USB drives in a company parking lot hoping someone plugs one in. This is called:',
        options: [
          'Tailgating',
          'Baiting',
          'Pharming',
          'Doxing',
        ],
        correctAnswer: 1,
        explanation: 'Baiting lures victims with something enticing — like a labeled USB drive — to compromise systems.',
      },
      {
        id: 'social-5',
        question: 'What is tailgating in a physical security context?',
        options: [
          'Following someone closely while driving',
          'Entering a restricted area by following an authorized person without badging in yourself',
          'Tracking a person\'s location through GPS',
          'Monitoring network traffic from behind a firewall',
        ],
        correctAnswer: 1,
        explanation: 'Tailgating exploits courtesy — someone holds a door open, allowing unauthorized physical access.',
      },
      {
        id: 'social-6',
        question: 'Which tactic best helps resist authority-based social engineering?',
        options: [
          'Comply immediately when someone claims to be senior leadership',
          'Follow a verification procedure even when requests seem urgent',
          'Share information if the caller knows your name',
          'Trust requests that mention confidential projects',
        ],
        correctAnswer: 1,
        explanation: 'Established verification procedures protect against impersonation, even from apparent authority figures.',
      },
      {
        id: 'social-7',
        question: 'What is vishing?',
        options: [
          'Phishing through voice calls or voicemail',
          'Visual phishing using fake websites',
          'Virus scanning over a VPN',
          'Validating software licenses online',
        ],
        correctAnswer: 0,
        explanation: 'Vishing (voice phishing) uses phone calls to trick victims into revealing sensitive information.',
      },
      {
        id: 'social-8',
        question: 'Why do attackers research their targets on LinkedIn before an attack?',
        options: [
          'To send birthday greetings',
          'To craft personalized messages that appear more credible',
          'To improve the target\'s professional profile',
          'To verify employment for HR purposes',
        ],
        correctAnswer: 1,
        explanation: 'Public professional information helps attackers personalize spear phishing and pretexting attempts.',
      },
      {
        id: 'social-9',
        question: 'A stranger at a conference asks to borrow your laptop charger and attempts to plug in a small device. You should:',
        options: [
          'Allow it to be helpful',
          'Decline and never connect unknown devices to your computer',
          'Ask them to sign a waiver first',
          'Lend the laptop instead of the charger',
        ],
        correctAnswer: 1,
        explanation: 'Unknown USB devices can install malware. Never connect untrusted hardware to your devices.',
      },
      {
        id: 'social-10',
        question: 'Which organizational control best reduces social engineering risk?',
        options: [
          'Disabling all employee training to save time',
          'Regular security awareness training and clear reporting procedures',
          'Publishing all employee phone numbers publicly',
          'Removing all access controls for convenience',
        ],
        correctAnswer: 1,
        explanation: 'Awareness training and easy reporting channels help employees recognize and respond to manipulation attempts.',
      },
    ],
  },
  {
    id: 'quiz-ransomware',
    title: 'Ransomware Defense',
    description: 'Understand how ransomware spreads, how to respond, and how to reduce organizational impact.',
    difficulty: 'Intermediate',
    timeEstimate: '12 min',
    icon: 'shield',
    questions: [
      {
        id: 'ransomware-1',
        question: 'What is ransomware?',
        options: [
          'Software that automatically updates your operating system',
          'Malware that encrypts files and demands payment for decryption',
          'A tool for managing cloud backups',
          'An antivirus feature that scans email attachments',
        ],
        correctAnswer: 1,
        explanation: 'Ransomware encrypts victim data and typically demands payment, though paying does not guarantee recovery.',
      },
      {
        id: 'ransomware-2',
        question: 'What is the most recommended first response if you suspect ransomware on your work computer?',
        options: [
          'Pay the ransom immediately to minimize downtime',
          'Disconnect from the network and report it to IT/security immediately',
          'Restart the computer several times',
          'Delete random files to remove the infection',
        ],
        correctAnswer: 1,
        explanation: 'Isolating the device limits spread while the incident response team assesses the situation.',
      },
      {
        id: 'ransomware-3',
        question: 'Which backup practice best supports ransomware recovery?',
        options: [
          'Storing backups on the same drive as production data',
          'Maintaining offline or immutable backups tested regularly',
          'Backing up only once per year',
          'Relying on employees to email files to themselves',
        ],
        correctAnswer: 1,
        explanation: 'Offline or immutable backups prevent ransomware from encrypting your recovery copies too.',
      },
      {
        id: 'ransomware-4',
        question: 'How does ransomware most commonly enter an organization?',
        options: [
          'Through automatic Windows updates',
          'Through phishing emails, exposed services, or compromised credentials',
          'Through licensed antivirus software',
          'Through physical security badges',
        ],
        correctAnswer: 1,
        explanation: 'Phishing, vulnerable remote access, and stolen credentials are frequent ransomware entry points.',
      },
      {
        id: 'ransomware-5',
        question: 'Why is paying the ransom generally discouraged by law enforcement and security experts?',
        options: [
          'Payment guarantees permanent removal of the malware',
          'Payment funds criminal activity and does not guarantee data recovery',
          'Ransom payments are always refunded by banks',
          'Paying automatically restores all encrypted files',
        ],
        correctAnswer: 1,
        explanation: 'Paying encourages further attacks and victims often still lose data or get targeted again.',
      },
      {
        id: 'ransomware-6',
        question: 'What role does patching and updating software play in ransomware defense?',
        options: [
          'It has no effect on ransomware',
          'It closes known vulnerabilities attackers exploit to gain access',
          'It automatically decrypts infected files',
          'It replaces the need for backups',
        ],
        correctAnswer: 1,
        explanation: 'Many ransomware attacks exploit unpatched vulnerabilities in software and operating systems.',
      },
      {
        id: 'ransomware-7',
        question: 'Which user action increases ransomware risk on a corporate network?',
        options: [
          'Enabling multi-factor authentication',
          'Disabling macro execution in documents from unknown senders',
          'Enabling macros in an unexpected email attachment',
          'Reporting suspicious emails to IT',
        ],
        correctAnswer: 2,
        explanation: 'Malicious macros in Office documents are a common ransomware delivery method.',
      },
      {
        id: 'ransomware-8',
        question: 'What is "double extortion" ransomware?',
        options: [
          'Encrypting data twice for stronger encryption',
          'Stealing data before encryption and threatening to publish it if ransom is not paid',
          'Charging two separate ransoms for the same files',
          'Attacking only two computers on a network',
        ],
        correctAnswer: 1,
        explanation: 'Attackers may exfiltrate sensitive data and use public exposure as additional leverage.',
      },
      {
        id: 'ransomware-9',
        question: 'Which principle helps limit ransomware spread inside a network?',
        options: [
          'Granting all users administrator access',
          'Network segmentation and least-privilege access',
          'Disabling all logging to improve performance',
          'Using one shared account for all employees',
        ],
        correctAnswer: 1,
        explanation: 'Segmentation and least privilege contain infections and restrict lateral movement.',
      },
      {
        id: 'ransomware-10',
        question: 'After a ransomware incident, what is an important recovery step beyond restoring files?',
        options: [
          'Ignore how the attack happened to save time',
          'Conduct a post-incident review to identify root cause and improve defenses',
          'Delete all security logs immediately',
          'Disable all backups to prevent reinfection',
        ],
        correctAnswer: 1,
        explanation: 'Understanding how the attack occurred helps prevent recurrence and strengthens incident response plans.',
      },
    ],
  },
  {
    id: 'quiz-ransomware-final',
    title: 'Ransomware Response Final Assessment',
    description: 'Comprehensive certification assessment on ransomware prevention, containment, recovery, and post-incident response.',
    difficulty: 'Intermediate',
    timeEstimate: '14 min',
    icon: 'shield',
    questions: [
      {
        id: 'rw-final-1',
        question: 'Your workstation shows encrypted file extensions and a ransom note. What is the correct first action?',
        options: [
          'Pay the ransom to restore access quickly',
          'Disconnect from the network and notify IT/security immediately',
          'Reboot repeatedly until files unlock',
          'Delete the ransom note and continue working',
        ],
        correctAnswer: 1,
        explanation: 'Isolation limits spread while incident responders assess scope and preserve evidence.',
      },
      {
        id: 'rw-final-2',
        question: 'Which backup strategy best supports recovery after ransomware?',
        options: [
          'Single cloud sync folder shared with all users',
          'Offline or immutable backups tested on a regular schedule',
          'USB drive left plugged in at all times',
          'Emailing critical files to yourself weekly',
        ],
        correctAnswer: 1,
        explanation: 'Immutable or offline backups prevent attackers from encrypting recovery copies.',
      },
      {
        id: 'rw-final-3',
        question: 'During incident response, why is network segmentation valuable?',
        options: [
          'It eliminates the need for backups',
          'It restricts lateral movement and contains infections to smaller zones',
          'It automatically decrypts affected files',
          'It allows all users admin access for faster fixes',
        ],
        correctAnswer: 1,
        explanation: 'Segmentation slows spread and gives responders time to isolate affected systems.',
      },
      {
        id: 'rw-final-4',
        question: 'A user enabled macros in a document from an unknown sender. What risk increased most?',
        options: [
          'Browser performance degradation only',
          'Malware execution leading to ransomware deployment',
          'Automatic password rotation',
          'Loss of email archiving',
        ],
        correctAnswer: 1,
        explanation: 'Malicious macros are a common initial access method for ransomware operators.',
      },
      {
        id: 'rw-final-5',
        question: 'What does double extortion ransomware add beyond file encryption?',
        options: [
          'Free decryption for early payment',
          'Data exfiltration and threats to publish stolen information',
          'Automatic patching of vulnerabilities',
          'Mandatory MFA enrollment',
        ],
        correctAnswer: 1,
        explanation: 'Attackers may steal data and use publication as additional leverage.',
      },
      {
        id: 'rw-final-6',
        question: 'In the ransomware simulation, isolating an affected system before full analysis primarily helps to:',
        options: [
          'Destroy forensic evidence',
          'Prevent further spread while preserving the system for investigation',
          'Guarantee immediate decryption',
          'Bypass leadership notification requirements',
        ],
        correctAnswer: 1,
        explanation: 'Early containment protects the broader environment while enabling structured response.',
      },
      {
        id: 'rw-final-7',
        question: 'Which leadership communication approach is appropriate during an active ransomware event?',
        options: [
          'Share full technical details publicly on social media',
          'Provide clear, factual updates through official channels while response is coordinated',
          'Assure everyone that no action is needed',
          'Disable all employee communication until recovery',
        ],
        correctAnswer: 1,
        explanation: 'Coordinated, accurate communication maintains trust and reduces panic-driven mistakes.',
      },
      {
        id: 'rw-final-8',
        question: 'After recovery, what is the most valuable follow-up activity?',
        options: [
          'Deleting all logs to save storage',
          'Post-incident review to identify root cause and improve controls',
          'Disabling backups to prevent reinfection',
          'Ignoring user training because the incident is over',
        ],
        correctAnswer: 1,
        explanation: 'Lessons learned strengthen prevention, detection, and response for future incidents.',
      },
      {
        id: 'rw-final-9',
        question: 'Which control pair best reduces ransomware entry risk covered in this certification?',
        options: [
          'Shared admin accounts and disabled patching',
          'Phishing-resistant awareness and timely software patching',
          'Plain-text password storage and open RDP',
          'Macro auto-enable and public file shares',
        ],
        correctAnswer: 1,
        explanation: 'Human-targeted entry and unpatched systems are leading ransomware enablers.',
      },
      {
        id: 'rw-final-10',
        question: 'Why do security experts generally advise against paying ransom demands?',
        options: [
          'Payment always results in full data recovery',
          'Payment funds criminal operations and does not guarantee restoration',
          'Law enforcement requires immediate payment',
          'Ransomware only affects personal devices',
        ],
        correctAnswer: 1,
        explanation: 'Recovery is uncertain and payment incentivizes further attacks.',
      },
    ],
  },
  {
    id: 'quiz-advanced-decision-final',
    title: 'Advanced Incident Assessment',
    description:
      'Applied certification assessment covering identity attacks, MFA abuse, suspicious authentication, investigation, escalation, and containment.',
    difficulty: 'Advanced',
    timeEstimate: '15 min',
    icon: 'shield',
    questions: [
      {
        id: 'adv-final-1',
        question:
          'A colleague forwards an email thread where a vendor changed bank details after a brief phone call. Separately, IT logged a password reset for that vendor contact. What is the strongest interpretation?',
        options: [
          'Two unrelated administrative events that happen occasionally',
          'A likely coordinated attempt to redirect payment using compromised or impersonated communication',
          'Proof the vendor intentionally updated banking information through proper channels',
          'A reason to process the payment quickly before the vendor escalates',
        ],
        correctAnswer: 1,
        explanation:
          'Changed payment instructions combined with authentication anomalies suggest business email compromise or impersonation—not routine admin work.',
      },
      {
        id: 'adv-final-2',
        question:
          'You receive repeated MFA push notifications you did not initiate. Minutes later, a caller claiming to be IT asks you to approve the next prompt to "clear an error." Best response?',
        options: [
          'Approve the prompt to stop the notifications',
          'Deny the prompts, do not share codes, and report through official security channels',
          'Read the MFA code aloud so the caller can verify your device',
          'Ignore the caller and continue working until the prompts stop',
        ],
        correctAnswer: 1,
        explanation:
          'Unsolicited MFA prompts plus credential or code requests are classic MFA abuse. Deny, report, and verify through known channels.',
      },
      {
        id: 'adv-final-3',
        question:
          'An executive assistant receives a urgent Teams message from the CEO requesting confidential payroll files "before the board call." The profile photo matches, but the request is unusual. Best action?',
        options: [
          'Send the files immediately to avoid delaying leadership',
          'Verify the request through a separate trusted channel before sharing sensitive data',
          'Reply in-thread asking for the CEO password to confirm identity',
          'Forward the files to personal email for faster upload',
        ],
        correctAnswer: 1,
        explanation:
          'Authority and urgency are common BEC tactics. Out-of-band verification is required for sensitive requests even from familiar names.',
      },
      {
        id: 'adv-final-4',
        question:
          'Your account shows a successful login from another country while you are at your office. You can still access email normally. What should you do first?',
        options: [
          'Change your password silently and continue working',
          'Report the suspicious authentication to security/IT immediately and avoid sensitive actions until verified',
          'Assume the alert is a false positive because access still works',
          'Post in a public chat asking if anyone else traveled recently',
        ],
        correctAnswer: 1,
        explanation:
          'Suspicious authentication may indicate active compromise. Early reporting enables session revocation and investigation.',
      },
      {
        id: 'adv-final-5',
        question:
          'A help desk ticket arrives about a "locked account" from User A. Security also sees failed logins for User A and an outbound rule forwarding mail for User A. What connects these events?',
        options: [
          'Routine password expiration affecting multiple users',
          'Possible account takeover with attacker persistence in the mailbox',
          'Evidence that User A forgot their password only once',
          'Proof that the help desk should reset the password without investigation',
        ],
        correctAnswer: 1,
        explanation:
          'Failed logins, lockout reports, and forwarding rules together suggest compromise rather than a simple forgotten password.',
      },
      {
        id: 'adv-final-6',
        question:
          'Someone calling from an unknown number claims to be internal IT and needs your password to fix VPN access before a deadline. What is the correct response?',
        options: [
          'Provide the password because IT legitimately needs access',
          'Refuse, hang up, and contact IT using the official help desk number or portal',
          'Give a previous password to test whether they are real IT staff',
          'Share your employee ID and MFA code but not the password',
        ],
        correctAnswer: 1,
        explanation:
          'Legitimate IT never requests passwords or MFA codes over unsolicited calls. Callback through official channels breaks most pretexts.',
      },
      {
        id: 'adv-final-7',
        question:
          'During a suspected phishing incident, which action best preserves evidence for the security team?',
        options: [
          'Delete the message so others cannot click it',
          'Forward the message as an attachment or use the report-phishing button and note the time received',
          'Reply to the sender asking them to confirm legitimacy',
          'Screenshot only the visible body and discard headers',
        ],
        correctAnswer: 1,
        explanation:
          'Reporting with headers intact and timestamps helps analysts investigate scope and block similar messages.',
      },
      {
        id: 'adv-final-8',
        question:
          'You suspect your account is compromised but are unsure. Which first report gives security the most actionable detail?',
        options: [
          '"Something feels wrong with my computer."',
          '"At 09:14 I received MFA prompts I did not initiate; at 09:20 I noticed a mail rule I did not create."',
          '"I think hackers are everywhere today."',
          '"Please reset everything company-wide just in case."',
        ],
        correctAnswer: 1,
        explanation:
          'Specific timestamps and observed changes enable faster containment and timeline reconstruction.',
      },
      {
        id: 'adv-final-9',
        question:
          'Finance receives updated wire instructions from a long-trusted vendor contact via email. The wording is slightly different from usual. What is the most appropriate control?',
        options: [
          'Process the wire because the sender history is trusted',
          'Confirm payment changes through a previously verified phone number or established callback process',
          'Reply to the email asking them to type "confirm" to prove identity',
          'Wait until next quarter when finance has more time to verify',
        ],
        correctAnswer: 1,
        explanation:
          'Vendor payment fraud exploits trusted threads. Verified callback procedures are standard for payment detail changes.',
      },
      {
        id: 'adv-final-10',
        question:
          'Multiple weak indicators appear within an hour: unexpected password reset email, a new device enrollment alert, and a colleague saying they received odd messages from you. Best overall response?',
        options: [
          'Treat each item separately and address only the most recent one',
          'Treat them as a potential single incident, report immediately, and avoid further account use until security advises',
          'Post details in a company-wide channel for crowd-sourced analysis',
          'Assume the colleague is mistaken and take no action',
        ],
        correctAnswer: 1,
        explanation:
          'Correlated identity and communication anomalies warrant immediate escalation as a likely coordinated compromise.',
      },
    ],
  },
];

export const getQuizById = (quizId) => quizzes.find((quiz) => quiz.id === quizId) || null;

export const getQuizQuestionCount = (quiz) => quiz?.questions?.length ?? 0;

export const calculateQuizScore = (quiz, answers) => {
  const total = quiz.questions.length;
  let correct = 0;

  quiz.questions.forEach((question) => {
    if (answers[question.id] === question.correctAnswer) {
      correct += 1;
    }
  });

  const percentage = total ? Math.round((correct / total) * 100) : 0;

  return { correct, incorrect: total - correct, total, percentage };
};

export const getPerformanceStatus = (percentage) => {
  if (percentage >= 80) {
    return {
      label: 'Excellent',
      message: 'Strong understanding of this topic. Keep building on these habits.',
      className: 'text-status-success',
    };
  }
  if (percentage >= 60) {
    return {
      label: 'Passed',
      message: 'Good work. Review the explanations below to strengthen weaker areas.',
      className: 'text-accent-purple',
    };
  }
  return {
    label: 'Needs Review',
    message: 'Consider revisiting the Knowledge Center resources and trying again.',
    className: 'text-status-danger',
  };
};
