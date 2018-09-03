<template>
  <div class="main">
    <header class="homeHeader">
      <top-nav></top-nav>
    </header>
     <section class="mainContent relative">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import TopNav from 'components/TopNav/TopNav'
export default {
  components: {
    TopNav
  }
}
</script>

<style lang="less" scoped>

</style>


