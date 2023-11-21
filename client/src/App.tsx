import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
// import authService from "./utils/auth.js";
// import authService from "./utils/auth";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//The ApolloProvider allows for the useQuery and useMutation to be created and called
//so that we can fetch the data from the backend GraphQL Database
function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
