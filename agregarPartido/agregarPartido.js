'use strict';

const aws = require('aws-sdk');
const uuid = require('uuid');
const dynamodb = new aws.DynamoDB.DocumentClient();
const table = 'partidos'

module.exports.agregarPartido = async (event) => {
  var body = JSON.parse(event.body);

  var nombre = body.nombre;
  var imagen = body.imagen;

  var params = {
    Item: {
      "id": uuid.v1(),
      "nombre": nombre,
      "imagen": imagen,
      "candidatos": []
    },
    TableName: table
  };

  var r = dynamodb.put(params).promise();

  return r;
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event }; 
};

module.exports.listarTodo = async (event) => {
  var params = {
    TableName: table
  }

  try {
	  const data = await dynamodb.scan(params).promise();
	  return {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*"
        },
          body: JSON.stringify({
          	data
          }, null, 2),
          
        }
      //return { statusCode: 200, body: JSON.stringify(data) };
	} catch (error) {
	  return {
	    statusCode: 400,
	    error: `Could not fetch: ${error.stack}`
	  };
	}
}


module.exports.editarCandidatoPromesa = async (event) => {
  var id = event.queryStringParameters.id;
  var name = event.queryStringParameters.name;
  var partido = event.queryStringParameters.partido;
  var imagen = event.queryStringParameters.image;
  var tituloP = event.queryStringParameters.titulop;
  var descripcionP = event.queryStringParameters.descripcionP;
  var avance = event.queryStringParameters.avance;
  var categoria = event.queryStringParameters.categoria;

  console.log(id)
  console.log(name)
  var params = {
    TableName:table,
    Key:{
      "id": id
    },
    UpdateExpression: "set nombre = :nombre, partido = :partido, imagen = :imagen, tituloP = :tituloP, descripcionP = :descripcionP, avance = :avance, categoria = :categoria",
    ExpressionAttributeValues: {
      ":nombre": name,
      ":partido": partido,
      ":imagen": imagen,
      ":tituloP": tituloP,
      ":descripcionP": descripcionP,
      ":avance": avance,
      ":categoria": categoria
    },
    ReturnValues: "UPDATED_NEW"
  };
  dynamodb.update(params, function (err, data) {
    if (err) {
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
  });

}
