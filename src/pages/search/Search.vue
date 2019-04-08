<template>
<div class="control2">
<div class="qwer">
<div id="scroll">
  <div>
    <div class="search">
      <span class="iconfont icon-houtui" @click="back"></span>
      <div class="serch_box">
        <i class="iconfont  icon-sousuo"></i>
        <input class="search_input" type="text" placeholder="输入商家、商品" v-model="search" @keyup="search_info">
      </div>
    </div>
    <div v-if="!isclickSearch">
      <div v-show="showsearch">
        <h2>热门搜索</h2>
        <ul  class="hot_search" v-if="this.goods_list">
          <li v-for="item of goods_list">{{item.word}}</li>
        </ul>
      </div>

    <div v-show="!showsearch">
       <p v-show="this.restaurants&&this.restaurants.length==0">搜索{{this.search}}</p>
      <ul class="restaurants">
        <li v-for="item of this.restaurants">
          <img class="small_img" :src="item.image_path|replaceAutoImg" alt="">
          <div class="neirong">
          <div class="middle" v-if="item">
              <span class="miaoshu">{{item.name}}</span>
              <span v-for="value of item.tags">{{value.name}}</span>
          </div>
            <span>评分{{item.rating}}</span>
            </div>
        </li>
      </ul>
       <ul class="wordss">
        <li v-for="value in this.wordsList">
         <i class="iconfont sousuo_icon">&#xe513;</i>
          <p>{{value}}</p>
        </li>
      </ul> 
    </div>
    </div>
</div>
</div>

  </div>
    <div class="control" v-if="isclickSearch">
    <shop :shopList="shopList" :search="search"></shop>
    </div>
</div>
</div>
</template>

<script>
import Shop from "pages/search/Shop";
import http from "utils/http";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      goods_list: [],
      search: "",
      showsearch: true,
      wordsList: [],
      restaurants: [],
      isclickSearch: false,
      shopList: []
    };
  },
  components: {
    Shop
  },
  mounted() {
    let bscroll = new Bscroll("#scroll", {
      probeType: 1,
      click: true,
      pullUpLoad: {
        threshold: 50
      }
    });
  },
  methods: {
    back () {
      this.$router.push('/home/index')
    },
    async search_info() {
      this.showsearch = false;
      console.log(this.search);
      if (this.search == "") {
        this.showsearch = true;
      }
      //进行http请求
      if (this.search != "") {
        let result = await http({
          method: "get",
          url:
            "/restapi/shopping/v1/typeahead?kw=" +
            this.search +
            "&latitude=31.230378&longitude=121.473657&city_id=1"
        });
        console.log(result);
        this.wordsList = result.words || [];
        console.log(this.wrodList);
        this.restaurants = result.restaurants;
      }
    },
    // async search_shop() {
    //   if (this.search) {
    //     this.isclickSearch = true;
    //     //进行数据请求
    //     console.log(this.search);
    //     let result = await http({
    //       method: "get",
    //       url:
    //         "/restapi/shopping/v2/restaurants/search?offset=0&limit=15&keyword=" +
    //         this.search +
    //         "&latitude=31.230378&longitude=121.473657&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5"
    //     });
    //        //  if (result.inside&&result.inside[0].restaurant_with_foods) {
    //     if (result.inside&&result.inside[0]) {
    //       this.shopList = result.inside[0].restaurant_with_foods|| result.inside[1].restaurant_with_foods;
    //     }
    //     console.log(this.shopList);
    //   }
    // }
  },
  watch: {
    search() {
     
    }
  },
  async beforeCreate() {
    let result = await http({
      method: "get",
      url:
        "/restapi/shopping/v3/hot_search_words?latitude=31.230378&longitude=121.473657"
    });
    console.log(result);
    this.goods_list = result;
  }
};
</script>
<style lang="scss" scoped>
// @import '~styles/border.styl';

.sousuo_icon{
    margin-left: 0.25rem
}
.icon-sousuo{
    margin-left:0.1rem;
} 
.control2{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction:  column
}
 
.control{
  height:100%
}
#scroll {
  width: 100%;
  height: 100%;
}

h2 {
  margin-left: 0.1rem;
  margin-top: 0.1rem;
}

.search {
  padding-top: .1rem;
  margin-left: 0.08rem;
  display: flex;
  width: 3.62rem;
  height: 0.4rem;
  justify-content: space-between;
  position :relative;
  z-index :999;
  background-color :#fff;
  
 

  &>p {
    line-height: 0.3rem;
    font-size: 0.16rem;
  }
}
.qwer{
  position: relative;
  z-index: 1
}
.serch_box {
  width: 2.78rem;
  background-color: #f8f8f8;
  &>input {
    line-height: 0.3rem;
    height: 0.3rem;
    border: 0 0 0 0, white;
    border-width: 0;
    color: black;
    background-color: #f8f8f8;
    width: 2.33rem;
    position:relative;
    margin-left:0.1rem;
  }

  &>img {
    line-height: 0.3rem;
    height: 0.3rem;
  }
}

.hot_search {
  height: 0.8rem;
  flex-wrap: wrap;
  display: flex;
  margin-top: 0.1rem;

  &>li {
    margin-left: 0.1rem;
    line-height: 0.35rem;
    height: 0.35rem;
    font-size: 0.14rem;
    padding-left: 0.1rem;
    background: #f7f7f7;
    padding-right: 0.1rem;
  }
}

.restaurants {
  width: 100%;
}

.restaurants >li {
  display: flex;
  justify-content: space-around;
  height: 0.54rem;
  line-height: 0.54rem;
  width: 100%;
}

.restaurants>img {
  width: 0.3rem;
  height: 0.3rem;
  margin-left: 0.15rem;
  margin-top: 0.15rem;
}

.neirong {
  width: 3.06rem;
  border: 0 0 1px 0, #ccc;
  display: flex;
}

.middle {
  padding-left: 0.05rem;
  width: 2.5rem;
    
  &>span:nth-child(2) {
    background-color: pink;
    color: white;
    margin-left: 0.08rem;
  }

  &>span:nth-child(3) {
    color: white;
    margin-left: 0.08rem;
    background-color: skyblue;
  }
}

.wordss {
  width: 100%;

  &>li {
    display: flex;
    width: 100%;
    height: 0.42rem;
    line-height: 0.42rem;
    justify-content: space-between;

    &>p {
      width: 3.2rem;
      border: 0 0 1px 0, #cccccc;
    }
  }
}

.small_img {
  width: 0.3rem;
  height: 0.3rem;
  margin-left: 0.15rem;
  margin-top: 0.15rem;
}
</style>
