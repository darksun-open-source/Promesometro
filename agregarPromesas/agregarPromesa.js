"use strict";

const aws = require("aws-sdk");
const uuid = require("uuid");
const dynamodb = new aws.DynamoDB.DocumentClient();
const table = "promesas";

module.exports.agregarPromesa = async event => {
  var body = JSON.parse(event.body);

  var nombre = body.nombre;
  var candidato = body.candidato;
  var titulo = body.titulo;
  var descripcion = body.descripcion;
  var avance = body.avance;
  var categoria = body.categoria;
  var evidencia = body.evidencia;

  var params = {
    Item: {
      id: uuid.v1(),
      nombre: nombre,
      candidato: candidato,
      titulo: titulo,
      descripcion: descripcion,
      avance: Number.parseInt(avance),
      categoria: categoria,
      evidencia: evidencia
    },
    TableName: table
  };

  var r = dynamodb.put(params).promise();

  return r;
};
