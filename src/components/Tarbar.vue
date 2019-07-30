<template>
  <div>
    <van-tabbar :change="changeActive" v-model="active">
      <van-tabbar-item name="home" icon="home-o" @click="goto('/create-order')">下单</van-tabbar-item>
      <van-tabbar-item name="history" icon="search" @click="goto('/list-order')" dot>订单</van-tabbar-item>
      <van-tabbar-item name="my" icon="friends-o" info="5" @click="goto('/about-me')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 'home'
    }
  },
  methods: {
    goto (path) {
      this.$router.push(path)
    },
    changeActive (name) {
      this.active = name
    }
  }
}

</script>
