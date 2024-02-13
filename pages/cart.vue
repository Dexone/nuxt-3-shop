<script setup>
import { useCart } from '../store/carStore'
const cartStore = useCart();

function deleteCart(index) {
  cartStore.deleteCart(index)
}


function syncSumm() {
  cartStore.syncSumm();
}
watch(cartStore.cart, () => {
  syncSumm()
})
</script>


<template>
  <div class="max-w-4xl mx-auto mt-14">
    <div class="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 ">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900 ">Сумма товаров:</h5>
        <a class="text-sm font-medium text-blue-600 hover:underline ">
          {{ cartStore.summ }} ₽
        </a>
      </div>
      <div class="flow-root">
        <ul class="divide-y divide-gray-200 ">
          <li class="py-3 sm:py-4" v-for="main, index in cartStore.getCart">



            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="w-22 h-14 rounded-full" :src=main.image[1]>
              </div>
              <div class="flex-1 min-w-0 ms-4">
                <p class="text-xl font-medium text-gray-900 truncate ">
                  {{ main.model }} {{ main.year }}
                </p>
                <p class="text-s text-gray-500 truncate d">
                  {{ main.power }}л.с. / {{ main.engine }} / {{
                    main.transmission }} / {{ main.kuzov }} / {{ main.color }}
                </p>
              </div>

              <!-- <button
                @click="cartStore.cart[compareIndex[main.id]].amountSumm = cartStore.cart[compareIndex[main.id]].amountSumm + main.price, addSumm(main), cartStore.cart[compareIndex[main.id]].amount++">+</button>{{
                  cartStore.cart[compareIndex[main.id]].amount }}<button
                @click="cartStore.cart[compareIndex[main.id]].amountSumm = cartStore.cart[compareIndex[main.id]].amountSumm - main.price, deleteSumm(main), cartStore.cart[compareIndex[main.id]].amount--">-</button> -->



              <div class="inline-flex text-xl items-center text-base font-semibold text-gray-900 ">
                {{ main.amountSumm }} ₽



                <button @click="deleteCart(index)" type="button"
                  class="text-blue-700  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center">
                  <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>


  