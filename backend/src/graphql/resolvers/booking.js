// Booking Resolvers
module.exports = {
  Query: {
    booking: async () => ({}),
    myBookings: async () => [],
  },
  Mutation: {
    createBooking: async () => ({}),
    acceptBooking: async () => ({}),
    rejectBooking: async () => ({}),
  },
  Booking: {
    student: async () => ({}),
    tutor: async () => ({}),
  },
};
