<template>
  <div class="steps-diy__container" :style="{'background-color': backgroundColor, 'background': background}">
    <div v-for="(item, index) in data" :key="index" class="step__item" :style="itemStyle" @click.stop="handleIndexChange(index)">
      <div class="step__item-top-box">
        <div class="step__index-line-box">
          <div v-if="index===0" class="step__index-line" :style="clearLineStyle"></div>
          <div v-else class="step__index-line" :style="lineStyle"></div>
        </div>
        <div class="step__index-icon">
          <img v-if="index===selectIndex" :src="item.selectIcon" />
          <img v-else :src="item.normalIcon" />
        </div>
        <div class="step__index-line-box">
          <div v-if="index===(data.length-1)" class="step__index-line" :style="clearLineStyle"></div>
          <div v-else class="step__index-line" :style="lineStyle"></div>
        </div>
      </div>
      <div class="step__item-text" :class="{'select': index===selectIndex}" :style="textStyle">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultIndex: {
      type: Number,
      default: 0
    },
    /**
			 * 	[{ title: '个人信息', normalIcon: '', selectIcon: '' }]
			 */
    data: {
      type: Array,
      default: () => []
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    background: {
      type: String,
      default: ''
    },
    lineColor: {
      type: String,
      default: '#46B8E1'
    },
    textColor: {
      type: String,
      default: '#46B8E1'
    }
  },
  computed: {
    itemStyle () {
      const width = (750 - 4 * (this.data.length - 1)) / this.data.length
      return `width: ${width}px;`
    },
    lineStyle () {
      return `background-color: ${this.lineColor};`
    },
    clearLineStyle () {
      return `background-color: ${this.lineColor}; opacity: 0;`
    },
    textStyle () {
      return `color: ${this.textColor};`
    }
  },
  data () {
    return {
      selectIndex: this.defaultIndex
    }
  },
  methods: {
    setSelectIndex (index) {
      this.handleIndexChange(index)
    },
    handleIndexChange (index) {
      if (this.selectIndex === index) { return }
      this.selectIndex = index
      this.$emit('change', this.selectIndex)
    }
  }
}
</script>

<style lang="stylus" scoped>
	img {
		display: block;
		width: 100%;
		height: 100%;
    object-fit: contain;
	}

	.steps-diy__container {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;

		.step__item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100px;

			.step__item-top-box {
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;
				height: 40px;

				.step__index-icon {
					width: 54px;
					height: 54px;
					border: 4px solid #FFFFFF00;
					position: absolute;
					left: 50%;
					transform: translate(-50%, 0%);
					border-radius: 50%;
					background-color: #FFFFFF;
				}

				.step__index-text {
					position: absolute;
					left: 50%;
					transform: translate(-50%, 0%);
					height: 40px;
					width: 40px;
					font-size: 26px;
					line-height: 32px;
					border-radius: 50%;
					border: 4px solid #FFFFFF;
					color: #FFFFFF;
					background-color: #8FCAF6;
					text-align: center;
				}

				.step__index-text.select {
					background-color: #46B8E1;
				}

				.step__index-line-box {
					width: 49%;

					.step__index-line {
						width: 100%;
						margin: 0px 4px;
						height: 2px;
						background-color: #8FCAF6;
					}
				}
			}

			.step__item-text {
				margin-top: 36px;
				font-size: 26px;
				color: #8FCAF6;
			}

			.step__item-text.select {
				color: #46B8E1;
			}
		}
	}
</style>
