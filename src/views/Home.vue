<template>
  <div>
    <van-nav-bar title="标题" style='color: blue' />
    <router-view />
    <Tarbar />
  </div>
</template>

<script>
import Tarbar from '../components/Tarbar'
export default {
  data () {
    return {
    }
  },
  components: {
    Tarbar
  },
  mounted () {
    this.$store.dispatch('getCustomerData')
    this.$store.commit('clearOrders')
    this.$store.dispatch('getOrdersByStatus', 'false')
    this.$store.dispatch('getOrdersByStatus', 'true')
  }
}
</script>
