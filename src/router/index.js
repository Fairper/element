import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//组件导入  路由配置组件
import Index from 'pages/index/Index'
import Mine from 'pages/mine/Mine'
import Order from 'pages/order/Order'
import Discover from 'pages/discover/Discover'
import Home from 'pages/Home'
import Search from 'pages/search/Search'
import Shop from 'pages/search/Shop'
// import Detail from 'pages/detail/Detail'
import Detail from 'pages/detail/Detail'
import CityPicker from 'pages/citypicker/CityPicker'

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/cities',
    component: CityPicker
  },
  {
    name:'detail',
    path:'/detail',
    component:Detail
  },
  {
    name:'login',
    path:'/login',
    component: () => import('../pages/login/Login')
  },
  {
    name:'search',
    path:'/search',
    component:Search,
    children:[{
      path:'shop',
      name:'shop',
      component:Shop
    }]
  },
  {
    name:'home',
    path:'/home',
    component:Home,
    redirect:'/home/index',
    children:[
      {
       name: 'index',
       path: 'index',
       component: Index
      },
      {
        name: 'discover',
        path: 'discover',
        component: Discover
      },
      {
        name:'order',
        path:'order',
        component:Order
      },
      {
        name:'mine',
        path:'mine',
        component:Mine
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router