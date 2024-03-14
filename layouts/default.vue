<template>
    <div>
        <header>























            <nav class="bg-white border-gray-200 p-4 max-w-7xl mx-auto">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl  pb-5">
                    <a href="https://dexone.github.io/mweather/"
                        class="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="../public/car.png" class="h-8" />
                        <span
                            class="self-center text-2xl font-semibold whitespace-nowrap ">mshop</span>
                    </a>


                    <div class="flex items-center space-x-4 rtl:space-x-reverse  font-medium pt-2">


                        <NuxtLink to="/cart">
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