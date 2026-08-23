const prisma = require('../lib/prisma');

const MAX_EVENTS = 500;

const RESERVED_FIELDS = new Set(['actorType', 'userId', 'userEmail', 'summary']);

const toApiAuditEvent = (event) => ({
  id: event.id,
  type: event.type,
  timestamp: event.createdAt.toISOString(),
  actorType: event.actorType,
  ...(event.userId ? { userId: event.userId } : {}),
  ...(event.userEmail ? { userEmail: event.userEmail } : {}),
  ...(event.summary ? { summary: event.summary } : {}),
  ...(typeof event.payload === 'object' && event.payload !== null ? event.payload : {}),
});

const buildPayload = (payload = {}) => {
  const extra = {};

  Object.entries(payload).forEach(([key, value]) => {
    if (RESERVED_FIELDS.has(key)) return;
    extra[key] = value;
  });

  return Object.keys(extra).length > 0 ? extra : null;
};


const logEvent = async (type, payload = {}) => {
  try {
    const actorType = payload.actorType || 'user';
    const userId = payload.userId ?? null;
    const userEmail = payload.userEmail ?? payload.actorEmail ?? null;
    const summary = payload.summary ?? null;
    const eventPayload = buildPayload(payload);

    const created = await prisma.auditEvent.create({
      data: {
        type,
        actorType,
        userId,
        userEmail,
        summary,
        payload: eventPayload,
      },
    });

    return toApiAuditEvent(created);
  } catch (error) {
    console.error('Failed to write audit event:', error.message);
    return null;
  }
};

const getEvents = async ({ limit = 100, type, actorType } = {}) => {
  const cappedLimit = Math.min(Math.max(Number(limit) || 100, 1), MAX_EVENTS);

  const events = await prisma.auditEvent.findMany({
    where: {
      ...(type ? { type } : {}),
      ...(actorType ? { actorType } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: cappedLimit,
  });

  return events.map(toApiAuditEvent);
};

module.exports = { logEvent, getEvents, MAX_EVENTS };
