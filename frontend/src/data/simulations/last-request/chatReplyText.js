
export const CHAT_REPLY_TEXT = {
  'share-mfa': "Sure — I'll send the code when it arrives.",
  'verify-portal': "I can't share MFA codes. Please submit through the official vendor portal.",
  'verify-manager': 'I need manager approval before any access changes.',
  'ignore-request': "I'm tied up right now — can we handle this later?",
  'share-code': "Here's the verification code.",
  'verify-request': 'Let me verify your contact details in the directory first.',
  'contact-it-directly': "I'll contact IT through the official help desk portal.",
  'report-impersonation': "This doesn't look right. I'm reporting this to Security.",
};

export const getChatReplyText = (optionId) => CHAT_REPLY_TEXT[optionId] || null;
