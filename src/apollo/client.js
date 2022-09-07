import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const uri =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER_URI
    : process.env.REACT_APP_SERVER_URI_LOCAL;

const httpLink = createHttpLink({
  uri,
});
const authLink = setContext(() => {
  const token = window.sessionStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
