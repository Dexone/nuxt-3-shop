<template>

  <main class="bg-white  max-w-7xl mx-auto">

    <div class="max-w-7xl mx-auto ">




      <a class="block relative p-6 bg-gray-50 border border-gray-200 rounded-lg shadow mx-5">


        <div class="min-w-64 mt-2 mr-2 inline-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Марка:</label>
          <Multiselect v-model="brands" :options="optionsBrands" placeholder="Любая" mode="single"
            class="multiselect-blue" />
        </div>


        <div class="min-w-64 mt-2 mr-2 inline-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Модель:</label>


          <Multiselect v-if="brands === undefined || brands === null" v-model="model" :options="compareBrands[brands]"
            placeholder="Любая" mode="single" class="multiselect-blue" disabled="false" />
          <Multiselect v-else v-model="model" :options="compareBrands[brands]" placeholder="Любой" mode="single"
            class="multiselect-blue" />
        </div>






        <div class="min-w-64 mt-2 mr-2 inline-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Кузов:</label>
          <Multiselect v-model="kuzov" :options="['Кроссвэн', 'Хэтчбек', 'Универсал', 'Седан', 'Кроссовер']"
            placeholder="Любой" mode="tags" class="multiselect-blue" />
        </div>

        


        <div class="min-w-64 mt-2 mr-2 inline-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Трансмиссия:</label>
          <Multiselect v-model="kpp" :options="['АКПП', 'МКПП', 'Вариатор']" placeholder="Любая" mode="tags"
            class="multiselect-blue" />
        </div>


        <form class="max-w-sm mt-2 mr-2 inline-block">
          <label class="block mb-2 text-sm font-medium text-gray-900">Мощность двигателя:</label>
          <div>
            <Slider :tooltips="false" v-model="sliderPower" @input="ffSliderPower()" class="slider-blue  ml-5 mr-5"
              :min="100" :max="550" :lazy="false" />
          </div>
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








       
        <!-- disabled="false" -->

        <div class="min-w-64 mt-2 mr-2 inline-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Двигатель:</label>
          <Multiselect v-model="engine" :options="['Бензин', 'Дизель', 'Электро']" placeholder="Любой" mode="tags"
            class="multiselect-blue" />
        </div>




        <form class="max-w-sm inline-block mr-2">
          <label class="block mb-2 text-sm font-medium text-gray-900">Цена:</label>

          <div>
            <Slider :tooltips="false" v-model="sliderPrice" @input="ffSliderPrice()" class="slider-blue ml-5 mr-5"
              :min="2000000" :max="12000000" :lazy="false" />
          </div>

          <div class="flex">
            <input v-model="otPrice"
              class="rounded-none rounded-s-md bg-gray-0 border border-e-0 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
              placeholder="Цена от">
            </input>
            <input v-model="doPrice"
              class="rounded-none rounded-e-lg bg-gray-0 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
              placeholder="Цена до">
          </div>

        </form>





        <div class="min-w-64 mt-2 mr-2 inline-block">
          <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Цвет:</label>
          <Multiselect v-model="colorsVM"
            :options="['Черный', 'Красный', 'Серый', 'Белый', 'Коричневый', 'Синий', 'Серебристый']" placeholder="Любой"
            mode="tags" class="multiselect-blue" />
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

      <div class="flex flex-col items-center h-48">
        <img class=" rounded-t-lg " v-bind:src="main.image[1]" />
      </div>

      <h5 class="mb-1 text-xl font-medium text-gray-900 ml-4">{{ main.price.toLocaleString() }} ₽</h5>
      <span class="text-sm text-gray-500 ml-4"> {{ main.kprice.toLocaleString() }} ₽/мес</span>


      <div class="flex flex-col items-center pb-10">
        <div class="flex mt-4 md:mt-6">

          <button v-if="cartStore.compare[main.id] == -1"
            @click=" addToCart(main), syncCompare(), cartStore.cart[cartStore.compare[main.id]].amount++"
            class="inline-flex items-center px-10 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Купить</button>

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

          <button v-if="cartStore.simile[main.id] == -1" @click="addToFavourite(main), syncSimile()"
            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "><svg
              class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
            </svg>
          </button>

          <button v-else @click="deleteFavourite(cartStore.simile[main.id]), syncSimile()"
            class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "><svg
              class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              fill="currentColor" viewBox="0 0 24 24">
              <path
                d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>














    <nav aria-label="Page navigation example">
      <ul class="flex items-center -space-x-px h-10 text-base max-w-32 mx-auto ">
        <li>
          <button @click="ffLeft(), ffColor()"
            class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 1 1 5l4 4" />
            </svg>
          </button>
        </li>
        <li v-for="page, index in totalPages">
          <button  :class="{ 'bg-blue-50': color[index] }" @click="currentPage = page, ffColor()"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{{ page }}</button>
        </li>
        <li>
          <button  @click="ffRight(), ffColor()"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ">
            <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 9 4-4-4-4" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </main>
</template>


<script setup>
import { useCart } from '../store/carStore'
import { FwbPagination } from 'flowbite-vue'
import db from '../db.json'
const runtimeConfig = useRuntimeConfig()
const cartStore = useCart();



const currentPage = ref(1)
const totalPages = ref([])


function ffPage() {
  for (let i = 1; i < Math.ceil(db.products.length / 10) + 1; i++) {
    totalPages.value.push(i)
  }
}
ffPage()


const color = ref([])
function ffColor(){
  color.value = []
  for(let i=0; i < totalPages.value.length; i++){
    if (totalPages.value[i] === currentPage.value){
    color.value.push(true)}
  else {
    color.value.push(false)}
  }
  console.log(color)
}

ffColor()


function ffRight(){
  if(currentPage.value === totalPages.value[totalPages.value.length - 1]){
  }
  else {
    currentPage.value = currentPage.value + 1
  }
}


function ffLeft(){
  if(currentPage.value === 1){
  }
  else {
    currentPage.value = currentPage.value - 1
  }
}


const otPrice = ref()
const doPrice = ref()
const otPriceVM = ref(2000000)
const doPriceVM = ref(12000000)
const sliderPrice = ref([2000000, 12000000])
function ffSliderPrice() {
  otPrice.value = String(sliderPrice.value[0])
  doPrice.value = String(sliderPrice.value[1])
}
watch(otPrice, () => {

  otPrice.value = Number(otPrice.value.replace(/\D/g, '')).toLocaleString();
  otPriceVM.value = (Number(otPrice.value.replace(/\D/g, '')))
  searchPush(), update()
})
watch(doPrice, () => {
  doPrice.value = Number(doPrice.value.replace(/\D/g, '')).toLocaleString();
  doPriceVM.value = (Number(doPrice.value.replace(/\D/g, '')))
  searchPush(), update()
})


const powerVM = ref([100, 550])
const colorsVM = ref([])

const kpp = ref([])
const kuzov = ref([])
const engine = ref([])
const mainInfo = ref(0)

const brands = ref()
const model = ref()

const sliderPower = ref([100, 550])
function ffSliderPower() {
  powerVM.value[0] = sliderPower.value[0]
  powerVM.value[1] = sliderPower.value[1]
}

const compareBrands = ref({})
const optionsBrands = ref()


function ffOptions() {
  const data = db.products
  let brand = []
  for (let i = 0; i < db.products.length; i++) {
    brand.push(data[i].brand)

  }
  optionsBrands.value = [...new Set(brand)]
  for (let i = 0; i < optionsBrands.value.length; i++) { // Brand : []
    compareBrands.value[optionsBrands.value[i]] = []
  }
  for (let i = 0; i < db.products.length; i++) { // Brand : ['Model1', 'Model2', ...]
    compareBrands.value[data[i].brand].push(data[i].model)
  }
}
ffOptions()





let search = []
function searchPush() { //строка поиска

  search = []
  for (let i = 0; i < colorsVM.value.length; i++) {
    search.push("&color=" + colorsVM.value[i])
  }
  search.push("&power_gte=" + powerVM.value[0] + "&power_lte=" + powerVM.value[1])
  search.push("&price_gte=" + otPriceVM.value + "&price_lte=" + doPriceVM.value)
  for (let i = 0; i < engine.value.length; i++) {
    search.push("&engine=" + engine.value[i])
  }
  for (let i = 0; i < kpp.value.length; i++) {
    search.push("&transmission=" + kpp.value[i])
  }
  for (let i = 0; i < kpp.value.length; i++) {
    search.push("&transmission=" + kpp.value[i])
  }
  for (let i = 0; i < kuzov.value.length; i++) {
    search.push("&kuzov=" + kuzov.value[i])
  }

  if (brands.value != undefined) {
    search.push("&brand=" + brands.value)
  }

  if (model.value != undefined || model.value != null) {
    search.push("&model=" + model.value)
  }
  console.log(search)
  console.log(model)
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


watch([colorsVM, powerVM.value, kuzov, kpp, brands, engine, model], () => {
  searchPush(), update()
})
watch(cartStore.cart, () => {
  syncSumm(), syncCompare()
})
watch(currentPage, () => {
  update()
})

watch(brands, () => {
  model.value = undefined
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


<style>
.slider-blue {
  --slider-connect-bg: #1a56db;
  --slider-tooltip-bg: #3B82F6;
  --slider-handle-ring-color: #3B82F630;
  --slider-height: 1px;
  --slider-handle-bg: #1a56db;
  --slider-handle-width: 13px;
  --slider-handle-height: 13px;

}

.multiselect-blue {
  --ms-tag-bg: #DBEAFE;
  --ms-tag-color: #2563EB;
  --ms-border-color-active: #0066ff;
  --ms-radius: 8px;
  --ms-ring-color: disabled;
  --ms-option-bg-selected: #0066ff;
  --ms-option-bg-selected-pointed: #3988fd;
}
</style>
<style src="@vueform/multiselect/themes/default.css"></style>
<style src="@vueform/slider/themes/default.css"></style>
<script>
import Multiselect from '@vueform/multiselect'
import Slider from '@vueform/slider'
import src from '@vueform/multiselect'
import { sr } from 'element-plus/es/locale'
export default {
  components: { Slider },
  components: {
    Multiselect,
  },
}
</script>
