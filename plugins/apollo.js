import { HttpLink } from 'apollo-link-http'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

console.log('process.env.CONTENT_GRAPHQL_ENDPOINT: ' + process.env.CONTENT_GRAPHQL_ENDPOINT)

export default new ApolloClient({
  link: new HttpLink({ uri: process.env.CONTENT_API_ENDPOINT }),
  cache: new InMemoryCache()    // using a cache for blazingly fast subsequent queries
})