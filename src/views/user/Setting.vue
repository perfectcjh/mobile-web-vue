<template>
  <div class="settting-container">
    <div class="nav-bar">
      <van-nav-bar
        title="设置"
        left-arrow
        :z-index="998"
        @click-left="handleBackClick"
      />
    </div>
    <div class="settting-container-action-view">
      <div class="normal-theme-btn" style="margin: 20rpx 30rpx;" @click.stop="handleBtnClick">退出登录</div>
    </div>
  </div>
</template>

<script>
// import UserModel from '@/model/user-model.js'

export default {
  methods: {
    async handleBtnClick () {
      // this.$toast.loading()
      // const { code } = await this.$api.logout()
      // this.$toast.clear()
      // if (code === 200) {
      //   UserModel.setLoginOut()
      //   uni.reLaunch({
      //     url: '/pages/common/login/Login'
      //   })
      // }
    },
    handleBackClick () {
    }
  }
}
</script>

<style lang="stylus" scoped>
	.settting-container {
    height: 100%;

    .nav-bar {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      z-index: 998;
      background-color: $color-white;
      // background $linear-gradient-bg-theme
      // padding-top 44px
    }

		.settting-container-action-view {
			position: fixed;
			left: 0rpx;
			bottom: 0rpx;
			right: 0rpx;
			height: 160rpx;
			z-index: 9;
			padding-bottom: 20rpx;
			// background-color: $color-white;
		}
	}
</style>

<style lang="stylus">
.van-nav-bar {
  height: 92px;
  line-height: 92px;
  // background: $linear-gradient-bg-theme;
  background-color: $color-white;
}
.van-nav-bar .van-icon {
  color: $color-text-black;
  font-size: 32px;
}
.van-nav-bar__title {
  color: $color-text-black;
  font-size: 32px;
  font-weight: bold;
}
</style>
