<template>
  <div class="home-message-cell-container">
    <div class="home-message-cell-card" @click.stop="handleClick">
      <div class="message-icon">
        <img src="../../../static/driver/home/icon-home-message.png" mode="aspectFit" />
      </div>
      <div class="message-title">您有{{ inviteList.length }}条未处理的邀请</div>
      <div class="message-subtitle">点击查看 ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inviteList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus" scoped>
	.home-message-cell-container {
		padding: 0px 30px;

		.home-message-cell-card {
			height: 80px;
			border-radius: 16px;
			background-color: $color-lightbrown;
			color: $color-text-brown;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0px 30px;

			.message-icon {
				width: 36px;
				height: 36px;
			}

			.message-title {
				flex: 1;
				font-size: $font-14;
				font-weight: bold;
				margin: 0px 24px;
			}

			.message-subtitle {
				font-size: $font-12;
			}
		}
	}
</style>
