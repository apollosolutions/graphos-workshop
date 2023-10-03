const cors = require("cors");
const bodyParser = require("body-parser");
const json = bodyParser;
const { expressMiddleware } = require("@apollo/server/express4");

const gql = require("graphql-tag");
const { readFileSync } = require("fs");
const { ApolloServer } = require("@apollo/server");
const { buildSubgraphSchema } = require("@apollo/subgraph");
const { ApolloServerPluginInlineTrace } = require("@apollo/server/plugin/inlineTrace");

const {  ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const { createServer } = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const { dbCollection } = require("./mongoClient");
const resolvers = require("./resolvers");
const ProductsAPI = require("./datasources/products-api");
const port = process.env.PORT ?? 4001;
const subgraphName = require("../package.json").name;

class ContextValue {
  constructor({ req, server }) {
    const { cache } = server;
    this.dataSources = {
      productsAPI: new ProductsAPI({ 
        cache,
        contextValue: this,
        collection: dbCollection
      })
    }
  }
}

async function main() {
  const typeDefs = gql(
    readFileSync("schema.graphql", {
      encoding: "utf-8",
    })
  );

  const app = express();
  const httpServer = createServer(app);

  const schema = buildSubgraphSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginInlineTrace,
      ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },
      ]
  });

  await server.start();
  app.use("/", cors(), json(), expressMiddleware(server,
    {
      context: async ({ req }) => new ContextValue({ req, server })
    }
  ));

  httpServer.listen(port, () => {
    console.log(`🚀 Subgraph ready at http://localhost:${port}/`);
    console.log(
      `In a new terminal, run 'rover dev --url http://localhost:${port} --name ${subgraphName}`
    );
  });
}

main();
