<template>
    <div>
        <p>哈哈</p>
    </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$store.commit('updateTitle', '我')
  }
}
</script>
