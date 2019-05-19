"use strict";

const aws = require("aws-sdk");
const uuid = require("uuid");
const dynamodb = new aws.DynamoDB.DocumentClient();
const table = "partidos";

module.exports.obtenerCandidatosPorPartido = async event => {
  var body = JSON.parse(event.body);

  var params = {
    TableName: table,
    ProjectionExpression: "candidatos",

    FilterExpression: "#nombre = :nombre",
    ExpressionAttributeNames: {
      "#nombre": "nombre"
    },
    ExpressionAttributeValues: {
      ":nombre": body.nombre
    }
  };

  try {
    const data = await dynamodb.scan(params).promise();
    console.log(data)
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
