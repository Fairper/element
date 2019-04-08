<template>
  <div class="test">
    <h2 v-if="this.Recommend">{{this.Recommend.name}}</h2>
    <div id="scroll">
      <ul class="hen_ul" v-show="itemss.length>0">
        <li class="hen_li" v-if="itemss.length>0" :item="item" v-for="item of itemss">
          <img class="img" :src="item.image_path|replaceAutoImg" alt>
          <h2>{{item.name}}</h2>
          <span>{{item.tips}}</span>
          <!-- <span>{{item.specfoods[0].price}}</span> -->
        </li>
      </ul>
    </div>
    <div class="main">
      <div class="scroll_left">
        <ul class="left_content">
          <li
            :class="{'active':index==active}"
            @touchstart="check_show(index)"
            item:="item"
            v-for="(item,index) of menu"
          >
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="scroll_right">
        <div class="right_content">
          <div v-for="(item,index) of menu">
            <p class="top_name" ref="index">{{item.name}}</p>
            <div class="right" v-for="(value,index) of item.foods">
              <div>
                <img class="img1" :src="value.image_path|replaceAutoImg" alt>
              </div>
              <div class="price_list">
                <span class="caiming">{{value.name}}</span>
                <span>{{value.tips}}</span>
                <span class="description">{{value.description}}</span>
                <div class="shop">
                  <span class="jiage">¥{{value.specfoods[0].price}}</span>
                  <div class="jisuan">
                    <span
                      @touchstart="reduce(index,value)"
                      :class="status[index]?'visi':'hide'"
                      :id="value.virtual_food_id"
                    >-</span>
                    <span :class="status[index]?'visi':'hide'">{{numbers[index] || number}}</span>
                    <span @touchstart="add(index,value)" :id="value.virtual_food_id">+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import Vue from "vue";
export default {
  props: {
    wholedate: Object
  },
  data() {
    return {
      Wholedate: null,
      Recommend: null,
      itemss: [],
      menu: [],
      active: 0,
      index: 0,
      bscroll2: Object,
      isvisible: false,
      index1: -1,
      status: [],
      numbers: [],
      number: 0,
      total: []
    };
  },
  watch: {
    wholedate: function(val) {
      console.log("vallll", val);
    }
  },
  mounted() {
    this.dataUpdata();
    var bscroll = new Bscroll("#scroll", {
      probeType: 1,
      click: true,
      scrollX: true
    });
    var bscroll3 = new Bscroll(".scroll_left", {
      probeType: 1,
      click: true
    });

    this.bscroll2 = new Bscroll(".scroll_right", {
      probeType: 1,
      click: true
    });
    console.log(this.$refs[this.index]);
  },
  methods: {
    dataUpdata() {
      this.Wholedate = this.wholedate || "";
      if (!!this.Wholedate) {
        this.menu = this.Wholedate.menu;
        if (this.Wholedate.recommend[0] || this.Wholedate.recommend[1]) {
          this.Recommend =
            this.Wholedate.recommend[0] || this.Wholedate.recommend[1];
        }
        console.log('this.Recommend', this.Wholedate)
        if (!!this.Recommend) {
          this.itemss = this.Recommend.items;
        }
      }
    },
    check_show(index) {
      this.active = index;
      this.index = index;
      console.log(this.$refs.index[this.index]);
      this.bscroll2.scrollToElement(this.$refs.index[this.index], 500, true, 0);
    },
    add(index, value1) {
      console.log("click");
      var num = this.numbers[index] || this.number;
      num++;
      this.index1 = index;
      Vue.set(this.status, index, true);
      Vue.set(this.numbers, index, num);

      var a = this.total.findIndex((value, index, arr) => {
        return value.id == value1.virtual_food_id;
      });
      console.log(a);
      if (a === -1) {
        var obj = {
          id: value1.virtual_food_id,
          name: value1.name,
          num: this.numbers[index],
          price: value1.specfoods[0].price,
          img: value1.image_path
        };
        this.total.push(obj);
      } else {
        this.total[a].num = this.numbers[index];
      }
      console.log(this.total);
      //this.total  是数组 里面存储着多个对象 对象存储价格 文字等数据
      this.$store.dispatch("addToCar", this.total);

      /*遍历数组中的对象
         var flag = true;
        for(var i =0 ;i<this.total.length;i++){
            if (this.total[i].id==value.virtual_food_id) {
                this.total[i].num = this.numbers[index]
                flag = false;
                break;
            }
        }
        if (flag) {
         var obj = {
             id:value.virtual_food_id,
             name:value.name,
             num:this.numbers[index]
          }
          this.total.push(obj);
        }
        console.log(this.total)

         var obj = {
             id:value.virtual_food_id;
             name:value.name,
             num:this.numbers[index]
          }
          this.total.push(obj);
          console.log(this.total)
         */
    },
    reduce(index, value1) {
      var num = this.numbers[index] || this.number;
      num--;
      num = num < 0 ? 0 : num;
      if (num == 0) {
        Vue.set(this.status, index, false);
      }
      Vue.set(this.numbers, index, num);
      var iIndex = this.total.findIndex((value, index, arr) => {
        return value.id == value1.virtual_food_id;
      });
      this.total[iIndex].num = this.numbers[index];
      this.$store.dispatch("addToCar", this.total);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/ellipsis';

.description {
  ellipsis(2);
}

.bottom {
  width: 100%;
  height: 0.5rem;
  background-color: grey;
  position: fixed;
  top: 0;
  float: left;
  z-index: 9;
}

.visi {
  text-align: center;
  visibility: show;
}

.hide {
  visibility: hidden;
}

.shop {
  display: flex;
  width: 1.8rem;
  justify-content: space-between;
}

.jisuan {
  width: 0.7rem;
  height: 0.27rem;
  display: flex;
  text-align: center;

  &>span {
    line-height: 0.27rem;
    width: 33.3%;
    border-radius: 50%;
    background-color: skyblue;
    text-align: center;
  }
}

.jiage {
  color: red;
  font-weight: 800;
  font-size: 0.18rem;
}

.caiming {
  ellipsis: 1;
  font-size: 0.16rem;
  font-weight: 800;
}

.top_name {
  height: 0.16rem;
  line-height: 0.16rem;
  margin-top: 0.06rem;
}

.price_list {
  margin-left: 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
}

h2 {
  position: relative;
  z-index: 9;
  background-color: white;
  width: 100%;
}

.right {
  display: flex;
  margin-top: 0.15rem;
}

.img1 {
  width: 0.95rem;
  height: 0.95rem;
}

.main {
  width: 100%;
  display: flex;
  height: 6rem;
  margin-top: 0.05rem;
}

.right_content {
  flex: 1;
}

.left_content {
  width: 0.8rem;

  &>li {
    height: 0.5rem;
    width: 0.8rem;
    line-height: 0.5rem;
    text-align: center;
    ellipsis: 1;
  }
}

.hen_ul {
  width: max-content;
  height: 1.8rem;
  display: flex;
  position: relative;
  z-index: 9;
  background-color: white;
}

.hen_li {
  float: left;
  width: 1.2rem;
  height: 1.8rem;
  margin-left: 0.05rem;
}

.img {
  width: 1.2rem;
  height: 1.2rem;
}

.active {
  background-color: skyblue;
}
</style>

