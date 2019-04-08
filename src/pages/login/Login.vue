<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">网上订餐中餐</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" style="margin-right:30px;" @click="loginWay=true">注册</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on: !loginWay}">
            <section>
							<section class="login_message">
                <input type="text" maxlength="11" placeholder="手机号" v-model="tel">
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
            </section>
          </div>
          <!-- 注册 -->
          <div :class="{on: loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机号" v-model="tel">
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>
              </section>
            </section>
          </div>
          <button v-if="loginWay" class="login_submit" @click="register">注册</button>
          <button v-else class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click.prevent="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script>
import store from '../../store/store'
import http from "utils/http";
import {userLogin, userSignup} from '@/api/login'
  import { Toast } from 'mint-ui';
  export default {
    data () {
      return {
        loginWay: false, // true代表短信登陆, false代表密码
        computeTime: 0, // 计时的时间
        showPwd: false, // 是否显示密码
        phone: '', // 手机号
        code:'', // 短信验证码
        name: '', // 用户名
        pwd: '', // 密码
        tel: null, //手机号
        alertText: '', // 提示文本
        alertShow: false, // 是否显示警告框
      }
    },

    computed: {
      rightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
			register () {
				console.log('22')
				const {name, pwd, tel} = this
				const username = name
				const password = pwd
				if(!this.name) {
					// 用户名必须指定
					this.showAlert('用户名必须指定')
					return
				} else if(!this.pwd) {
					// 密码必须指定
					this.showAlert('密码必须指定')
					return
				} else if (!this.tel) {
					this.showAlert('手机号必须填写')
					return
				}
				userSignup({username, password, tel}).then(res => {
					if(res.data.ret) {
						this.showAlert(res.data.data.msg)
						if (res.data.data.msg == '用户名已经存在！') {

						} else {
							this.loginWay = false
						}
						// const user = {username, password}
						// // 将user保存到vuex的state
						// this.$store.dispatch('recordUser', user)
						// console.log('thisssss', store.state.userInfo)
						// // 去个人中心界面
						// this.$router.replace('/home/mine')
					} else {
						this.showAlert(res.data.data.msg)
					}
        })
        .catch(err => {
					this.showAlert(err)
        })
			},
      showAlert(alertText) {
        this.alertShow = true
        this.alertText = alertText
        Toast({
            message: alertText,
            duration: 3000
        });
      },
      // 异步登陆
      async login () {
        let result
        // 前台表单验证
        if (!this.loginWay) { // 密码登陆
          const {name, pwd, tel} = this
          const username = name
          const password = pwd
          if(!this.name) {
            // 用户名必须指定
            this.showAlert('用户名必须指定')
            return
          } else if(!this.pwd) {
            // 密码必须指定
            this.showAlert('密码必须指定')
            return
          }
          // 发送ajax请求密码登陆
        userLogin({username, password, tel}).then(res => {
					if(res.data.ret) {
						console.log('res', res.data)
						const user = {username, password, tel}
						// 将user保存到vuex的state
						this.$store.dispatch('recordUser', user)
						window.localStorage.setItem('userInfo', JSON.stringify(user))
						// 去个人中心界面
						this.$router.replace('/home/mine')
					} else {
						this.showAlert(res.data.data.msg)
					}
        })
        .catch(err => {
					this.showAlert(err)
        })
        }

        // 停止计时
        if(this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
      },
      // 关闭警告框
      closeTip () {
        this.alertShow = false
        this.alertText = ''
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>