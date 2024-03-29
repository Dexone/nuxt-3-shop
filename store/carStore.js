import { defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useCart = defineStore("cartStore", {
  state: () => ({ cart: [], summ: 0, cartLength: 0, compare: [], favourite: [], simile: [] }),
  getters: {
    getCart: (state) => state.cart,
    getSumm: (state) => state.summ,
    getCartLength: (state) => state.cartLength,
    getCompare: (state) => state.compare,
    getFavourite: (state) => state.favourite,
    getSimile: (state) => state.simile,
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

    syncCompare() {
      this.compare = []
      let idArray = []
      for (let i = 0; i < this.cart.length; i++) {
        idArray.push(this.cart[i].id)
      } //получили массив с id товаров в корзине
      let a = 0
      for (let b = 0; b < 22; b++) {
        this.compare.push(idArray.indexOf(a))
        a++
      }
    },

    syncSimile() {
      this.simile = []
      let idArray = []
      for (let i = 0; i < this.favourite.length; i++) {
        idArray.push(this.favourite[i].id)
      } //получили массив с id товаров в корзине
      let a = 0
      for (let b = 0; b < 22; b++) {
        this.simile.push(idArray.indexOf(a))
        a++
      }
    },

    deleteCart(index) {
      this.cart.splice(index, 1)
    },

    addToFavourite(value) {
      this.favourite.push(value);
    },

    deleteFavourite(index) {
      this.favourite.splice(index, 1)
    },
  },
  persist: true,
});
