const { AuthenticationError, UserInputError } = require('apollo-server-lambda');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
const UserModel = require('../../models/User');
const { sendOTP, verifyOTPCode } = require('../../services/sms');
const { sendVerificationEmail } = require('../../services/email');

const authResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await UserModel.findById(user.id);
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const { email, phone, countryCode, password, role } = input;

      // Validate email
      if (!validator.isEmail(email)) {
        throw new UserInputError('Invalid email address');
      }

      // Validate password
      if (password.length < 6) {
        throw new UserInputError('Password must be at least 6 characters');
      }

      // Check if user exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        throw new UserInputError('Email already registered');
      }

      const existingPhone = await UserModel.findByPhone(phone);
      if (existingPhone) {
        throw new UserInputError('Phone number already registered');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const userId = uuidv4();
      const user = await UserModel.create({
        id: userId,
        email,
        phone,
        countryCode,
        password: hashedPassword,
        role,
        isEmailVerified: false,
        isPhoneVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return { token, user };
    },

    login: async (_, { email, password }) => {
      // Validate input
      if (!validator.isEmail(email)) {
        throw new UserInputError('Invalid email address');
      }

      // Find user
      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      // Verify password
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Invalid credentials');
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return { token, user };
    },

    sendOTP: async (_, { phone, countryCode }) => {
      try {
        const result = await sendOTP(phone, countryCode);
        return {
          success: true,
          message: 'OTP sent successfully',
          expiresAt: result.expiresAt,
        };
      } catch (error) {
        throw new Error(`Failed to send OTP: ${error.message}`);
      }
    },

    verifyOTP: async (_, { phone, countryCode, otp }) => {
      try {
        const isValid = await verifyOTPCode(phone, countryCode, otp);
        
        if (!isValid) {
          throw new UserInputError('Invalid or expired OTP');
        }

        // Update user phone verification status
        const user = await UserModel.findByPhone(phone);
        if (user) {
          await UserModel.update(user.id, { isPhoneVerified: true });
        }

        return {
          success: true,
          message: 'Phone verified successfully',
        };
      } catch (error) {
        throw new Error(`OTP verification failed: ${error.message}`);
      }
    },

    sendEmailVerification: async (_, { email }) => {
      if (!validator.isEmail(email)) {
        throw new UserInputError('Invalid email address');
      }

      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new UserInputError('User not found');
      }

      if (user.isEmailVerified) {
        throw new UserInputError('Email already verified');
      }

      try {
        const token = jwt.sign(
          { email, purpose: 'email-verification' },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        await sendVerificationEmail(email, token);

        return {
          success: true,
          message: 'Verification email sent',
        };
      } catch (error) {
        throw new Error(`Failed to send verification email: ${error.message}`);
      }
    },

    verifyEmail: async (_, { token }) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (decoded.purpose !== 'email-verification') {
          throw new UserInputError('Invalid verification token');
        }

        const user = await UserModel.findByEmail(decoded.email);
        if (!user) {
          throw new UserInputError('User not found');
        }

        await UserModel.update(user.id, { isEmailVerified: true });

        return {
          success: true,
          message: 'Email verified successfully',
        };
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          throw new UserInputError('Verification link expired');
        }
        throw new Error(`Email verification failed: ${error.message}`);
      }
    },
  },
};

module.exports = authResolvers;
