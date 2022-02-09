"use strict";

const AWS = require("aws-sdk");

function setupDynamoDB() {
  if (!process.env.IS_LOCAL) return new AWS.DynamoDB.DocumentClient();

  const host = process.env.LOCALSTACK_HOST || "172.18.0.2";
  const port = process.env.DYNAMODB_PORT || "4566";
  console.log("running dynamodb locally!", host, port);
  return new AWS.DynamoDB({
    endpoint: new AWS.Endpoint(`http://${host}:${port}`),
  });
}

module.exports.hello = async (event) => {
  const dynamodb = setupDynamoDB();

  const heroes = await dynamodb
    .scan({
      TableName: process.env.HEROES_TABLE,
    })
    .promise();

  const skills = await dynamodb
    .scan({
      TableName: process.env.SKILLS_TABLE,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      skills,
      heroes,
    }),
  };
};
