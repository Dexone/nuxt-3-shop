<script setup>
import { useCart } from '../store/carStore'
const store = useCart();


</script>
  
<template>
  {{ store.cart }}
  <h1>cart</h1>
  <div id="box" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow " v-for="main, index in store.getCart">
    <div class="p-5">


      <h5 class="mb-2 text-1xl font-bold text-gray-900">
        <NuxtLink :to="`/store/${main.id}`">
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


    </div>
  </div>
</template>
  
  

  