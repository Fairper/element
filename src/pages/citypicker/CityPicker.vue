<template>
   <div class="contain" v-if="onoff">
        <header>
            <svg  @click="back" t="1541600743861" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4406" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M622.927311 789.137615c-6.503881 0-13.007763-2.16796-18.066337-7.226535l-231.249118-231.249118c-10.117149-10.117149-15.898377-23.847565-15.898377-39.023289 0-14.45307 5.781228-28.183486 15.898377-39.023288l231.971771-231.971772c10.117149-10.117149 26.015526-10.117149 35.410022 0 10.117149 10.117149 10.117149 26.015526 0 35.410021l-231.249118 231.971772c-0.722653 0.722653-1.445307 2.16796-1.445307 2.890614 0 0.722653 0 2.16796 1.445307 2.890614l231.249118 231.249118c10.117149 10.117149 10.117149 26.015526 0 35.410021-5.058574 5.781228-11.562456 8.671842-18.066338 8.671842z" p-id="4407"></path></svg>
            城市选择
           <svg @click="back" t="1541600797924" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5598" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><path d="M967.242322 547.307134 554.095747 138.604778c-14.622022-14.462387-38.406728-14.462387-53.020564 0L87.933725 547.307134c-7.359618 7.27673-7.423063 19.148106-0.14224 26.507724 7.28594 7.359618 18.244526 7.432273 25.604144 0.146333l87.887676-87.782276L201.283306 832.449359c0 19.386536 19.455097 30.489408 43.757596 30.489408l168.712493 0c20.380166 0 31.076786-9.848299 31.076786-30.489408L444.830181 626.473171c9.209756-1.583055 5.522784-7.082302 6.415107-7.082302l145.253198 0c0.155543 9.209756-1.242294 4.866844-1.242294 6.138814L595.256192 832.449359c0 19.386536 19.146059 30.489408 43.447535 30.489408l168.712493 0c20.380166 0 31.385824-9.848299 31.385824-30.489408L838.802044 474.628858l101.239775 99.332333c3.656273 3.615341 8.835226 5.418406 13.599739 5.418406 4.827959 0 9.868765-1.858324 13.534248-5.564739C974.458677 566.455239 974.60194 554.583864 967.242322 547.307134zM800.940738 825.075415 638.70475 825.075415c-1.697665 0 2.601244 3.107781-6.608511 2.815115L632.096239 625.530706c0-24.02723-11.42726-44.001143-30.883381-44.001143L451.245288 581.529563c-20.773116 0-44.277436 23.790846-44.277436 44.001143l0 199.545732L245.040902 825.076438c-1.697665 0 3.314489 3.107781-5.895267 2.815115L239.145635 449.115787l286.847054-283.857976 274.948049 272.281313L800.940738 825.075415z" p-id="5599"></path></svg>
        </header>

        <div class="wrap" id="router-view">
            <div style="background:rgb(238, 238, 238);background-clip:border-box;">
                <div class="dw">定位城市：<span>上海</span></div>
                <ul class="all">
                    <li v-for="value,key in allCities" @click="handleClick(key)" >{{key}}</li>
                </ul>
                <div v-for="value,key in allCities">
                    <!-- 子啊这卢卡斯的积分 -->
                    <h2 :ref="key">{{key}}</h2>
                    <ul class="cl">
                        <li  @click="pickIt(item.name)" v-for="item in value" :data-id="item.id">{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
   </div>

</template>


<script>
import http from "utils/http";
import BScroll from "better-scroll";
import { Indicator } from 'mint-ui'
import axios from 'axios'

export default {
  data() {
    return {
      hotCities: [],
      allCities: null,
      onoff:false
    };
  },

  async mounted() {

       Indicator.open({
          text:'加载中...',
          spinnerType:'fading-circle'
      })
    
    let result = await http({
      method: "get",
      url: "/cities.json"
    });
    console.log(result)
    console.log(result.hotCities)
    // this.hotCities = result.data.hotCities;
    this.allCities = result.cities;
    // console.log(result.data.hotCities)
    Indicator.close()

    this.onoff = true

    this.$nextTick(() => {
      this.bscroll = new BScroll('#router-view', {
        probeType: 1,
        click: true
      })

    })

  },
  methods:{
      handleClick(key){
          this.bscroll.scrollToElement(this.$refs[key][0],1500)
      },
      back(){
           this.$router.push('/home/bj')
      },
      titl(sp,name,id){
          this.$router.push('/home/index');
          this.$store.commit('changeCity', name)
          localStorage.city = name
          localStorage.cityId = id
      },    
      pickIt (city) {
      this.$router.push('/home/index')
      if (city) {
        this.$store.commit('changeCity', city)
      }
    },
  }

};
</script>

<style lang="stylus" scoped>
@import '~styles/border.styl';
.contain
    display flex
    flex-direction column
    height 100%
header 
    position relative
    z-index 90
    width 100% 
    height .45rem
    background skyblue
    font-size .18rem
    padding .1rem
    color #fff
    text-align center
    svg
       margin-top .04rem
       fill #fff
    svg:nth-child(1)
        float left
    svg:nth-child(2)
        float right
.wrap {
    padding:0.1rem;
    flex 1
    height 100%
    margin-top .2rem

    .dw {
        height: 0.4rem;
        padding: 0 0.2rem;
        line-height: 0.4rem;
        border: 1px #ddd8ce;
        background: white;

        span {
            color: #06c1ae;
        }
    }

    h2 {
        line-height: 0.4rem;
        margin-top: 0.2rem;
        font-size: 0.16rem;
        font-weight: 500;
    }

    .hot {
        display: flex;
        background: white;
        flex-wrap: wrap;

        li {
            width: 25%;
            text-align: center;
            line-height: 0.4rem;
        }
    }

    .all, .cl {
        display: flex;
        flex-wrap: wrap;

        li {
            width: 20%;
            color: #06c1ae;
            text-align: center;
            line-height: 0.4rem;
            background: white;

        }
    }

    .cl li {
        border: 1px #ccc;
        color: black;
    }
}
</style>
