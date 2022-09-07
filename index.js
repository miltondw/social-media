require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const mongoose = require("mongoose");
const { ApolloServerPluginLandingPageDisabled } = require("apollo-server-core");
// TODO:Subscription new Post
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  cache: "bounded",
  introspection: process.env.NODE_ENV === "production" ? true : false,
});
const URI = "mongodb://localhost:27017/socialmedia";

mongoose
  .connect(process.env.MONGODB_URI || URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connect");
    return server.listen({ port: process.env.PORT || 5000 });
  })
  .then((res) => console.log(`server running at ${res.url}`));
