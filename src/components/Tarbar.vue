<template>
    <div>
        <van-tabbar style="backgroud-color: blue">
            <van-tabbar-item icon="home-o" @click="goto('/create-order')">下单</van-tabbar-item>
            <van-tabbar-item icon="search" @click="goto('/list-order')" dot>订单</van-tabbar-item>
            <van-tabbar-item icon="friends-o" info="5">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<<script>
export default {
    methods: {
        goto (path) {
            this.$router.push(path);
        }
    },
}
</script>