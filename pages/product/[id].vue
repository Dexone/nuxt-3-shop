<template>
    <button @click="console.log(additionalData)">test</button>
    <div v-for="image in additionalData" class="max-w-7xl mx-auto">


        <a class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row">


            <div class="relative w-full max-w-2xl">

                <div class="relative h-56 overflow-hidden rounded-lg md:h-96  ">

                    <div class=" duration-700 ease-in-out ">
                        <img v-bind:src="image[count]"
                            class="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
                            alt="">
                    </div>

                </div>


                <button @click.prevent="ffleft"
                    class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span
                        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray/30  group-hover:bg-gray/50 ">
                        <svg class="w-4 h-4 text-gray  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>
                <button @click.prevent="ffright"
                    class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span class="inline-flex items-center justify-center w-10 h-10 ">
                        <svg class="w-4 h-4 text-gray  rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>

            </div>


            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{{ product.brand }} {{ product.model }}
                </h5>
                <p class="mb-3 font-normal text-gray-700 ">Год: {{ product.year }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Мощность: {{ product.power }} л/с</p>
                <p class="mb-3 font-normal text-gray-700 ">Тип кузова: {{ product.kuzov }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Трансмиссия: {{ product.transmission }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Тип двигателя: {{ product.engine }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Цвет: {{ product.color }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Цена: {{ product.price }}</p>
                <!-- {{ cartStore.cart[cartStore.compare[product.id]] }} -->

                <!-- {{ cartStore.compare[product.id] }} -->

                <div v-if="cartStore.compare[product.id] === -1">

{{ product }}

                    <a @click="addToCart(product), syncCompare(), cartStore.cart[cartStore.compare[product.id]].amount = 0, cartStore.cart[cartStore.compare[product.id]].amountSumm = product.price, cartStore.cart[cartStore.compare[product.id]].amount++"
                        href="#"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 ">
                        Добавить в корзину
                    </a>


                </div>




                <div v-else>


                    <a v-if="cartStore.cart[cartStore.compare[product.id]].amount === 1">

                        <button
                            @click="cartStore.cart[cartStore.compare[product.id]].amount--, cartStore.deleteCart(cartStore.compare[product.id])"
                            type="button"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                            -
                        </button>

                    </a>
                    <a v-else>
                        <button
                            @click="cartStore.cart[cartStore.compare[product.id]].amountSumm = cartStore.cart[cartStore.compare[product.id]].amountSumm - product.price, cartStore.cart[cartStore.compare[product.id]].amount--"
                            type="button"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                            -
                        </button>
                    </a>

                    <a type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                        {{
                            cartStore.cart[cartStore.compare[product.id]].amount }}
                    </a>


                    <button
                        @click="cartStore.cart[cartStore.compare[product.id]].amountSumm = cartStore.cart[cartStore.compare[product.id]].amountSumm + product.price, cartStore.cart[cartStore.compare[product.id]].amount++"
                        type="button"
                        class=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 ">
                        +
                    </button>


                </div>



            </div>
        </a>
    </div>
</template>




<script setup>
import { useCart } from '../store/carStore'
const cartStore = useCart();

const route = useRoute()

const additionalData = ref([])

const { data: product } = await useFetch(`http://localhost:3000/products/${route.params.id}`)

additionalData.value = [{
    1: import.meta.env.BASE_URL + product.value.image[1],
    2: import.meta.env.BASE_URL + product.value.image[2],
    3: import.meta.env.BASE_URL + product.value.image[3],
    4: import.meta.env.BASE_URL + product.value.image[4],
    5: import.meta.env.BASE_URL + product.value.image[5],
}]

let count = ref(1)
console.log(product)
function ffleft() {
    count.value--
    console.log(count.value)
    if (count.value === 0)
        count.value = 1
}

function ffright() {
    count.value++
    console.log(count.value)
    if (count.value === 6)
        count.value = 5
}

watch(cartStore.cart, () => {
    syncSumm(), syncCompare()
})


function addToCart(value) {
    cartStore.addToCart(value);
}

function syncCompare() {
    cartStore.syncCompare();
}
function syncSumm() {
    cartStore.syncSumm();
}
function deleteCart(index) {
    cartStore.deleteCart(index)
}
</script>

