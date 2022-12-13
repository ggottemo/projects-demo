import {ApolloClient, InMemoryCache, ApolloProvider, gql} from "@apollo/client";
import ACCESS_TOKEN from "./config.jsx";


const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
        authorization: `Bearer ${ACCESS_TOKEN}`
    }
});

const ApolloClientSetup = (props) => {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}

// Type definitions for Apollo Client query to view github repositories
const typeDefs = gql`
     type Query {
        viewer: Viewer
    }
    type Viewer {
        repositories(first: Int): RepositoryConnection
    }
    type RepositoryConnection {
        nodes: [Repository]
    }
    type Repository {
        name: String
        description: String
        url: String
        id: ID
    }
     type Project {
        name: String
        description: String
        url: String
        id: ID
     }
     
`
export default ApolloClientSetup