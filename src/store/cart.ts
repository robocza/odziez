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

    if (existingCartItemEntry) {
        // @todo keep existing order of cart items in the collection.
        removeCartItemById(existingCartItemEntry.id);

        quantity += existingCartItemEntry.quantity;
    }

    cart.set(
        [
            ...cart.get(),
            {
                id: getCartItemIdFromProduct(product),
                product: product,
                quantity: quantity
            }
        ]
    )
}

export function updateCartItemQuantity(product: CartProduct, newQuantity: number) {
    const existingCartItemEntry = findCartItemForProduct(product);

    if (existingCartItemEntry) {
        // @todo keep existing order of cart items in the collection.
        removeCartItemById(existingCartItemEntry.id);
    }

    cart.set(
        [
            ...cart.get(),
            {
                id: getCartItemIdFromProduct(product),
                product: product,
                quantity: newQuantity
            }
        ]
    )
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
