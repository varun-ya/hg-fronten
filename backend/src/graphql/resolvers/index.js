const authResolvers = require('./auth');
const userResolvers = require('./user');
const studentResolvers = require('./student');
const tutorResolvers = require('./tutor');
const sessionResolvers = require('./session');
const bookingResolvers = require('./booking');
const messageResolvers = require('./message');
const paymentResolvers = require('./payment');
const assignmentResolvers = require('./assignment');
const noteResolvers = require('./note');
const { GraphQLDateTime, GraphQLJSON } = require('graphql-scalars');

const resolvers = {
  DateTime: GraphQLDateTime,
  JSON: GraphQLJSON,

  Query: {
    ...authResolvers.Query,
    ...userResolvers.Query,
    ...studentResolvers.Query,
    ...tutorResolvers.Query,
    ...sessionResolvers.Query,
    ...bookingResolvers.Query,
    ...messageResolvers.Query,
    ...paymentResolvers.Query,
    ...assignmentResolvers.Query,
    ...noteResolvers.Query,
  },

  Mutation: {
    ...authResolvers.Mutation,
    ...studentResolvers.Mutation,
    ...tutorResolvers.Mutation,
    ...sessionResolvers.Mutation,
    ...bookingResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...paymentResolvers.Mutation,
    ...assignmentResolvers.Mutation,
    ...noteResolvers.Mutation,
  },

  User: userResolvers.User,
  Student: studentResolvers.Student,
  Tutor: tutorResolvers.Tutor,
  Session: sessionResolvers.Session,
  Booking: bookingResolvers.Booking,
  Message: messageResolvers.Message,
  ChatThread: messageResolvers.ChatThread,
  Payment: paymentResolvers.Payment,
  Wallet: paymentResolvers.Wallet,
  Assignment: assignmentResolvers.Assignment,
  Note: noteResolvers.Note,
};

module.exports = resolvers;
