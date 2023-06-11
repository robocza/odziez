import { computed } from 'nanostores';
import { cart, CartItem } from './cart';
import { getProduct } from '../productRepository';
import type { Money } from '../money';
import Dinero, { Currency } from 'dinero.js';
import { formatMoney } from '../money';

type CartProduct = {
    image: string;
    name: string;
};

type CartItemProduct = {
    cartItem: CartItem;
    product: CartProduct;
    totalPrice: Money;
    formattedTotalPrice: string;
};

export const cartProducts = computed(cart, (cartItems) => cartItems.map((cartItem) => mapCartItemToCartItemProduct(cartItem)));

function mapCartItemToCartItemProduct(cartItem: CartItem): CartItemProduct {
    const product = getProduct(cartItem.product.id);

    cartItem.quantity;
    const unitPrice = Dinero({ amount: product.price.amount, currency: product.price.currency as Currency });

    const totalPrice = unitPrice.multiply(cartItem.quantity);

    const totalPriceMoney = {
        amount: totalPrice.getAmount(),
        currency: totalPrice.getCurrency(),
    };

    return {
        cartItem: cartItem,
        product: {
            image: product.images[0],
            name: product.name,
        },
        totalPrice: totalPriceMoney,
        formattedTotalPrice: formatMoney(totalPriceMoney, 'pl'),
    };
}
