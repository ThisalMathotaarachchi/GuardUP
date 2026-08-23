const userService = require('../services/userService');
const { getEvents } = require('../services/auditService');
const adminAccountService = require('../services/adminAccountService');
const adminAnalyticsService = require('../services/adminAnalyticsService');
const { toAdminUserSummary, toAdminUserDetail } = require('../utils/adminDto');

const { SIMULATION_CATALOG, CERTIFICATION_CATALOG } = adminAnalyticsService;

const mapSimulationOverview = (platform) =>
  SIMULATION_CATALOG.map((sim) => {
    const stats = platform.simulationById[sim.id] || {};
    return {
      ...sim,
      attempts: stats.attempts || 0,
      completions: stats.completions || 0,
      avgScore: stats.scoreCount > 0 ? Math.round(stats.totalScore / stats.scoreCount) : null,
    };
  });

const mapCertificationOverview = (platform) =>
  CERTIFICATION_CATALOG.map((cert) => ({
    ...cert,
    enrolled: platform.certById[cert.id]?.enrolled || 0,
    completed: platform.certById[cert.id]?.completed || 0,
  }));

exports.getDashboard = async (req, res, next) => {
  try {
    const [platform, recentUserRecords, recentActivity] = await Promise.all([
      adminAnalyticsService.getPlatformMetrics(),
      adminAnalyticsService.getRecentUsers(6),
      getEvents({ limit: 8 }),
    ]);

    const recentUsers = recentUserRecords.map(toAdminUserSummary);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers: platform.totalUsers,
          activeUsers: platform.activeUsers,
          certificationsCompleted: platform.certCompletions,
          simulationsCompleted: platform.totalSimulations,
          avgSimulationScore: platform.avgSimulationScore,
          badgesEarned: platform.badgesEarned,
        },
        registrationTrend: Object.entries(platform.registrationByMonth)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([month, count]) => ({ month, count })),
        simulationOverview: mapSimulationOverview(platform),
        certificationOverview: mapCertificationOverview(platform),
        recentUsers,
        recentActivity,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getStats = exports.getDashboard;

exports.getAllUsers = async (req, res, next) => {
  try {
    const { search, sort = 'newest' } = req.query;
    const users = (await adminAnalyticsService.getAdminUserList({ search, sort }))
      .map(toAdminUserSummary);

    res.status(200).json({
      success: true,
      data: { users, total: users.length },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: { user: toAdminUserDetail(user) },
    });
  } catch (error) {
    next(error);
  }
};

exports.getCertifications = async (req, res, next) => {
  try {
    const platform = await adminAnalyticsService.getPlatformMetrics();

    const certifications = CERTIFICATION_CATALOG.map((cert) => {
      const stats = platform.certById[cert.id] || { enrolled: 0, completed: 0 };
      const completionRate =
        stats.enrolled > 0 ? Math.round((stats.completed / stats.enrolled) * 100) : null;
      return {
        ...cert,
        enrolled: stats.enrolled,
        completed: stats.completed,
        completionRate,
      };
    });

    res.status(200).json({ success: true, data: { certifications } });
  } catch (error) {
    next(error);
  }
};

exports.getSimulations = async (req, res, next) => {
  try {
    const [platform, recent, levelCounts] = await Promise.all([
      adminAnalyticsService.getPlatformMetrics(),
      adminAnalyticsService.getRecentSimulationActivity(15),
      adminAnalyticsService.getUsersCompletedLevelCounts(),
    ]);

    const simulations = SIMULATION_CATALOG.map((sim) => {
      const stats = platform.simulationById[sim.id] || {};
      return {
        ...sim,
        attempts: stats.attempts || 0,
        completions: stats.completions || 0,
        usersCompletedLevel: levelCounts[sim.levelKey] || 0,
        avgScore: stats.scoreCount > 0 ? Math.round(stats.totalScore / stats.scoreCount) : null,
      };
    });

    res.status(200).json({
      success: true,
      data: { simulations, recentActivity: recent },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const platform = await adminAnalyticsService.getPlatformMetrics();

    const topBadges = Object.entries(platform.badgeById)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([id, count]) => ({ id, count }));

    res.status(200).json({
      success: true,
      data: {
        users: {
          total: platform.totalUsers,
          active: platform.activeUsers,
          registrationTrend: Object.entries(platform.registrationByMonth)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([month, count]) => ({ month, count })),
        },
        learning: {
          certCompletions: platform.certCompletions,
          certifications: CERTIFICATION_CATALOG.map((cert) => ({
            id: cert.id,
            title: cert.title,
            completed: platform.certById[cert.id]?.completed || 0,
            enrolled: platform.certById[cert.id]?.enrolled || 0,
          })),
        },
        simulations: {
          totalCompletions: platform.totalSimulations,
          avgScore: platform.avgSimulationScore,
          bySimulation: mapSimulationOverview(platform).map(({ id, title, attempts, completions, avgScore }) => ({
            id,
            title,
            attempts,
            completions,
            avgScore,
          })),
        },
        achievements: {
          totalBadges: platform.badgesEarned,
          topBadges,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getActivity = async (req, res, next) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 100, 200);
    const events = await getEvents({ limit });
    res.status(200).json({ success: true, data: { events } });
  } catch (error) {
    next(error);
  }
};

exports.getSettings = async (req, res, next) => {
  try {
    const userCount = await adminAnalyticsService.getUserCount();
    res.status(200).json({
      success: true,
      data: {
        administrator: req.admin,
        platform: {
          storage: 'postgresql',
          database: 'guardup_V2_DB',
          userCount,
          adminConfigured: adminAccountService.isConfigured(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
