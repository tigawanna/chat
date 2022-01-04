import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import ws from 'ws';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
if (networkError) console.log(`[Network error]: ${networkError}`);
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true
  },
 
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
)

// const link = from([
//   errorLink,
//   new HttpLink({ uri: "http://localhost:4000/graphql" }),
// ]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

function MyApp({ Component, pageProps }: AppProps) {


  return (
  <ApolloProvider client={client}>
  <Component {...pageProps} />
  </ApolloProvider>
  )
}

export default MyApp
