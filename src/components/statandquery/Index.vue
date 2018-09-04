<template>
  <div class="">
    <side-nav></side-nav>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
import sideNav from './SideNav'
export default {
  components: {
    'side-nav': sideNav
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
