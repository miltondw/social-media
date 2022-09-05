import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import "./global.css";

import { AuthProvider } from "./context/auth";
import Routers from "./Routers.routes";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ApolloProvider client={client}>
        <Routers />
      </ApolloProvider>
    </AuthProvider>
  </React.StrictMode>
);
