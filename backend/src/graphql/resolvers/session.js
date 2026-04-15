// Session Resolvers
module.exports = {
  Query: {
    session: async () => ({}),
    mySessions: async () => [],
    upcomingSessions: async () => [],
  },
  Mutation: {
    scheduleSession: async () => ({}),
    updateSession: async () => ({}),
    cancelSession: async () => ({}),
    completeSession: async () => ({}),
  },
  Session: {
    tutor: async () => ({}),
    student: async () => ({}),
    notes: async () => [],
  },
};
