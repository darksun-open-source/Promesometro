"use strict";

const aws = require("aws-sdk");
const uuid = require("uuid");
const dynamodb = new aws.DynamoDB.DocumentClient();
const table = "promesas";

module.exports.obtenerPromesasPorCategoria = async event => {
  var body = JSON.parse(event.body);

  var params = {
    TableName: table,
    // ProjectionExpression: "input_type, glucose_readout, time_stamp_str",

    FilterExpression: "#categoria = :categoria",
    ExpressionAttributeNames: {
      "#categoria": "categoria"
    },
    ExpressionAttributeValues: {
      ":categoria": body.categoria
    }

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
  } catch (error) {
    return {
      statusCode: 400,
      error: `Could not fetch: ${error.stack}`
    };
  }
};
