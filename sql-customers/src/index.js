const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { startStandaloneServer } = require("@apollo/server/standalone");

const resolvers = require("./resolvers");
const CustomerDB = require("./datasources/customer-db");
const port = process.env.PORT ?? 4001;
const subgraphName = require("../package.json").name;
const knex = require("knex")

const knexConfig = {
  client: 'mysql',
  connection: {
    host: '34.75.163.58',
    port: 3306,
    user: 'workshop-user',
    password: 'federationworkshop1',
    database: 'customer'
  }
}

const db = new CustomerDB(knexConfig)

//class ContextValue {
//  constructor({ req, server }) {
//    const { cache } = server;
//    this.dataSources = {
//      customerDB: new CustomerDB(knexConfig)
//    }
//  }
//}

async function main() {
  const typeDefs = gql(
    readFileSync("schema.graphql", {
      encoding: "utf-8",
    })
  );

  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
    instrospection: true,
    dataSources: () => ({db})
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => new ContextValue({ req, server }),
    listen: {
      port 
    },
  });

  console.log(`🚀  Subgraph ready at ${url}`);
  console.log(
    `In a new terminal, run 'rover dev --url http://localhost:${port} --name ${subgraphName}`
  );
}

main();
