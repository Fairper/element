<template>
<div id="scroll" style="overflow:scroll;">
  <div>
    <div class="top">
      <div @click="goCity()" class="location">{{city}}</div>
      <div class="input" @click="goSearch()">
        <input  type="text" readonly="true" placeholder="搜索饿了么商家、商品名称">
      </div>
    </div>
    <!-- 小图标 -->
    <swipe-list :banner="banner"></swipe-list>
    <!-- 两个轮播图 -->
    <auto-list :autolist="autolist" ></auto-list>
      <h2>---推荐商家---</h2>
      <!-- <ul class="menu_list">
        <li>综合排序</li>
        <li>距离最近</li>
        <li>品质联盟</li>
        <li>筛选</li>
      </ul> -->
      <!-- 商家 -->
    <restaurantlist :restaurantlist="restaurantlist"></restaurantlist>
  </div>
</div>

</template>

<script>
//首页 全部都是可以滚动的,把轮播当做组件处理
//暂且写静态的,滚动事件后面处理,
//当前页面进行网络数据请求，将banner图的数据传递给
//swiper组件
import {getCookStyle, getShop} from '@/api/home'
import { Toast } from 'mint-ui';
import {mapState} from 'vuex';
import http from "utils/http";
import axios from "axios";
import SwipeList from "components/banner/SwipeList";
import AutoList from "components/common/autolist";
import restaurantlist from "components/restaurant/restaurantList";
import { scroll } from "utils/scroll";
import Bscroll from "better-scroll";
import restaurantData from '@/mock/resList.json'
export default {
  computed:{
  ...mapState(['city'])
  },
  components: {
    SwipeList,
    AutoList,
    restaurantlist
  },
  data() {
    return {
      banner: [],
      autolist: [],
      restaurantlist: [],
      test: Object,
      cache: []
    };
  },
  methods: {
    goSearch() {
      console.log(this.$router);
      this.$router.push("/search");
    },
    goCity(){
      this.$router.push("/cities")
    }
  },
  updated() {
    console.log(22)
  },
  mounted() {
    let count = 8;
    //声明bscroll
    let bscroll = new Bscroll("#scroll", {
      probeType: 1,
      click: true,
      bounce:false,
      pullUpLoad: {
        threshold: 50
      }
    });
        // 获取店铺列表
    getShop().then(res => {
      console.log('tres', res.data);
      this.restaurantlist = res.data;
      this.cache = res.data;
      let restaurantlist = res.data
    })
    .catch(err => {
      Toast(err)
    })
          // //监听 pullingUp 触发加载更多
      bscroll.on("pullingUp", () => {
        console.log(this.restaurantlist ,'this.restaurantlist ', this.cache)
        if (!!this.cache ) {
          console.log('restaurantlist.length', this.cache.length)
            this.restaurantlist.push(...this.cache);
            this.$nextTick(() => {
              bscroll.refresh();
              bscroll.finishPullUp();
            })
          // }  
        } else {
          console.log(44)
              Toast({
                message: "到底了~",
                position: "bottom",
                duration: 1000
              });
            }

      });
  },
  async beforeCreate() {
   var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				if(keys) {
					for(var i = keys.length; i--;)
						document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
				}
    let autoPlayResource = await http({
      method: "get",
      url:
        "/restapi/shopping/v2/banners?consumer=1&type=1&latitude=31.230378&longitude=121.473657",
        withCredentials:false
    });
    //获取banner 菜系
    getCookStyle().then(res => {
      this.banner = res.data[0].cookingStyleArr
    })
    .catch(err => {
      Toast(err)
    })
    this.autolist = autoPlayResource;
    //获取店家数据
    // let restaurantSource = await axios({
    //   method: "get",
    //   url:
    //     "/restapi/shopping/v3/restaurants?latitude=31.230378&longitude=121.473657&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5",
    //     withCredentials:false
    // });
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/border.styl';

.top {
  width: 100%;
  height: 0.96rem;
  background-color: skyblue;
  padding-top: 0.1rem;
}

.location {
  color: white;
  line-height: 0.18rem;
  height: 0.18rem;
  font-weight: 700;
  padding-left: 0.15rem;
  font-size: 0.18rem;
}

.input {
  height: 0.52rem;
  width: 100%;
  background-color: white;
  margin-top: 0.16rem;
  background-color: skyblue;

  &>input {
    height: 0.36rem;
    width: 3.5rem;
    text-align: center;
    margin-top: 0.08rem;
    margin-left: 0.12rem;
  }
}


h2 {
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.16rem;
}

.menu_list {
  border: 0 0 1px 0, skyblue;
  display: flex;
  line-height: 0.36rem;
  height: 0.36rem;
  font-size: 0.15rem;
  text-align: center;
  justify-content: space-between;
  color:#666;
  padding 0 0.1rem;
  font-weight:600
}

#scroll {
  width: 100%;
  height: 100%;
}
</style>

