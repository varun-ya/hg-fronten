const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const STUDENTS_TABLE = process.env.STUDENTS_TABLE;

class StudentModel {
  static async create(studentData) {
    const params = {
      TableName: STUDENTS_TABLE,
      Item: studentData,
    };

    await dynamoDB.put(params).promise();
    return studentData;
  }

  static async findById(id) {
    const params = {
      TableName: STUDENTS_TABLE,
      Key: { id },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
  }

  static async findByUserId(userId) {
    const params = {
      TableName: STUDENTS_TABLE,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items && result.Items.length > 0 ? result.Items[0] : null;
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
      TableName: STUDENTS_TABLE,
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

module.exports = StudentModel;
