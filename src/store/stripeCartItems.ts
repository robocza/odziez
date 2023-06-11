import { computed } from 'nanostores';
import { cart, CartItem } from './cart';
import type { CartItem as StripeCartItem } from '../getStripePaymentLinkUrl';

export const stripeCartItems = computed(cart, (cartItems) => cartItems.map((cartItem) => mapCartItemToStripeCartItem(cartItem)));

function mapCartItemToStripeCartItem(cartItem: CartItem): StripeCartItem {
    return {
        id: cartItem.product.id,
        quantity: cartItem.quantity,
        size: cartItem.product.size,
    };
}
