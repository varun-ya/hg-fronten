const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TUTORS_TABLE = process.env.TUTORS_TABLE;

class TutorModel {
  static async create(tutorData) {
    const params = {
      TableName: TUTORS_TABLE,
      Item: tutorData,
    };

    await dynamoDB.put(params).promise();
    return tutorData;
  }

  static async findById(id) {
    const params = {
      TableName: TUTORS_TABLE,
      Key: { id },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
  }

  static async findByUserId(userId) {
    const params = {
      TableName: TUTORS_TABLE,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items && result.Items.length > 0 ? result.Items[0] : null;
  }

  static async search({ subject, minRating, maxPrice, location, limit = 20, offset = 0 }) {
    const params = {
      TableName: TUTORS_TABLE,
      Limit: limit,
    };

    const result = await dynamoDB.scan(params).promise();
    let tutors = result.Items || [];

    // Filter by criteria
    if (subject) {
      tutors = tutors.filter(t => t.subjects && t.subjects.includes(subject));
    }
    if (minRating) {
      tutors = tutors.filter(t => t.rating >= minRating);
    }
    if (location) {
      tutors = tutors.filter(t => t.location && t.location.toLowerCase().includes(location.toLowerCase()));
    }

    return tutors.slice(offset, offset + limit);
  }

  static async update(id, updates) {
    const updateExpressions = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    Object.keys(updates).forEach((key, index) => {
      const attrName = `#attr${index}`;
      const attrValue = `:val${index}`;
      updateExpressions.push(`${attrName} = ${attrValue}`);
      expressionAttributeNames[attrName] = key;
      expressionAttributeValues[attrValue] = updates[key];
    });

    const params = {
      TableName: TUTORS_TABLE,
      Key: { id },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
  }
}

module.exports = TutorModel;
