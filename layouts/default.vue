<template>
    <div>
        <header>
            <nav class="bg-white border-gray-200 p-4 max-w-7xl mx-auto">
                <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl  pb-5">
                    <NuxtLink to="/">
                    <a @click="page = 1" class="flex items-center space-x-3  rtl:space-x-reverse">
                        <img src="../public/car.png" class="h-8" />
                        <span v-if="page===1" class="text-blue-700 self-center text-2xl font-semibold whitespace-nowrap ">mshop</span>
                        <span v-else class="self-center text-2xl font-semibold whitespace-nowrap ">mshop</span>
                    </a>
                </NuxtLink>
                
                    <div class="flex items-center space-x-4 rtl:space-x-reverse  font-medium pt-2">
                        <NuxtLink to="/favourite" @click="page = 2">
                            <a v-if="page===2" href="#" class="text-base  text-blue-700  hover:underline">Избранное </a>
                            <a v-else   href="#" class="text-base  text-gray-700  hover:underline">Избранное </a>

                        </NuxtLink>

                        <NuxtLink  to="/cart" @click="page = 3">
                            <a v-if="page===3" href="#" class="text-base  text-blue-700  hover:underline">Корзина </a>
                            <a v-else  href="#" class="text-base  text-gray-700  hover:underline">Корзина </a>

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
            <hr class="my-6 border-gray-200 mx-auto " />
            <span class="block text-sm text-gray-500 text-center">© 2024 <a href="https://github.com/Dexone"
                    class="hover:underline">Dexone</a>. All Rights Reserved.</span>
        </footer>
    </div>
</template>

<script setup>
import { useCart } from '../store/carStore'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

const cartStore = useCart();

const page = ref(0)

onMounted(() => {
    initFlowbite();
})
</script>