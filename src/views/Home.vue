<template>
    <div>
        <van-nav-bar title="标题" style='color: blue'/>
        <router-view/>
        <Tarbar />
    </div>
</template>

<<script>
import Tarbar from '../components/Tarbar'
export default {
    data () {
        return {

        }
    },
    components: {
        Tarbar
    }
}
</script>