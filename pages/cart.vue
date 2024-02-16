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




















              <div class="inline-flex text-xl items-center text-base font-semibold text-gray-900 mr-2">
                {{ main.amountSumm }} ₽



              </div>




                <a v-if="cartStore.cart[index].amount === 1">

                  <button @click="cartStore.cart[index].amount--, cartStore.deleteCart(index)" type="button"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                    -
                  </button>

                </a>
                <a v-else>
                  <button
                    @click="cartStore.cart[index].amountSumm = cartStore.cart[index].amountSumm - main.price, cartStore.cart[index].amount--"
                    type="button"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100">
                    -
                  </button>
                </a>

                <a type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200">
                  {{
                    cartStore.cart[index].amount }}
                </a>


                <button
                  @click="cartStore.cart[index].amountSumm = cartStore.cart[index].amountSumm + main.price, cartStore.cart[index].amount++"
                  type="button"
                  class=" px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 ">
                  +
                </button>

            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>


  