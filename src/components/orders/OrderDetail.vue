<template>
  <div class="detail-box">
    <div>
      <img src="../../assets/car.png" />
      <span>{{order.carNumber}}</span>
      <span style="float: right;">{{getStatus(order.status)}}</span>
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

    <div style="text-align: center; margin-top: 30px">
      <van-button type="info" v-if="order.status === 7">确认</van-button>
    </div>
  </div>
</template>

<script>
  import moment from "moment"
  export default {
    data() {
      return {
        STATUS_TYPE: {
          0: '停车未接单',
          1: '停车已结单',
          2: '已被取车',
          3: '取车未接单',
          4: '取车被接单',
          5: '已从停车场取车',
          6: '已还车',
          7: '完成'
        },
        order: '',
      }
    },
    methods: {
      getBoyName(boy) {
        return boy != null ? boy.name : '未知'
      },
      getTime(time) {
        return moment.unix(time).format('YYYY-MM-DD')
      },
      getParkingLotName(parkingLot) {
        return parkingLot != null ? parkingLot.position : '未知'
      },
      getStatus(status) {
        return this.STATUS_TYPE['' + status]
      },
    },
    mounted() {
      this.order = this.$store.state.currentOrder
    },
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
    height: 35px;
    width: 35px;
    margin-right: 20px;
  }

  span {
    margin-bottom: 10px;
    height: 50%;
    top: 20%
  }

</style>
