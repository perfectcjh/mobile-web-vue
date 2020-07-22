<template>
  <div class="contract-container">
    <div v-if="!appInfo.isNative" class="nav-bar" :style="navbarStyle">
      <van-nav-bar
        title="电子合同"
        left-arrow
        :z-index="998"
        @click-left="handleBackClick"
      />
    </div>
    <div class="pdf-container">
      <iframe
        class="pdf-iframe"
        :src="pdfUrl"
        :frameborder="0"
        width="100%"
        :height="iframeHeight"
      />
    </div>
    <div class="action-btn-container">
      <div class="action-btn disagree">不同意</div>
      <div class="action-btn agree" @click.stop="handleAgreeBtnClick">同意</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pdfUrl: 'https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf'
    }
  },
  computed: {
    navbarStyle () {
      const style = this.platform === 'android' ? 'padding-top: 22px;' : 'padding-top: 0px;'
      return style
    },
    iframeHeight () {
      return document.documentElement.clientHeight || document.body.clientHeight
    }
  },
  methods: {
    handleBackClick () {
      this.$uniNative.navigateBack()
    },
    handleAgreeBtnClick () {

    }
  }
}
</script>

<style lang="stylus" scoped>
.contract-container {
  position relative

  .pdf-container {

    .pdf-iframe {

    }
  }

  .action-btn-container {
    position fixed
    left 0px
    right 0px
    bottom 0px
    height 120px
    background-color $color-white
    display flex
    justify-content space-around
    align-items center
    padding 0px 30px

    .action-btn {
      font-size $font-16
      color $color-white
      text-align center
      border-radius 8px
      width 40%
      height 80px
      line-height 80px
    }

    .action-btn.disagree {
      background-color $color-lightgray
    }

    .action-btn.agree {
      background-color $color-theme
    }
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
