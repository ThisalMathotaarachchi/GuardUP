const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { registerSchema, loginSchema } = require('../utils/validation');
const { logEvent } = require('../services/auditService');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.register = async (req, res, next) => {
  try {

    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password, firstName, lastName } = req.body;


    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await userService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });


    const { password: _, ...userWithoutPassword } = user;


    const token = generateToken(user.id);

    logEvent('user_registered', {
      actorType: 'user',
      userId: user.id,
      userEmail: user.email,
      summary: `New user registered: ${user.email}`,
    });

    res.status(201).json({
      success: true,
      data: { user: userWithoutPassword, token },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;


    const user = await userService.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }


    const { password: _, ...userWithoutPassword } = user;


    const token = generateToken(user.id);

    logEvent('user_login', {
      actorType: 'user',
      userId: user.id,
      userEmail: user.email,
      summary: `User signed in: ${user.email}`,
    });

    res.status(200).json({
      success: true,
      data: { user: userWithoutPassword, token },
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: { user: req.user },
    });
  } catch (error) {
    next(error);
  }
};
