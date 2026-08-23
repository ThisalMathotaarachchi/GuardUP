const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');


dotenv.config({ path: path.join(__dirname, '../.env') });

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const simulationRoutes = require('./routes/simulationRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const quizRoutes = require('./routes/quizRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./utils/errorHandler');
const prisma = require('./lib/prisma');
const { buildCorsOptions } = require('./config/cors');

const app = express();


app.use(cors(buildCorsOptions()));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/simulations', simulationRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);


app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: 'OK',
      message: 'GuardUp API is running',
      database: 'connected',
    });
  } catch {
    res.status(503).json({
      status: 'ERROR',
      message: 'Database unavailable',
      database: 'disconnected',
    });
  }
});


app.use(errorHandler);

module.exports = app;
