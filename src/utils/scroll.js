import Bscroll from 'better-scroll'
import restaurantData from '@/mock/resList.json'
import {
  Toast
} from 'mint-ui'
export const scroll = ({
  el,
  data,
  vm,
}) => {
  //声明bscroll
  let bscroll = new Bscroll(el, {
    probeType: 1,
    click: true,
    pullUpLoad: {
      threshold: 50
    }
  })
  //监听 pullingUp 触发加载更多
  bscroll.on('pullingUp', async() => {
   
    // let result = await axios({
    //   method: 'get',
    //   url: "/restapi/shopping/v3/restaurants?latitude=31.230378&longitude=121.473657&offset=" + count + "&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=793f4acf7cdf43d5b9d12c8751eb8952&terminal=h5"
    // })
    if (!!restaurantData) {
      data.push(...restaurantData.items); 
      vm.$nextTick(() => {
         bscroll.refresh()
         vm.$forceUpdate();
         bscroll.finishPullUp()
       }
       )
    } else {
      Toast({
        message: '到底了~',
        position: 'bottom',
        duration: 1000
      })
    }
  })
}