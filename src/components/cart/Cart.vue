<template>
    <template v-if="Object.values($cart).length">
        <form>
            <ul class="text-2xl">
                <li class="mb-2 pt-2 px-10 pb-4 border-black border-b" :key="cartItemProduct.cartItem.id"
                    v-for="(cartItemProduct) in Object.values($cart)">
                    <img :src=cartItemProduct.product.image :alt=cartItemProduct.product.name class="block mx-auto max-h-48"/>
                    <h3 class="uppercase">{{ cartItemProduct.product.name }}</h3>
                    <div class="flex place-items-center relative">
                        <label class="pr-4 uppercase" for="product-quantity">Ilość</label>
                        <input
                            :value=cartItemProduct.cartItem.quantity
                            :data-cart-item-product-id=cartItemProduct.cartItem.product.id
                            :data-cart-item-product-size=cartItemProduct.cartItem.product.size
                            @change="updateQuantity"
                            value="1"
                            type="number"
                            class="bg-white border border-black text-black text-center text-sm rounded-lg inline-block p-1 w-[60px]"
                            required
                            name="quantity"
                            min="1"
                            max="10"
                        >
                        <a class="block right-0 absolute text-sm justify-self-end underline hover:opacity-50"
                           href="#"
                           :data-cart-item-id=cartItemProduct.cartItem.id
                           @click.stop.prevent="removeCartItem">Usuń</a>
                    </div>
                    <p class="uppercase">Rozmiar: {{ cartItemProduct.cartItem.product.size }}</p>
                    <input :value=cartItemProduct.cartItem.product.id type="hidden" name="id"/>
                    <input :value=cartItemProduct.cartItem.product.size type="hidden" name="size"/>
                </li>
            </ul>
            <div class="text-center my-6">
                <button @click.stop.prevent="goToCheckout" class="inline-block bg-black text-white py-2 px-8 rounded-full uppercase hover:opacity-50"
                        type="submit">Do kasy
                </button>
            </div>
        </form>
    </template>
    <template v-else>
        <div class="mx-auto p-4">
            <div class="text-2xl">Twój koszyk jest pusty.</div>
        </div>
    </template>
</template>

<script setup>

import {removeCartItemById, updateCartItemQuantity} from '@store/cart';
import {cartProducts} from "@store/cartProducts";
import {useStore} from '@nanostores/vue';
import {stripeCartItems} from "@store/stripeCartItems";

function updateQuantity(event) {
    updateCartItemQuantity(
        {
            id: event.target.dataset.cartItemProductId,
            size: event.target.dataset.cartItemProductSize
        },
        Number(event.target.value).valueOf()
    );
}

function removeCartItem(event) {
    removeCartItemById(event.target.dataset.cartItemId);
}

async function goToCheckout(event) {
    const cartItems = stripeCartItems.get();

    if (cartItems.length === 0) {
        return;
    }

    const submittedButton = event.target;

    submittedButton.disabled = true;
    submittedButton.classList.add('cursor-not-allowed');
    submittedButton.classList.add('opacity-50');

    const data = await fetch(
        '/.netlify/functions/get-stripe-payment-link',
        {
            method: 'POST',
            credentials: 'omit',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        }
    ).then((response) => response.json());

    window.location.href = data.redirectUrl;
}

const $cart = useStore(cartProducts);

</script>
