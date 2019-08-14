<template>
  <div>
    I am test 121

    <div v-for='order in orders' :key='order.id'>
      <p>{{ order.type }}</p>
      <p>{{ order.content }}</p>
    </div>
  </div>
</template>
<script>
export default {
  asyncData({ store, route }) {
    return store.dispatch('getOrders')
  },
  computed: {
    orders() {
      return this.$store.state.orders
    }
  }
}
</script>
