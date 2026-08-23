const parseCorsOrigins = () => {
  const configured = process.env.CORS_ORIGIN?.trim();
  if (configured) {
    return configured
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean);
  }

  if (process.env.NODE_ENV !== 'production') {
    return ['http://localhost:5173', 'http://127.0.0.1:5173'];
  }

  return [];
};

const buildCorsOptions = () => {
  const allowedOrigins = parseCorsOrigins();

  if (allowedOrigins.length === 0) {
    console.warn('[cors] No CORS_ORIGIN configured. Cross-origin browser requests will be blocked.');
  }

  return {
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
  };
};

module.exports = {
  buildCorsOptions,
  parseCorsOrigins,
};
