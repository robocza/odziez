import {persistentAtom} from '@nanostores/persistent';

type CartProduct = {
    id: string,
    size: string;
}

export type CartItem = {
    id: string;
    product: CartProduct;
    quantity: number;
};

export const cart = persistentAtom<CartItem[]>('cart', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function addProductToCart(product: CartProduct, quantity: number) {
    const existingCartItemEntry = findCartItemForProduct(product);

    const updatedCartItemId = getCartItemIdFromProduct(product);

    if (existingCartItemEntry) {
        const updatedCartItem = {
            id: updatedCartItemId,
            product: product,
            quantity: quantity + existingCartItemEntry.quantity
        };

        let newCart = cart.get().map(
            item => {
                if (item.id !== updatedCartItemId) {
                    return item;
                }

                return updatedCartItem;
            }
        );

        cart.set(newCart);
    } else {
        cart.set(
            [
                ...cart.get(),
                {
                    id: updatedCartItemId,
                    product: product,
                    quantity: quantity
                }
            ]
        )
    }
}

export function updateCartItemQuantity(product: CartProduct, newQuantity: number) {
    const existingCartItemEntry = findCartItemForProduct(product);

    const updatedCartItemId = getCartItemIdFromProduct(product);

    const updatedCartItem = {
        id: updatedCartItemId,
        product: product,
        quantity: newQuantity
    };

    if (existingCartItemEntry) {
        let newCart = cart.get().map(
            item => {
                if (item.id !== updatedCartItemId) {
                    return item;
                }

                return updatedCartItem;
            }
        );

        cart.set(newCart);
    } else {
        cart.set(
            [
                ...cart.get(),
                updatedCartItem
            ]
        )
    }
}

export function removeCartItemById(id: string) {
    const updatedCartItems = cart.get().filter(item => item.id !== id);

    cart.set(updatedCartItems);
}

export function getCartItemIdFromProduct(product: CartProduct): string {
    return product.id + '.' + product.size;
}

export function findCartItemForProduct(product: CartProduct): CartItem | undefined {
    const cartItemIdToFind = getCartItemIdFromProduct(product);

    return findCartItem(cartItemIdToFind);
}

export function findCartItem(cartItemId: string): CartItem | undefined {
    return cart.get().find(item => cartItemId === item.id);
}
