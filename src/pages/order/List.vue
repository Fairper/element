<template>
   <div class="content">
     <ul class="list">
        <li v-for="(item,index) of carPro" :key=item.id class="list-item">
            <div class="select-single">
               <span @click="selected(index)" class="iconfont" :class="(select[index])?'active':''">&#xe60a;</span>
            </div>
            <img :src="item.img|replaceAutoImg" alt="">
            <div class="des">
                 {{ item.name}}</p>
               <div class="num"><span>X{{item.num}}</span> </div>
               <div>
                  <span>单价 ¥{{item.price}}</span>
                  <!-- <span @click="toEdit(index,item.num)">编辑</span> -->
                  <!-- <div class="edit" :class="isShow && index == Dindex?'show':'hide'"> -->
                     <div id="opera">
                        <!-- <span class="iconfont sub" @click="sub">&#xe637;</span> -->
                        <!-- <span>{{tempNum}}</span> -->
                        <!-- <span class="iconfont add" @click="add">&#xe604;</span> -->
                     </div>
                     <div id="del_ok">
                        <span>¥{{item.price*item.num}}</span>
                        <div>
                           <!-- <span  @click="remove(index,item.id,item.num)">删除</span>
                           <span  @click="finish(index,item.num,item.id)">完成</span> -->
                        </div>
                        
                     </div>
                  <!-- </div> -->
               </div>
            </div>
        </li>
     </ul>
   </div>
</template>

<script>
import {mapState} from "vuex"
import Vue from  "vue"
export default{
      props:["cancelAll"],
    computed:{
          ...mapState(["carPro","All"])
    },
    mounted(){
          console.log("0000")
          console.log(this.carPro);
    },
    data(){
          return{
                select:[],
                flag:true
          }
    },
    watch:{
          All(){
                //将子按钮的状态和 全选按钮的状态一致
                Vue.set(this.select,this.carPro.length,this.All);
                for(var i =0;i<this.select.length;i++){
                      Vue.set(this.select,i,this.All)
                }
          },
          select(){
              this.flag = true;//控制全选按钮的样式
              for(var i=0;i<this.select.length;i++){
                    if (!this.select[i]) {
                          this.flag= false;
                          break;
                    }
              }
              if (this.flag) {//全部子元素全部被选中了 ,改变strore 中 all 的状态
              var  fromCartTotalPrice=0;
              for(var i =0;i<this.carPro.length;i++){
                   fromCartTotalPrice +=this.carPro[i].num*Number(this.carPro[i].price)
              }
                     this.$store.dispatch('changeAll',{flag:this.flag,fromCartTotalPrice})
              }
             this.$emit("cancelAll",this.flag)

          }
    },
    methods:{
      selected(index){
             //选中子按钮
             var price = Number(this.carPro[index].price);
             if (!!this.select[index]) {
                   Vue.set(this.select,index,false);
                   this.$store.dispatch('changeNum',-this.carPro[index].num)
                   this.$store.dispatch('changeTotalPrice',-this.carPro[index].num*price)
             }else{
                   Vue.set(this.select,index,true);
                   this.$store.dispatch('changeNum',this.carPro[index].num);
                   this.$store.dispatch('changeTotalPrice',this.carPro[index].num*price)
             }
      }
    }

}

</script>

<style lang="stylus" scoped>
@import '~styles/variables.styl';
.content
   margin-top .1rem
   .list-item  
      height 1.04rem
      width 100%
      background-color #fff
      border-bottom 1px solid #ccc
      padding-top .1rem
      position relative
      img 
         width .84rem
         margin-left .1rem
         float left
         vertical-align middle
         // margin-top .1rem
      .select-single
         line-height 0.94rem
         height 100%
         margin-left .1rem
         float left
         span:nth-of-type(1)
            width .2rem
            height .2rem
            border 1px solid #aaa
            border-radius 50%
            text-align center
            line-height .2rem
            color #fff
            &.active
               background-color $base-color
               border 1px solid $base-color

         
      .des
         float left
         width 2.33rem
         margin-left .1rem
         p
            font-size .13rem
            color #333
            span 
               color $base-color
         .num
            width 100%
            height .16rem
            span 
               float right
               color #aaa
         >div:nth-of-type(2)
            line-height .16rem
            width 100%
            display flex
            justify-content space-between
            span:nth-of-type(1)
               color $base-color
               font-size .16rem
            span:nth-of-type(2)
               font-size .12rem
   .edit
      width 2.43rem
      height .53rem
      background-color #fff
      position absolute
      top .5rem
      right 0
      #opera
         width 100%
         height .23rem
         >span 
            display block
            float left 
            width .22rem
            height .23rem
            border-radius 50%
            border 1px solid #eee
            background-color #fff
            line-height .23rem
            text-align center
            color black
            font-weight 500
         span:nth-of-type(2){
            border none
            margin 0 .07rem
         }
      #del_ok
         height .25rem
         line-height .25rem
         >span 
            float left
         >div
            float right
            margin-right .1rem
            span 
               // padding 0.05rem
            margig-right .05rem
            span:nth-of-type(1)
               border-right 1px solid #aaa
               color black
               font-size .12rem
               padding-right .05rem
            span:nth-of-type(2)
               margin-left .05rem

   .hide
      display none
   .show
      display show
</style>


