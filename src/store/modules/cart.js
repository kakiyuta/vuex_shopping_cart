import shop from '../../api/shop'

// state初期値
const state = {
  items: [],
  checkoutStatus: null
}

// ゲッター
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({id, quantity}) => {
      const product = rootState.products.all.find(product => product.id === id);
      return {
        title: product.title,
        price: product.price,
        quantity
      }
    });
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }
}

// ミューテーション
const mutations = {
  pushProductToCart (state, {id}) {
    state.items.push({
      id,
      quantity: 1
    })
  },

  incrementItemQuantity (state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
  },

  setCartItems (state, {items}) {
    state.items = items
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status;
  }
}

// アクション
const actions = {
  checkout ({commit, state}, products) {
    const savedCartItems = [...state.items];
    commit('setCheckoutStatus', null);
    commit('setCartItems', { items: [] });
    shop.buyProducts(
      products,
      () => commit('setCheckoutStatus', 'successful'),
      () => {
        commit('setCheckoutStatus', 'failed');
        commit('setCartItems', { items: savedCartItems });
      }
    );
  },

  addProductToCart ({state, commit}, product) {
    commit('setCheckoutStatus', null);
    if (product.inventory > 0) {
      const cartItem = state.items.find(item => item.id === product.id);
      if (!cartItem) {
        commit('pushProductToCart', {id: product.id});
      }
      else {
        commit('incrementItemQuantity', cartItem);
      }
      // 在庫を減らす
      commit('products/decrementProductInventory', {id: product.id}, {root:true});
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}