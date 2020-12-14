import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { devLogger } from './utils/constants';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { schema } from './schema';

const main = async () =>
{
    const app = express();
    const ws = createServer( app );
    const apolloServer = new ApolloServer( {
        schema: schema,

    } );
    apolloServer.applyMiddleware( { app } );

    const PORT = process.env.PORT || 5000;
    ws.listen( PORT, async () =>
    {
        devLogger( `Server started on port ${ PORT }` );
        SubscriptionServer.create( {
            execute,
            subscribe,
            schema: schema,
        }, {
            server: ws,
            path: '/graphql',
        } );
    } );
};

main().catch( err => devLogger( err ) );