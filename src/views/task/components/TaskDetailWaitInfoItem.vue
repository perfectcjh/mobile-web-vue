<template>
  <div class="order-detail-info-item-container">
    <div class="item-view">
      <div class="item-view-content">
        <div class="order-info-tag-box">
          <div v-for="(item, index) in itemData.orderInfoTags" :key="index" class="order-info-tag-item">{{ item }}</div>
        </div>
      </div>
      <div class="item-view-sep-line"></div>
      <div class="item-view-header">
        <div class="order-number">订单编号：{{ itemData.orderNo }}</div>
        <div class="order-time">{{ itemData.pickDateTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
	.order-detail-info-item-container {
		padding: 0px 30px;

		.item-view {
			background-color: $color-white;
			border-radius: 16px;
			padding: 0px 30px;

			.item-view-header {
				padding: 30px 0px;
				display: flex;
				flex-direction: column;

				.order-number {
					color: $color-text-darkgray;
					font-size: $font-13;
					font-weight: bold;
				}

				.order-time {
					margin-top: 24px;
					color: $color-text-gray;
					font-size: $font-12;
				}
			}

			.item-view-sep-line {
				height: 1px;
				background-color: $color-bg;
			}

			.item-view-content {
				padding: 30px 0px 10px 0px;

				.order-info-tag-box {
					display: flex;
					flex-wrap: wrap;

					.order-info-tag-item {
						text-align: center;
						padding: 0px 24px;
						background-color: $color-lighttheme;
						color: $color-darktheme;
						font-size: $font-13;
						height: 80px;
						line-height: 80px;
						margin-bottom: 18px;
						margin-right: 18px;
						border-radius: 8px;
					}
				}
			}
		}
	}
</style>
