<template>
  <div @click='goDetail()'>
    <van-cell-group :center='true'>
      <van-cell :class='{ completed: this.data.status === completed}'>
        <div>
          <span>{{getTime(data.fetchingTime)}}</span>
          <span class='right'>{{getTime(data.parkingTime)}}</span>
        </div>
        <div>
          <div class='car-img'>
            <img src='../../assets/fetch.png' height='50' width='50' />
          </div>
          <div class='middle'>
            <p>{{data.carNumber}}</p>
            <p>{{data.fetchPosition}}</p>
          </div>
          <div class='status-box'>
            <van-tag round :type='getType()'>{{getStatus()}}</van-tag>
          </div>
        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import moment from 'moment'
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
      completed: 7
    }
  },
  props: {
    data: Object
  },
  methods: {
    getTime (time) {
      return moment.unix(time).format('YYYY-MM-DD HH:MM')
    },
    getStatus () {
      return this.STATUS_TYPE['' + this.data.status]
    },
    goDetail () {
      this.$store.commit('setCurrentOrder', this.data)
      this.$router.push('/order-detail')
    },
    getType () {
      return this.data.status === this.completed ? 'success' : 'primary'
    }
  }
}

</script>
<style scoped>
  .right, .status-box{
    float: right;
  }

  .left, .middle, .car-img {
    float: left;
  }

  .middle {
    text-align: center;
    width: 40%;
  }

  .car-img {
    height: 50px;
    width: 30%;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  .status-box {
    text-align: right;
    width: 30%;
    height: 50px;
    line-height: 40px;
  }

  .completed {
    background-color: aliceblue;
  }

</style>
