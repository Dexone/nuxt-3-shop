<template>
  <main class="bg-white  max-w-7xl mx-auto">

<div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow inline-block m-4"
      v-for="main, index in cartStore.favourite">

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


      <h5 class="mb-1 text-xl font-medium text-gray-900 ml-4">{{ main.price }} ₽</h5>
      <span class="text-sm text-gray-500 ml-4"> {{ Math.round(main.price / 84) }} ₽/мес</span>




      <div class="flex flex-col items-center pb-10">
        <div class="flex mt-4 md:mt-6">


          <a v-if="cartStore.compare[main.id] == -1"
            @click=" addToCart(main), syncCompare(), cartStore.cart[cartStore.compare[main.id]].amount++"
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">В
            корзину</a>



          <div v-else class="inline-flex rounded-md shadow-sm" role="group">

            <button v-if="cartStore.cart[cartStore.compare[main.id]].amount === 1"
              @click="cartStore.cart[cartStore.compare[main.id]].amount--, cartStore.deleteCart(cartStore.compare[main.id])"
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



          <a v-else @click="cartStore.deleteFavourite(cartStore.simile[main.id]), syncSimile()"
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

</main>
</template>


<script setup>
import { useCart } from '../store/carStore'
const cartStore = useCart();




watch(cartStore.cart, () => {
  syncSumm(), syncCompare(), console.log("Тест")
})


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

