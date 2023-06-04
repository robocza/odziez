import {getProductVariant} from "./productRepository";
import {stripeApi} from "./stripeApi";

export type CartItem = {
    id: string;
    size: string,
    quantity: number;
};

export async function getStripePaymentLinkUrl(cartItems: CartItem[], successUrl: string) {
    const lineItems = cartItems.map((cartItem) => {
        const variant = getProductVariant(cartItem.id, cartItem.size);

        return {
            price: variant.stripe.priceId,
            quantity: cartItem.quantity,
            adjustable_quantity: {
                enabled: true,
                minimum: 1,
                maximum: 100
            },
        };
    });

    const paymentLink = await stripeApi.paymentLinks.create({
        line_items: lineItems,
        shipping_address_collection: {
            allowed_countries: ['PL']
        },
        after_completion: {type: 'redirect', redirect: {url: successUrl}}
    });

    return paymentLink.url;
}
