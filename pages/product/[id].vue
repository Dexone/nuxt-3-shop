
<script setup>
import { useCart } from '../store/carStore'
const cartStore = useCart();



const route = useRoute()



const alligator = ["thick scales", 80, "4 foot tail", "rounded snout"];


for (let i = 0; i < cartStore.cart.length; i++) {
    let find = cartStore.cart[i].id
    console.log(find.indexOf(0))
}




const imageData = ref([])

const { data: product } = await useFetch(`http://localhost:3000/products/${route.params.id}`)
imageData.value = [{
    1: import.meta.env.BASE_URL + product.value.image[1],
    2: import.meta.env.BASE_URL + product.value.image[2],
    3: import.meta.env.BASE_URL + product.value.image[3],
    4: import.meta.env.BASE_URL + product.value.image[4],
    5: import.meta.env.BASE_URL + product.value.image[5]
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

</script>

<template>
    <button @click="console.log(cartStore.cart[0].id.indexOf(0))"> test</button>
    <div v-for="image in imageData" class="max-w-7xl mx-auto">


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
            </div>
        </a>
    </div>
</template>
