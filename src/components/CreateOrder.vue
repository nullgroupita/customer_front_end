<template>
    <div>
        <van-cell-group>
            <van-field
                v-model="address"
                required
                clearable
                placeholder="联系人"
            />
            <van-field
                v-model="password"
                placeholder="联系电话"
                required
            />
            <van-field
                v-model="password"
                placeholder="车牌号"
                required
            />
            <van-field
                v-model="password"
                placeholder="username"
                required
            />
            <van-field
                v-model="password"
                placeholder="username"
                required
            />
        </van-cell-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            address: '',
            password: '',
        }
    }
}
</script>