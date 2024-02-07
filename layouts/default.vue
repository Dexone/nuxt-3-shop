<template>
    <div>
        <header>






            <nav class="bg-white border-gray-200">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                    <img src="../public/kia.png" class="h-16" />

                    <!-- <button data-collapse-toggle="navbar-default"
                        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                        aria-controls="navbar-default" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button> -->
                    <div class="md:block md:w-auto" id="navbar-default">
                        <ul class="font-medium flex flex-col p-4 mt-4 ">
                            <li>



                                <NuxtLink to="/cart" type="button"
                                    class="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg">
                                    <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.3L19 7H7.3" />
                                    </svg>
                                    Корзина
                                    <div
                                        class="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 ">
                                        {{ cartStore.getCartLength }}</div>

                                </NuxtLink>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


        </header>
        <slot />
        <footer>123</footer>
    </div>
</template>

<script setup>
import { useCart } from '../store/carStore'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

const cartStore = useCart();


onMounted(() => {
    initFlowbite();
})
</script>