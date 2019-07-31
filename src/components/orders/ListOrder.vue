<template>
  <div>
      <van-loading v-if='loading' color="#1989fa" />
      <OrderInfo v-for="item in orders" :data="item" :key="item.id"/>
  </div>
</template>

<script>
import OrderInfo from './OrderInfo'
import api from '../../api'
export default {
  data () {
    return {
      loading: true,
      orders: []
    }
  },
  components: {
    OrderInfo
  },
  methods: {
    async getOrders () {
      const res = await api.getOrdersByStatus('true')
      const res2 = await api.getOrdersByStatus('false')
      if (res.retCode === 200 && res2.retCode === 200) {
        this.orders.push(...res2.data)
        this.orders.push(...res.data)
        this.loading = false
      } else {
        this.$notify('网络错误')
      }
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getOrders()
    })
  }
}

</script>
