import type {Handler, HandlerEvent, HandlerContext} from '@netlify/functions';
import {getStripePaymentLinkUrl, CartItem} from "../../src/getStripePaymentLinkUrl";

declare var process: {
    env: {
        URL: string
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

    const successUrl = process.env.URL + '/success';

    const paymentLinkUrl = await getStripePaymentLinkUrl(cartItems, successUrl);

    return {
        statusCode: 200,
        body: JSON.stringify({redirectUrl: paymentLinkUrl}),
    };
};

export {handler};
