import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
// ----- Import Apollo Client Here ----
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink
} from '@apollo/client';
// ------------------------------------


import theme from './theme.js';
import {ChakraProvider} from '@chakra-ui/react';
import { DEFAULT_ROUTER_URL } from './config';

const routerUrl = localStorage.getItem('router-url') || DEFAULT_ROUTER_URL;

const link = new HttpLink({
  uri: 'https://' + routerUrl
});

// ----- Configure the apollo client here ------
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  name: 'web-workshop-client',
  version: '0.1'
});
// ---------------------------------------------

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ChakraProvider>,
  document.getElementById('root')
);
