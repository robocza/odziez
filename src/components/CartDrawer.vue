<template>
    <div id="cart-drawer" class="fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform translate-x-full bg-white w-80 dark:bg-gray-800" tabindex="-1" aria-labelledby="cart-drawer-label">
        <h5 id="cart-drawer-label" class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
            Koszyk
        </h5>
        <button type="button" data-cart-drawer-hide aria-controls="cart-drawer" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
        </button>

        <template v-if="Object.values($cartItems).length">
            <ul class="text-lg">
                <li v-for="cartItem in Object.values($cartItems)" v-bind:key="cartItem.name">
                    <img class="w-12" :src=cartItem.imageSrc :alt=cartItem.name />
                    <h3>{{cartItem.name}}</h3>
                    <div>Ilość: {{cartItem.quantity}}</div>
                </li>
            </ul>
            <div class="grid grid-cols-2 gap-4">
                <a href="#" class="bg-black text-white py-2 px-4 rounded-full uppercase">
                    Do kasy
                </a>
            </div>
        </template>
    </div>
</template>

<script setup>
import { cartItems } from '../cartStore';
import { useStore } from '@nanostores/vue';

const $cartItems = useStore(cartItems);
</script>
