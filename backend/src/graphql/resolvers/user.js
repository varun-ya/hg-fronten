const UserModel = require('../../models/User');
const StudentModel = require('../../models/Student');
const TutorModel = require('../../models/Tutor');

const userResolvers = {
  Query: {
    user: async (_, { id }) => {
      return await UserModel.findById(id);
    },
  },

  User: {
    student: async (parent) => {
      if (parent.role !== 'STUDENT') return null;
      return await StudentModel.findByUserId(parent.id);
    },

    tutor: async (parent) => {
      if (parent.role !== 'TUTOR') return null;
      return await TutorModel.findByUserId(parent.id);
    },
  },
};

module.exports = userResolvers;
