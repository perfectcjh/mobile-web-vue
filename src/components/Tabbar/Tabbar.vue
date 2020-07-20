<template>
  <div class="tabbar__container">
    <div class="tabber__bar-container">
      <div class="tabbar__bar">
        <div v-for="(item, index) in data" :key="index" class="tabbar__item" @click.stop="handleTabbarChange(index)">
          <div class="tabbar__item-icon">
            <img :src="selectIndex === index ? item.selectIcon : item.normalIcon" />
          </div>
          <div class="tabbar__item-title" :style="selectIndex === index ? titleSelectStyle : titleNormalStyle">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
			 * tabbar配置数据
			 * [{ title, normalIcon, selectIcon }]
			 */
    data: {
      type: Array,
      default: () => []
    },
    normalColor: {
      type: String,
      default: '#BBC2C5'
    },
    selectColor: {
      type: String,
      default: '#46B8E1'
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    fixd: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectIndex: 0
    }
  },
  mounted () {
    console.log(this.data)
  },
  computed: {
    tabbarContainerStyle () {
      // const bottomInset = uni.getSystemInfoSync().safeAreaInsets.bottom || 0
      const bottomInset = 0
      const tabbarHeight = bottomInset + 50
      return `height: ${tabbarHeight}px;`
    },
    titleNormalStyle () {
      return `color: ${this.normalColor};`
    },
    titleSelectStyle () {
      return `color: ${this.selectColor};`
    }
  },
  methods: {
    handleTabbarChange (index) {
      if (this.selectIndex !== index) {
        this.$emit('willChange', index)
        this.selectIndex = index
        this.$emit('change', index)
      }
      this.$emit('tabClick', index)
    },
    setTabbarIndex (index) {
      this.handleTabbarChange(index)
    }
  }
}
</script>

<style lang="stylus" scoped>
	image {
		display: block;
		width: 100%;
		height: 100%;
	}

	.tabbar__container {
		width: 100%;
		height: 100%;

		.tabber__bar-container {
			position: fixed;
			left: 0px;
			right: 0px;
			bottom: 0px;
      height: 100px;
			background-color: #FFFFFF;
			z-index: 999;

			.tabbar__bar {
				height: 100px;
				display: flex;
				justify-content: space-around;
				// background-color: #49C661;

				.tabbar__item {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					min-width: 20%;

					.tabbar__item-icon {
						width: 44px;
						height: 44px;
					}

					.tabbar__item-title {
						margin-top: 12px;
						font-size: 22px;
						font-weight: bold;
						text-align: center;
					}
				}
			}
		}
	}
</style>
