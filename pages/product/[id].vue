
<script setup>

const route = useRoute()

const { data: product } = await useFetch(`http://localhost:3000/products/${route.params.id}`)

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

    <div class=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">


        <a href="#">
            <img class="rounded-t-lg" v-bind:src="product.image[count]" alt="" />
        </a>


        <div class="flex justify-center">
            <!-- Previous Button -->
            <a @click.prevent="ffleft" href="#"
                class="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
                Previous
            </a>
            <a @click.prevent="ffright" href="#"
                class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
                <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </div>



        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kia {{ product.model }}
                </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Год: {{ product.year }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Мощность: {{ product.power }} л/с</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Тип кузова: {{ product.kuzov }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Трансмиссия: {{ product.transmission }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Тип двигателя: {{ product.engine }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Цвет: {{ product.color }}</p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Цена: {{ product.price }}</p>


            <a href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </div>
    </div>
</template>

