"use strict";

const aws = require("aws-sdk");
const uuid = require("uuid");
const dynamodb = new aws.DynamoDB.DocumentClient();
const table = "partidos";

module.exports.obtenerPartidos = async event => {
  var params = {
    TableName: table
  };

  try {
    const data = await dynamodb.scan(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(
        {
          data
        },
        null,
        2
      )
    };
    //return data;
    //return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    };
  }
};
