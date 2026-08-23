const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');


let adminProfile = null;
let passwordHash = null;

const warnIfPasswordLineHasUnquotedHash = () => {
  try {
    const envPath = path.join(__dirname, '../../.env');
    if (!fs.existsSync(envPath)) return;

    const line = fs.readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .find((entry) => /^\s*ADMIN_PASSWORD=/.test(entry));

    if (!line) return;

    const valuePart = line.slice(line.indexOf('=') + 1).trim();
    const isQuoted = /^['"]/.test(valuePart);
    const hashIndex = valuePart.indexOf('#');

    if (!isQuoted && hashIndex > 0) {
      console.warn(
        '[admin-config] ADMIN_PASSWORD contains "#" but is not quoted in backend/.env. '
        + 'Dotenv treats # as a comment delimiter; wrap the password in double quotes.'
      );
    }
  } catch {
  }
};

const initAdminAccount = async () => {
  warnIfPasswordLineHasUnquotedHash();

  const hasEmail = Boolean(process.env.ADMIN_EMAIL?.trim());
  const hasPassword = Boolean(process.env.ADMIN_PASSWORD);

  console.log('[admin-config] ADMIN_EMAIL set:', hasEmail);
  console.log('[admin-config] ADMIN_PASSWORD set:', hasPassword);

  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn(
      '⚠️  Administrator account not configured. Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env'
    );
    adminProfile = null;
    passwordHash = null;
    return false;
  }

  passwordHash = await bcrypt.hash(password, 10);
  adminProfile = {
    id: 'guardup-administrator',
    email: email.toLowerCase(),
    firstName: process.env.ADMIN_FIRST_NAME?.trim() || 'GuardUP',
    lastName: process.env.ADMIN_LAST_NAME?.trim() || 'Administrator',
    role: 'ADMINISTRATOR',
  };

  console.log(`🔐 Administrator account ready for ${adminProfile.email}`);
  return true;
};

const isConfigured = () => Boolean(adminProfile && passwordHash);

const getProfile = () => (adminProfile ? { ...adminProfile } : null);

const validateCredentials = async (email, password) => {
  if (!isConfigured()) return false;
  const normalized = email?.toLowerCase?.()?.trim();
  if (!normalized || normalized !== adminProfile.email) return false;
  return bcrypt.compare(password, passwordHash);
};

module.exports = {
  initAdminAccount,
  isConfigured,
  getProfile,
  validateCredentials,
};
