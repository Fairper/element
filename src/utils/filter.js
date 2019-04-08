import Vue from 'vue'

Vue.filter('replaceImg', (value) => {
  let one = value.substr(0, 1);
  let two = value.substr(1, 2);
  let three = value.substr(3)
  let imgurl = "https://fuss10.elemecdn.com/" + one + "/" + two + "/" + three + ".jpeg?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/"
  return imgurl
})
Vue.filter('replaceAutoImg', (value) => {
  let one = value.substr(0, 1);
  let two = value.substr(1, 2);
  let three = value.substr(3)
  if (value.includes("png")) {
    return "https://fuss10.elemecdn.com/" + one + "/" + two + "/" + three + ".png?imageMogr/format/webp/thumbnail/568x/"
  }else{
    return  "https://fuss10.elemecdn.com/" + one + "/" + two + "/" + three + ".jpeg?imageMogr/format/webp/thumbnail/568x/"
  }
  // let imgurl = "https://fuss10.elemecdn.com/" + one + "/" + two + "/" + three + ".jpeg?imageMogr/format/webp/thumbnail/568x/"
  // return imgurl
})
//https://fuss10.elemecdn.com/d/0e/4be4a8ec998675fc9a2db0f4088c2jpeg.jpeg?imageMogr/format/webp/thumbnail/568x/