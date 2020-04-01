<template>
<div id="cart">
  <h2>Your Cart</h2>
  <p v-show="!products.length"><i>Please add some products to cart.</i></p>
  <ul>
    <li
      v-for="product in products"
      :key="product.id"
    >
      {{ product.title }} - {{ product.price | currency }} x {{ product.quantity }}
      <button @click="removeProductFromCart(product)">Remove</button>
    </li>
    <p>Total: {{ total | currency }}</p>
    <p><button :disabled="!products.length" @click="checkout(products)">Checkout</button></p>
    <p v-show="checkoutStatus">checkout {{ checkoutStatus }}</p>
  </ul>
</div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },
  methods: {
    ...mapActions('cart', [
      'removeProductFromCart'
    ]),
    checkout (products) {
      this.$store.dispatch('cart/checkout', products);
    }
  }
}
</script>