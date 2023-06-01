<template>
    <template v-if="Object.values($cart).length">
        <form>
            <ul class="text-lg">
                <li class="border-b border-black mb-6" :key="cartItemProduct.cartItem.id"
                    v-for="(cartItemProduct) in Object.values($cart)">
                    <img :src=cartItemProduct.product.image :alt=cartItemProduct.product.name class="max-h-48"/>
                    <h3>{{ cartItemProduct.product.name }}</h3>
                    <p>Rozmiar: {{ cartItemProduct.cartItem.product.size }}</p>
                    <div class="mb-6">
                        <label for="quantity"
                               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ilość</label>
                        <input :value=cartItemProduct.cartItem.quantity
                               :data-cart-item-product-id=cartItemProduct.cartItem.product.id
                               :data-cart-item-product-size=cartItemProduct.cartItem.product.size
                               @change="updateQuantity"
                               type="number"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               required
                               name="quantity"
                               min="1"
                               max="10"
                        >
                    </div>
                    <input :value=cartItemProduct.cartItem.product.id type="hidden" name="id"/>
                    <input :value=cartItemProduct.cartItem.product.size type="hidden" name="size"/>

                    <a class="block text-sm underline hover:opacity-50"
                       href="#"
                       :data-cart-item-id=cartItemProduct.cartItem.id
                       @click.stop.prevent="removeCartItem">Usuń</a>
                </li>
            </ul>
            <div class="grid grid-cols-2 gap-4">
                <button @click.stop.prevent="goToCheckout" class="inline-block bg-black text-white py-2 px-4 rounded-full uppercase hover:opacity-50"
                        type="submit">Do kasy
                </button>
            </div>
        </form>
    </template>
    <template v-else>
        <div>Twój koszyk jest pusty.</div>
    </template>
</template>

<script setup>

import {removeCartItemById, updateCartItemQuantity} from '../store/cart';
import {cartProducts} from "../store/cartProducts";
import {useStore} from '@nanostores/vue';
import {stripeCartItems} from "../store/stripeCartItems";

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
