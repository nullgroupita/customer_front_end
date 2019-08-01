<template>
  <div class="detail-box">
    <div>
      <img src="../../assets/car.png" />
      <span>{{order.carNumber}}</span>
      <span class="status">{{getStatus(order.status)}}</span>
    </div>
    <div>
      <img src="../../assets/person.png" />
      <span>{{getBoyName(order.parkingBoy)}}</span>
    </div>
    <div>
      <img src="../../assets/person.png" />
      <span>{{getBoyName(order.fetchingBoy)}}</span>
    </div>
    <div>
      <img src="../../assets/clock.png" />
      <span>{{getTime(order.fetchingTime)}}</span>
    </div>
    <van-popup :overlay=false v-model="loading"><van-loading size='50px' v-if='loading' color="#1989fa">正在完成订单...</van-loading></van-popup>
    <div>
      <img src="../../assets/clock.png" />
      <span>{{getTime(order.parkingTime)}}</span>
    </div>
    <div>
      <img src="../../assets/position.png" />
      <span>{{order.fetchPosition}}</span>
    </div>
    <div>
      <img src="../../assets/p.png" />
      <p style="display: inline; height: 80%">{{getParkingLotName(order.parkingLot)}}</p>
    </div>
    <div>
      <img src="../../assets/money.png" />
      <span>{{order.price}}</span>
    </div>

    <div class="button-box">
      <van-button type="info" :disabled=disabled v-if="order.status === 5 || order.status === 6" @click='finishOrder()'>{{buttonMessage}}</van-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import api from '../../api'
export default {
  data () {
    return {
      STATUS_TYPE: {
        0: '停车未接单',
        1: '停车已接单',
        2: '已被取车',
        3: '取车未接单',
        4: '取车被接单',
        5: '已从停车场取车',
        6: '已还车',
        7: '完成'
      },
      order: '',
      buttonMessage: '完成订单',
      disabled: false,
      loading: false
    }
  },
  methods: {
    getBoyName (boy) {
      return boy != null ? boy.name : '未知'
    },
    getTime (time) {
      return moment.unix(time).format('YYYY-MM-DD')
    },
    getParkingLotName (parkingLot) {
      return parkingLot != null ? parkingLot.position : '未知'
    },
    getStatus (status) {
      return this.STATUS_TYPE['' + status]
    },
    async finishOrder () {
      this.loading = true
      const res = await api.finishOrder({
        ordersId: this.order.id,
        status: 7
      })
      if (res.retCode === 200) {
        this.loading = false
        this.$notify({
          message: '已完成订单',
          background: '#1989fa'
        })
        this.$router.push('/list-order')
      } else {
        this.$notify('网络错误')
      }
    }
  },
  mounted () {
    this.$store.commit('updateTitle', '详情')
    this.order = this.$store.state.currentOrder
  }
}

</script>

<style scoped>
  .detail-box {
    margin-left: 20px;
    margin-right: 20px;
  }

  div {
    margin-top: 10px;
    text-align: left;
  }

  img {
    height: 30px;
    width: 30px;
    margin-right: 20px;
  }

  span {
    margin-bottom: 10px;
    height: 50%;
    top: 20%
  }

  .status {
    float: right;
  }

  .button-box {
    text-align: center;
    margin-top: 30px
  }

</style>
