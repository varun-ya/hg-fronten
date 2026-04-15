// Payment Resolvers
module.exports = {
  Query: {
    myWallet: async () => ({ userId: '', balance: 0, totalEarned: 0, totalSpent: 0, pendingPayout: 0, transactions: [] }),
    payment: async () => ({}),
    myPayments: async () => [],
  },
  Mutation: {
    createPaymentOrder: async () => ({}),
    verifyPayment: async () => ({}),
  },
  Payment: {
    user: async () => ({}),
  },
  Wallet: {
    transactions: async () => [],
  },
};
