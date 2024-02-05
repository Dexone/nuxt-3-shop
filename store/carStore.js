import { defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useCart = defineStore("cartStore", {
  state: () => ({ cart: [], summ: 0 }),
  getters: {
    getCart: (state) => state.cart,
    getSumm: (state) => state.summ,
    getCartLength: (state) => state.cart.length,
  },
  actions: {
    addToCart(value) {
      this.cart.push(value);
    },
    addSumm(value) {
      this.summ = this.summ + value.price
    },
    deleteCart(index) {
      this.cart.splice(index, 1)
    },
    deleteSumm(value) {
      this.summ = this.summ - value.price
    }
  },
  persist: true,
});
