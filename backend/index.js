require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const mongoose = require("mongoose");
// TODO:Subscription new Post
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB Connect");
    return server.listen({ port: process.env.PORT });
  })
  .then((res) => console.log(`server running at ${res.url}`));
