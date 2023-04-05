<template>
    <div id="cart-drawer"
         class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800"
         tabindex="-1" aria-labelledby="cart-drawer-label">
        <h5 id="cart-drawer-label"
            class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
            Koszyk
        </h5>
        <button type="button" data-cart-drawer-hide aria-controls="cart-drawer"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
            </svg>
            <span class="sr-only">Zamknij koszyk</span>
        </button>
        <template v-if="Object.values($cart).length">
            <ul class="text-lg">
                <li class="border-b border-black mb-6" :key="cartItemProduct.cartItem.id" v-for="(cartItemProduct) in Object.values($cart)">
                    <img :src=cartItemProduct.product.image :alt=cartItemProduct.product.name class="max-h-48"/>
                    <h3>{{ cartItemProduct.product.name }}</h3>
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

                    <a class="text-sm block underline"
                       href="#"
                       :data-cart-item-id=cartItemProduct.cartItem.id
                       @click.stop.prevent="removeCartItem">Usuń</a>
                </li>
            </ul>
            <div class="grid grid-cols-2 gap-4">
                <form action="/.netlify/functions/get-stripe-payment-link" method="post">
                    <button class="bg-black text-white py-2 px-4 rounded-full uppercase" type="submit">Do kasy</button>
                </form>
            </div>
        </template>
        <template v-else>
            <div>Twój koszyk jest pusty.</div>
        </template>
    </div>
</template>

<script setup>
import {cart, removeCartItemById, updateCartItemQuantity} from '../store/cart';
import {cartProducts} from "../store/cartProducts";
import {useStore, useVModel} from '@nanostores/vue';

// @todo bind form
// @todo bind product images again from content

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

const $cart = useStore(cartProducts);

</script>
