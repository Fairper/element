<template>
  <mt-swipe :auto="0" class="mtswipe">


  <mt-swipe-item>
  <!-- <a href="" v-for="value in 10">{{value}}</a> -->
    <div class="Div">
     <banner-item :item="item" v-for="item of this.arr1" :key="item.id"></banner-item>
    </div>
  </mt-swipe-item>
  <mt-swipe-item>
    <div class="Div">
     <banner-item :item="item" v-for="item of this.arr2" :key="item.id"></banner-item>
    </div>
  </mt-swipe-item>
  
</mt-swipe>

</template>

<script>
//父组件拿到轮播图的数据
import BannerItem from "components/banner/BannerItem";
import { Swipe, SwipeItem } from "mint-ui";
export default {
  props: {
    banner: Array
  },
  components: {
    "mt-swipe": Swipe,
    "mt-swipe-item": SwipeItem,
    BannerItem
  },
  data() {
    return {
      bannerOne: [],
      num: "",
      arr1: [],
      arr2: []
    };
  },
  watch: {
    banner() {
      this.bannerOne = (this.banner && this.banner[0].entries) || [];
      this.arr1 = this.bannerOne.slice(0, 10);
      this.arr2 = this.bannerOne.slice(10);
      this.num = this.bannerOne.length % 10;
      
    }
  }
};
</script>

<style lang="stylus" scoped>
.mtswipe {
  height: 1.7rem;
  width:100%;
  padding:0 0.1rem
}

.Div {
  display: flex;
  flex-wrap: wrap;
  height: 1.6rem;
  width: 100%;

}
</style>

