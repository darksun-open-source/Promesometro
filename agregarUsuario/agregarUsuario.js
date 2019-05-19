"use strict";

const aws = require("aws-sdk");
const uuid = require("uuid");
const db = new aws.DynamoDB.DocumentClient();
const table = "usuario";


module.exports.agregarUsuario = async event => {

  const body = JSON.parse(event.body);

  var nombre = body.name;
  var correo = body.correo;
  var password = body.password;

  var params = {
    Item: {
      id: uuid.v1(),
      nombre: nombre,
      correo: correo,
      password: password
    },
    TableName: table
  };

  const usuarioAgregado = db.put(params).promise();

  return usuarioAgregado;
};