// Message Resolvers
module.exports = {
  Query: {
    myChats: async () => [],
    chatThread: async () => ({}),
    messages: async () => [],
  },
  Mutation: {
    sendMessage: async () => ({}),
    markMessageAsRead: async () => ({}),
  },
  Message: {
    sender: async () => ({}),
  },
  ChatThread: {
    participants: async () => [],
    lastMessage: async () => null,
  },
};
