import {computed} from 'nanostores';
import {cart, CartItem} from './cart';
import {getProduct} from "../productRepository";

type CartProduct = {
    image: string,
    name: string
}

type CartItemProduct = {
    cartItem: CartItem,
    product: CartProduct
};

export const cartProducts = computed(
    cart,
    cartItems => cartItems.map(cartItem => mapCartItemToCartItemProduct(cartItem))
);

function mapCartItemToCartItemProduct(cartItem: CartItem): CartItemProduct {
    const product = getProduct(cartItem.product.id);

    return {
        cartItem: cartItem,
        product: {
            image: product.image,
            name: product.name
        }
    };
}
