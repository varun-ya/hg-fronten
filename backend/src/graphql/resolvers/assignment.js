// Assignment Resolvers
module.exports = {
  Query: {
    assignment: async () => ({}),
    myAssignments: async () => [],
  },
  Mutation: {
    createAssignment: async () => ({}),
    submitAssignment: async () => ({}),
    gradeAssignment: async () => ({}),
  },
  Assignment: {
    tutor: async () => ({}),
    student: async () => ({}),
  },
};
