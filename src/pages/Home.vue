<template>
<div class="total">
  <main>
  <router-view></router-view>
  </main>
    <TabBar></TabBar>
  </div>
</template>

<script>
// import TabBar from 'Bacomponents/layout/Tabr'
import TabBar from '../components/layout/TabBar'

export default {
  components: {
    TabBar
  }
};
</script>

 <style lang="stylus" scoped>
.total
  display  flex
  flex-direction column
  height 100%
  width 100%
  main
    width 100%
    flex 1
    overflow hidden

    
</style>

