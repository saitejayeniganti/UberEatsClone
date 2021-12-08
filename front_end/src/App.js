import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { ApolloProvider } from "react-apollo";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:8080/graphql",
});

const client = new ApolloClient({
  link: link,
  cache: cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      partialRefetch: true,
    },
    query: {
      fetchPolicy: "no-cache",
      partialRefetch: true,
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <Routes />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
