<template>

  <main class="bg-white  max-w-7xl mx-auto">



    <div class="max-w-7xl mx-auto">
      <a class="block relative p-6 bg-gray-100 border border-gray-200 rounded-lg shadow mx-5">




        <form class="max-w-sm">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена:</label>
          <div class="flex">
            <input v-model="otPriceVM"
              class="rounded-none rounded-s-md bg-gray-0 border border-e-0 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
              placeholder="Цена от">
            </input>
            <input type="text" v-model="doPriceVM"
              class="rounded-none rounded-e-lg bg-gray-0 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
              placeholder="Цена до">
          </div>
        </form>





        <form class="max-w-sm mt-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Мощность двигателя:</label>
          <div class="flex">
            <input v-model="powerVM[0]"
              class="rounded-none rounded-s-md bg-gray-0 border border-e-0 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
              placeholder="Цена от">
            </input>
            <input type="text" v-model="powerVM[1]"
              class="rounded-none rounded-e-lg bg-gray-0 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
              placeholder="Цена до">
          </div>
        </form>







        <label class="block mb-2 text-sm font-medium text-gray-900 mt-2">Цвет:</label>
        <div class="flex items-center inline-flex mr-2" v-for="color, index in colors">
          <input v-model="colorsVM" :value="color" type="checkbox"
            class="w-4 h-4 text-gray-600 border-gray-300 rounded">
          <label class="ms-2 text-sm font-medium text-gray-900">{{ color }}</label>
        </div>









      </a>


    </div>




    <div class="max-w-7xl mx-auto">
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-5 inline-flex "
        v-for="main, index in    mainInfo">


        <div class="p-5">
          <h5 class="mb-2 text-1xl font-bold text-gray-900">
            <NuxtLink :to="`/product/${main.id}`">
              {{ main.brand }} {{ main.model }}
            </NuxtLink>
          </h5>

          <p class="mb-3 h-10 text-gray-700">{{ main.year }}г. / {{ main.power }}л.с. / {{ main.engine }} / {{
              main.transmission }} / {{ main.kuzov }} / {{ main.color }}</p>
          <div class="max-h-44">
            <img v-bind:src="main.image[1]" class="rounded-t-lg -ml-5" />
          </div>

          <h5 class="mb-2 text-1xl font-bold tracking-tight text-gray-900">
            {{ main.price }} ₽
          </h5>

          <p class="mb-3 text-gray-700">
            {{ Math.round(main.price / 84) }} ₽/мес
          </p>





          <div class="max-w-48 mx-auto">

            <a v-if="cartStore.compare[main.id] == -1">
              <a @click=" addToCart(main), syncCompare(), cartStore.cart[cartStore.compare[main.id]].amount++" href="#"
                class="inline-flex items-center px-7 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 ">
                В корзину
              </a>

            </a>


            <a v-else>
              <a v-if="cartStore.cart[cartStore.compare[main.id]].amount === 1">

                <button
                  @click="cartStore.cart[cartStore.compare[main.id]].amount--, cartStore.deleteCart(cartStore.compare[main.id])"
                  type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                  -
                </button>

              </a>
              <a v-else>
                <button
                  @click="cartStore.cart[cartStore.compare[main.id]].amountSumm = cartStore.cart[cartStore.compare[main.id]].amountSumm - main.price, cartStore.cart[cartStore.compare[main.id]].amount--"
                  type="button"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                  -
                </button>
              </a>

              <a type="button"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                {{
              cartStore.cart[cartStore.compare[main.id]].amount }}
              </a>


              <button
                @click="cartStore.cart[cartStore.compare[main.id]].amountSumm = cartStore.cart[cartStore.compare[main.id]].amountSumm + main.price, cartStore.cart[cartStore.compare[main.id]].amount++"
                type="button"
                class=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 ">
                +
              </button>
            </a>

            <button
                type="button"
                class="ml-1 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 ">
                ❤
              </button>


          </div>


        </div>

      </div>
      <FwbPagination id="fwb-pagination" v-model="currentPage" :totalPages="totalPages"></FwbPagination>



















      <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center ">© 2024 <a href="https://github.com/Dexone"
          class="hover:underline">Dexone</a>. All Rights Reserved.</span>
    </div>

  </main>



















</template>


<script setup>
import { useCart } from '../store/carStore'
import { FwbPagination } from 'flowbite-vue'

const runtimeConfig = useRuntimeConfig()
console.log(runtimeConfig.public.apiBase)

const showColor = ref(true)


const powerVM = ref([100, 550])

const colorsVM = ref([])

const currentPage = ref(1)

const mainInfo = ref(0)
const cartStore = useCart();
const totalPages = ref(3)


const otPriceVM = ref(2000000)
const doPriceVM = ref(12000000)


let colors = ["Черный", "Красный", "Серый", "Белый", "Коричневый", "Синий", "Серебристый"]
let search = []


function searchPush() { //строка поиска
  search = []
  for (let i = 0; i < colorsVM.value.length; i++) {
    search.push("&color=" + colorsVM.value[i])
  }
  search.push("&power_gte=" + powerVM.value[0] + "&power_lte=" + powerVM.value[1])
  search.push("&price_gte=" + otPriceVM.value + "&price_lte=" + doPriceVM.value)
}


watchEffect(() => {
  colorsVM.value
  powerVM.value
  doPriceVM.value
  otPriceVM.value
  searchPush()
  update()
})


watch(cartStore.cart, () => {
  syncSumm(), syncCompare()
})


async function update() {
  const page = currentPage.value

  // ${runtimeConfig.public.apiBase}
  // http://localhost:3000
  const { data } = await useFetch(`${runtimeConfig.public.apiBase}/products?${search.join('')}&_page=${page}`)
  // totalPages.value = data.value.pages

  const mainData = data.value.map((item, index) => {
    return {
      id: data.value[index].id,
      brand: data.value[index].brand,
      model: data.value[index].model,
      year: data.value[index].year,
      power: data.value[index].power,
      kuzov: data.value[index].kuzov,
      transmission: data.value[index].transmission,
      engine: data.value[index].engine,
      color: data.value[index].color,
      price: data.value[index].price,
      image: {
        1: data.value[index].image[1],
        2: data.value[index].image[2],
        3: data.value[index].image[3],
        4: data.value[index].image[4],
        5: data.value[index].image[5],
      },
      amount: 0, //количество штук в карточке
      amountSumm: data.value[index].price //сумма товаров в карточке
    }
  })
  mainInfo.value = mainData
}

function deleteCart(index) {
  cartStore.deleteCart(index)
}


watch(currentPage, () => {
  update()
})
await update()
syncCompare()

function addToCart(value) {
  cartStore.addToCart(value);
}


function syncSumm() {
  cartStore.syncSumm();
}

function syncCompare() {
  cartStore.syncCompare();
}

</script>




<style scoped>
.slider-demo-block {

  display: flex;
  align-items: center;
  width: 150px;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
</style>