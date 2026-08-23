const isProduction = process.env.NODE_ENV === 'production';

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.stack);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'Origin not allowed',
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: isProduction ? 'Internal server error' : (err.message || 'Internal server error'),
  });
};

module.exports = errorHandler;