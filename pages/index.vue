
<template>
  <div id="box" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow " v-for="main, index in mainInfo">
    <div class="p-5">

      <h5 class="mb-2 text-1xl font-bold text-gray-900">
        <NuxtLink :to="`/product/${main.id}`">
          {{ main.model }} {{ main.year }}
        </NuxtLink>
      </h5>

      <p class="mb-3  text-gray-700" style="height: 20px;">{{ main.power }}л.с. / {{ main.engine }} / {{
        main.transmission }} / {{ main.kuzov }} / {{ main.color }}</p>

      <img class="rounded-t-lg" :src=main.image[1] />

      <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900">
        {{ main.price }} ₽
      </h5>

      <p class="mb-3 text-gray-700">
        {{ Math.round(main.price / 84) }} ₽/мес
      </p>


      <button type="submit" class="w-full text-white bg-gray-900 text-sm px-5 py-2.5 text-center"
        @click="addToCart(main)">Купить</button>

    </div>
  </div>

  <fwb-pagination v-model="currentPage" :totalPages="totalPages"></fwb-pagination>
</template>


<script setup>

import { useCart } from '../store/carStore'
import { FwbPagination } from 'flowbite-vue'



const currentPage = ref(1)

const mainInfo = ref(0)
const store = useCart();

const totalPages = ref(1)




async function update() {
  const page = currentPage.value
  const { data } = await useFetch(`http://localhost:3000/products?_page=${page}`)
  console.log(data.value)
  totalPages.value = data.value.pages
  const mainData = data.value.data.map((item, index) => {
    return {
      id: data.value.data[index].id,
      model: data.value.data[index].model,
      year: data.value.data[index].year,
      power: data.value.data[index].power,
      kuzov: data.value.data[index].kuzov,
      transmission: data.value.data[index].transmission,
      engine: data.value.data[index].engine,
      color: data.value.data[index].color,
      price: data.value.data[index].price,
      image: {
        1: data.value.data[index].image[1],
        2: data.value.data[index].image[2],
        3: data.value.data[index].image[3],
        4: data.value.data[index].image[4],
        5: data.value.data[index].image[5]
      }
    }
  })
  mainInfo.value = mainData
}

watch(currentPage, () => {
  update()
})
await update()

function addToCart(value) {
  console.log(store)
  store.addToCart(value);
}

</script>

<style>
#box {
  display: inline-block;
  margin: 20px
}

.rounded-t-lg {
  margin-left: -35px;
}
</style>