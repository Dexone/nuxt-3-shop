<template>

  <main class="bg-white  max-w-7xl mx-auto">

    <div class="max-w-7xl mx-auto ">




      <a class="block relative p-6 bg-gray-50 border border-gray-200 rounded-lg shadow mx-5">




        <form class="max-w-sm inline-block mr-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Цена:</label>
          <!-- <div class="slider-demo-block">
            <el-slider v-model="powerVM" range show-stops :max="550" :min="100" el-switch-color/>
          </div> -->
          <div class="flex">
            <input v-model="otPrice"
              class="rounded-none rounded-s-md bg-gray-0 border border-e-0 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
              placeholder="Цена от">
            </input>
            <input type="text" v-model="doPrice"
              class="rounded-none rounded-e-lg bg-gray-0 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
              placeholder="Цена до">
          </div>
        </form>

        <form class="max-w-sm mt-2 mr-2 inline-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Трансмиссия:</label>
          <select v-model="kpp" id="countries"
            class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-36">
            <option>Любая</option>
            <option>АКПП</option>
            <option>МКПП</option>
            <option>Вариатор</option>
          </select>
        </form>

        <form class="max-w-sm mt-2 mr-2 inline-block">
          <label class="block mb-2 text-sm font-medium text-gray-900">Мощность двигателя:</label>
          <!-- <div class="slider-demo-block">
            <el-slider v-model="powerVM" range show-stops :max="550" :min="100" el-switch-color/>
          </div> -->
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

        <form class="max-w-sm mt-2 inline-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Двигатель:</label>
          <select v-model="engine" id="countries"
            class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-36">
            <option>Любой</option>
            <option>Бензин</option>
            <option>Дизель</option>
            <option>Электро</option>
          </select>
        </form>


        <label class="block mb-2 text-sm font-medium text-gray-900 mt-2 ">Цвет:</label>
        <div class="flex items-center inline-flex mr-2 " v-for="color, index in colors">
          <input v-model="colorsVM" :value="color" type="checkbox"
            class="w-4 h-4 text-gray-600 border-gray-300 rounded">
          <label class="ms-2 text-sm font-medium text-gray-900">{{ color }}</label>
        </div>
      </a>
    </div>


    <div class=" max-w-sm bg-white border border-gray-200 rounded-lg shadow inline-block m-5"
      v-for="main, index in mainInfo">

      <h5 class="mb-1 text-xl font-medium text-gray-900 ml-4 pt-4">
        <NuxtLink :to="`/product/${main.id}`">
          {{ main.brand }} {{ main.model }}
        </NuxtLink>
      </h5>

      <p class="text-sm text-gray-500 ml-4 mr-4">{{ main.year }}г. / {{ main.power }}л.с. / {{ main.engine }} / {{
              main.transmission }} / {{ main.kuzov }} / {{ main.color }}</p>

      <div class="flex flex-col items-center">
        <img class=" rounded-t-lg " v-bind:src="main.image[1]" />
      </div>

      <h5 class="mb-1 text-xl font-medium text-gray-900 ml-4">{{ main.price.toLocaleString() }} ₽</h5>
      <span class="text-sm text-gray-500 ml-4"> {{ main.kprice.toLocaleString() }} ₽/мес</span>


      <div class="flex flex-col items-center pb-10">
        <div class="flex mt-4 md:mt-6">

          <a v-if="cartStore.compare[main.id] == -1"
            @click=" addToCart(main), syncCompare(), cartStore.cart[cartStore.compare[main.id]].amount++"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">В
            корзину</a>

          <div v-else class="inline-flex rounded-md shadow-sm" role="group">

            <button v-if="cartStore.cart[cartStore.compare[main.id]].amount === 1"
              @click="cartStore.cart[cartStore.compare[main.id]].amount--, deleteCart(cartStore.compare[main.id])"
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
              -
            </button>

            <button v-else
              @click="cartStore.cart[cartStore.compare[main.id]].amountSumm = cartStore.cart[cartStore.compare[main.id]].amountSumm - main.price, cartStore.cart[cartStore.compare[main.id]].amount--"
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
              -
            </button>

            <button type="button"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
              {{
              cartStore.cart[cartStore.compare[main.id]].amount }}
            </button>

            <button type="button"
              @click="cartStore.cart[cartStore.compare[main.id]].amountSumm = cartStore.cart[cartStore.compare[main.id]].amountSumm + main.price, cartStore.cart[cartStore.compare[main.id]].amount++"
              class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ">
              +
            </button>
          </div>

          <a v-if="cartStore.simile[main.id] == -1" @click="addToFavourite(main), syncSimile()"
            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "><svg
              class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
          </a>

          <a v-else @click="deleteFavourite(cartStore.simile[main.id]), syncSimile()"
            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "><svg
              class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <FwbPagination id="fwb-pagination" v-model="currentPage" :totalPages="totalPages">
    </FwbPagination>

  </main>
</template>


<script setup>
import { useCart } from '../store/carStore'
import { FwbPagination } from 'flowbite-vue'



// const price = ref([100, 550])
// const priceVM = ref([2000000, 12000000])


const otPrice = ref()
const doPrice = ref()
const otPriceVM = ref(2000000)
const doPriceVM = ref(12000000)
watch(otPrice, () => {
  otPrice.value = Number(otPrice.value.replace(/\D/g, '')).toLocaleString();
  otPriceVM.value = (Number(otPrice.value.replace(/\D/g, '')))
})
watch(doPrice, () => {
  doPrice.value = Number(doPrice.value.replace(/\D/g, '')).toLocaleString();
  doPriceVM.value = (Number(doPrice.value.replace(/\D/g, '')))
})



const runtimeConfig = useRuntimeConfig()
const cartStore = useCart();


const powerVM = ref([100, 550])
const colorsVM = ref([])
const currentPage = ref(1)
const kpp = ref("Любая")
const engine = ref("Любой")
const mainInfo = ref(0)
const totalPages = ref(3)








let colors = ["Черный", "Красный", "Серый", "Белый", "Коричневый", "Синий", "Серебристый"]
let search = []
function searchPush() { //строка поиска
  search = []
  for (let i = 0; i < colorsVM.value.length; i++) {
    search.push("&color=" + colorsVM.value[i])
  }
  search.push("&power_gte=" + powerVM.value[0] + "&power_lte=" + powerVM.value[1])
  search.push("&price_gte=" + otPriceVM.value + "&price_lte=" + doPriceVM.value)

  if (kpp.value != "Любая") {
    search.push("&transmission=" + kpp.value)
  }

  if (engine.value != "Любой") {
    search.push("&engine=" + engine.value)
  }
}



async function update() {
  const page = currentPage.value
  // ${runtimeConfig.public.apiBase}
  // http://localhost:3000
  const { data } = await useFetch(`${runtimeConfig.public.apiBase}/products?${search.join('')}&_page=${page}`)
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
      kprice: Math.round((data.value[index].price) / 84),
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





watch([colorsVM, powerVM, doPriceVM, otPriceVM, kpp, engine], () => {
  searchPush(), update()
})
watch(cartStore.cart, () => {
  syncSumm(), syncCompare()
})
watch(currentPage, () => {
  update()
})
await update()
syncCompare()
syncSimile()
function deleteCart(index) {
  cartStore.deleteCart(index)
}
function addToCart(value) {
  cartStore.addToCart(value);
}
function addToFavourite(value) {
  cartStore.addToFavourite(value);
}
function syncSumm() {
  cartStore.syncSumm();
}
function syncCompare() {
  cartStore.syncCompare();
}
function syncSimile() {
  cartStore.syncSimile();
}
function deleteFavourite(index) {
  cartStore.deleteFavourite(index)
}

</script>




<style scoped>
.slider-demo-block {
  display: flex;
  align-items: center;
  max-width: 350px;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 15px;
  margin-right: 6px;
}
</style>