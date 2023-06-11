<template>
    <template v-if="Object.values($cart).length">
        <form>
            <div class="text-xl mb-2 pt-2 pb-4 border-black border-b flex items-center bg-white flex-row gap-2"
                 :key="cartItemProduct.cartItem.id"
                 v-for="(cartItemProduct) in Object.values($cart)"
            >
                <img class="object-cover w-full h-auto w-36" :src=cartItemProduct.product.image :alt=cartItemProduct.product.name>
                <div class="flex flex-col justify-between p-3 leading-normal">
                    <h3 class="uppercase">{{ cartItemProduct.product.name }}</h3>
                    <div class="block">{{ cartItemProduct.formattedTotalPrice }}</div>
                    <div class="flex place-items-center relative">
                        <label class="pr-4 uppercase" for="product-quantity">Ilość:</label>
                        <div class="">
                            <div class="flex flex-row bg-white border border-black text-black text-center text-sm rounded-lg">
                                <button @click.stop.prevent="decrementQuantity"
                                        class="outline-none px-1">
                                    <svg class="pointer-events-none w-2" viewBox="0 0 39 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="1.29289" y1="36.2929" x2="36.2929" y2="1.29289" stroke="black" stroke-width="2"/>
                                        <line x1="2.70711" y1="36.2929" x2="37.7071" y2="71.2929" stroke="black" stroke-width="2"/>
                                    </svg>
                                </button>
                                <input
                                    :value=cartItemProduct.cartItem.quantity
                                    :data-cart-item-product-id=cartItemProduct.cartItem.product.id
                                    :data-cart-item-product-size=cartItemProduct.cartItem.product.size
                                    @change="updateQuantity"
                                    value="1"
                                    type="number"
                                    class="border-none bg-transparent w-[40px] outline-none appearance-none text-center m-0 px-0"
                                    required
                                    name="quantity"
                                    min="1"
                                    max="10"
                                    pattern='[0-9]*'
                                >
                                <button @click.stop.prevent="incrementQuantity"
                                        class="outline-none px-1">
                                    <svg class="pointer-events-none w-2" viewBox="0 0 39 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <line x1="37.7071" y1="35.7071" x2="2.7071" y2="70.7071" stroke="black" stroke-width="2"></line>
                                        <line x1="36.2929" y1="35.7071" x2="1.2929" y2="0.707104" stroke="black" stroke-width="2"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="uppercase">Rozmiar: {{ cartItemProduct.cartItem.product.size }}</p>
                    <button class="mt-2 text-left text-neutral-500 text-xs uppercase hover:opacity-50 align-middle"
                            :data-cart-item-id=cartItemProduct.cartItem.id
                            @click.stop.prevent="removeCartItem">
                        <svg class="w-3 h-3 inline-block align-middle pointer-events-none" viewBox="0 0 37 38"
                             fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.353553" y1="0.646447" x2="36.3536" y2="36.6464" stroke="black"/>
                            <line x1="36.3536" y1="1.35355" x2="0.353553" y2="37.3536" stroke="black"/>
                        </svg>
                        Usuń
                    </button>
                    <input :value=cartItemProduct.cartItem.product.id type="hidden" name="id"/>
                    <input :value=cartItemProduct.cartItem.product.size type="hidden" name="size"/>
                </div>
            </div>
            <div class="text-center my-6">
                <button @click.stop.prevent="goToCheckout"
                        class="inline-block bg-black text-white py-2 px-8 rounded-xl uppercase hover:opacity-50 w-48"
                        type="submit">Do kasy
                </button>
            </div>
        </form>
    </template>
    <template v-else>
        <div class="mx-auto p-4">
            <div class="text-2xl">Twój koszyk jest pusty. Dorzuć trochę gruzu.</div>
        </div>
    </template>
</template>

<script setup>

import {removeCartItemById, updateCartItemQuantity} from '@store/cart';
import {cartProducts} from "@store/cartProducts";
import {useStore} from '@nanostores/vue';
import {stripeCartItems} from "@store/stripeCartItems";

function decrementQuantity(event) {
    const quantityInput = event.target.parentNode.parentElement.querySelector(
        'input[name="quantity"]'
    );

    let value = Number(quantityInput.value);
    value--;
    quantityInput.value = value;
    updateInputQuantity(quantityInput);
}

function incrementQuantity(event) {
    const quantityInput = event.target.parentNode.parentElement.querySelector(
        'input[name="quantity"]'
    );
    let value = Number(quantityInput.value);
    value++;
    quantityInput.value = value;
    updateInputQuantity(quantityInput);
}

function updateQuantity(event) {
    updateInputQuantity(event.target);
}

function updateInputQuantity(target) {
    let value = Number(target.value).valueOf();
    if (value <= 0) {
        value = 1;
        target.value = value;
    }
    if (value > 10) {
        value = 10;
        target.value = value;
    }

    updateCartItemQuantity(
        {
            id: target.dataset.cartItemProductId,
            size: target.dataset.cartItemProductSize
        },
        value
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
