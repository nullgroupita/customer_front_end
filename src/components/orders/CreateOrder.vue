<template>
  <div class='order-box'>
    <van-cell-group>
      <van-field v-model='form.fetchPosition' required clearable label='地址' />
      <van-field required clearable label='停车时间' :placeholder='parkTimePlaceholder'
        @click='showParkTime=true; timeType=TIME_TYPE.PARK' />
      <van-popup :overlay=false v-model="loading"><van-loading size='50px' v-if='loading' color="#1989fa">正在下单...</van-loading></van-popup>

      <van-field required clearable label='取车时间' :placeholder='fetchTimePlaceholder'
        @click='showFetchTime=true; timeType=TIME_TYPE.FETCH' />

      <van-popup v-model='showParkTime' round position='bottom' style='height: 50%'>
        <van-datetime-picker @confirm='showTimeAndGetPrice' type='datetime' :min-date="getParkMinDate" :max-date="getMaxDate"/>
      </van-popup>

      <van-popup v-model='showFetchTime' round position='bottom' style='height: 50%'>
        <van-datetime-picker @confirm='showTimeAndGetPrice' type='datetime' :min-date="getFetchDate" :max-date="getMaxDate"/>
      </van-popup>

      <van-field v-model='username' required clearable label='联系人' />
      <van-field v-model='telephone' label='联系电话' required />
      <van-field v-model='form.carNumber' label='车牌号' required />
    </van-cell-group>

    <div class='price-box' v-if='this.form.price != -1'>
      <span class='left'>其他停车场</span>
      <span>我们</span>
      <span class='right'>节省</span>
    </div>
    <div class='price-box' v-if='this.form.price != -1'>
      <span class='left'>{{otherParkingLotPrice.toFixed(2)}} 元</span>
      <span>{{this.form.price.toFixed(2)}} 元</span>
      <span class='right'>{{(otherParkingLotPrice - this.form.price).toFixed(2)}} 元</span>
    </div>

    <van-button type='info' @click='createOrder()' style='width: 60%; margin-top: 15px'>{{buttonMessage}}</van-button>
  </div>
</template>

<script>
import moment from 'moment'
import api from '../../api'
export default {
  data () {
    return {
      username: '',
      telephone: '',
      form: {
        fetchPosition: '',
        carNumber: '',
        parkingTime: '',
        fetchingTime: '',
        price: -1
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

      parkMinDate: '',
      fetchMinDate: '',
      maxDate: '',

      loading: false,

      buttonMessage: '下单',

      otherParkingLotPrice: ''
    }
  },
  computed: {
    getParkMinDate () {
      return new Date()
    },
    getFetchDate () {
      return new Date(moment().add(60, 'm').format('YYYY-MM-DD HH:MM:SS'))
    },
    getMaxDate () {
      return new Date(moment().add(1, 'M').format('YYYY-MM-DD HH:MM:SS'))
    }
  },
  methods: {
    showTimeAndGetPrice (value) {
      const time = moment(value).format('YYYY-MM-DD HH:mm:ss')

      if (this.timeType === this.TIME_TYPE.PARK) {
        this.showParkTime = false
        this.parkTimePlaceholder = time
        this.form.parkingTime = moment(time).unix()
      } else {
        this.showFetchTime = false
        this.fetchTimePlaceholder = time
        this.form.fetchingTime = moment(time).unix()
      }

      const pl = this.parkTimePlaceholder.length
      const fl = this.fetchTimePlaceholder.length
      if (pl !== 0 && fl !== 0) {
        this.getPrice()
      }
    },
    async getPrice () {
      const res = await api.getPrice({
        parkingTime: this.form.parkingTime,
        fetchingTime: this.form.fetchingTime
      })
      this.otherParkingLotPrice = res.data.realPrice
      this.form.price = res.data.discounPrice
    },
    async createOrder () {
      this.loading = true
      const res = await api.createOrder(this.form)
      this.loading = false
      if (res.retCode === 200) {
        this.$notify({
          message: '下单成功',
          background: '#1989fa'
        })
        this.$router.push('/list-order')
      } else {
        this.$notify('您有未完成的订单，无法下单')
      }
    }
  },
  mounted () {
    this.$store.commit('updateTitle', '下单')
    this.parkMinDate = new Date()
    this.fetchMinDate = new Date(moment().add(60, 'm').format('YYYY-MM-DD HH:MM:SS'))
    this.maxDate = new Date(moment().add(1, 'M').format('YYYY-MM-DD HH:MM:SS'))
  }
}
</script>
<style scope>
  .order-box {
    margin-left: 30px;
    margin-right: 30px
  }

  .price-box {
    margin-top: 10px;
    text-align: center;
    background-color: aliceblue
  }

  .left {
    float: left;
    width: 35%
  }

  .right {
    float: right;
    width: 35%
  }
</style>
