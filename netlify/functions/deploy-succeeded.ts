import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const body = event.body;
    if (body === null) {
        return {
            statusCode: 400,
            body: 'No data received.',
        };
    }

    // @todo sync products from Stripe

    return {
        statusCode: 200,
    };
};

export { handler };
