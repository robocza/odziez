import type {Handler, HandlerEvent, HandlerContext} from '@netlify/functions';
import {getStripePaymentLinkUrl, CartItem} from "../../src/getStripePaymentLinkUrl";

declare var process: {
    env: {
        URL: string,
        DEPLOY_PRIME_URL: string, // @see https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
        CONTEXT: string // @see https://docs.netlify.com/site-deploys/overview/#deploy-contexts
    }
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const body = event.body;
    if (body === null) {
        return {
            statusCode: 400,
            body: "No data received."
        };
    }

    const cartItems: CartItem[] = JSON.parse(body);

    const successUrl = process.env.CONTEXT === 'production' ? process.env.URL + '/dziekujemy' : process.env.DEPLOY_PRIME_URL + '/dziekujemy';

    const paymentLinkUrl = await getStripePaymentLinkUrl(cartItems, successUrl);

    return {
        statusCode: 200,
        body: JSON.stringify({redirectUrl: paymentLinkUrl}),
    };
};

export {handler};
