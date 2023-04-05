import {getProductVariant, ProductVariantOptionSize} from "./productRepository";
import {stripeApi} from "./stripeApi";

declare var process: {
    env: {
        STRIPE_SECRET_KEY: string
    }
}

export type CartItem = {
    id: string;
    size: ProductVariantOptionSize,
    quantity: number;
};

export async function getStripePaymentLinkUrl(cartItems: CartItem[]) {
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
        // after_completion: {type: 'redirect', redirect: {url: 'https://example.com'}} // @todo handle redirect on success
    });

    return paymentLink.url;
}
