// Note Resolvers
module.exports = {
  Query: {
    note: async () => ({}),
    sessionNotes: async () => [],
  },
  Mutation: {
    createNote: async () => ({}),
    updateNote: async () => ({}),
    deleteNote: async () => true,
  },
  Note: {
    session: async () => ({}),
  },
};
