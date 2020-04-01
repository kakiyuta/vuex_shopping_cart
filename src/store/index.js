import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products.js'
import cart from './modules/cart.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    cart
  }
})
