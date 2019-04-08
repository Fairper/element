<template>
  <a href="##">
    <div>
     <img :src="item.image_hash | replaceImg ">
    </div>
        <!-- <img :src="item.img | replaceWH('128.180')" onerror="this.style.visibility='hidden'">		 -->
    <span>
      {{item.name}}
    </span>
  </a>
</template>

<script>
export default {
  props:{
    item:Object
  },
  filters:{
    replaceImg(value){
      
      //substr(start,length)表示从start位置开始，截取length长度的字符串。
     let one = value.substr(0,1);
     let two = value.substr(1,2);
     let three = value.substr(3)
     let imgurl = "https://fuss10.elemecdn.com/"+one+"/"+two+"/"+three+".jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/"
      return imgurl
      //console.log("https://fuss10.elemecdn.com/"+one+"/"+two+"/"+three+"?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/")
     
    }
  }
}
</script>

<style lang="stylus" scoped>
a
 width  20%
 height 0.6rem
 display flex
 flex-direction column 
 justify-content center
 align-items center
img 
  width 0.4rem
  height 0.4rem

</style>


</style>
