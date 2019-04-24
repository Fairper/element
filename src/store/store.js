import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
      carPro:[],
      All:false,
      selectNum:0,
      totalPrice:0,
      totalPrice1:0,
      totalNum:0,
      city:'上海市人民政府',
      userInfo: null
    },
    getters:{
        toFixed(state){
            return state.totalPrice.toFixed(1)
        }
    },
    //添加商品到购物车
    actions:{
        addToCar({commit,state},total){
         commit('addFirst',total)
        },
        changeNum({commit},num){
            commit("changeNum",num)
        },
        changeTotalPrice({commit},price){
            commit("changeTotalPrice",price)
        },
        changeAll({commit},{flag,fromCartTotalPrice}){
            commit("changeAll",{flag,fromCartTotalPrice})
        },
        recordUser({commit}, data){
            commit('setUserInfo', data)
        },
        logout({commit}){
            commit('removeUserInfo', '')
        }
    },
    mutations:{
        clearCartInfo(state) {
            state.All = false
            state.carPro = []
            state.selectNum = 0
            state.totalNum = 0
            state.totalPrice = 0
            state.totalPrice1 = 0
        },
        setUserInfo (state, info) {
            state.userInfo = info
        }, 
        removeUserInfo (state) {
            state.userInfo = null
        },
        changeCity(state,pickedCity){
            state.city = pickedCity
        },
      addFirst(state,total){
				state.carPro = total;
				console.log(78979879)
				console.log(state.carPro)
				var num = 0;
				var price = 0;
				for(var i=0;i<total.length;i++){
					num+=total[i].num;
					price+=total[i].num*total[i].price;
				}
				state.totalNum = num
				state.totalPrice1 = price
      },
      changeNum(state,num){
             state.selectNum+=num;
      },
      changeTotalPrice(state,price){
            state.totalPrice+=price;
      },
      changeAll(state,{flag,fromCartTotalPrice}){
          state.All = flag
          if (!flag) {
              state.selectNum = 0;
              state.totalPrice = 0;
          }else{
              state.selectNum = state.totalNum;
              state.totalPrice=fromCartTotalPrice;
          }
      }
    },

})