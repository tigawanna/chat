import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:4000/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function MyApp({ Component, pageProps }: AppProps) {


  return (
  <ApolloProvider client={client}>
  <Component {...pageProps} />
  </ApolloProvider>
  )
}

export default MyApp
