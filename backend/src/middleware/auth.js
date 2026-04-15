const jwt = require('jsonwebtoken');

async function authenticate(token) {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    return null;
  }
}

function requireAuth(user) {
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

function requireRole(user, roles) {
  requireAuth(user);
  
  if (!roles.includes(user.role)) {
    throw new Error('Insufficient permissions');
  }
  
  return user;
}

module.exports = {
  authenticate,
  requireAuth,
  requireRole,
};
