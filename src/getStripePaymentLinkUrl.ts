import { getProductVariant } from './productRepository';
import { allEnabled as allEnabledShippingRates } from './shippingRateRepository';
import { stripeApi } from './stripeApi';

export type CartItem = {
    id: string;
    size: string;
    quantity: number;
};

export async function getStripePaymentLinkUrl(cartItems: CartItem[], successUrl: string, cancelUrl: string) {
    const lineItems = cartItems.map((cartItem) => {
        const variant = getProductVariant(cartItem.id, cartItem.size);

        return {
            price: variant.stripe.priceId,
            quantity: cartItem.quantity,
            adjustable_quantity: {
                enabled: true,
                minimum: 1,
                maximum: 100,
            },
        };
    });

    const shippingOptions = allEnabledShippingRates().map((shippingRate) => {
        return {
            shipping_rate: shippingRate.id,
        };
    });

    const paymentLink = await stripeApi.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        line_items: lineItems,
        shipping_address_collection: {
            allowed_countries: ['PL'],
        },
        shipping_options: shippingOptions,
        consent_collection: {
            terms_of_service: "required"
        },
        allow_promotion_codes: true,
        mode: "payment",
        tax_id_collection: {
            enabled: true,
        },
        automatic_tax: {
            enabled: false,
        },
    });

    return paymentLink.url;
}
