const EXPANSIONS = {
  'art-1': {
    readTime: '12 min',
    sections: [
      {
        heading: 'Introduction',
        paragraphs: [
          'Cybersecurity is the discipline of protecting computers, networks, data, and the people who rely on them from digital harm. Every day, individuals, universities, hospitals, and governments depend on technology to communicate, learn, store records, and operate critical services. When those systems are compromised, the consequences range from stolen identities and financial loss to disrupted classes, leaked research, and halted public services.',
          'For undergraduate students entering technical or non-technical fields alike, cybersecurity literacy is no longer optional. Attackers do not only target large corporations; they exploit weak passwords on student accounts, phishing messages in university inboxes, and unpatched software on personal laptops. Understanding the fundamentals helps you protect yourself now and prepares you to make informed decisions throughout your career.',
        ],
      },
      {
        heading: 'What Cybersecurity Protects',
        paragraphs: [
          'At its core, cybersecurity protects three interconnected assets: information, systems, and people. Information includes personal data such as grades, health records, and payment details, as well as organizational data like research, payroll, and intellectual property. Systems encompass servers, cloud services, mobile devices, IoT equipment, and the software that connects them. People are protected when security controls reduce the likelihood of fraud, harassment, identity theft, and operational disruption.',
          'Security also preserves trust. A student portal that leaks credentials, a lab network that spreads malware, or a compromised email account used to impersonate faculty all erode confidence in digital services. Effective cybersecurity ensures that data is accessed only by authorized parties, that systems behave as expected, and that users can rely on technology without constant fear of exploitation.',
        ],
      },
      {
        heading: 'Common Threat Categories',
        paragraphs: [
          'Threats to cybersecurity come in many forms, and attackers often combine techniques to achieve their goals. Understanding the major categories helps you recognize patterns rather than memorizing isolated incidents. The diagram below illustrates six categories that appear repeatedly in incident reports, course curricula, and industry frameworks.',
          'Phishing and social engineering manipulate human judgment rather than software flaws. Malware—including viruses, worms, ransomware, and spyware—disrupts or steals from systems. Insider threats arise when authorized users misuse access, intentionally or accidentally. Unpatched systems leave known vulnerabilities open to exploitation. Weak credentials make brute-force and credential-stuffing attacks practical at scale.',
        ],
        diagram: 'threat-landscape',
      },
      {
        heading: 'How Attacks Happen',
        paragraphs: [
          'Most successful attacks follow a predictable sequence, even when the specific tools differ. Reconnaissance comes first: attackers gather email addresses, job titles, software versions, and public posts to plan their approach. Next, they gain initial access through phishing links, stolen passwords, misconfigured cloud storage, or exploited vulnerabilities.',
          'After entry, attackers often escalate privileges, move laterally across networks, and establish persistence so they can return even if a device is rebooted. Finally, they achieve their objective—exfiltrating data, deploying ransomware, committing fraud, or disrupting services. Defenders interrupt this chain at multiple points: blocking malicious email, enforcing MFA, patching software, monitoring logs, and training users to report suspicious activity early.',
        ],
      },
      {
        heading: 'The CIA Triad',
        paragraphs: [
          'Confidentiality, integrity, and availability form the foundational model taught in virtually every introductory cybersecurity course. Confidentiality means limiting information access to authorized individuals—encryption, access controls, and careful sharing policies support this goal. Integrity ensures that data and systems remain accurate and unaltered by unauthorized parties; checksums, digital signatures, and change logs help detect tampering.',
          'Availability guarantees that systems and data are accessible when needed. Denial-of-service attacks, hardware failures, and ransomware encryption all threaten availability. Security decisions often involve balancing these three properties: stricter access controls may improve confidentiality but can frustrate legitimate users if poorly implemented. Professionals evaluate trade-offs based on context, risk, and business or academic requirements.',
        ],
        diagram: 'cia-triad',
      },
      {
        heading: 'Real-World Examples',
        paragraphs: [
          'Major data breaches have exposed billions of records by combining weak authentication with unpatched software. Equifax (2017) demonstrated how a known vulnerability in a web application, left unpatched for months, enabled attackers to access sensitive personal data for roughly 147 million people. The incident highlighted failures in vulnerability management, segmentation, and incident detection—not merely a single technical mistake.',
          'Universities face targeted attacks because they hold valuable research and large populations of accounts. Ransomware groups have disrupted hospital systems and municipal services, proving that availability threats have life-safety implications. On a personal scale, students regularly encounter credential-stuffing attacks when reused passwords from breached consumer sites unlock university email or banking accounts. These examples share a theme: most harm is preventable with basic hygiene and institutional controls.',
        ],
      },
      {
        heading: 'Basic Protection Techniques',
        paragraphs: [
          'Layered defenses—often called defense in depth—assume that no single control is perfect. Strong, unique passwords combined with multi-factor authentication dramatically reduce account takeover. Regular software updates close vulnerabilities before attackers can exploit them routinely. Antivirus and endpoint detection tools on laptops help identify malicious files and suspicious behavior.',
          'Backups stored offline or in immutable storage enable recovery from ransomware without paying criminals. Network firewalls and encryption protect data in transit across campus Wi-Fi and the public internet. Security awareness training turns users into active sensors who report phishing instead of clicking it. Together, these measures address people, process, and technology—the three pillars of any mature security program.',
        ],
      },
      {
        heading: 'Practical Checklist',
        paragraphs: [
          'Use the checklist below as a starting point for personal and academic digital hygiene. Treat it as a habit-building tool rather than a one-time exercise.',
        ],
        list: [
          'Enable multi-factor authentication on email, banking, and university accounts.',
          'Use a password manager to create unique credentials for every service.',
          'Install operating system and application updates within a week of release.',
          'Verify sender identity before clicking links or opening attachments in email.',
          'Lock your screen when leaving devices unattended in labs, libraries, or dorms.',
          'Back up important coursework and research to an approved cloud or external drive.',
          'Report suspicious messages to your IT or security team instead of deleting silently.',
          'Avoid sharing passwords, MFA codes, or recovery links with anyone—including callers claiming to be IT support.',
        ],
      },
      {
        heading: 'Key Takeaways',
        paragraphs: [
          'Cybersecurity protects information, systems, and people through layered controls and informed behavior. The CIA triad—confidentiality, integrity, and availability—provides a lens for evaluating risks and defenses. Attacks typically progress through reconnaissance, access, escalation, and impact, which means defenders have multiple opportunities to intervene.',
          'Real-world incidents show that unpatched systems, weak credentials, and social engineering remain dominant root causes. Building good habits as a student—MFA, unique passwords, skepticism toward urgent messages—creates a foundation for professional responsibility later. Security is a shared obligation: technology helps, but human decisions determine whether it succeeds.',
        ],
      },
    ],
    keyTakeaways: [
      'Cybersecurity protects information, systems, and people from digital harm.',
      'The CIA triad—confidentiality, integrity, and availability—guides security decisions.',
      'Attacks usually follow reconnaissance, access, escalation, and impact stages.',
      'Phishing, malware, weak credentials, and unpatched systems are persistent threat categories.',
      'Layered defenses plus user awareness form the most effective beginner strategy.',
    ],
  },

  'art-2': {
    readTime: '10 min',
    sections: [
      {
        heading: 'Why Passwords Still Matter',
        paragraphs: [
          'Passwords remain the most common authentication method across consumer and enterprise systems. Despite advances in biometrics and passkeys, billions of accounts still rely on a shared secret only you should know. When that secret is weak, reused, or exposed in a breach, attackers gain a direct path to email, cloud storage, financial accounts, and university systems.',
          'Credential stuffing—automated login attempts using username and password pairs stolen from other sites—is one of the simplest large-scale attacks. Students who reuse a gaming forum password on their campus portal may unknowingly grant access to academic records and internal resources. Strong password practices are therefore not about memorizing complexity rules; they are about breaking the chain between unrelated services.',
        ],
      },
      {
        heading: 'What Makes a Password Strong',
        paragraphs: [
          'Length is the single most important factor in password strength. A 14-character passphrase such as "correct-horse-battery-staple" resists guessing far better than an 8-character string with symbols scattered throughout. Modern guidance from NIST and security researchers emphasizes length and unpredictability over forced rotation every 30 days, which often leads people to choose predictable patterns like "Spring2024!" followed by "Summer2024!".',
          'Avoid personal information—birthdays, pet names, student IDs, and favorite sports teams—that attackers can infer from social media. Avoid dictionary words alone or common substitutions such as "P@ssw0rd" that cracking tools test automatically. Randomly generated passwords from a reputable password manager meet these criteria without burdening your memory.',
        ],
      },
      {
        heading: 'Passphrases vs. Traditional Passwords',
        paragraphs: [
          'Passphrases combine multiple random words or a long sentence-like string that is easier to remember but hard to guess. They work well for master passwords and device logins when a manager is unavailable. For example, "library-coffee-midnight-river" provides high entropy and can be typed reliably without referencing sticky notes.',
          'Traditional complex passwords with mixed character classes still work when generated randomly, but human-created "complex" passwords frequently follow predictable templates: capital letter first, number at the end, exclamation mark appended. Attackers optimize for these patterns. When you choose your own password, bias toward length; when a system allows 64 characters, use them.',
        ],
      },
      {
        heading: 'The Danger of Password Reuse',
        paragraphs: [
          'Every online service is a potential breach target. When one vendor leaks credentials, attackers immediately test them against Gmail, Microsoft, PayPal, and university SSO portals. Reusing passwords links the security of your most sensitive accounts to the weakest site you ever registered for—a recipe for compromise.',
          'Unique passwords contain blast radius: if one service fails, others remain secure. This principle applies equally to personal and shared environments. Never reuse your university password on commercial sites, and never reuse lab or project credentials across unrelated systems.',
        ],
        callout: {
          type: 'warning',
          title: 'Breaches happen silently',
          text: 'You may not receive notification when an obscure forum you joined years ago leaks your credentials. Assume any password you have ever reused is already compromised and rotate it on critical accounts.',
        },
      },
      {
        heading: 'Password Managers',
        paragraphs: [
          'Password managers generate, store, and autofill unique credentials for each account. You memorize one strong master password (or use platform biometrics) while the manager handles the rest. Leading options include Bitwarden, 1Password, and built-in tools in browsers and operating systems offered by Apple, Google, and Microsoft.',
          'Concerns about storing passwords in one place are valid, which is why master password strength and MFA on the vault itself are essential. For most users, a well-configured manager reduces risk dramatically compared to reusing passwords or writing them in plaintext files. University IT departments often recommend approved enterprise managers for research and administrative staff.',
        ],
      },
      {
        heading: 'Passwords and Multi-Factor Authentication',
        paragraphs: [
          'Even strong passwords can be phished or leaked. Multi-factor authentication (MFA) requires a second proof of identity—typically a code from an authenticator app or a hardware key—so a stolen password alone is insufficient. Enable MFA on email first, because password reset flows for other services often depend on inbox access.',
          'Treat MFA codes like passwords: never share them with callers, chat support, or websites linked from unsolicited email. Legitimate services will not ask you to read a one-time code over the phone to "verify your identity" during an unexpected call.',
        ],
      },
      {
        heading: 'Building Better Habits',
        paragraphs: [
          'Audit existing accounts during semester breaks: close unused services, update recovery email and phone numbers, and replace weak or reused passwords. Use your university SSO where available instead of creating shadow accounts with duplicate credentials. When a service offers passkeys—cryptographic credentials bound to your device—prefer them for high-value logins.',
          'Password strength is one layer in a broader identity security strategy. Pair unique credentials with MFA, device updates, and phishing awareness to protect academic work and personal data throughout your undergraduate years and beyond.',
        ],
        list: [
          'Aim for at least 12–14 characters; longer is better.',
          'Use a unique password for every account.',
          'Generate random passwords with a reputable manager.',
          'Enable MFA on email, banking, and university accounts.',
          'Never share passwords or MFA codes with anyone.',
        ],
      },
    ],
    keyTakeaways: [
      'Length and uniqueness matter more than exotic symbol placement.',
      'Password reuse links the security of all your accounts to the weakest site.',
      'Password managers make strong unique credentials practical at scale.',
      'MFA protects accounts even when passwords are phished or leaked.',
      'Audit and update credentials regularly, starting with email and banking.',
    ],
  },

  'art-3': {
    readTime: '9 min',
    sections: [
      {
        heading: 'What Is Multi-Factor Authentication?',
        paragraphs: [
          'Multi-factor authentication (MFA)—also called two-factor authentication (2FA) when exactly two proofs are required—adds layers beyond a password before granting access. The goal is straightforward: even if an attacker steals or guesses your password, they still lack the additional factor needed to complete login. MFA is one of the highest-return security controls available to individuals and institutions.',
          'You likely encounter MFA daily: a banking app requesting a fingerprint, a campus portal sending a push notification to your phone, or an authenticator app displaying a six-digit code that rotates every 30 seconds. Each method implements the same principle—combining independent evidence types to verify identity.',
        ],
      },
      {
        heading: 'The Three Factor Categories',
        paragraphs: [
          'Security frameworks classify authentication factors into three categories. Something you know includes passwords, PINs, and security questions—though questions based on public information are weak and increasingly discouraged. Something you have covers phones, hardware security keys, smart cards, and authenticator apps that generate or receive one-time codes.',
          'Something you are refers to biometrics: fingerprints, facial recognition, and voice patterns. Effective MFA combines factors from different categories. A password plus a fingerprint satisfies two factors; a password plus a security question usually does not, because both are "something you know" and can be researched or phished together.',
        ],
      },
      {
        heading: 'How MFA Works in Practice',
        paragraphs: [
          'A typical login flow begins with your username and password. The service validates the password, then prompts for the second factor—perhaps approving a push notification, entering a time-based code, or inserting a USB security key. Only after both steps succeed does the session token issue and grant access. The diagram below shows this sequential gatekeeping model.',
          'Push-based MFA can include number matching, where you confirm a code displayed on screen to prevent accidental approvals. Time-based one-time passwords (TOTP) in apps like Google Authenticator or Microsoft Authenticator work offline and resist SIM-swapping better than SMS in most scenarios.',
        ],
        diagram: 'mfa-flow',
      },
      {
        heading: 'Comparing MFA Methods',
        paragraphs: [
          'SMS text codes are widely supported but vulnerable to SIM-swapping, where attackers convince carriers to port your number. Email-based codes depend on inbox security—if email lacks MFA, the second factor collapses. Authenticator apps improve on SMS by binding codes to a device secret rather than a phone number.',
          'Hardware security keys based on FIDO2/WebAuthn standards provide phishing-resistant MFA because cryptography binds the login to the legitimate site domain. Universities and cloud providers increasingly support keys for faculty and administrators handling sensitive data. For most students, an authenticator app or platform passkey offers an excellent balance of security and convenience.',
        ],
        list: [
          'SMS codes: convenient but susceptible to SIM swap and interception.',
          'Authenticator apps: stronger than SMS; work without cellular service.',
          'Push notifications: fast but require careful approval to avoid MFA fatigue attacks.',
          'Hardware keys: strongest phishing resistance for high-value accounts.',
          'Biometrics: useful as a local factor on trusted personal devices.',
        ],
      },
      {
        heading: 'Where to Enable MFA First',
        paragraphs: [
          'Prioritize accounts that control recovery for others. Your primary email is the highest-value target because "forgot password" links for banking, shopping, and academic services route there. Enable MFA on cloud storage containing coursework, financial apps, and your university identity provider if supported.',
          'Work backward through services by impact: losing a social media account is painful, but losing email or banking access is disruptive and costly. Many breaches begin with email takeover followed by password resets elsewhere—MFA on email breaks that chain.',
        ],
        callout: {
          type: 'tip',
          title: 'Save backup codes',
          text: 'When enabling MFA, download or print one-time recovery codes and store them securely offline. They are essential if you lose your phone or security key during travel or device replacement.',
        },
      },
      {
        heading: 'MFA Limitations and Best Practices',
        paragraphs: [
          'MFA is powerful but not absolute. Attackers may use MFA fatigue—spamming push notifications until a user approves—or trick users into entering codes on fake sites in real time. Always verify the context of a login prompt: unexpected MFA requests when you are not signing in may indicate someone else is using your password.',
          'Never share MFA codes, push approvals, or hardware keys with anyone claiming to be support staff. Pair MFA with unique passwords managed by a password vault. Review registered MFA devices periodically and remove old phones or laptops you no longer control.',
        ],
      },
    ],
    keyTakeaways: [
      'MFA requires two or more independent proofs of identity before access.',
      'Effective combinations span different factor categories—not two passwords.',
      'Authenticator apps and hardware keys are stronger than SMS for most users.',
      'Enable MFA on email first because it protects password recovery everywhere else.',
      'Treat unexpected MFA prompts as potential compromise indicators.',
    ],
  },

  'art-8': {
    readTime: '11 min',
    sections: [
      {
        heading: 'Understanding Phishing',
        paragraphs: [
          'Phishing is a social engineering attack that uses deceptive messages—email, SMS (smishing), voice calls (vishing), or social media—to trick recipients into revealing credentials, installing malware, or authorizing fraudulent transactions. Unlike exploits that target software vulnerabilities, phishing targets human judgment. That is why it remains the most common initial access vector in data breaches year after year.',
          'Attackers impersonate trusted entities: your university IT department, a professor, a shipping carrier, or a major cloud provider. Messages often appear polished, with correct logos and language copied from legitimate templates. The threat is not limited to obvious scams; targeted spear-phishing references your name, courses, or recent purchases to increase credibility.',
        ],
      },
      {
        heading: 'The Phishing Attack Flow',
        paragraphs: [
          'Most phishing campaigns follow a repeatable pipeline from delivery to compromise. Understanding this flow helps you interrupt it before credentials are stolen or malware executes. The diagram below maps the typical path from an unsuspecting recipient to account takeover.',
          'Intervention is possible at every stage: email filters block delivery, trained users report suspicious messages, browsers warn about known malicious domains, and MFA prevents login even after password capture. No single control is perfect, which is why organizations combine technical filtering with user awareness.',
        ],
        diagram: 'phishing-flow',
      },
      {
        heading: 'Common Phishing Tactics',
        paragraphs: [
          'Urgency and fear drive many successful phishes. Messages claim your account will be closed, a tuition payment failed, or a package cannot be delivered unless you act within hours. Authority impersonation leverages respect for managers, IT staff, or government agencies—"Please review this document immediately" from a spoofed dean\'s address is a classic academic variant.',
          'Curiosity and reward bait offer free gift cards, internship opportunities, or exclusive downloads. Seasonal campaigns spike during tax season, enrollment periods, and holidays when users expect transactional email. Attackers also exploit current events—natural disasters, elections, or health crises—to lend false legitimacy to donation or verification scams.',
        ],
        list: [
          'Urgent account suspension or verification requests.',
          'Unexpected invoices, shipping notices, or payment failures.',
          'Messages requesting passwords, MFA codes, or remote access.',
          'Look-alike domains differing by one character (e.g., micr0soft.com).',
          'Generic greetings ("Dear User") instead of your actual name.',
          'Attachments or links you did not request from known or unknown senders.',
        ],
      },
      {
        heading: 'Red Flags in Email and Messages',
        paragraphs: [
          'Before clicking, hover over links to preview the true destination—on mobile, long-press the link. Legitimate university services use official domains listed in IT documentation, not shortened URLs or unrelated country-code domains. Inspect sender addresses carefully: display names can show "IT Help Desk" while the actual address points to a free webmail provider.',
          'Poor grammar and spelling still appear in mass campaigns, but targeted attacks are often flawless. Focus on behavioral signals: Would this person normally ask you to buy gift cards? Would your bank request your password via email? Would IT ask you to disable security to "run diagnostics"? When the requested action violates policy or common sense, pause and verify.',
        ],
        callout: {
          type: 'tip',
          title: 'Verify out of band',
          text: 'If a message seems urgent, contact the sender through a known channel—call a published IT help number, walk to their office, or start a new email to an address from the official directory. Do not reply to the suspicious message itself.',
        },
      },
      {
        heading: 'Phishing Beyond Email',
        paragraphs: [
          'SMS phishing may claim your package is held at customs with a link to a fake tracking site. Voice phishing callers pretend to be tax authorities or tech support and pressure you to install remote-access software. Social media messages offer fake job interviews requiring a login to a fraudulent portal. QR code phishing (quishing) places malicious codes on posters or parking meters, redirecting scans to credential harvesters.',
          'Academic environments see specialized lures: fake journal invitations, predatory conference acceptance letters, and shared "research documents" that require enabling macros. Treat every unexpected login prompt as suspicious, regardless of channel.',
        ],
      },
      {
        heading: 'How to Respond Safely',
        paragraphs: [
          'If you suspect phishing, do not click links, open attachments, or reply with information. Use your organization\'s report-phishing button if available—this trains filters and alerts security teams. If you already clicked, disconnect from the network if malware is suspected, change passwords from a clean device, and notify IT immediately.',
          'Document what you observed: sender address, timestamps, and screenshots help investigators determine scope. If you entered credentials on a fake page, assume compromise: rotate passwords, revoke active sessions, and confirm MFA settings have not been altered to attacker-controlled devices.',
        ],
        list: [
          'Stop interacting with the suspicious message.',
          'Report using official channels rather than forwarding blindly.',
          'Change passwords on affected accounts from a trusted device.',
          'Review account activity and MFA device registrations.',
          'Inform IT if data or university systems may be involved.',
        ],
      },
      {
        heading: 'Building Long-Term Resilience',
        paragraphs: [
          'Phishing awareness is a skill developed through repetition. Participate in simulation exercises if your institution offers them—they provide low-risk practice. Keep browsers and email clients updated so known malicious sites and attachments are blocked. Pair skepticism with MFA so stolen passwords alone rarely suffice for account takeover.',
          'Share knowledge with peers: students who recognize academic-themed lures protect the whole community. Security teams depend on reports from users who notice anomalies early. Your vigilance is a critical control, not an inconvenience.',
        ],
      },
    ],
    keyTakeaways: [
      'Phishing exploits trust and urgency across email, SMS, voice, and social media.',
      'Verify links, sender addresses, and requested actions before responding.',
      'Use out-of-band verification for unexpected urgent requests.',
      'Report suspicious messages to improve filters and aid incident response.',
      'MFA and prompt reporting limit damage even when mistakes occur.',
    ],
  },

  'art-11': {
    readTime: '14 min',
    sections: [
      {
        heading: 'What Is Ransomware?',
        paragraphs: [
          'Ransomware is malicious software that encrypts files on infected systems and demands payment—typically in cryptocurrency—in exchange for decryption keys. Modern operations rarely stop at encryption alone. Many groups exfiltrate sensitive data first and threaten public release unless a ransom is paid, a tactic called double extortion. Victims therefore face both operational paralysis and reputational or regulatory harm from data exposure.',
          'Ransomware affects hospitals, municipalities, manufacturers, and universities. Attackers target organizations that cannot tolerate downtime—exam periods, enrollment, or active research deadlines increase pressure to pay. Understanding how ransomware works is essential for prevention, detection, and coordinated response.',
        ],
      },
      {
        heading: 'The Ransomware Lifecycle',
        paragraphs: [
          'Ransomware incidents unfold in stages that mirror broader cyberattack patterns. Initial access may come from a phishing attachment, stolen VPN credentials, or an unpatched public-facing service. Attackers then deploy payloads, escalate privileges, disable backups where possible, and move laterally to encrypt file shares and critical servers.',
          'Extortion follows encryption or data theft, often accompanied by countdown timers and leaked sample files on dark web sites. Recovery depends on prepared backups, incident response plans, and decisions made before crisis hits. The lifecycle diagram below summarizes these phases and where preventive controls apply.',
        ],
        diagram: 'ransomware-flow',
      },
      {
        heading: 'How Ransomware Enters Systems',
        paragraphs: [
          'Phishing remains a primary delivery mechanism: macro-enabled documents, malicious links, or password-protected archives evade basic filters. Exploited vulnerabilities in VPN appliances, email servers, or outdated operating systems provide entry without user interaction. Compromised remote desktop protocol (RDP) credentials—often purchased from other criminals—allow direct access to internal networks.',
          'Supply-chain compromise and pirated software also introduce ransomware. Once inside, attackers use legitimate administration tools to blend with normal activity, making detection challenging. Universities with open research environments and diverse device populations must balance collaboration with segmentation and monitoring.',
        ],
        list: [
          'Malicious email attachments and links (phishing).',
          'Unpatched internet-facing services and VPNs.',
          'Weak or leaked remote access credentials.',
          'Infected USB drives or unofficial software downloads.',
          'Lateral movement from an already compromised endpoint.',
        ],
      },
      {
        heading: 'Prevention Strategies',
        paragraphs: [
          'Defense in depth reduces both infection probability and blast radius. Maintain offline or immutable backups tested regularly—backups that remain connected during an attack may be encrypted alongside production data. Apply security patches promptly, prioritizing internet-exposed systems and known exploited vulnerabilities published by CISA and vendor advisories.',
          'Network segmentation limits spread between student labs, research networks, and administrative systems. Endpoint detection and response (EDR) tools identify ransomware behavior such as mass file encryption. Email filtering, application allowlisting, and disabling unnecessary macros close common delivery paths. Security awareness training lowers phishing click rates, addressing the human entry vector.',
        ],
        callout: {
          type: 'info',
          title: 'The 3-2-1 backup rule',
          text: 'Keep at least three copies of important data, on two different media types, with one copy stored offline or immutable. Test restores each semester to confirm backups are usable—not just present.',
        },
      },
      {
        heading: 'Detection and Early Response',
        paragraphs: [
          'Early indicators include unusual file extensions appearing across directories, rapid CPU or disk activity, disabled security tools, and unexpected reboots. Users may report inability to open documents or ransom notes displayed on desktops. Security operations centers monitor for known ransomware command-and-control traffic and anomalous admin actions.',
          'When ransomware is suspected, isolate affected devices immediately by disconnecting from Wi-Fi and Ethernet—do not power off if forensic investigation may be needed, unless instructed by your incident response team. Preserve evidence: note times, visible messages, and systems impacted. Communicate through out-of-band channels if email or chat systems are compromised.',
        ],
      },
      {
        heading: 'If You Are Affected',
        paragraphs: [
          'Follow your organization\'s incident response plan and contact IT or security leadership without delay. Do not pay ransoms lightly: payment funds criminal ecosystems, does not guarantee decryption keys work, and may mark you as a repeat target. Law enforcement and cyber insurance providers (where applicable) can advise on legal and operational options.',
          'Recovery prioritizes restoring critical services from clean backups, rebuilding compromised systems rather than merely decrypting in place, and notifying stakeholders per regulatory and contractual obligations. Document lessons learned—missing patches, weak credentials, or backup gaps—to prevent recurrence.',
        ],
        list: [
          'Isolate infected systems from the network immediately.',
          'Notify IT/security teams and activate the incident response plan.',
          'Preserve logs and ransom notes for investigation.',
          'Assess backup integrity before attempting mass restore.',
          'Communicate status to leadership and affected users through trusted channels.',
          'Avoid paying ransom unless legal and leadership teams explicitly authorize after risk analysis.',
        ],
      },
      {
        heading: 'Organizational and Personal Preparedness',
        paragraphs: [
          'Students should store coursework in university-approved cloud services with versioning enabled, keeping local copies of critical thesis or project data on encrypted external drives disconnected when not in use. Know your campus reporting channel for malware infections on personal devices used to access institutional resources.',
          'Ransomware resilience combines technology, process, and practice. Tabletop exercises help teams rehearse decisions under pressure. Individual preparedness—backups, patching, phishing skepticism—supports institutional defenses and reduces recovery time when incidents occur.',
        ],
      },
    ],
    keyTakeaways: [
      'Ransomware encrypts data and may exfiltrate it for double extortion.',
      'Phishing, unpatched systems, and weak remote access are common entry points.',
      'Offline, tested backups are the most reliable recovery mechanism.',
      'Isolate suspected infections quickly and follow incident response procedures.',
      'Paying ransom is discouraged; prevention and preparation reduce impact most effectively.',
    ],
  },
};

export const EXPANDED_ARTICLE_IDS = new Set(Object.keys(EXPANSIONS));

export const applyExpandedContent = (resources) =>
  resources.map((resource) => {
    const expansion = EXPANSIONS[resource.id];
    if (!expansion) return resource;
    return { ...resource, ...expansion };
  });
