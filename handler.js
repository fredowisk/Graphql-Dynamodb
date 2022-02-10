"use strict";

const { ApolloServer, gql } = require("apollo-server-lambda");
const setupDynamoDBClient = require("./src/core/util/setupDynamoDB");
setupDynamoDBClient();

const HeroFactory = require("./src/core/factories/heroFactory");
const SkillFactory = require("./src/core/factories/skillFactory");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: "*",
      credentials: true,
    },
  },
});

async function main() {
  console.log("creating factories...");
  const skillFactory = await SkillFactory.createInstance();
  const heroFactory = await HeroFactory.createInstance();

  console.log("inserting skill item");
  const skillId = `${new Date().getTime()}`;
  await skillFactory.create({
    id: skillId,
    name: "magic",
    value: 50,
  });
  console.log("getting skill item");

  const skillItem = await skillFactory.findOne(skillId);
  console.log("skillItem", skillItem);

  const allSkills = await skillFactory.findAll();
  console.log("allSkills", allSkills);

  console.log("-------\n");

  console.log("getting hero item");

  const heroId = `${new Date().getTime()}`;
  await heroFactory.create({
    id: heroId,
    name: "Zatana",
    skills: [skillId],
  });

  const heroItem = await heroFactory.findOne(heroId);
  console.log("hero", heroItem);

  const allHeroes = await heroFactory.findAll();
  console.log("allHeroes", allHeroes);

  return {
    statusCode: 200,
    body: JSON.stringify({
      hero: {
        hero,
        allHeroes,
      },
      skills: {
        skill,
        allSkills,
      },
    }),
  };
}

module.exports.test = main;
