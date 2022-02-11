const { readdirSync } = require("fs");
const {
  makeExecutableSchema,
  mergeSchemas,
  gql,
} = require("apollo-server-lambda");

// 1º le o diretório
const schemas = readdirSync(__dirname)
  // ignora o arquivo index.js (este arquivo)
  .filter((file) => file !== "index.js")
  // faz o require de cada arquivo index.js (por padrão) de dentro das pastas, (hero, skill)
  .map((folder) => require(`./${folder}`))
  // cria um Schema do GraphQL juntando seus respectivos schemas e resolvers
  .map(({ schema, resolvers }) =>
    makeExecutableSchema({
      //gql serve para validar a string do schema e retornar no formato correto
      //não é obrigatório (mas é recomendado)
      typeDefs: gql(schema),
      resolvers,
    })
  );

/*
hero resolver
{
  Query: {getHero}
}
skill resolver
{
  Query: {getSkill}
}
skill + hero = substituição do conteudo de Query

mergeSchemas:
{
  Query: {
    getHero,
    getSkill
  }
}
*/

module.exports = mergeSchemas({
  schemas,
});
