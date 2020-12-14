import { queryType } from '@nexus/schema';

export const Query = queryType( {
    definition ( t )
    {
        t.field( 'hello', {
            type: 'String',
            description: 'Greetings',
            resolve: () => 'worlds'
        } );
    }
} );