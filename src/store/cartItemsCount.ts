import { computed } from 'nanostores';
import { cart } from './cart';

export const cartItemsCount = computed(cart, (cartItems) => {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
});
