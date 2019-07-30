<template>
  <div style="margin-left: 30px; margin-right: 30px">
    <van-cell-group>
      <van-field v-model="form.fetchPosition" required clearable label='地址' />
      <van-field required clearable label='停车时间' :placeholder="parkTimePlaceholder"
        @click="showParkTime=true; timeType=TIME_TYPE.PARK" />
      <van-field required clearable label='取车时间' :placeholder="fetchTimePlaceholder"
        @click="showFetchTime=true; timeType=TIME_TYPE.FETCH" />

      <van-popup v-model="showParkTime" round position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker @confirm="showTime" type="datetime" />
      </van-popup>

      <van-popup v-model="showFetchTime" round position="bottom" :style="{ height: '50%' }">
        <van-datetime-picker @confirm="showTime" type="datetime" />
      </van-popup>

      <van-field v-model="username" required clearable label='联系人' />
      <van-field v-model="telephone" label='联系电话' required />
      <van-field v-model="form.carNumber" label='车牌号' required />
    </van-cell-group>

    <van-button type="info" @click="createOrder()" style="width: 60%; margin-top: 30px">下单</van-button>
  </div>
</template>

<script>
  import moment from "moment"
  export default {
    data() {
      return {
        username: '',
        telephone: '',
        form: {
          fetchPosition: '',
          carNumber: '',
          parkingTime: '',
          fetchingTime: '',
        },

        showParkTime: false,
        showFetchTime: false,
        parkTimePlaceholder: '',
        fetchTimePlaceholder: '',

        timeType: 0,
        TIME_TYPE: {
          PARK: 0,
          FETCH: 1
        },
      }
    },
    methods: {
      showTime(value) {
        const time = moment(value).format('YYYY-MM-DD HH:mm:ss')

        if (this.timeType == this.TIME_TYPE.PARK) {
          this.showParkTime = false
          this.parkTimePlaceholder = time
          this.form.fetchingTime = moment(time).unix()
        } else {
          this.showFetchTime = false
          this.fetchTimePlaceholder = time
          this.form.parkingTime = moment(time).unix()
        }
      },
      createOrder() {
        this.$store.dispatch('createOrder', this.form)
      }
    },
    mounted() {
      this.$store.commit('clearOrders')
      this.$store.dispatch('getOrdersByStatus', 'false')
      this.$store.dispatch('getOrdersByStatus', 'true')
    },
  }

</script>
