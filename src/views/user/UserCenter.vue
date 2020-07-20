<template>
  <div class="user-center-container">
    <div class="user-header">
      <div class="user-header-bg">
        <img src="../../static/driver/user/bg-user-header.png"></img>
      </div>
      <div class="user-header-view">
        <div class="user-header-item" @click.stop="handleSettingClick">
          <div class="user-header-item-left">
            <div class="user-header-avatar">
              <img src="../../static/common/icon-avatar-normal.png"></img>
            </div>
            <div class="user-header-info">
              <div class="user-name">{{ userName }}</div>
              <div class="user-status">
                <div class="user-status-icon">
                  <img v-if="userAuthStatus==='PASS'" src="../../static/driver/user/icon-tag-user-auth.png"></img>
                  <img v-else src="../../static/driver/user/icon-tag-user-auth-not.png"></img>
                </div>
              </div>
            </div>
          </div>
          <div class="user-header-item-right">
            <img src="../../static/common/icon-arrow-right-white.png"></img>
          </div>
        </div>
      </div>
    </div>
    <div class="user-content">
      <div class="user-content-card">
        <div class="user-content-header">更多服务</div>
        <div class="user-content-sep-line"></div>
        <div class="user-content-item-view">
          <div class="user-content-item" @click.stop="handleAuthClick">
            <div class="user-content-item-icon">
              <img src="../../static/driver/user/icon-user-auth.png"></img>
            </div>
            <div class="user-content-item-text">个人认证</div>
          </div>
          <div class="user-content-item" @click.stop="handleCarClick">
            <div class="user-content-item-icon">
              <img src="../../static/driver/user/icon-user-car.png"></img>
            </div>
            <div class="user-content-item-text">车辆管理</div>
          </div>
          <div class="user-content-item" @click.stop="handleAboutUsClick">
            <div class="user-content-item-icon">
              <img src="../../static/driver/user/icon-user-aboutus.png"></img>
            </div>
            <div class="user-content-item-text">关于我们</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import UserModel from '@/model/user-model.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    userName () {
      const userAuthInfo = this.userInfo.userAuthInfo
      if (userAuthInfo) {
        return userAuthInfo.driverName
      }
      const userInfo = this.userInfo
      return userInfo.userName
    },
    userAuthStatus () {
      const userAuthInfo = this.userInfo.userAuthInfo
      if (userAuthInfo) {
        return userAuthInfo.auditStatus
      }
      return ''
    },
    carAuthStatus () {
      const userCarInfo = this.userInfo.userCarInfo
      if (userCarInfo) {
        return userCarInfo.auditStatus
      }
      return ''
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    handlePageShow () {
      this.loadData()
    },
    async loadData () {
      // const { code } = await UserModel.requestUserInfo()
      // if (code === 200) {
      //   this.userInfo = UserModel.getUserInfo()
      // }
    },
    handleSettingClick () {
      this.$native.navigateTo({
        url: 'http://10.1.65.253:10000/#/setting'
      })
      // uni.navigateTo({
      //   url: '/pages/driver/user/Setting'
      // })
    },
    handleAuthClick () {
      // if (this.userAuthStatus === 'PASS') {
      //   uni.showModal({
      //     title: '提示',
      //     content: '您的个人认证审核已通过, 是否需要重新提交',
      //     success: (res) => {
      //       if (!res.confirm) { return }
      //       uni.navigateTo({
      //         url: '/pages/driver/authentication/UserAuth'
      //       })
      //     }
      //   })
      // } else if (this.userAuthStatus === 'WAIT' || this.userAuthStatus === 'AUDITING') {
      //   this.$toast('您的个人认证正在审核')
      // } else {
      //   uni.navigateTo({
      //     url: '/pages/driver/authentication/UserAuth'
      //   })
      // }
    },
    handleCarClick () {
      // if (!this.userAuthStatus || this.userAuthStatus === '') {
      //   this.$toast('请先进行个人认证')
      //   return
      // }
      // if (this.carAuthStatus === 'PASS') {
      //   uni.showModal({
      //     title: '提示',
      //     content: '您的车辆资料审核已通过, 是否需要重新提交',
      //     success: (res) => {
      //       if (!res.confirm) { return }
      //       uni.navigateTo({
      //         url: '/pages/driver/authentication/CarAuth'
      //       })
      //     }
      //   })
      // } else if (this.carAuthStatus === 'WAIT' || this.carAuthStatus === 'AUDITING') {
      //   this.$toast('您的车辆资料正在审核')
      // } else {
      //   uni.navigateTo({
      //     url: '/pages/driver/authentication/CarAuth'
      //   })
      // }
    },
    handleBankClick () {
      // if (!this.userAuthStatus || this.userAuthStatus === '') {
      //   this.$toast('请先进行个人认证')
      //   return
      // }
      // uni.navigateTo({
      //   url: '/pages/driver/wallet/BankCardList'
      // })
    },
    handleAccountClick () {
      // if (!this.userAuthStatus || this.userAuthStatus === '') {
      //   this.$toast('请先进行个人认证')
      //   return
      // }
      // uni.navigateTo({
      //   url: '/pages/driver/wallet/Wallet'
      // })
    },
    handleAboutUsClick () {
      // uni.navigateTo({
      //   url: '/pages/driver/user/AboutUs'
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
	.user-center-container {

		.user-header {
			position: relative;
			height: 350px;

			.user-header-bg {
				position: absolute;
				top: 0px;
				right: 0px;
				left: 0px;
				bottom: 0px;
				z-index: 0;
			}

			.user-header-view {
				position: absolute;
				top: 0px;
				left: 0px;
				right: 0px;
				bottom: 0px;
				z-index: 1;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;

				.user-header-item {
					padding: 0px 50px;
					height: 120px;
					display: flex;
					justify-content: space-between;
					margin-bottom: 60px;
					align-items: center;

					.user-header-item-left {
						flex: 1;
						display: flex;

						.user-header-avatar {
							height: 120px;
							width: 120px;
							border-radius: 50px;
						}

						.user-header-info {
							margin-left: 20px;
							color: $color-white;
							font-size: $font-16;
							display: flex;
							flex-direction: column;
							justify-content: center;

							.user-status {
								margin-top: 20px;
								display: flex;

								.user-status-icon {
									margin-right: 16px;
									width: 34px;
									height: 34px;
								}
							}
						}
					}

					.user-header-item-right {
						width: 16px;
						height: 24px;
					}
				}
			}
		}

		.user-content {
			padding: 20px 28px;

			.user-content-card {
				border-radius: 16px;
				background-color: $color-white;
				padding: 0px 26px;

				.user-content-header {
					height: 88px;
					line-height: 88px;
					font-size: $font-14;
					color: $color-black;
					font-weight: bold;
				}

				.user-content-sep-line {
					height: 1px;
					background-color: $color-sepline;
				}

				.user-content-item-view {
					padding: 20px 0px;
					display: flex;
					flex-wrap: wrap;

					.user-content-item {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						width: 33%;
						height: 200px;

						.user-content-item-icon {
							width: 70px;
							height: 70px;
						}

						.user-content-item-text {
							margin-top: 20px;
							font-size: $font-13;
							color: $color-black;
						}
					}
				}
			}
		}
	}
</style>
