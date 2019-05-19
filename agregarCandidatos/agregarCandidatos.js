"use strict";

const aws = require("aws-sdk");
const uuid = require("uuid");
const dynamodb = new aws.DynamoDB.DocumentClient();
const table = "partidos";

module.exports.agregarCandidato = async event => {
  var body = JSON.parse(event.body);

  var nombrePartido = body.nombrePartido;
  var nombre = body.nombre;
  var imagen = body.imagen;
  var rol = body.rol;

  var candidato = {
    nombre,
    imagen,
    rol
  }

  var params = {
    Key: { nombre: nombrePartido},
    ReturnValues: 'UPDATED_NEW',
    UpdateExpression: 'set #candidatos = list_append(if_not_exists(#candidatos, :empty_list), :candidato)',
    ExpressionAttributeNames: {
      '#candidatos': 'candidatos'
    },
    ExpressionAttributeValues: {
      ':candidato': [candidato],
      ':empty_list': []
    },
    TableName: table
  };

  var r = await dynamodb.update(params).promise();

  console.log(r)

  return r;
};

/* Item: {
  id: uuid.v1(),
  nombre: nombre,
  imagen: imagen,
  rol: rol
}, */