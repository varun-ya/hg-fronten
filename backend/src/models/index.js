const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const SESSIONS_TABLE = process.env.SESSIONS_TABLE;
const BOOKINGS_TABLE = process.env.BOOKINGS_TABLE;
const ASSIGNMENTS_TABLE = process.env.ASSIGNMENTS_TABLE;
const PAYMENTS_TABLE = process.env.PAYMENTS_TABLE;

// Session Model
class SessionModel {
  static async findByStudentId(studentId) {
    const params = {
      TableName: SESSIONS_TABLE,
      IndexName: 'StudentIdIndex',
      KeyConditionExpression: 'studentId = :studentId',
      ExpressionAttributeValues: { ':studentId': studentId },
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items || [];
  }

  static async findByTutorId(tutorId) {
    const params = {
      TableName: SESSIONS_TABLE,
      IndexName: 'TutorIdIndex',
      KeyConditionExpression: 'tutorId = :tutorId',
      ExpressionAttributeValues: { ':tutorId': tutorId },
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items || [];
  }
}

// Booking Model
class BookingModel {
  static async findByStudentId(studentId, status = null) {
    const params = {
      TableName: BOOKINGS_TABLE,
      IndexName: 'StudentIdIndex',
      KeyConditionExpression: 'studentId = :studentId',
      ExpressionAttributeValues: { ':studentId': studentId },
    };
    const result = await dynamoDB.query(params).promise();
    let items = result.Items || [];
    if (status) items = items.filter(b => b.status === status);
    return items;
  }

  static async findByTutorId(tutorId, status = null) {
    const params = {
      TableName: BOOKINGS_TABLE,
      IndexName: 'TutorIdIndex',
      KeyConditionExpression: 'tutorId = :tutorId',
      ExpressionAttributeValues: { ':tutorId': tutorId },
    };
    const result = await dynamoDB.query(params).promise();
    let items = result.Items || [];
    if (status) items = items.filter(b => b.status === status);
    return items;
  }
}

// Assignment Model
class AssignmentModel {
  static async findByStudentId(studentId) {
    const params = {
      TableName: ASSIGNMENTS_TABLE,
      IndexName: 'StudentIdIndex',
      KeyConditionExpression: 'studentId = :studentId',
      ExpressionAttributeValues: { ':studentId': studentId },
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items || [];
  }

  static async findByTutorId(tutorId) {
    const params = {
      TableName: ASSIGNMENTS_TABLE,
      IndexName: 'TutorIdIndex',
      KeyConditionExpression: 'tutorId = :tutorId',
      ExpressionAttributeValues: { ':tutorId': tutorId },
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items || [];
  }
}

// Payment Model
class PaymentModel {
  static async findByUserId(userId) {
    const params = {
      TableName: PAYMENTS_TABLE,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId },
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items || [];
  }
}

module.exports = {
  SessionModel,
  BookingModel,
  AssignmentModel,
  PaymentModel,
};
