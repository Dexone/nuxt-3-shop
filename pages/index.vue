

<template>
  <a class="block relative p-6 bg-gray-100 border border-gray-200 rounded-lg shadow max-w-7xl mx-auto">

    <button @click="showElement = !showElement"
      class="text-gray  border border-gray-900 bg-white mx-1 my-1 font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button">Мощность двигателя<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>

    <div :class="{ 'hidden': showElement }" class="z-10 absolute bg-white divide-y divide-gray-100 shadow w-44">
      <ul class="py-2 text-sm text-gray-700">
        <li>
          <ClientOnly>
          <div class="slider-demo-block">
            <el-slider v-model="powerVM" range show-stops :max="550" :min="100" el-switch-color />
          </div>
        </ClientOnly>
        </li>
      </ul>
    </div>


    <button @click="showPrice = !showPrice" type="button"
      class="items-center text-gray mx-1 my-1 bg-white border border-gray-900 font-medium text-sm px-5 py-2.5 text-center inline-flex">
      Цена
      <svg class="w-3 h-3 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>

    <div :class="{ 'hidden': showPrice }" id="dateRangeDropdown"
      class="z-10 absolute bg-white divide-y divide-gray-100 shadow w-80 lg:w-96">
      <div class="p-3" aria-labelledby="dateRangeButton">
        <div date-rangepicker datepicker-autohide class="flex items-center">
          <div class="relative">
            <input v-model="otPriceVM" type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  block w-full p-2.5" placeholder="от">
          </div>


          <span class="mx-2 my-1 text-gray-500">-</span>
          <div class="relative">
            <input v-model="doPriceVM" name="end" type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5" placeholder="до">
          </div>
        </div>
      </div>
    </div>


    <button id="dropdownCheckboxButton" @click="showColor = !showColor"
      class="text-gray bg-white  font-medium border border-gray-900 mx-1 text-sm px-5 py-2.5 text-center inline-flex items-center"
      type="button">Цвет <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>


    <div :class="{ 'hidden': showColor }" class="z-10 w-48 bg-white divide-y divide-gray-100 shadow">
      <ul class="p-3 space-y-3 text-sm text-gray-700  absolute z-25 bg-white left-80">
        <li>
          <div class="flex items-center" v-for="color, index in colors">
            <input v-model="colorsVM" :value="color" type="checkbox"
              class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded ">
            <label class="ms-2 text-sm font-medium text-gray-900">{{ color }}</label>
          </div>
        </li>
      </ul>
    </div>

  </a>



  <div class="max-w-7xl mx-auto">



    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow m-5 inline-flex "
      v-for="main, index in    mainInfo   ">


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

        <div v-if="cartStore.compare[main.id] == -1">
          <a @click=" addToCart(main), syncCompare(), cartStore.cart[cartStore.compare[main.id]].amount++" href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 ">
            Добавить в корзину
          </a>

        </div>



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

          <a type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
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



      </div>
    </div>

  </div>
  <FwbPagination id="fwb-pagination" v-model="currentPage" :totalPages="totalPages"></FwbPagination>



</template>


<script setup>
import { useCart } from '../store/carStore'
import { FwbPagination } from 'flowbite-vue'

const runtimeConfig = useRuntimeConfig()
console.log(runtimeConfig.public.apiBase)
// const allProducts = useFetch(`http://localhost:3000/products`)


const showElement = ref(true)
const showPrice = ref(true)
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