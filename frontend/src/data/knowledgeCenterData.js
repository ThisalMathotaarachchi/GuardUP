import { additionalResources } from './resources/additionalResources';
import { advancedCertificationModules } from './resources/advancedCertificationModules';
import { expandedKnowledgeResources } from './resources/expandedKnowledgeResources';
import { knowledgeBatchThree } from './resources/knowledgeBatchThree';
import { applyExpandedContent } from './resources/expandedArticles';

const baseResources = [
  {
    id: 'art-1',
    title: 'What is Cybersecurity?',
    category: 'Cybersecurity Basics',
    type: 'article',
    difficulty: 'Beginner',
    description: 'An introduction to cybersecurity concepts and why they matter in today\'s digital world.',
    author: 'GuardUp Team',
    date: '2024-01-15',
    readTime: '5 min',
    content: 'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks.',
    fullContent: [
      'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.',
      'Implementing effective cybersecurity measures is particularly challenging today because there are more devices than people, and attackers are becoming more innovative. A successful cybersecurity approach has multiple layers of protection spread across computers, networks, programs, and data.',
      'Organizations and individuals must understand the three fundamental pillars of cybersecurity: confidentiality (keeping data private), integrity (ensuring data is accurate and unaltered), and availability (ensuring systems are accessible when needed).',
      'Every employee plays a role in maintaining security. From recognizing phishing emails to using strong passwords and reporting suspicious activity, human awareness is often the first and most critical line of defense.',
    ],
    sections: [
      {
        heading: 'What Is Cybersecurity?',
        paragraphs: [
          'Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.',
        ],
      },
      {
        heading: 'Why Security Is Harder Than Ever',
        paragraphs: [
          'Implementing effective cybersecurity measures is particularly challenging today because there are more devices than people, and attackers are becoming more innovative. A successful cybersecurity approach has multiple layers of protection spread across computers, networks, programs, and data.',
        ],
      },
      {
        heading: 'The CIA Triad',
        paragraphs: [
          'Organizations and individuals must understand the three fundamental pillars of cybersecurity: confidentiality (keeping data private), integrity (ensuring data is accurate and unaltered), and availability (ensuring systems are accessible when needed).',
        ],
      },
      {
        heading: 'Your Role in Security',
        paragraphs: [
          'Every employee plays a role in maintaining security. From recognizing phishing emails to using strong passwords and reporting suspicious activity, human awareness is often the first and most critical line of defense.',
        ],
      },
    ],
    keyTakeaways: [
      'Cybersecurity protects systems, networks, and data from digital attacks.',
      'Effective security uses multiple layers across people, processes, and technology.',
      'Confidentiality, integrity, and availability form the foundation of security.',
      'Human awareness is often the first line of defense.',
    ],
    tags: ['fundamentals', 'introduction', 'basics'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-2',
    title: 'How to Create Strong Passwords',
    category: 'Identity & Accounts',
    type: 'article',
    difficulty: 'Beginner',
    description: 'Learn the principles of creating secure passwords that are hard to crack.',
    author: 'GuardUp Team',
    date: '2024-02-10',
    readTime: '7 min',
    content: 'A strong password is your first line of defense against unauthorized access.',
    fullContent: [
      'A strong password is your first line of defense against unauthorized access. Weak passwords remain one of the most common entry points for attackers, making password hygiene essential for both personal and organizational security.',
      'A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters. Avoid using easily guessable information such as birthdays, pet names, or common words.',
      'Never reuse passwords across multiple accounts. If one service is breached, reused credentials give attackers access to your other accounts through credential stuffing attacks.',
      'Use a reputable password manager to generate and store unique passwords for every account. Enable multi-factor authentication (MFA) wherever possible to add an additional verification layer beyond your password.',
    ],
    sections: [
      {
        heading: 'Why Passwords Matter',
        paragraphs: [
          'A strong password is your first line of defense against unauthorized access. Weak passwords remain one of the most common entry points for attackers, making password hygiene essential for both personal and organizational security.',
        ],
      },
      {
        heading: 'Building a Strong Password',
        paragraphs: [
          'A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special characters. Avoid using easily guessable information such as birthdays, pet names, or common words.',
        ],
      },
      {
        heading: 'Never Reuse Passwords',
        paragraphs: [
          'Never reuse passwords across multiple accounts. If one service is breached, reused credentials give attackers access to your other accounts through credential stuffing attacks.',
        ],
      },
      {
        heading: 'Password Managers and MFA',
        paragraphs: [
          'Use a reputable password manager to generate and store unique passwords for every account. Enable multi-factor authentication (MFA) wherever possible to add an additional verification layer beyond your password.',
        ],
      },
    ],
    keyTakeaways: [
      'Use passwords of at least 12 characters with mixed character types.',
      'Never reuse passwords across accounts.',
      'Use a password manager for unique credentials on every service.',
      'Enable MFA wherever it is available.',
    ],
    tags: ['passwords', 'security', 'best-practices'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-3',
    title: 'Two-Factor Authentication Explained',
    category: 'Identity & Accounts',
    type: 'article',
    difficulty: 'Beginner',
    description: 'Understand what 2FA is and how it adds an extra layer of security.',
    author: 'GuardUp Team',
    date: '2024-03-05',
    readTime: '6 min',
    content: 'Two-factor authentication (2FA) is a security method that requires two different forms of identification.',
    fullContent: [
      'Two-factor authentication (2FA) is a security method that requires two different forms of identification before granting access to an account or system. Even if an attacker obtains your password, they still cannot log in without the second factor.',
      'The three common categories of authentication factors are: something you know (password or PIN), something you have (phone, hardware token, or authenticator app), and something you are (biometric data like fingerprint or face recognition).',
      'Authenticator apps such as Google Authenticator or Microsoft Authenticator are more secure than SMS-based codes, as SIM-swapping attacks can intercept text messages. Hardware security keys provide the strongest protection for high-value accounts.',
      'Enable 2FA on your email, banking, social media, and work accounts immediately. Your email account is especially critical since it is often used to reset passwords for other services.',
    ],
    sections: [
      {
        heading: 'What Is Two-Factor Authentication?',
        paragraphs: [
          'Two-factor authentication (2FA) is a security method that requires two different forms of identification before granting access to an account or system. Even if an attacker obtains your password, they still cannot log in without the second factor.',
        ],
      },
      {
        heading: 'Types of Authentication Factors',
        paragraphs: [
          'The three common categories of authentication factors are: something you know (password or PIN), something you have (phone, hardware token, or authenticator app), and something you are (biometric data like fingerprint or face recognition).',
        ],
      },
      {
        heading: 'Choosing the Right 2FA Method',
        paragraphs: [
          'Authenticator apps such as Google Authenticator or Microsoft Authenticator are more secure than SMS-based codes, as SIM-swapping attacks can intercept text messages. Hardware security keys provide the strongest protection for high-value accounts.',
        ],
      },
      {
        heading: 'Where to Enable 2FA First',
        paragraphs: [
          'Enable 2FA on your email, banking, social media, and work accounts immediately. Your email account is especially critical since it is often used to reset passwords for other services.',
        ],
      },
    ],
    keyTakeaways: [
      '2FA requires two separate proofs of identity before granting access.',
      'Authenticator apps are more secure than SMS-based verification codes.',
      'Hardware security keys offer the strongest protection for critical accounts.',
      'Prioritize 2FA on email, banking, and work accounts.',
    ],
    tags: ['2fa', 'authentication', 'security'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-4',
    title: 'Network Security Fundamentals',
    category: 'Network Security',
    type: 'article',
    difficulty: 'Intermediate',
    description: 'Key concepts in network security including firewalls, VPNs, and secure protocols.',
    author: 'GuardUp Team',
    date: '2024-04-01',
    readTime: '8 min',
    content: 'Network security involves protecting the integrity, confidentiality, and accessibility of computer networks.',
    fullContent: [
      'Network security involves protecting the integrity, confidentiality, and accessibility of computer networks and data using both hardware and software technologies. Every organization needs network security to protect against the growing landscape of cyber threats.',
      'Firewalls act as a barrier between trusted internal networks and untrusted external networks. They inspect incoming and outgoing traffic based on predefined security rules and block suspicious connections.',
      'Virtual Private Networks (VPNs) create encrypted tunnels for data traveling over public networks, protecting sensitive information from interception. Always use a VPN when connecting to public Wi-Fi or accessing corporate resources remotely.',
      'Secure protocols such as HTTPS, SFTP, and TLS should be used instead of their unencrypted counterparts. Network segmentation divides a network into smaller zones to limit the spread of attacks if one segment is compromised.',
    ],
    sections: [
      {
        heading: 'Network Security Overview',
        paragraphs: [
          'Network security involves protecting the integrity, confidentiality, and accessibility of computer networks and data using both hardware and software technologies. Every organization needs network security to protect against the growing landscape of cyber threats.',
        ],
      },
      {
        heading: 'Firewalls and Perimeter Defense',
        paragraphs: [
          'Firewalls act as a barrier between trusted internal networks and untrusted external networks. They inspect incoming and outgoing traffic based on predefined security rules and block suspicious connections.',
        ],
      },
      {
        heading: 'VPNs and Remote Access',
        paragraphs: [
          'Virtual Private Networks (VPNs) create encrypted tunnels for data traveling over public networks, protecting sensitive information from interception. Always use a VPN when connecting to public Wi-Fi or accessing corporate resources remotely.',
        ],
      },
      {
        heading: 'Secure Protocols and Segmentation',
        paragraphs: [
          'Secure protocols such as HTTPS, SFTP, and TLS should be used instead of their unencrypted counterparts. Network segmentation divides a network into smaller zones to limit the spread of attacks if one segment is compromised.',
        ],
      },
    ],
    keyTakeaways: [
      'Firewalls filter traffic between trusted and untrusted networks.',
      'VPNs encrypt data in transit over public networks.',
      'Always prefer encrypted protocols like HTTPS and TLS.',
      'Network segmentation limits the blast radius of a breach.',
    ],
    tags: ['networking', 'firewall', 'vpn'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-5',
    title: 'Data Privacy: What You Need to Know',
    category: 'Data Protection',
    type: 'article',
    difficulty: 'Intermediate',
    description: 'Learn about data privacy laws, best practices, and how to protect your personal information.',
    author: 'GuardUp Team',
    date: '2024-05-15',
    readTime: '9 min',
    content: 'Data privacy is the right of individuals to have control over how their personal information is collected and used.',
    fullContent: [
      'Data privacy is the right of individuals to have control over how their personal information is collected, stored, and used. With increasing amounts of personal data being collected by organizations, understanding privacy rights has never been more important.',
      'Regulations such as GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act) give individuals rights to access, correct, and delete their personal data. Organizations must obtain explicit consent before collecting sensitive information.',
      'Minimize the amount of personal data you share online. Review privacy settings on social media platforms, be cautious about app permissions on mobile devices, and think twice before providing information to websites or services.',
      'When handling data at work, follow your organization\'s data classification policies. Never store sensitive customer or employee data on personal devices or unauthorized cloud services. Report any suspected data breaches immediately.',
    ],
    sections: [
      {
        heading: 'Understanding Data Privacy',
        paragraphs: [
          'Data privacy is the right of individuals to have control over how their personal information is collected, stored, and used. With increasing amounts of personal data being collected by organizations, understanding privacy rights has never been more important.',
        ],
      },
      {
        heading: 'Privacy Regulations',
        paragraphs: [
          'Regulations such as GDPR (General Data Protection Regulation) and CCPA (California Consumer Privacy Act) give individuals rights to access, correct, and delete their personal data. Organizations must obtain explicit consent before collecting sensitive information.',
        ],
      },
      {
        heading: 'Protecting Your Personal Data',
        paragraphs: [
          'Minimize the amount of personal data you share online. Review privacy settings on social media platforms, be cautious about app permissions on mobile devices, and think twice before providing information to websites or services.',
        ],
      },
      {
        heading: 'Data Handling at Work',
        paragraphs: [
          'When handling data at work, follow your organization\'s data classification policies. Never store sensitive customer or employee data on personal devices or unauthorized cloud services. Report any suspected data breaches immediately.',
        ],
      },
    ],
    keyTakeaways: [
      'Privacy laws give individuals rights over their personal data.',
      'Share the minimum personal data necessary online.',
      'Review app permissions and social media privacy settings regularly.',
      'Follow workplace data classification and reporting policies.',
    ],
    tags: ['privacy', 'gdpr', 'data-protection'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-6',
    title: 'Understanding Advanced Persistent Threats',
    category: 'Threat Intelligence',
    type: 'article',
    difficulty: 'Advanced',
    description: 'APTs are sophisticated, prolonged cyberattacks often by nation-state actors.',
    author: 'GuardUp Team',
    date: '2024-06-10',
    readTime: '10 min',
    content: 'Advanced Persistent Threats (APTs) are a type of cyberattack where an unauthorized user gains access to a network and remains undetected.',
    fullContent: [
      'Advanced Persistent Threats (APTs) are sophisticated, long-term cyberattacks where an unauthorized actor gains access to a network and remains undetected for an extended period. APTs are typically carried out by well-resourced groups, including nation-state actors and organized cybercrime syndicates.',
      'Unlike opportunistic attacks, APTs are highly targeted. Attackers spend weeks or months researching their targets, crafting custom malware, and establishing multiple footholds within the network to maintain persistence even if one entry point is discovered.',
      'Common APT tactics include spear phishing to gain initial access, exploiting zero-day vulnerabilities, lateral movement through the network, and data exfiltration over encrypted channels to avoid detection.',
      'Defense against APTs requires a layered security strategy: endpoint detection and response (EDR), network monitoring, threat intelligence feeds, regular penetration testing, and continuous security awareness training for all employees.',
    ],
    sections: [
      {
        heading: 'What Are APTs?',
        paragraphs: [
          'Advanced Persistent Threats (APTs) are sophisticated, long-term cyberattacks where an unauthorized actor gains access to a network and remains undetected for an extended period. APTs are typically carried out by well-resourced groups, including nation-state actors and organized cybercrime syndicates.',
        ],
      },
      {
        heading: 'How APT Campaigns Operate',
        paragraphs: [
          'Unlike opportunistic attacks, APTs are highly targeted. Attackers spend weeks or months researching their targets, crafting custom malware, and establishing multiple footholds within the network to maintain persistence even if one entry point is discovered.',
        ],
      },
      {
        heading: 'Common APT Tactics',
        paragraphs: [
          'Common APT tactics include spear phishing to gain initial access, exploiting zero-day vulnerabilities, lateral movement through the network, and data exfiltration over encrypted channels to avoid detection.',
        ],
      },
      {
        heading: 'Defending Against APTs',
        paragraphs: [
          'Defense against APTs requires a layered security strategy: endpoint detection and response (EDR), network monitoring, threat intelligence feeds, regular penetration testing, and continuous security awareness training for all employees.',
        ],
      },
    ],
    keyTakeaways: [
      'APTs are long-term, targeted attacks by well-resourced adversaries.',
      'Attackers establish multiple footholds to maintain persistent access.',
      'Spear phishing and zero-day exploits are common initial access methods.',
      'Layered detection, monitoring, and training are essential defenses.',
    ],
    tags: ['apt', 'threats', 'advanced'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-7',
    title: 'Penetration Testing: A Beginner\'s Guide',
    category: 'Ethical Hacking',
    type: 'article',
    difficulty: 'Advanced',
    description: 'Introduction to ethical hacking and penetration testing principles.',
    author: 'GuardUp Team',
    date: '2024-07-01',
    readTime: '8 min',
    content: 'Penetration testing, or pen testing, is a simulated cyberattack against your computer system to check for exploitable vulnerabilities.',
    fullContent: [
      'Penetration testing, or pen testing, is a simulated cyberattack against a computer system, network, or application to identify exploitable vulnerabilities before real attackers can find them. Ethical hackers conduct these tests with explicit authorization from the system owner.',
      'Pen tests follow a structured methodology: reconnaissance (gathering information about the target), scanning (identifying open ports and services), gaining access (exploiting vulnerabilities), maintaining access (testing persistence), and reporting findings with remediation recommendations.',
      'There are several types of pen tests: black box (tester has no prior knowledge), white box (full system knowledge provided), and gray box (partial knowledge). External tests focus on internet-facing assets; internal tests simulate an attacker who has already breached the perimeter.',
      'Regular penetration testing is a critical component of a mature security program. Findings should be prioritized by risk level and remediated promptly. Many compliance frameworks, including PCI-DSS and SOC 2, require periodic pen testing.',
    ],
    sections: [
      {
        heading: 'What Is Penetration Testing?',
        paragraphs: [
          'Penetration testing, or pen testing, is a simulated cyberattack against a computer system, network, or application to identify exploitable vulnerabilities before real attackers can find them. Ethical hackers conduct these tests with explicit authorization from the system owner.',
        ],
      },
      {
        heading: 'The Pen Test Methodology',
        paragraphs: [
          'Pen tests follow a structured methodology: reconnaissance (gathering information about the target), scanning (identifying open ports and services), gaining access (exploiting vulnerabilities), maintaining access (testing persistence), and reporting findings with remediation recommendations.',
        ],
      },
      {
        heading: 'Types of Pen Tests',
        paragraphs: [
          'There are several types of pen tests: black box (tester has no prior knowledge), white box (full system knowledge provided), and gray box (partial knowledge). External tests focus on internet-facing assets; internal tests simulate an attacker who has already breached the perimeter.',
        ],
      },
      {
        heading: 'Why Pen Testing Matters',
        paragraphs: [
          'Regular penetration testing is a critical component of a mature security program. Findings should be prioritized by risk level and remediated promptly. Many compliance frameworks, including PCI-DSS and SOC 2, require periodic pen testing.',
        ],
      },
    ],
    keyTakeaways: [
      'Pen testing simulates real attacks to find vulnerabilities before adversaries do.',
      'Tests follow structured phases from reconnaissance to reporting.',
      'Black, white, and gray box tests offer different levels of tester knowledge.',
      'Regular pen testing supports compliance and risk reduction.',
    ],
    tags: ['pentesting', 'ethical-hacking', 'security'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-8',
    title: 'Phishing Awareness: Recognizing the Hook',
    category: 'Phishing',
    type: 'article',
    difficulty: 'Beginner',
    description: 'Learn to identify phishing emails, links, and messages before they compromise your accounts.',
    author: 'GuardUp Team',
    date: '2024-08-01',
    readTime: '8 min',
    content: 'Phishing is a social engineering attack that uses deceptive messages to steal credentials or deliver malware.',
    fullContent: [
      'Phishing is a social engineering attack that uses email, text messages, or other communication channels to trick you into revealing sensitive information, clicking malicious links, or downloading infected attachments. It remains one of the most common and successful attack methods because it targets human trust rather than technical flaws.',
      'Phishing messages often create a sense of urgency: your account will be closed, a payment failed, or a manager needs an immediate response. Attackers impersonate trusted brands, colleagues, or government agencies to lower your skepticism.',
      'Before clicking any link, hover over it to inspect the true destination. Look for misspelled domain names, generic greetings like "Dear Customer," and requests for passwords or financial details that legitimate organizations rarely make via email.',
      'If you suspect a phishing attempt, do not click links or open attachments. Report the message using your organization\'s phishing report button or forward it to your security team. When in doubt, contact the sender through a known, trusted channel.',
    ],
    sections: [
      {
        heading: 'What Is Phishing?',
        paragraphs: [
          'Phishing is a social engineering attack that uses email, text messages, or other communication channels to trick you into revealing sensitive information, clicking malicious links, or downloading infected attachments. It remains one of the most common and successful attack methods because it targets human trust rather than technical flaws.',
        ],
      },
      {
        heading: 'Common Phishing Tactics',
        paragraphs: [
          'Phishing messages often create a sense of urgency: your account will be closed, a payment failed, or a manager needs an immediate response. Attackers impersonate trusted brands, colleagues, or government agencies to lower your skepticism.',
        ],
      },
      {
        heading: 'Red Flags to Watch For',
        paragraphs: [
          'Before clicking any link, hover over it to inspect the true destination. Look for misspelled domain names, generic greetings like "Dear Customer," and requests for passwords or financial details that legitimate organizations rarely make via email.',
        ],
      },
      {
        heading: 'How to Respond Safely',
        paragraphs: [
          'If you suspect a phishing attempt, do not click links or open attachments. Report the message using your organization\'s phishing report button or forward it to your security team. When in doubt, contact the sender through a known, trusted channel.',
        ],
      },
    ],
    keyTakeaways: [
      'Phishing exploits trust and urgency to manipulate victims.',
      'Always verify links by hovering before clicking.',
      'Legitimate organizations rarely request passwords via email.',
      'Report suspicious messages rather than engaging with them.',
    ],
    tags: ['phishing', 'email', 'awareness'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-9',
    title: 'Social Engineering: The Human Attack Vector',
    category: 'Social Engineering',
    type: 'article',
    difficulty: 'Intermediate',
    description: 'Understand how attackers manipulate people into bypassing security controls.',
    author: 'GuardUp Team',
    date: '2024-08-15',
    readTime: '9 min',
    content: 'Social engineering attacks exploit human psychology rather than technical vulnerabilities.',
    fullContent: [
      'Social engineering attacks exploit human psychology rather than technical vulnerabilities. Attackers manipulate emotions such as fear, curiosity, authority, and helpfulness to convince victims to disclose information, grant access, or perform actions that compromise security.',
      'Common techniques include pretexting (creating a fabricated scenario), baiting (offering something enticing like a free USB drive), tailgating (following someone through a secure door), and vishing (voice phishing over the phone). Each technique relies on bypassing the victim\'s natural caution.',
      'Attackers often research targets on social media and professional networks to craft convincing messages. A message that references your manager, a recent project, or a conference you attended is far more believable than a generic scam.',
      'Defense starts with healthy skepticism. Verify unexpected requests through a separate communication channel. Follow established procedures for wire transfers, password resets, and access grants. Never share credentials or MFA codes with anyone, including IT support.',
    ],
    sections: [
      {
        heading: 'Psychology Over Technology',
        paragraphs: [
          'Social engineering attacks exploit human psychology rather than technical vulnerabilities. Attackers manipulate emotions such as fear, curiosity, authority, and helpfulness to convince victims to disclose information, grant access, or perform actions that compromise security.',
        ],
      },
      {
        heading: 'Common Techniques',
        paragraphs: [
          'Common techniques include pretexting (creating a fabricated scenario), baiting (offering something enticing like a free USB drive), tailgating (following someone through a secure door), and vishing (voice phishing over the phone). Each technique relies on bypassing the victim\'s natural caution.',
        ],
      },
      {
        heading: 'Targeted Attacks',
        paragraphs: [
          'Attackers often research targets on social media and professional networks to craft convincing messages. A message that references your manager, a recent project, or a conference you attended is far more believable than a generic scam.',
        ],
      },
      {
        heading: 'How to Protect Yourself',
        paragraphs: [
          'Defense starts with healthy skepticism. Verify unexpected requests through a separate communication channel. Follow established procedures for wire transfers, password resets, and access grants. Never share credentials or MFA codes with anyone, including IT support.',
        ],
      },
    ],
    keyTakeaways: [
      'Social engineering targets human trust, not software bugs.',
      'Pretexting, baiting, tailgating, and vishing are common techniques.',
      'Attackers use public information to personalize their approach.',
      'Always verify unusual requests through a separate trusted channel.',
    ],
    tags: ['social-engineering', 'pretexting', 'vishing'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-10',
    title: 'Email Security Best Practices',
    category: 'Phishing',
    type: 'article',
    difficulty: 'Beginner',
    description: 'Practical steps to keep your email account and communications secure.',
    author: 'GuardUp Team',
    date: '2024-09-01',
    readTime: '7 min',
    content: 'Email remains a primary communication tool and a primary attack vector for cybercriminals.',
    fullContent: [
      'Email remains one of the most widely used business communication tools and one of the most targeted attack vectors. Securing your email account protects not only your data but also your contacts, who could be targeted through your compromised account.',
      'Use a strong, unique password and enable multi-factor authentication on your email account. Your email is the recovery mechanism for most other online accounts, making it the highest-value target for attackers.',
      'Be cautious with attachments, especially executable files, macro-enabled documents, and compressed archives from unknown senders. Scan attachments with antivirus software before opening, even when they appear to come from known contacts whose accounts may be compromised.',
      'Configure email filtering and report suspicious messages to your security team. Avoid sending sensitive data via unencrypted email. Use approved secure file-sharing tools when exchanging confidential documents.',
    ],
    sections: [
      {
        heading: 'Why Email Security Matters',
        paragraphs: [
          'Email remains one of the most widely used business communication tools and one of the most targeted attack vectors. Securing your email account protects not only your data but also your contacts, who could be targeted through your compromised account.',
        ],
      },
      {
        heading: 'Protect Your Email Account',
        paragraphs: [
          'Use a strong, unique password and enable multi-factor authentication on your email account. Your email is the recovery mechanism for most other online accounts, making it the highest-value target for attackers.',
        ],
      },
      {
        heading: 'Handling Attachments Safely',
        paragraphs: [
          'Be cautious with attachments, especially executable files, macro-enabled documents, and compressed archives from unknown senders. Scan attachments with antivirus software before opening, even when they appear to come from known contacts whose accounts may be compromised.',
        ],
      },
      {
        heading: 'Secure Communication Habits',
        paragraphs: [
          'Configure email filtering and report suspicious messages to your security team. Avoid sending sensitive data via unencrypted email. Use approved secure file-sharing tools when exchanging confidential documents.',
        ],
      },
    ],
    keyTakeaways: [
      'Email accounts are high-value targets because they control password recovery.',
      'Enable MFA and use a unique password for your email.',
      'Treat unexpected attachments with caution, even from known senders.',
      'Use approved secure channels for sensitive data exchange.',
    ],
    tags: ['email', 'security', 'attachments'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-11',
    title: 'Ransomware: Prevention and Response',
    category: 'Malware & Ransomware',
    type: 'article',
    difficulty: 'Intermediate',
    description: 'Understand how ransomware works and what to do if your systems are affected.',
    author: 'GuardUp Team',
    date: '2024-09-15',
    readTime: '10 min',
    content: 'Ransomware encrypts your files and demands payment for the decryption key.',
    fullContent: [
      'Ransomware is a type of malware that encrypts files on a victim\'s system and demands payment—usually in cryptocurrency—in exchange for the decryption key. Modern ransomware groups also exfiltrate data before encryption, threatening to publish stolen information if the ransom is not paid.',
      'Ransomware typically enters systems through phishing emails, exploited vulnerabilities, compromised remote access credentials, or infected software downloads. Once inside, it spreads laterally across the network, encrypting files on connected systems and shared drives.',
      'Prevention requires a defense-in-depth approach: regular backups stored offline or in immutable storage, prompt patching of known vulnerabilities, network segmentation, endpoint protection, and security awareness training to reduce phishing success rates.',
      'If ransomware is detected, isolate affected systems immediately by disconnecting them from the network. Do not pay the ransom—it does not guarantee recovery and funds criminal operations. Contact your IT security team and follow your organization\'s incident response plan.',
    ],
    sections: [
      {
        heading: 'What Is Ransomware?',
        paragraphs: [
          'Ransomware is a type of malware that encrypts files on a victim\'s system and demands payment—usually in cryptocurrency—in exchange for the decryption key. Modern ransomware groups also exfiltrate data before encryption, threatening to publish stolen information if the ransom is not paid.',
        ],
      },
      {
        heading: 'How Ransomware Spreads',
        paragraphs: [
          'Ransomware typically enters systems through phishing emails, exploited vulnerabilities, compromised remote access credentials, or infected software downloads. Once inside, it spreads laterally across the network, encrypting files on connected systems and shared drives.',
        ],
      },
      {
        heading: 'Prevention Strategies',
        paragraphs: [
          'Prevention requires a defense-in-depth approach: regular backups stored offline or in immutable storage, prompt patching of known vulnerabilities, network segmentation, endpoint protection, and security awareness training to reduce phishing success rates.',
        ],
      },
      {
        heading: 'If You Are Affected',
        paragraphs: [
          'If ransomware is detected, isolate affected systems immediately by disconnecting them from the network. Do not pay the ransom—it does not guarantee recovery and funds criminal operations. Contact your IT security team and follow your organization\'s incident response plan.',
        ],
      },
    ],
    keyTakeaways: [
      'Ransomware encrypts files and may also steal data for double extortion.',
      'Phishing and unpatched vulnerabilities are common entry points.',
      'Maintain offline backups and patch systems promptly.',
      'Isolate infected systems and report incidents—do not pay ransoms.',
    ],
    tags: ['ransomware', 'malware', 'incident-response'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-12',
    title: 'Security Incident Response Basics',
    category: 'Incident Response',
    type: 'article',
    difficulty: 'Advanced',
    description: 'Learn the fundamental steps to detect, contain, and recover from security incidents.',
    author: 'GuardUp Team',
    date: '2024-10-01',
    readTime: '11 min',
    content: 'An effective incident response plan minimizes damage and recovery time when a security event occurs.',
    fullContent: [
      'A security incident is any event that compromises the confidentiality, integrity, or availability of information systems or data. Effective incident response minimizes damage, reduces recovery time, and helps organizations learn from each event to strengthen future defenses.',
      'The standard incident response lifecycle includes preparation, detection and analysis, containment, eradication, recovery, and post-incident review. Each phase has specific actions and responsible parties defined in advance through an incident response plan.',
      'When you suspect an incident, report it immediately to your security team or designated contact. Early reporting enables faster containment. Do not attempt to investigate or remediate on your own unless you are authorized to do so—well-intentioned actions can destroy forensic evidence.',
      'Document everything you observed: what happened, when you noticed it, what systems or data may be affected, and any actions you took. Preserve logs and avoid turning off or rebooting affected systems unless directed by your security team.',
    ],
    sections: [
      {
        heading: 'What Is a Security Incident?',
        paragraphs: [
          'A security incident is any event that compromises the confidentiality, integrity, or availability of information systems or data. Effective incident response minimizes damage, reduces recovery time, and helps organizations learn from each event to strengthen future defenses.',
        ],
      },
      {
        heading: 'The Incident Response Lifecycle',
        paragraphs: [
          'The standard incident response lifecycle includes preparation, detection and analysis, containment, eradication, recovery, and post-incident review. Each phase has specific actions and responsible parties defined in advance through an incident response plan.',
        ],
      },
      {
        heading: 'What to Do When You Suspect an Incident',
        paragraphs: [
          'When you suspect an incident, report it immediately to your security team or designated contact. Early reporting enables faster containment. Do not attempt to investigate or remediate on your own unless you are authorized to do so—well-intentioned actions can destroy forensic evidence.',
        ],
      },
      {
        heading: 'Documentation and Evidence Preservation',
        paragraphs: [
          'Document everything you observed: what happened, when you noticed it, what systems or data may be affected, and any actions you took. Preserve logs and avoid turning off or rebooting affected systems unless directed by your security team.',
        ],
      },
    ],
    keyTakeaways: [
      'Incident response follows defined phases from preparation through review.',
      'Report suspected incidents immediately to your security team.',
      'Unauthorized investigation can destroy critical forensic evidence.',
      'Document observations and preserve logs for the response team.',
    ],
    tags: ['incident-response', 'ir', 'security-operations'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'art-13',
    title: 'Staying Safe on Public Wi-Fi',
    category: 'Privacy & Safe Browsing',
    type: 'article',
    difficulty: 'Beginner',
    description: 'Protect your data when connecting to public wireless networks.',
    author: 'GuardUp Team',
    date: '2024-10-15',
    readTime: '6 min',
    content: 'Public Wi-Fi networks are convenient but often lack adequate security protections.',
    fullContent: [
      'Public Wi-Fi networks in cafes, airports, hotels, and other locations are convenient but often lack adequate security. Attackers on the same network can intercept unencrypted traffic, launch man-in-the-middle attacks, or set up rogue access points that mimic legitimate network names.',
      'Avoid accessing sensitive accounts or transmitting confidential data over public Wi-Fi without protection. If you must connect, use a trusted VPN to encrypt your traffic. Verify the network name with staff before connecting—attackers often create networks with similar names like "Airport_Free_WiFi" instead of the official "Airport-Guest-WiFi."',
      'Disable automatic Wi-Fi connection on your devices to prevent them from joining unknown networks without your knowledge. Turn off file sharing and ensure your firewall is enabled before connecting to any public network.',
      'Prefer using your mobile data connection or a personal hotspot for sensitive activities when public Wi-Fi is your only option. Keep your device\'s operating system and browser updated to protect against known vulnerabilities.',
    ],
    sections: [
      {
        heading: 'Risks of Public Wi-Fi',
        paragraphs: [
          'Public Wi-Fi networks in cafes, airports, hotels, and other locations are convenient but often lack adequate security. Attackers on the same network can intercept unencrypted traffic, launch man-in-the-middle attacks, or set up rogue access points that mimic legitimate network names.',
        ],
      },
      {
        heading: 'Connecting Safely',
        paragraphs: [
          'Avoid accessing sensitive accounts or transmitting confidential data over public Wi-Fi without protection. If you must connect, use a trusted VPN to encrypt your traffic. Verify the network name with staff before connecting—attackers often create networks with similar names like "Airport_Free_WiFi" instead of the official "Airport-Guest-WiFi."',
        ],
      },
      {
        heading: 'Device Settings',
        paragraphs: [
          'Disable automatic Wi-Fi connection on your devices to prevent them from joining unknown networks without your knowledge. Turn off file sharing and ensure your firewall is enabled before connecting to any public network.',
        ],
      },
      {
        heading: 'Safer Alternatives',
        paragraphs: [
          'Prefer using your mobile data connection or a personal hotspot for sensitive activities when public Wi-Fi is your only option. Keep your device\'s operating system and browser updated to protect against known vulnerabilities.',
        ],
      },
    ],
    keyTakeaways: [
      'Public Wi-Fi is often unencrypted and vulnerable to interception.',
      'Use a VPN and verify network names before connecting.',
      'Disable auto-connect and file sharing on public networks.',
      'Use mobile data for sensitive activities when possible.',
    ],
    tags: ['wifi', 'browsing', 'vpn', 'privacy'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'vid-1',
    title: 'Safe Browsing Habits',
    category: 'Privacy & Safe Browsing',
    type: 'video',
    difficulty: 'Beginner',
    description: 'A video guide on safe browsing practices and how to avoid online threats.',
    author: 'NCSC (UK)',
    date: '2024-01-20',
    readTime: '12 min',
    videoUrl: 'https://www.youtube.com/embed/C2aMb_10Lf0',
    externalVideoUrl: 'https://www.youtube.com/watch?v=C2aMb_10Lf0',
    content: 'Safe browsing habits are essential for protecting yourself from online threats.',
    summary: 'This NCSC training video covers how cyber attacks happen and practical steps for practicing good cyber hygiene at work and at home, including safe browsing practices.',
    fullContent: [
      'Safe browsing habits are essential for protecting yourself from online threats including malware, phishing, and drive-by downloads. Your web browser is one of the most frequently used applications and a primary attack vector.',
      'Always verify URLs before clicking links or entering credentials. Look for HTTPS (the padlock icon) on sites where you enter sensitive information. Be wary of shortened URLs that hide the true destination.',
      'Keep your browser and all extensions updated. Outdated software contains known vulnerabilities that attackers actively exploit. Only install browser extensions from trusted sources and review their permissions regularly.',
      'Use ad blockers and anti-tracking tools to reduce exposure to malicious advertisements. Avoid downloading files from untrusted websites, and never disable your browser\'s built-in security warnings without a compelling reason.',
    ],
    keyTakeaways: [
      'Verify URLs and look for HTTPS before entering sensitive information.',
      'Keep browsers and extensions updated to patch known vulnerabilities.',
      'Only install extensions from trusted sources.',
      'Avoid downloading files from untrusted websites.',
    ],
    tags: ['browsing', 'safe', 'video'],
    source: 'NCSC (UK National Cyber Security Centre)',
  },
  {
    id: 'vid-2',
    title: 'Malware Prevention and Protection',
    category: 'Malware & Ransomware',
    type: 'video',
    difficulty: 'Intermediate',
    description: 'Learn how to protect your systems from various types of malware and ransomware.',
    author: 'SANS Institute',
    date: '2024-03-15',
    readTime: '15 min',
    videoUrl: 'https://www.youtube.com/embed/9qzqMfqrd9U',
    externalVideoUrl: 'https://www.youtube.com/watch?v=9qzqMfqrd9U',
    content: 'Malware is malicious software designed to damage or gain unauthorized access to computer systems.',
    summary: 'SANS instructors discuss evolving ransomware trends, attacker methodologies, and practical defense strategies to help organizations detect, respond to, and prevent malware infections.',
    fullContent: [
      'Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems. Common types include viruses, worms, trojans, ransomware, spyware, and adware — each with distinct behaviors and delivery methods.',
      'Most malware enters systems through email attachments, malicious downloads, infected USB drives, or exploited software vulnerabilities. User awareness and cautious behavior are the most effective preventive measures.',
      'Install and maintain reputable antivirus and anti-malware software on all devices. Enable automatic updates for your operating system and applications to patch known vulnerabilities promptly.',
      'If you suspect a malware infection, disconnect the device from the network immediately, do not attempt to remove it yourself unless trained, and report the incident to your IT security team. Regular backups ensure you can recover without paying ransoms.',
    ],
    keyTakeaways: [
      'Malware enters through email, downloads, USB drives, and unpatched vulnerabilities.',
      'User awareness is one of the most effective preventive measures.',
      'Keep antivirus software and operating systems updated.',
      'Disconnect and report suspected infections immediately.',
    ],
    tags: ['malware', 'prevention', 'video', 'ransomware'],
    source: 'SANS Institute',
  },
  {
    id: 'vid-3',
    title: 'Zero-Day Exploits Explained',
    category: 'Threat Intelligence',
    type: 'video',
    difficulty: 'Advanced',
    description: 'Understanding zero-day vulnerabilities and how they are exploited by attackers.',
    author: 'GuardUp Team',
    date: '2024-06-15',
    readTime: '14 min',
    videoUnavailable: true,
    content: 'A zero-day exploit is a cyberattack that occurs on the same day a vulnerability is discovered.',
    summary: 'Zero-day exploits target software flaws that vendors have not yet patched. This resource provides written analysis of zero-day threats, defense strategies, and organizational preparedness.',
    fullContent: [
      'A zero-day exploit targets a software vulnerability that is unknown to the vendor and has no available patch. The term "zero-day" refers to the fact that developers have had zero days to fix the flaw when it is first exploited in the wild.',
      'Zero-day vulnerabilities are extremely valuable on the dark market and are often used in targeted attacks against high-value organizations, including government agencies, financial institutions, and technology companies.',
      'Defense strategies include defense-in-depth architecture, behavior-based detection systems that identify anomalous activity rather than known signatures, and rapid patch management processes to deploy fixes as soon as they become available.',
      'Organizations should participate in vulnerability disclosure programs and bug bounty initiatives to encourage responsible reporting of newly discovered flaws before they can be exploited maliciously.',
    ],
    keyTakeaways: [
      'Zero-day flaws have no patch available when first exploited.',
      'They are often used in targeted attacks against high-value targets.',
      'Behavior-based detection helps identify zero-day activity.',
      'Bug bounty programs encourage responsible vulnerability disclosure.',
    ],
    tags: ['zero-day', 'exploits', 'video'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'vid-4',
    title: 'Cybersecurity in the Cloud',
    category: 'Data Protection',
    type: 'video',
    difficulty: 'Advanced',
    description: 'Explore security considerations and best practices for cloud environments.',
    author: 'AWS',
    date: '2024-07-10',
    readTime: '8 min',
    videoUrl: 'https://www.youtube.com/embed/ESPBBEK-cvo',
    externalVideoUrl: 'https://www.youtube.com/watch?v=ESPBBEK-cvo',
    content: 'Cloud security involves policies, technologies, and controls deployed to protect data in the cloud.',
    summary: 'This AWS video explains the shared responsibility model—what cloud providers secure versus what customers must protect in cloud environments.',
    fullContent: [
      'Cloud security involves policies, technologies, and controls deployed to protect data, applications, and infrastructure in cloud computing environments. While cloud providers secure the underlying infrastructure, customers are responsible for securing their data and configurations.',
      'The shared responsibility model defines what the cloud provider protects versus what the customer must protect. Misconfigured cloud storage buckets, overly permissive access policies, and unencrypted data are among the most common cloud security failures.',
      'Implement identity and access management (IAM) with the principle of least privilege. Use multi-factor authentication for all cloud console access, enable logging and monitoring, and regularly audit permissions and configurations.',
      'Encrypt data both at rest and in transit. Use cloud-native security tools for threat detection, and ensure you understand data residency requirements for compliance with regulations applicable to your industry and geography.',
    ],
    keyTakeaways: [
      'Cloud providers secure the infrastructure; customers secure their data and configs.',
      'Misconfigured storage and access policies are common cloud failures.',
      'Apply least privilege and MFA for all cloud console access.',
      'Encrypt data at rest and in transit.',
    ],
    tags: ['cloud', 'security', 'video', 'aws'],
    source: 'Amazon Web Services',
  },
  {
    id: 'vid-5',
    title: 'Phishing: Email and Messaging Attacks',
    category: 'Phishing',
    type: 'video',
    difficulty: 'Beginner',
    description: 'SANS Security Awareness video on recognizing and avoiding phishing attacks.',
    author: 'SANS Institute',
    date: '2024-08-05',
    readTime: '5 min',
    videoUrl: 'https://www.youtube.com/embed/sEMrBKmUTPE',
    externalVideoUrl: 'https://www.youtube.com/watch?v=sEMrBKmUTPE',
    content: 'Phishing uses deceptive messages to trick you into clicking malicious links or revealing credentials.',
    summary: 'This SANS Security Awareness video explains how phishing works, common red flags to look for, and practical steps to avoid falling victim to email and messaging attacks.',
    fullContent: [
      'Phishing attacks use email or messaging services to trick you into taking an action such as opening an infected attachment or clicking a malicious link. Attackers send messages crafted to look authentic, often impersonating trusted sources or creating urgency.',
      'Common clues include extreme urgency, requests for sensitive information, generic greetings, offers that seem too good to be true, and sender addresses that do not match the claimed organization.',
      'Hover over links before clicking to verify the true destination. Be skeptical of unexpected messages, even when they appear to come from colleagues or well-known brands.',
      'When in doubt, contact the sender through a known trusted channel rather than replying to the suspicious message.',
    ],
    keyTakeaways: [
      'Phishing messages create urgency and impersonate trusted sources.',
      'Look for generic greetings and mismatched sender addresses.',
      'Hover over links to inspect destinations before clicking.',
      'Verify unexpected requests through a separate trusted channel.',
    ],
    tags: ['phishing', 'email', 'video', 'sans'],
    source: 'SANS Institute',
  },
  {
    id: 'vid-6',
    title: 'Social Engineering and Modern Phishing',
    category: 'Social Engineering',
    type: 'video',
    difficulty: 'Intermediate',
    description: 'How sophisticated social engineering techniques are used in modern phishing campaigns.',
    author: 'Ivanti',
    date: '2024-08-20',
    readTime: '45 min',
    videoUrl: 'https://www.youtube.com/embed/zIoE7iXq8wM',
    externalVideoUrl: 'https://www.youtube.com/watch?v=zIoE7iXq8wM',
    content: 'Modern phishing campaigns use AI and advanced social engineering to bypass traditional defenses.',
    summary: 'This webinar explores real-world examples of modern phishing attacks, where traditional training and tools fall short, and practical steps organizations can take to protect users from sophisticated social engineering.',
    fullContent: [
      'Today\'s phishing campaigns use sophisticated social engineering techniques and AI advances to trick even experienced users. Attackers craft messages that bypass traditional email filters and exploit psychological triggers.',
      'Multi-factor authentication is one of the most effective defenses—even if credentials are stolen, MFA prevents unauthorized access. Authenticator apps are preferred over SMS-based codes.',
      'Organizations should combine technical controls (email filtering, MFA, endpoint protection) with continuous security awareness training that covers evolving attack techniques.',
      'Users should treat every unexpected request for credentials, payments, or sensitive actions with skepticism, regardless of how authentic the message appears.',
    ],
    keyTakeaways: [
      'Modern phishing uses AI and social engineering to evade filters.',
      'MFA is critical even when passwords are compromised.',
      'Combine technical controls with ongoing awareness training.',
      'Verify all unexpected sensitive requests independently.',
    ],
    tags: ['social-engineering', 'phishing', 'video'],
    source: 'Ivanti',
  },
  {
    id: 'vid-7',
    title: 'Incident Response: What Every Employee Should Know',
    category: 'Incident Response',
    type: 'video',
    difficulty: 'Advanced',
    description: 'Guidance on recognizing security incidents and knowing when and how to report them.',
    author: 'GuardUp Team',
    date: '2024-09-20',
    readTime: '10 min',
    videoUnavailable: true,
    content: 'Every employee has a role in detecting and reporting security incidents promptly.',
    summary: 'Written guidance on recognizing security incidents, what to report, and how early reporting helps containment. A dedicated video resource is not currently available.',
    fullContent: [
      'Every employee is a sensor in the organization\'s security monitoring system. Unusual system behavior, unexpected password reset emails, unrecognized login alerts, or colleagues mentioning suspicious messages are all potential indicators of a security incident.',
      'When you suspect an incident, report it immediately using your organization\'s designated channel—whether that is a security hotline, email alias, or ticketing system. Do not wait to "be sure" before reporting; early notification enables faster containment.',
      'Do not attempt to fix the problem yourself unless you are part of the incident response team. Shutting down systems, deleting files, or running cleanup tools can destroy forensic evidence needed for investigation.',
      'Document what you observed: the time, affected systems, suspicious messages or behavior, and any actions you took. This information helps the response team assess scope and prioritize containment steps.',
    ],
    keyTakeaways: [
      'Employees are frontline sensors for security incidents.',
      'Report suspicious activity immediately—do not wait for certainty.',
      'Avoid unauthorized remediation that destroys forensic evidence.',
      'Document observations to support the response team.',
    ],
    tags: ['incident-response', 'reporting', 'video'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'vid-8',
    title: 'Phishing Delivery Methods Explained',
    category: 'Phishing',
    type: 'video',
    difficulty: 'Intermediate',
    description: 'Overview of how phishing content is delivered via email, SMS, voice, and QR codes.',
    author: 'GuardUp Team',
    date: '2024-10-05',
    readTime: '6 min',
    videoUrl: 'https://www.youtube.com/embed/yxawEFYfoco',
    externalVideoUrl: 'https://www.youtube.com/watch?v=yxawEFYfoco',
    content: 'Phishing attacks use multiple delivery channels beyond traditional email.',
    summary: 'This video explores various phishing delivery methods including email, SMS (smishing), voice calls (vishing), and QR code phishing (quishing), highlighting how attackers adapt to different communication channels.',
    fullContent: [
      'While email remains the most common phishing delivery channel, attackers also use SMS messages, voice phone calls, and QR codes to reach victims. Each channel has different security controls, making some harder to defend against than others.',
      'SMS phishing (smishing) sends malicious links via text message, often impersonating delivery services or banks. Voice phishing (vishing) uses phone calls to extract credentials or convince victims to install remote access software.',
      'QR code phishing embeds malicious URLs in scannable codes, often found in emails, posters, or parking meters. Scanning the code bypasses some email security filters because the malicious URL is hidden until scanned.',
      'Stay alert across all communication channels. Apply the same skepticism to text messages and phone calls that you apply to email. Never scan QR codes from untrusted sources.',
    ],
    keyTakeaways: [
      'Phishing extends beyond email to SMS, voice, and QR codes.',
      'Smishing and vishing exploit channels with fewer security controls.',
      'QR code phishing hides malicious URLs from email scanners.',
      'Apply consistent skepticism across all communication channels.',
    ],
    tags: ['phishing', 'smishing', 'vishing', 'video'],
    source: 'GuardUp Knowledge Base',
  },
  {
    id: 'pdf-1',
    title: 'GuardUp Cybersecurity Guide',
    category: 'Cybersecurity Basics',
    type: 'pdf',
    difficulty: 'Beginner',
    description: 'A comprehensive guide to cybersecurity basics.',
    author: 'GuardUp Team',
    date: '2024-01-01',
    readTime: '20 min',
    content: 'This guide covers essential cybersecurity concepts for beginners.',
    fullContent: [
      'This comprehensive guide covers essential cybersecurity concepts for beginners and serves as a reference for ongoing security awareness training. It is designed to help individuals and small teams build a strong security foundation.',
      'Chapter 1 covers threat landscapes including phishing, malware, social engineering, and insider threats. Chapter 2 addresses password security, multi-factor authentication, and secure account management practices.',
      'Chapter 3 explores safe email and web browsing habits. Chapter 4 discusses data protection, privacy regulations, and secure data handling procedures in the workplace.',
      'Chapter 5 provides incident response basics: how to recognize a security incident, who to report to, and what steps to take to limit damage. Regular review of this guide helps reinforce security habits and keeps awareness current.',
    ],
    tags: ['guide', 'fundamentals', 'pdf'],
    source: 'GuardUp Knowledge Base',
    fileUrl: '/assets/guides/cybersecurity-basics.pdf',
  },
];

export const knowledgeArticles = applyExpandedContent([
  ...baseResources,
  ...additionalResources,
  ...expandedKnowledgeResources,
  ...knowledgeBatchThree,
  ...advancedCertificationModules,
]);

export const getRelatedResources = (resourceId, limit = 3) => {
  const resource = knowledgeArticles.find((item) => item.id === resourceId);
  if (!resource) return [];

  return knowledgeArticles
    .filter((item) => {
      if (item.id === resourceId) return false;
      const sharedCategory = item.category === resource.category;
      const sharedTag = item.tags.some((tag) => resource.tags.includes(tag));
      return sharedCategory || sharedTag;
    })
    .slice(0, limit);
};

export const getKnowledgeCategories = () => {
  const categories = [...new Set(knowledgeArticles.map((resource) => resource.category))];
  return categories.sort();
};

export const matchesKnowledgeSearch = (resource, searchTerm) => {
  const query = searchTerm.trim().toLowerCase();
  if (!query) return true;

  return (
    resource.title.toLowerCase().includes(query)
    || resource.description.toLowerCase().includes(query)
    || resource.category.toLowerCase().includes(query)
    || (resource.difficulty && resource.difficulty.toLowerCase().includes(query))
    || resource.tags.some((tag) => tag.toLowerCase().includes(query))
  );
};

export const getKnowledgeResourceCounts = () => ({
  total: knowledgeArticles.length,
  articles: knowledgeArticles.filter((r) => r.type === 'article').length,
  videos: knowledgeArticles.filter((r) => r.type === 'video').length,
  pdfs: knowledgeArticles.filter((r) => r.type === 'pdf').length,
});
