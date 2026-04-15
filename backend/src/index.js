const { ApolloServer } = require('@apollo/server');
const { startServerAndCreateLambdaHandler, handlers } = require('@as-integrations/aws-lambda');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const { authenticate } = require('./middleware/auth');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error) => {
    console.error('GraphQL Error:', error);
    return {
      message: error.message,
      code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
      path: error.path,
    };
  },
  introspection: process.env.STAGE !== 'prod',
  playground: process.env.STAGE !== 'prod',
});

exports.handler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async ({ event }) => {
      const token = event.headers?.authorization?.replace('Bearer ', '');
      const user = token ? await authenticate(token) : null;
      
      return {
        user,
        event,
      };
    },
  }
);
