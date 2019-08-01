<template>
  <div>
    <van-nav-bar :title="this.$store.state.title" style='color: blue' />
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
  }
}
</script>
