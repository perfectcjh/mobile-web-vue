<template>
  <div class="login-container">
    <div class="header-view">
      <div class="header-title">运小虎</div>
      <div class="header-des">化工物流一站式服务平台</div>
    </div>
    <div v-if="loginType===1" class="content-view">
      <div class="content-input-view">
        <div class="input-view">
          <input v-model="phoneNumber" type="number" placeholder="请输入手机号码" placeholder-class="input-placeholder-style"></input>
        </div>
      </div>
      <div class="content-input-view">
        <div class="input-view">
          <input v-model="verifyCode" type="number" placeholder="请输入验证码" placeholder-class="input-placeholder-style"></input>
        </div>
        <div class="verify-code-btn" @click.stop="handleVerifyCodeClick">{{ smsBtnTitle }}</div>
      </div>
      <div class="normal-theme-btn-radius" style="margin-top: 90px;" @click.stop="handleLoginClick">登录</div>
      <div class="login-type-change" @click.stop="handleLoginTypeChange(2)">密码登录</div>
    </div>
    <div v-if="loginType===2" class="content-view">
      <div class="content-input-view">
        <div class="input-view">
          <input v-model="phoneNumber" type="number" placeholder="请输入手机号码" placeholder-class="input-placeholder-style"></input>
        </div>
      </div>
      <div class="content-input-view">
        <div class="input-view">
          <input v-model="password" type="password" placeholder="请输入密码" placeholder-class="input-placeholder-style"></input>
        </div>
      </div>
      <div class="normal-theme-btn-radius" style="margin-top: 90px;" @click.stop="handlePasswordLoginClick">登录</div>
      <div class="login-type-change" @click.stop="handleLoginTypeChange(1)">验证码登录</div>
    </div>
    <!-- 		<div v-if="loginType===3" class="content-view">
			<div class="content-input-view">
				<div class="input-view">
					<input v-model="phoneNumber" type="number" placeholder="请输入手机号码" placeholder-class="input-placeholder-style"></input>
				</div>
			</div>
			<div class="content-input-view">
				<div class="input-view">
					<input v-model="verifyCode" type="number" placeholder="请输入验证码" placeholder-class="input-placeholder-style"></input>
				</div>
				<div class="verify-code-btn" @click.stop="handleVerifyCodeClick">{{ smsBtnTitle }}</div>
			</div>
			<div class="content-input-view">
				<div class="input-view">
					<input v-model="inviteCode" placeholder="请输入邀请码" placeholder-class="input-placeholder-style"></input>
				</div>
			</div>
			<div class="normal-theme-btn-radius" style="margin-top: 90px;" @click="handleLoginClick">注册</div>
		</div>
 -->
    <!-- 	<div class="bottom-tip-view">
			<div v-if="loginType===1" class="bottom-tip-text">
				<div>已有账号，</div>
				<div @click.stop="handleLoginTypeChange(2)">密码登录</div>
			</div>
			<div v-else class="bottom-tip-text">
				<div>没有账号，</div>
				<div @click.stop="handleLoginTypeChange(1)">验证码登录</div>
			</div>
		</div> -->
  </div>
</template>

<script>
import { isValidityPhoneNumber } from '@/module/verify/verify.js'
import UserModel from '@/model/user-model.js'
import md5 from '@/vendor/md5/md5.js'

export default {
  data () {
    return {
      loginType: 1, // 1：验证码登录 2：密码  3：注册
      phoneNumber: '',
      verifyCode: '',
      password: '',
      inviteCode: '',
      state: {
        interval: null,
        time: 60,
        smsSendBtn: true
      }
    }
  },
  computed: {
    smsBtnTitle () {
      return this.state.smsSendBtn ? '获取验证码' : `${this.state.time}s`
    }
  },
  methods: {
    startTimeInterval () {
      this.state.smsSendBtn = false
      this.state.interval = setInterval(() => {
        if (this.state.time-- <= 0) {
          this.clearTimeInterval()
        }
      }, 1000)
    },
    clearTimeInterval () {
      clearInterval(this.state.interval)
      this.state.interval = null
      this.state.time = 60
      this.state.smsSendBtn = true
    },
    async handleVerifyCodeClick () {
      if (!this.state.smsSendBtn) { return }
      if (!isValidityPhoneNumber(this.phoneNumber)) {
        this.$toast('请输入正确的手机号')
        return
      }
      const params = {
        phone: this.phoneNumber,
        messageType: 'user_login'
      }
      this.startTimeInterval()
      this.$toast.loading()
      const { code } = await this.$api.getSmsCaptcha(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('发送成功')
      } else {
        this.clearTimeInterval()
      }
    },
    async handleLoginClick () {
      if (!isValidityPhoneNumber(this.phoneNumber)) {
        this.$toast('请输入正确的手机号')
        return
      }
      if (!this.verifyCode) {
        this.$toast('请输入验证码')
        return
      }
      const params = {
        phone: this.phoneNumber,
        code: this.verifyCode,
        userSource: 'puds'
      }
      this.$toast.loading()
      const { code, data } = await UserModel.smsLogin(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('登录成功')
        this.loginSuccess()
      }
    },
    async handlePasswordLoginClick () {
      if (!isValidityPhoneNumber(this.phoneNumber)) {
        this.$toast('请输入正确的手机号')
        return
      }
      if (!this.password) {
        this.$toast('请输入密码')
        return
      }
      const params = {
        userName: this.phoneNumber,
        password: md5(this.password),
        userSource: 'puds'
      }
      this.$toast.loading()
      const { code, data } = await UserModel.login(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('登录成功')
        this.loginSuccess()
      }
    },
    loginSuccess () {
      // uni.redirectTo({
      //   url: '/pages/driver/root/RootTabbar'
      // })
    },
    handleLoginTypeChange (type) {
      this.loginType = type
    }
  }
}
</script>

<style lang="stylus" scoped>
	.login-container {
		height: 100%;
		background-color: $color-white;

		.header-view {
			padding: 0px 60px;
			padding-top: 190px;

			.header-title {
				color: $color-black;
				font-size: $font-30;
				font-weight: bold;
			}

			.header-des {
				margin-top: 32px;
				color: $color-text-darkgray;
				font-size: $font-17;
			}
		}

		.content-view {
			margin-top: 70px;
			padding: 0px 60px;

			.content-input-view {
				margin-bottom: 22px;
				height: 100px;
				border-radius: 50px;
				background-color: $color-bg;
				padding: 0px 36px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: $font-15;

				.input-view {
					flex: 1;
				}

				.verify-code-btn {
					color: $color-theme;
					width: 160px;
					text-align: right;
				}

				.input-icon {
					width: 38px;
					height: 38px;
				}
			}

			.login-type-change {
				margin-top: 42px;
				padding: 0px 30px;
				color: $color-text-gray;
				font-size: $font-13;
				text-align: right;
			}
		}

		.bottom-tip-view {
			position: fixed;
			z-index: 1;
			left: 0;
			right: 0;
			bottom: 70px;

			.bottom-tip-text {
				display: flex;
				justify-content: center;
				color: $color-text-gray;
				font-size: $font-14;

				view:nth-child(2) {
					color: $color-theme;
				}
			}
		}
	}
</style>
