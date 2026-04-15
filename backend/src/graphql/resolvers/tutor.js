const { AuthenticationError, UserInputError } = require('apollo-server-lambda');
const { v4: uuidv4 } = require('uuid');
const TutorModel = require('../../models/Tutor');
const UserModel = require('../../models/User');
const StudentModel = require('../../models/Student');

const tutorResolvers = {
  Query: {
    tutor: async (_, { id }) => {
      return await TutorModel.findById(id);
    },

    myTutorProfile: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await TutorModel.findByUserId(user.id);
    },

    myStudents: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      const tutor = await TutorModel.findByUserId(user.id);
      if (!tutor) throw new UserInputError('Tutor profile not found');

      const SessionModel = require('../../models/Session');
      const sessions = await SessionModel.findByTutorId(tutor.id);
      const studentIds = [...new Set(sessions.map(s => s.studentId))];
      
      const students = await Promise.all(
        studentIds.map(id => StudentModel.findById(id))
      );
      
      return students.filter(Boolean);
    },

    demoRequests: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      const tutor = await TutorModel.findByUserId(user.id);
      if (!tutor) throw new UserInputError('Tutor profile not found');

      const BookingModel = require('../../models/Booking');
      return await BookingModel.findByTutorId(tutor.id, 'PENDING');
    },

    myTutorAnalytics: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      const tutor = await TutorModel.findByUserId(user.id);
      if (!tutor) throw new UserInputError('Tutor profile not found');

      const SessionModel = require('../../models/Session');
      const PaymentModel = require('../../models/Payment');

      const sessions = await SessionModel.findByTutorId(tutor.id);
      const payments = await PaymentModel.findByUserId(user.id);

      const completedSessions = sessions.filter(s => s.status === 'COMPLETED');
      const totalEarnings = payments
        .filter(p => p.status === 'COMPLETED')
        .reduce((sum, p) => sum + p.amount, 0);

      const now = new Date();
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisWeekStart = new Date(now);
      thisWeekStart.setDate(now.getDate() - now.getDay());

      const thisMonthEarnings = payments
        .filter(p => p.status === 'COMPLETED' && new Date(p.createdAt) >= thisMonthStart)
        .reduce((sum, p) => sum + p.amount, 0);

      const thisWeekEarnings = payments
        .filter(p => p.status === 'COMPLETED' && new Date(p.createdAt) >= thisWeekStart)
        .reduce((sum, p) => sum + p.amount, 0);

      // Weekly earnings (last 4 weeks)
      const weeklyEarnings = [];
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const weekPayments = payments.filter(p => {
          const date = new Date(p.createdAt);
          return p.status === 'COMPLETED' && date >= weekStart && date < weekEnd;
        });

        const weekSessions = completedSessions.filter(s => {
          const date = new Date(s.scheduledAt);
          return date >= weekStart && date < weekEnd;
        });

        weeklyEarnings.push({
          week: `Week ${4 - i}`,
          earnings: weekPayments.reduce((sum, p) => sum + p.amount, 0),
          sessions: weekSessions.length,
        });
      }

      return {
        totalEarnings,
        thisMonthEarnings,
        thisWeekEarnings,
        totalSessions: completedSessions.length,
        activeStudents: tutor.activeStudents || 0,
        rating: tutor.rating || 0,
        totalReviews: tutor.totalReviews || 0,
        weeklyEarnings,
      };
    },
  },

  Mutation: {
    completeTutorOnboarding: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      const existing = await TutorModel.findByUserId(user.id);
      if (existing) {
        throw new UserInputError('Tutor profile already exists');
      }

      const tutorId = uuidv4();
      const tutor = await TutorModel.create({
        id: tutorId,
        userId: user.id,
        ...input,
        isVerified: false,
        idVerified: false,
        bankVerified: false,
        qualificationTestPassed: false,
        rating: 0,
        totalReviews: 0,
        totalSessions: 0,
        totalEarnings: 0,
        activeStudents: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return tutor;
    },

    updateTutorProfile: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      const tutor = await TutorModel.findByUserId(user.id);
      if (!tutor) {
        throw new UserInputError('Tutor profile not found');
      }

      const updated = await TutorModel.update(tutor.id, {
        ...input,
        updatedAt: new Date().toISOString(),
      });

      return updated;
    },

    updateTutorAvailability: async (_, { availability }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      const tutor = await TutorModel.findByUserId(user.id);
      if (!tutor) {
        throw new UserInputError('Tutor profile not found');
      }

      const updated = await TutorModel.update(tutor.id, {
        availability,
        updatedAt: new Date().toISOString(),
      });

      return updated;
    },
  },

  Tutor: {
    user: async (parent) => {
      return await UserModel.findById(parent.userId);
    },

    students: async (parent) => {
      const SessionModel = require('../../models/Session');
      const sessions = await SessionModel.findByTutorId(parent.id);
      const studentIds = [...new Set(sessions.map(s => s.studentId))];
      
      const students = await Promise.all(
        studentIds.map(id => StudentModel.findById(id))
      );
      
      return students.filter(Boolean);
    },

    sessions: async (parent) => {
      const SessionModel = require('../../models/Session');
      return await SessionModel.findByTutorId(parent.id);
    },

    bookings: async (parent) => {
      const BookingModel = require('../../models/Booking');
      return await BookingModel.findByTutorId(parent.id);
    },
  },
};

module.exports = tutorResolvers;
