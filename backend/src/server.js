const app = require('./app');
const { initAdminAccount } = require('./services/adminAccountService');
const prisma = require('./lib/prisma');

const PORT = process.env.PORT || 5000;

const start = async () => {
  await initAdminAccount();

  app.listen(PORT, () => {
    console.log(`🚀 GuardUp server running on http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log('💾 Users are persisted in PostgreSQL (guardup_V2_DB)');
  });
};

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start().catch(async (err) => {
  console.error('Failed to start server:', err);
  await prisma.$disconnect();
  process.exit(1);
});
