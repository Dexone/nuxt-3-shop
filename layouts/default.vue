<template>
    <div>
        <header>























            <nav class="bg-white border-gray-200 p-4 max-w-7xl mx-auto">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl  pb-5">
                    <a href="http://5.35.98.166/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../public/car.png" class="h-8" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap ">mshop</span>
                    </a>


                    <div class="flex items-center space-x-4 rtl:space-x-reverse  font-medium pt-2">


                        <NuxtLink to="/favourite">
                            <a href="#" class="text-base  text-blue-700  hover:underline">Избранное </a>

                        </NuxtLink>






                        <NuxtLink to="/cart">
                            <a href="#" class="text-base  text-gray-700  hover:underline">Корзина </a>

                            <span
                                class="inline-flex items-center justify-center w-5 h-5 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full">
                                {{
                                    cartStore.getCartLength }}
                            </span>
                        </NuxtLink>






                    </div>
                </div>
            </nav>












        </header>
        <slot />
        <footer>
            <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center ">© 2024 <a href="https://github.com/Dexone"
                    class="hover:underline">Dexone</a>. All Rights Reserved.</span>
        </footer>
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