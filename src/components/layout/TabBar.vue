<template>
  <ul>
    <router-link to="/home/index" tag="li" active-class="active"><i class="iconfont icon-changyonglogo401"></i><em class="">首页</em></router-link>
    <!-- <router-link to="/home/discover" tag="li" active-class="active"><i class="iconfont icon-faxian" ></i><em>发现</em></router-link> -->
    <router-link to="/home/order" tag="li" active-class ="active"><i class="iconfont icon-icon--copy"></i><em>订单</em></router-link>
    <router-link to="/home/mine" tag="li" active-class="active"><i class="iconfont icon-wode"></i><em>我的</em></router-link>
  </ul>
</template>

<script>
export default {};
</script>
<style lang="stylus" scoped>
@import '~styles/border.styl';
ul
  border 1px 0 0 0, #ccc
  width 100%
  height 0.5rem
  display  flex
  justify-content  space-between
  align-items center

  li
    display flex
    flex-direction column
    justify-content center
    align-items center
    flex 1
    i
      font-size .23rem
.active
  color skyblue  
</style>


