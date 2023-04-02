import {persistentMap} from '@nanostores/persistent'

export type CartItem = {
    id: string;
    name: string;
    imageSrc: string;
    quantity: number;
};

export type CartItemDisplayInfo = Pick<CartItem, 'id' | 'name' | 'imageSrc'>;

export const cartItems = persistentMap<CartItem[]>('cart', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

type ItemDisplayInfo = Pick<CartItem, 'id' | 'name' | 'imageSrc'>;

export function addCartItem({id, name, imageSrc}: ItemDisplayInfo) {
    const existingEntry = cartItems.get()[id];

    if (existingEntry) {
        cartItems.setKey(id, {
            ...existingEntry,
            quantity: existingEntry.quantity + 1,
        });
    } else {
        cartItems.setKey(
            id,
            {id, name, imageSrc, quantity: 1}
        );
    }
}
