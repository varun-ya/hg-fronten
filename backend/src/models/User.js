const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const USERS_TABLE = process.env.USERS_TABLE;

class UserModel {
  static async create(userData) {
    const params = {
      TableName: USERS_TABLE,
      Item: userData,
    };

    await dynamoDB.put(params).promise();
    return userData;
  }

  static async findById(id) {
    const params = {
      TableName: USERS_TABLE,
      Key: { id },
    };

    const result = await dynamoDB.get(params).promise();
    return result.Item;
  }

  static async findByEmail(email) {
    const params = {
      TableName: USERS_TABLE,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const result = await dynamoDB.query(params).promise();
    return result.Items && result.Items.length > 0 ? result.Items[0] : null;
  }

  static async findByPhone(phone) {
    const params = {
      TableName: USERS_TABLE,
      IndexName: 'PhoneIndex',
      KeyConditionExpression: 'phone = :phone',
      ExpressionAttributeValues: {
        ':phone': phone,
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
      TableName: USERS_TABLE,
      Key: { id },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDB.update(params).promise();
    return result.Attributes;
  }

  static async delete(id) {
    const params = {
      TableName: USERS_TABLE,
      Key: { id },
    };

    await dynamoDB.delete(params).promise();
    return true;
  }
}

module.exports = UserModel;
