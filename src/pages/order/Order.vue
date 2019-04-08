<template>
  <div class="cart"> 
     <div class="topbar">
        <div>
            <i class="iconfont" @click="goback">&#xe613;</i>
            <p class="cartSpan">购物车</p>
            <!-- <span class="iconfont"  @click="backHome">&#xe607;</span> -->
        </div>
         
     </div>

      <div class="main">
         <List @cancelAll="cancelAll"></List>
         
      </div>      
      <div class="select">
         <div class="selectAll">
            <span id="selectAll" class="iconfont" @click="selectAll" :class="cancel && All && totalNum?'active':''">&#xe60a;</span> 
           <label for="selectAll">全选</label>
         </div>
         <div class="totalPrice">
            合计<span>￥{{toFixed}}</span>
         </div>
         <div class="goToClear">
            去结算(<span>{{selectNum}}</span>)
         </div>
      </div>
  </div>
</template>

<script>
 import List from "./List"
 import {mapState,mapGetters} from "vuex"

export default{
  components:{
    List
  },
  data(){
    return {
      cancel:true
    }
  },
  computed:{
    ...mapState(["All","selectNum","carPro","totalNum"]),
    ...mapGetters(["toFixed"])
  },
  methods:{
    goback(){
      this.$router.go(-1)
    },
    selectAll(){
       var fromCartTotalPrice = 0;
       if (!this.All) {
         for(var i=0;i<this.carPro.length;i++){
           fromCartTotalPrice+=Number(this.carPro[i].price*this.carPro[i].num);
         }
       }
       this.$store.dispatch("changeAll",{flag:!this.All,fromCartTotalPrice})
    },
    cancelAll(status){
      this.cancel = status;
    }
  }
}

</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl';
.cart
   height 100%
   display flex
   flex-direction column
   justify-content space-between
   background-color #fff
   .main
      flex 1
      background-color #eee

.topbar
   height .72rem
   width 3.75rem
   line-height .42rem
   div
      border-bottom 1px solid #ddd
   i 
      margin-left .15rem
   .cartSpan
      margin-left .2rem
      display inline-block
      width 73%
      text-align center
      font-size .16rem
   span 
      font-size .22rem
      color #888
      margin-left .1rem
   .tips
      width 100%
      height .3rem
      font-size .12rem
      color #999
      text-align left
      line-height .3rem
      margin-left .2rem

.select
   height .49rem
   width 100%
   margin-bottom .49rem
   .selectAll,.totalPrice
      float left
      line-height .49rem
   .selectAll
      display flex
      align-items center
      height 100%
      margin-left .1rem
      #selectAll
         width .2rem
         height .2rem
         border 1px solid #aaa 
         border-radius 50%
         text-align center 
         line-height .2rem
         color #fff
         &.active
            background-color $base-color
            border 1px solid $base-color
      label 
         margin-left .15rem

   .totalPrice
      margin-left .15rem
      span 
         color $base-color
         font-size .16rem

   .goToClear
      width 1.25rem
      height .36rem
      float right
      background-color $base-color
      border-radius .18rem
      line-height .36rem
      text-align center
      color #fff
      margin-right .1rem
      margin-top .05rem
</style>


