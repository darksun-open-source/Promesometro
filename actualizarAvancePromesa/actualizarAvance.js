"use strict";

const aws = require("aws-sdk");
const uuid = require("uuid");
const dynamodb = new aws.DynamoDB.DocumentClient();
const table = "promesas";

module.exports.actualizarAvance = async event => {
  var body = JSON.parse(event.body);

  var promesaId = body.promesaId;
  var avance = body.avance;

  var params = {
    TableName: table,
    Key: {
      id: promesaId
    },
    UpdateExpression: "set #avance = :a",
    ExpressionAttributeValues:{
        ":a": avance
    },
    ExpressionAttributeNames: {
      "#avance": "avance"
    },
    ReturnValues:"UPDATED_NEW"
  };

  var r = await dynamodb.update(params).promise();
  console.log(r)

  return r;
};
