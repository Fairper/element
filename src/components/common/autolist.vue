<template>
  <mt-swipe :auto="3000" class="mtswipe">
    <mt-swipe-item  v-for="item of this.banlist" :key="item.id">
      <img :src="item.image_hash|replaceAutoImg" alt="">
    </mt-swipe-item>
  </mt-swipe>
</template>

<script>
import { Swipe, SwipeItem } from "mint-ui";
export default {
  props: {
    autolist: Array
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem
  },
  data(){
    return{
      banlist:[]
    }
  },
  watch:{
   autolist(){
     this.banlist = this.autolist||[];
   }
  }
};
</script>

<style lang="stylus" scoped>
.mtswipe
  width 100%
  height 0.9rem
  padding:0 0.1rem
img 
    width 3.75rem
    height 1rem
</style>

