<template>
<div class="test">
   <div class="bottom" @click="goOrder()">
      <i v-if="totalNum>0" class="iconfont ic_color">&#xe502;</i>
      <i v-else class="iconfont">&#xe501;</i>
      <div class="bottom_right">
      
      <span v-if="totalNum>0"  class="have_price">商品数量 {{totalNum}}</span>
      <span v-else>商品数量</span>
       <span v-if="totalPrice1>0" class="have_price">总计 ¥{{totalPrice1}}</span>
       <span v-else>商品价格</span>
      </div>
      
   </div>
<div class="scroll">
   <div>
       <div class="top">
           <div class="nav">
                  <img class="img2" v-if="this.shopData" :src="shopImage[index]" alt=""> 
           </div>
           <div class="introduce">
               <h2 v-if="this.shopData.restrantName">{{this.shopData.restrantName}}</h2>
               <div><span v-if="this.shopData" style="margin-right:10px;">评价 4.8</span>
                <span v-if="this.shopData">月售4728单</span>
                
               </div>
               <div>
                 
               </div>
               <h3 v-if="this.shopData">公告:无辣不欢系列，开启全新辣味盛宴！更有多种美食</h3>
           </div>
       </div>
       <div class="tab">
           <div><p @click="click_now('diancan')" :class="{'active':currentTab=='diancan'}">点餐</p></div>
           <div><p @click="click_now('pinjia')" :class="{'active':currentTab=='pinjia'}">评价</p></div>
           <div><p @click="click_now('shangjia')" :class="{'active':currentTab=='shangjia'}">商家</p></div>
       </div>
       <keep-alive>
        <diancan   :wholedate="shopData"  v-if="currentTab=='diancan'" :is="currentTab" keep-alive></diancan>
       </keep-alive>
        <pinjia v-if="currentTab=='pinjia'" :is="currentTab"></pinjia>
        <shangjia v-if="currentTab=='shangjia'" :is="currentTab"></shangjia>
   </div>
 </div>

</div>


</template>

<script>
import http from "utils/http";
import {getOneShop} from '@/api/detail.js'
import diancan from "./diancan";
import pinjia from "./pinjia";
import shangjia from "./shangjia";
import Bscroll from "better-scroll";
import {mapState} from 'vuex'
// import shopData from '@/mock/shop.json'
import shopImage from '@/mock/shopImage.json'
export default {
  data() {
    return {
      rst: "",
      currentTab: "diancan",
      aaa: "",
      wholedate: null,
      shopData: [],
      index: null,
      shopImage: []
    };
  },
    computed:{
        ...mapState(["totalNum","totalPrice1"])
    },
  mounted(){
   let bscroll = new Bscroll(".scroll", {
      probeType: 1,
      click: true,
      bounce:false
    });
    this.shopImage = shopImage
    this.index = this.$router.history.current.query.index;
    console.log('index', this.shopImage[this.index])
  },
  async beforeCreate() {
    let id = this.$router.history.current.query.id;
    var str =
    "ubt_ssid=n0tsks7qphxcl5r77rnwti5dbgu3f3sy_2019-02-15; _utrace=b6f3505ab72805f91e95b30af4087604_2019-02-15; perf_ssid=lsg1l52fufeq70ymumv9m5rz71yvo99w_2019-02-15; ubt_ssid=n0tsks7qphxcl5r77rnwti5dbgu3f3sy_2019-02-15; cna=NlXtFIn68BUCAT0zOJ92GQfm; _utrace=b6f3505ab72805f91e95b30af4087604_2019-02-15; track_id=1550215000|427f76bbe812daf6a60242ee6459461504f95413fc2993f8fa|2864e11432e9070916209420a3992532; USERID=990127602; UTUSER=990127602; SID=YyzCYCOOFYGe9oKJE58hWWubYd268l5rxV0Q; isg=BI-P1hWZD-AH8gsbyBDUMhduHiNZHOLRyvfRwqGcK_4FcK9yqYRzJo0hdqZODrtO"
      // "ubt_ssid=9vp18nnqkr7dxxgz1k6cutefjd203jfq_2018-11-03; _utrace=275835b5aa326b7c6dc56d8bf17fc08a_2018-11-03; perf_ssid=vcht4lrpthebva7fnx1d4uhji06w4u4q_2018-11-03; cna=vLMgFMz271ACAW/L/iIxN03+; track_id=1541776489|13c0f33e79212b5c06ac8a0da4e6e4456cf8e079b97fa8124e|39f25adb895807c14d3defd113485189; USERID=269228362; SID=Ie1ocH8lZxrFch0S8Xtuhl6yT55dZ8omG3VQ; isg=BIqKYDct5SOHW2m0LYG8y_H523AmckoJtwC0cRTDP11oxyuB_Arg5KZ20zUbM4Zt";
    var arr = str.split("; ");
    arr.forEach(element => {
      document.cookie = element;
    });
    getOneShop({id: Number(id)}).then(res => {
      if(!!res.data[0]) {
        this.shopData = res.data[0]
      }
      console.log('ress', this.shopData)
    })
    .catch(err => {
      Toast(err)
    })
    // var url =
    //   "/pizza/shopping/restaurants/" +
    //   this.$router.history.current.query.id +
    //   "/batch_shop?user_id=990127602&code=0.6089330042345715&extras=%5B%22activities%22%2C%22albums%22%2C%22license%22%2C%22identification%22%2C%22qualification%22%5D&terminal=h5&latitude=31.230378&longitude=121.473657";
    // console.log(url);
    // let result = await http({
    //   method: "get",
    //   url: url,
    //   withCredentials:true
    // });
    // if(!!shopData){
    //   this.rst = shopData.rst;
    //   console.log(' this.rst',  this.rst.name)
    // }
    
  },
  methods: {
      goOrder(){
      this.$router.push('/home/order')
      },
    click_now(tab) {
      this.currentTab = tab;
    }
  },
  components: {
    diancan,
    pinjia,
    shangjia
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/border.styl';
@import '~styles/ellipsis';
.ic_color
   color skyblue
   
.have_price
   background skyblue
   padding 0 0.2rem    
   font-weight 700
   font-size .16rem
   color white
.bottom_right
    margin-left 0.30rem
    width 3rem
    height 0.5rem
    line-height 0.5rem
    display flex
    justify-content space-between
 &>span
      height 0.5rem
      line-height 0.5rem
.bottom
    width 100%
    height 0.5rem
    background-color  grey
    position absolute
    bottom 0
    z-index 9
    display flex
    &>i
      height 0.5rem 
      font-size 0.3rem
      line-height 0.5rem
      margin-left 0.1rem

.scroll
    height 100%
    width 100%
    display flex
    flex-direction column
.test
    height 100%
    width 100%    
h3 {
    ellipsis(1);
}

h2 {
    font-size: 0.2rem;
}

.top {
    height: 2.3rem;
    position relative
    z-index 9
}

.img1 {
    height: 1rem;
    width: 100%;
    position relative
   
}

.img2 {
    width: 0.75rem;
    height: 0.75rem;
    position: absolute;
    left: 50%;
    margin-left: -0.35rem;
    top: 0.4rem;
}

.nav {
    height: 1rem;
    background-color white
    
    position relative
    z-index 9
}

.introduce {
    height: 1.3rem;
    padding-top: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position relative
    z-index 9
    background-color white
}

.tab {
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    position relative
    z-index 9
    background-color white
    &>div {
        width: 33.3%;
        text-align: center;
        height: 0.4rem;

        &>p {
            margin: 0 auto;
            text-align: center;
            height: 0.4rem;
            line-height: 0.4rem;
            width: 0.3rem;
        }
    }
}

.active {
    border: 0 0 2px 0, skyblue;
}
</style>
