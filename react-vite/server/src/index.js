import "dotenv/config.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import bp from "body-parser";
import express from "express";
import http from "http";

import typeDefs from "./schema.js";
import LaunchAPI from "./datasources/launch.js";
import UserAPI from "./datasources/user.js";
import resolvers from "./resolvers.js";
import createStore from "./store.js";

const app = express();
const httpServer = http.createServer(app);
const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  "/",
  cors(),
  bp.json(),
  expressMiddleware(server, {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          launchAPI: new LaunchAPI({ cache }),
          userAPI: new UserAPI(store),
        },
      };
    },
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
`);
