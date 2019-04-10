<template>
  <div>
      <restaurantitem :item="item" :index="index" v-for="(item, index) of this.restaurantList" :key="index"></restaurantitem>
  </div>
</template>

<script>
import restaurantitem from "components/restaurant/restauritem";
export default {
  props: {
    restaurantlist: Array
  },
  data() {
    return {
      item:null,
      restaurantList: []
    };
  },
  components: {
    restaurantitem
  },
  watch: {
    //监听传过来的数据
    restaurantlist() {
      this.restaurantList = this.restaurantlist || [];
    }
  }
};
</script>

<style>
</style>
