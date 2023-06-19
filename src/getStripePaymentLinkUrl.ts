import { getProductVariant } from './productRepository';
import { allEnabled as allEnabledShippingRates } from './shippingRateRepository';
import { stripeApi } from './stripeApi';

export type CartItem = {
    id: string;
    size: string;
    quantity: number;
};

export async function getStripePaymentLinkUrl(cartItems: CartItem[], successUrl: string, cancelUrl: string) {
    const isCartValid = cartItems.every((cartItem) => {
        return cartItem.quantity > 0 && cartItem.quantity <= 100;
    });

    if (!isCartValid) {
        throw new Error('Cart is not valid.');
    }

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
        billing_address_collection: 'required',
        shipping_address_collection: {
            allowed_countries: ['PL'],
        },
        shipping_options: shippingOptions,
        consent_collection: {
            terms_of_service: 'required',
        },
        allow_promotion_codes: true,
        mode: 'payment',
        tax_id_collection: {
            enabled: true,
        },
        automatic_tax: {
            enabled: false,
        },
        custom_text: {
            shipping_address: {
                message:
                    'Preorder kończy się 17.07.2023 o 20:00 i od tej daty potrzebujemy 3-4 tygodnie na produkcję, pakowanie, umożliwienie odbioru osobistego i wysyłkę zamówień. O postępach prac będziemy informować Cię mailowo.',
            },
        },
        invoice_creation: {
            enabled: false,
        },
    });

    return paymentLink.url;
}
