<template>
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
                        <svg class="w-4 h-4 text-gray  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                        <span class="sr-only">Previous</span>
                    </span>
                </button>

                <button @click.prevent="ffright"
                    class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                    <span class="inline-flex items-center justify-center w-10 h-10 ">
                        <svg class="w-4 h-4 text-gray  rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                        <span class="sr-only">Next</span>
                    </span>
                </button>
            </div>


            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{{ product.brand }} {{ product.model
                    }}
                </h5>
                <p class="mb-3 font-normal text-gray-700 ">Год: {{ product.year }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Мощность: {{ product.power }} л/с</p>
                <p class="mb-3 font-normal text-gray-700 ">Тип кузова: {{ product.kuzov }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Трансмиссия: {{ product.transmission }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Тип двигателя: {{ product.engine }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Цвет: {{ product.color }}</p>
                <p class="mb-3 font-normal text-gray-700 ">Цена: {{ product.price.toLocaleString() }} ₽</p>

                <div class="flex flex-col items-center pb-10">
                    <div class="flex mt-4 md:mt-6">
                        <a v-if="cartStore.compare[product.id] === -1"
                            @click="addToCart(product), syncCompare(), cartStore.cart[cartStore.compare[product.id]].amount = 0, cartStore.cart[cartStore.compare[product.id]].amountSumm = product.price, cartStore.cart[cartStore.compare[product.id]].amount++"
                            href="#"
                            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                            Добавить в корзину
                        </a>

                        <div v-else class="inline-flex rounded-md shadow-sm" role="group">

                            <button v-if="cartStore.cart[cartStore.compare[product.id]].amount === 1"
                                @click="cartStore.cart[cartStore.compare[product.id]].amount--, deleteCart(cartStore.compare[product.id])"
                                type="button"
                                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
                                -
                            </button>



                            <button v-else
                                @click="cartStore.cart[cartStore.compare[product.id]].amountSumm = cartStore.cart[cartStore.compare[product.id]].amountSumm - product.price, cartStore.cart[cartStore.compare[product.id]].amount--"
                                type="button"
                                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
                                -
                            </button>


                            <button type="button"
                                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
                                {{
        cartStore.cart[cartStore.compare[product.id]].amount }}
                            </button>

                            <button
                                @click="cartStore.cart[cartStore.compare[product.id]].amountSumm = cartStore.cart[cartStore.compare[product.id]].amountSumm + product.price, cartStore.cart[cartStore.compare[product.id]].amount++"
                                type="button"
                                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
                                +
                            </button>
                        </div>


                        <a v-if="cartStore.simile[product.id] == -1" @click="addToFavourite(product), syncSimile()"
                            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "><svg
                                class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                            </svg>
                        </a>

                        <a v-else @click="deleteFavourite(cartStore.simile[product.id]), syncSimile()"
                            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "><svg
                                class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>




<script setup>
import { useCart } from '../store/carStore'
const cartStore = useCart();

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
// ${runtimeConfig.public.apiBase}
// http://localhost:3000
const { data: product } = await useFetch(`${runtimeConfig.public.apiBase}/products/${route.params.id}`)

const additionalData = ref([])
additionalData.value = [{
    1: product.value.image[1],
    2: product.value.image[2],
    3: product.value.image[3],
    4: product.value.image[4],
    5: product.value.image[5],
}]

let count = ref(1)

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
function syncSimile() {
    cartStore.syncSimile();
}
function deleteFavourite(index) {
    cartStore.deleteFavourite(index)
}
function addToFavourite(value) {
    cartStore.addToFavourite(value);
}
</script>
