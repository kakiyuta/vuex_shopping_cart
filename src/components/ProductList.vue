<template>
<div id="product_list">
  <ul>
    <li
      v-for="product in products"
      :key="product.id"
    >
      <!-- 「currency」はテキストフォーマットのルールの定義（フィルター）。ここでは通貨「＄」表記を定義している -->
      {{product.title}} - {{product.price | currency}}
      <button
        :disabled="!product.inventory"
        @click="addProductToCart(product)"
      >
        Add to cart
      </button>
      &emsp;-&emsp;
      inventory:{{product.inventory}}
    </li>
  </ul>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      products: state => state.products.all
    })
  },
  methods: {
    ...mapActions('cart', [
      'addProductToCart'
    ])
  },
  created () {
    this.$store.dispatch('products/getAllProducts');
  }
}
</script>