import shop from '../../api/shop.js'

// state初期値
const state = {
  all: []
}

// ゲッター
const getters = {}

// アクション
const actions = {
  getAllProducts ({commit}) {
    shop.getProducts(products => {
      commit('setProducts', products);
    });
  }
}

// ミューテーション
const mutations = {
  setProducts (state, products) {
    state.all = products;
  },

  decrementProductInventory (state, {id}) {
    const product = state.all.find(product => product.id == id);
    product.inventory--;
  },

  incrementProductInventory (state, {id}) {
    const product = state.all.find(product => product.id == id);
    product.inventory++;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}