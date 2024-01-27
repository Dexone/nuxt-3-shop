import { defineStore } from "pinia";

export const useCart = defineStore("cartStore", {
  // TODO add https://github.com/prazdevs/pinia-plugin-persistedstate

  state: () => ({ cart: [] }),
  getters: {
    getCart: (state) => state.cart,
    getCartLength: (state) => state.cart.length,
  },
  actions: {
    addToCart(value) {
      this.cart.push(value);
    },
  },
});
