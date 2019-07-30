<template>
  <div>
    <OrderInfo v-for="item in orders" :data="item" />
  </div>
</template>

<script>
import OrderInfo from './OrderInfo'
export default {
  date () {
    return {

    }
  },
  components: {
    OrderInfo
  },
  computed: {
    orders () {
      let array = this.$store.state.unFinishOrder
      array.push(...this.$store.state.finishedOrder)
      return array
    }
  }
}

</script>
