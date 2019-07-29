<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="form.address"
                required
                clearable
                placeholder="地址"
            />
            <van-field
                required
                clearable
                :placeholder="parkTimePlaceholder"
                @click="showParkTime=true; timeType=TIME_TYPE.PARK"
            />
            <van-field
                required
                clearable
                :placeholder="fetchTimePlaceholder"
                @click="showFetchTime=true; timeType=TIME_TYPE.FETCH"
            />
            
            <van-popup
                v-model="showParkTime"
                round
                position="bottom"
                :style="{ height: '50%' }"
            >
                <van-datetime-picker  
                    @confirm="showTime"
                    type="datetime" 
                />
            </van-popup>

            <van-popup
                v-model="showFetchTime"
                round
                position="bottom"
                :style="{ height: '50%' }"
            >
                <van-datetime-picker 
                    @confirm="showTime"
                    type="datetime" 
                />
            </van-popup>
                
            <van-field
                v-model="form.username"
                required
                clearable
                placeholder="联系人"
            />
            <van-field
                v-model="form.telephone"
                placeholder="联系电话"
                required
            />
            <van-field
                v-model="form.carNumber"
                placeholder="车牌号"
                required
            />
        </van-cell-group>

        <van-button type="info" @click="createOrder()" style="width: 60%; margin-top: 30px">下单</van-button>
    </div>
</template>

<script>
import moment from "moment"
export default {
    data () {
        return {
            form: {
                id: '',
                address: '',
                telephone: '',
                carNumber: '',
                username: '',
                parkTime: '',
                fetchTime: '',
            },

            showParkTime: false,
            showFetchTime: false,
            parkTimePlaceholder: '停车时间',
            fetchTimePlaceholder: '取车时间',

            timeType: 0,
            TIME_TYPE: {
                PARK: 0,
                FETCH: 1
            },           
        }
    },
    methods: {
        showTime (value) {
            const time = moment(value).format('YYYY-MM-DD HH:mm:ss')

            if (this.timeType == this.TIME_TYPE.PARK) {
                this.showParkTime = false
                this.parkTimePlaceholder = time
                this.form.fetchTime = moment(time).unix()
            } else {
                this.showFetchTime = false
                this.fetchTimePlaceholder = time
                this.form.parkTime = moment(time).unix()
            }
        },
        createOrder () {
            console.log(this.form)
        }
    },
}
</script>