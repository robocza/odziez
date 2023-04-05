import Stripe from 'stripe';

declare var process: {
    env: {
        STRIPE_SECRET_KEY: string
    }
}

export const stripeApi = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});
