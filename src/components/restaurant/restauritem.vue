<template>
  <div class="item_list" :id="item.restaurant.id" @click="godetail()">
    <div class="img">
      <img class="img2"  :src="item.restaurant.image_path|replaceAutoImg" alt="">
    </div>
    <div class="detail">
      <p>{{item.restaurant.name}}</p>
      <div class="danzi">
          <div>
            <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" alt="">
            <span>{{item.restaurant.rating}}</span>
            <span>月售{{item.restaurant.recent_order_num}}单</span>
          </div>
          <div class="fenniao"><p v-if="item.restaurant.delivery_mode">{{item.restaurant.delivery_mode.text}}</p></div>
      </div>

      <div class="yunfei">
          <div>
            <span>¥{{item.restaurant.piecewise_agent_fee.rules[0].price}}起送</span>
            <span>|</span>
            <span>{{item.restaurant.piecewise_agent_fee.tips}}</span>

          </div>
          <div>
            <span>2.5km</span>
            <span>|</span>
            <span>{{item.restaurant.order_lead_time}}分钟</span>
          </div>
      </div>
      <div class="title" v-if="item.restaurant.support_tags.length>0">
          <span v-for="(value, index) of item.restaurant.support_tags" :key="index">{{value.text}}</span>
      </div>
        <!-- <span v-if="item.restaurant.support_tags">{{item.restaurant.support_tags[0].text}}</span>
        <span v-if="item.restaurant.support_tags">{{item.restaurant.support_tags[1].text}}</span> -->
      

      <div class="new">
        <div>
          <span class="shou" v-if="item.restaurant.activities&&item.restaurant.activities.length>0">{{item.restaurant.activities[0].icon_name}}</span>
          <span v-if="item.restaurant.activities&&item.restaurant.activities.length>0" >{{item.restaurant.activities[0].description}}</span>
        </div>
        <div>
          <span v-if="item.restaurant.activities">{{item.restaurant.activities.length}}个活动</span>
        </div>
      </div>
      <div class="manjian">
        <span class="jian" v-if="item.restaurant.activities&&item.restaurant.activities.length>1">{{item.restaurant.activities[1].icon_name}}</span>
        <span v-if="item.restaurant.activities&&item.restaurant.activities.length>1">{{item.restaurant.activities[1].description}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  data() {
    console.log('itemmmmmmmmmmmmmm', this.item)
    return{
     id:""
    }
  },
  methods:{
    godetail(){
      console.log('this.item.restaurant.id----------------', this.item.restaurant.id);
      this.id = this.item.restaurant.id
      //路由携带id 进行跳转到详情页面
      this.$router.push({path:'/detail',query:{id:this.id}})
      
    }
      }
};
</script>

<style lang="stylus" scoped>
@import '~styles/border.styl';
@import '~styles/ellipsis.styl';  
.fenniao
  background-color #00a8ff 
  color white
.detail>p
  font-size .14rem
  color #000000
  font-weight 600



.item_list {
  width: 100%;
  height: 1.7rem;
  display: flex;
  border 0 0 1px 0, #ccc
  padding-top 0.1rem 
}

.img 
  width: 0.7rem;
  height: 0.7rem;
  margin-left 0.1rem
  
.img2
  width 0.7rem
  height 0.7rem

.detail {
  width: 2.8rem;
  height: 1.4rem;
  margin-left .1rem
}

.danzi 
  display: flex;
  width: 2.8rem;
  height: 0.12rem;
  line-height .12rem
  font-size .12rem
  margin-top 0.1rem
  justify-content: space-between;
&>span 
       margin-left 0.05rem


.yunfei {
  display: flex;
  width: 2.8rem;
  height: 0.12rem;
  linehe  .12rem;
  font-size .12rem
  margin-top 0.1rem
  justify-content: space-between;
}

.new {
  display: flex;
  width: 2.8rem;
  height: 0.12rem;
  line-height .12rem
  font-size  .12rem
  justify-content: space-between;
  margin-top .12rem
}
.manjian
  display: flex;
  width: 2.8rem;
  height: 0.12rem;
  line-height .12rem
  font-size  .12rem
  margin-top .1rem
.name
  font-size .16rem
.title
  height .12rem
  line-height .12rem
  font-size .12rem  
  margin-top 0.13rem
  &>span 
    border 1px
    padding 0.02rem
.manjian>span
  ellipsis(1)    
.shou
  background-color #70bc46
  color white
.jian
  background-color pink 
  color white
</style>

