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
        <li v-for="(item, i) of this.restaurants" :key="i">
          <img class="small_img" :src="shopImgList[i]" alt="">
          <div class="neirong">
          <div class="middle" v-if="item">
              <span class="miaoshu">{{item.restrantName}}</span>
              <span v-for="value of tags">{{value.name}}</span>
          </div>
            <span>评分{{rating[i]}}</span>
            </div>
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
import {getShop} from '@/api/home'
import shopImg from '@/mock/shopImage.json'
export default {
  data() {
    return {
      goods_list: [],
      search: "",
      showsearch: true,
      wordsList: [],
      restaurants: [],
      isclickSearch: false,
      shopList: [],
      shopImgList: [],
      tags: [{name:"蜂鸟", name_color: "2395FF"}],
      rating:[4.7,4.8,4.9,3.9,4.0,5.0,4.8,3.7,3.4,3.8]
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
    this.shopImgList = shopImg
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
        //    // 获取店铺列表
        let search = this.search
        console.log('search', search)
        getShop().then(res => {
          console.log('tres', res.data);
          // this.restaurants = res.data;
          this.restaurants = res.data.filter(item => {
            if (item.restrantName.toLowerCase().includes(search.toLowerCase())){
              return item
            }
          })
        })
        .catch(err => {
          Toast(err)
        })
      }
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
