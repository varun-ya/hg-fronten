const { AuthenticationError, UserInputError } = require('apollo-server-lambda');
const { v4: uuidv4 } = require('uuid');
const StudentModel = require('../../models/Student');
const UserModel = require('../../models/User');
const TutorModel = require('../../models/Tutor');

const studentResolvers = {
  Query: {
    student: async (_, { id }) => {
      return await StudentModel.findById(id);
    },

    myStudentProfile: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await StudentModel.findByUserId(user.id);
    },

    searchTutors: async (_, { subject, minRating, maxPrice, location, limit = 20, offset = 0 }) => {
      return await TutorModel.search({
        subject,
        minRating,
        maxPrice,
        location,
        limit,
        offset,
      });
    },

    myStudentAnalytics: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      
      const student = await StudentModel.findByUserId(user.id);
      if (!student) throw new UserInputError('Student profile not found');

      // Calculate analytics
      const SessionModel = require('../../models/Session');
      const AssignmentModel = require('../../models/Assignment');

      const sessions = await SessionModel.findByStudentId(student.id);
      const assignments = await AssignmentModel.findByStudentId(student.id);

      const completedSessions = sessions.filter(s => s.status === 'COMPLETED');
      const completedAssignments = assignments.filter(a => a.status === 'GRADED');
      const pendingAssignments = assignments.filter(a => a.status === 'PENDING');

      const totalHours = completedSessions.reduce((sum, s) => sum + (s.duration / 60), 0);
      const averageScore = completedAssignments.length > 0
        ? completedAssignments.reduce((sum, a) => sum + parseFloat(a.grade || 0), 0) / completedAssignments.length
        : 0;

      // Weekly progress (last 4 weeks)
      const weeklyProgress = [];
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - (i * 7));
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);

        const weekSessions = completedSessions.filter(s => {
          const date = new Date(s.scheduledAt);
          return date >= weekStart && date < weekEnd;
        });

        weeklyProgress.push({
          week: `Week ${4 - i}`,
          sessions: weekSessions.length,
          hours: weekSessions.reduce((sum, s) => sum + (s.duration / 60), 0),
          score: averageScore,
        });
      }

      return {
        totalSessions: completedSessions.length,
        hoursLearned: totalHours,
        assignmentsCompleted: completedAssignments.length,
        assignmentsPending: pendingAssignments.length,
        averageScore,
        streak: student.streak || 0,
        xp: student.xp || 0,
        weeklyProgress,
      };
    },
  },

  Mutation: {
    completeStudentOnboarding: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      // Check if student profile already exists
      const existing = await StudentModel.findByUserId(user.id);
      if (existing) {
        throw new UserInputError('Student profile already exists');
      }

      // Create student profile
      const studentId = uuidv4();
      const student = await StudentModel.create({
        id: studentId,
        userId: user.id,
        ...input,
        xp: 0,
        streak: 0,
        sessionsCompleted: 0,
        hoursLearned: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return student;
    },

    updateStudentProfile: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');

      const student = await StudentModel.findByUserId(user.id);
      if (!student) {
        throw new UserInputError('Student profile not found');
      }

      const updated = await StudentModel.update(student.id, {
        ...input,
        updatedAt: new Date().toISOString(),
      });

      return updated;
    },
  },

  Student: {
    user: async (parent) => {
      return await UserModel.findById(parent.userId);
    },

    tutors: async (parent) => {
      const SessionModel = require('../../models/Session');
      const sessions = await SessionModel.findByStudentId(parent.id);
      const tutorIds = [...new Set(sessions.map(s => s.tutorId))];
      
      const tutors = await Promise.all(
        tutorIds.map(id => TutorModel.findById(id))
      );
      
      return tutors.filter(Boolean);
    },

    sessions: async (parent) => {
      const SessionModel = require('../../models/Session');
      return await SessionModel.findByStudentId(parent.id);
    },

    assignments: async (parent) => {
      const AssignmentModel = require('../../models/Assignment');
      return await AssignmentModel.findByStudentId(parent.id);
    },

    bookings: async (parent) => {
      const BookingModel = require('../../models/Booking');
      return await BookingModel.findByStudentId(parent.id);
    },
  },
};

module.exports = studentResolvers;
