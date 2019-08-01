<template>
  <div>
    <van-pull-refresh v-model="loading" @refresh="refresh">
      <OrderInfo v-for="item in orders" :data="item" :key="item.id"/>
    </van-pull-refresh>
    <van-loading v-if='firstLoading' color="#1989fa" />
  </div>
</template>

<script>
import OrderInfo from './OrderInfo'
import api from '../../api'
export default {
  data () {
    return {
      firstLoading: true,
      loading: false,
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
        this.orders.splice(0, this.orders.length)
        this.orders.push(...res2.data)
        this.orders.push(...res.data)
        this.firstLoading = false
        this.loading = false
      } else {
        this.$notify('网络错误')
      }
    },
    refresh () {
      this.$nextTick(function () {
        this.getOrders()
      })
    }
  },
  mounted: function () {
    this.$store.commit('updateTitle', '列表')
    this.$nextTick(function () {
      this.getOrders()
    })
  }
}

</script>
