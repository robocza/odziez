import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { getStripePaymentLinkUrl, CartItem } from '../../src/getStripePaymentLinkUrl';

declare var process: {
    env: {
        URL: string;
    };
};

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const body = event.body;
    if (body === null) {
        return {
            statusCode: 400,
            body: 'No data received.',
        };
    }

    const cartItems: CartItem[] = JSON.parse(body);

    const siteUrl = extractSiteUrlFromContext(context) ?? process.env.URL;

    const successUrl = siteUrl + '/dziekujemy';

    const paymentLinkUrl = await getStripePaymentLinkUrl(cartItems, successUrl);

    return {
        statusCode: 200,
        body: JSON.stringify({ redirectUrl: paymentLinkUrl }),
    };
};

function extractSiteUrlFromContext(context: HandlerContext) {
    const clientContext = context.clientContext;
    if (clientContext === undefined) {
        return;
    }

    const data = clientContext.custom.netlify;
    if (data === undefined) {
        return;
    }

    const decodedData = JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
    if (decodedData.site_url === undefined) {
        return;
    }

    return decodedData.site_url;
}

export { handler };
