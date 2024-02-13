import { defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useCart = defineStore("cartStore", {
  state: () => ({ cart: [], summ: 0, cartLength: 0 }),
  getters: {
    getCart: (state) => state.cart,
    getSumm: (state) => state.summ,
    getCartLength: (state) => state.cartLength,
  },
  actions: {
    addToCart(value) {
      this.cart.push(value);
    },
    syncSumm() {
      this.summ = 0
      this.cartLength = 0
      for (let i = 0; i < this.cart.length; i++) {
        this.summ = this.summ + this.cart[i].amountSumm
        this.cartLength = this.cartLength + this.cart[i].amount
      }
    },
    deleteCart(index) {
      this.cart.splice(index, 1)
    },

  },
  persist: true,
});
