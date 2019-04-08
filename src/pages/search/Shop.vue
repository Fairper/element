<template>
  <div class="hole">
    <div class="sss">
        
        <ul class="menu_list">
        <li>综合排序</li>
        <li>距离最近</li>
        <li>品质联盟</li>
        <li>筛选</li>
      </ul>
      </div>
     
      <div id="scroll222">
        <div>
      <restaurantitem :item="item" v-for="(item, index) of this.shoplist" :key="index"></restaurantitem>
      </div>
      </div>
  </div>
  
   

</template>

<script>
import restaurantitem from "components/restaurant/restauritem";
import Bscroll from "better-scroll";
import http from "utils/http";
export default {
  props: {
    shopList: Array,
    search:""
  },
  data() {
    return {
      shoplist: [],
      item: null
    };
  },
  components: {
    restaurantitem
  },
  watch: {
    shopList() {
      this.shoplist = this.shopList || [];
    }
  },
  mounted(){
    let count = 15;
    let bscroll = new Bscroll("#scroll222",{
      probeType:1,
      click:true,
      pullUpLoad:{
        threshold:50
      }
    });
    bscroll.on("pullingUp",async()=>{
        let result = await http({
        method: "get",
        url:"/restapi/shopping/v2/restaurants/search?offset="+count+"&limit=15&keyword="+this.search+"&latitude=31.230378&longitude=121.473657&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5"
      });
      if (!!(result.inside&&result.inside[0].restaurant_with_foods)) {
        this.shoplist.push(...result.inside[0].restaurant_with_foods|| result.inside[1].restaurant_with_foods)
        this.$nextTick(() => {
          bscroll.refresh();
          this.$forceUpdate();
          count += 15;
          bscroll.finishPullUp();
        });
      } else {
        Toast({
          message: "到底了~",
          position: "bottom",
          duration: 1000
        });
      }
    })
  }
};
</script>

<style lang="stylus" scoped>
.hole {
  width: 100%;
  height: 100%;
  display flex
  flex-direction column
  position relative
 
}
.sss {
  line-height: 0.36rem;
  height: 0.36rem;

}

.menu_list 
  padding 0 0.1rem
  display: flex;
  line-height: 0.36rem;
  height: 0.36rem;
  font-size: 0.15rem;
  text-align: center;
  justify-content: space-between;
  z-index 99
  position relative
  background-color #ffffff
  


#scroll222
  height 100%
  

</style>

