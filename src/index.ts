import { ApolloServer, gql } from 'apollo-server';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import UserAPI from './datasource/user';
import ProjectAPI from './datasource/project';
import {PrismaClient} from '@prisma/client';


// import {createUserTable, createProjectTable, createAssignmentTable, addUser, addProject, addAssignment} from './utils'
// createUserTable();
// createProjectTable();
// createAssignmentTable();
//addUser('Farah Bennis', 'fbennis@zcorp.com', 'bbc123');
//addProject('Onboard New Developers', 'active');
//addAssignment('fbennis@zcorp.com', 1, 'Farah Bennis');



const store = new PrismaClient();

const dataSources = () => ({
    userAPI: new UserAPI({store}),
    projectAPI: new ProjectAPI({store})
})

const context = async ({req}: {req:any}) => {
    return null;
}

// const server = new ApolloServer({typeDefs, resolvers});
const server = new ApolloServer({typeDefs, resolvers, dataSources, context});

server.listen().then(({url}:{url: string}) => {
    console.log(`🚀  Server listening at ${url}`);
})

