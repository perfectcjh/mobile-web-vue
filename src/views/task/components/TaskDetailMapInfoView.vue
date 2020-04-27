<template>
  <div class="task-detail-map-info-view-container">
    <div class="location-search-view">
      <div class="location-search-icon">
        <img src="../../../assets/common/icon-location-gray.png" mode="aspectFit"></img>
      </div>
      <div class="location-search-text">{{ address || '位置信息' }}</div>
    </div>
    <div class="item-view-title">货物信息</div>
    <div class="item-view">
      <div class="item-view-header">
        <div class="order-number">订单号：{{ itemData.orderNo }}</div>
        <div class="order-time">{{ itemData.pickDateTime }}</div>
      </div>
      <div class="item-view-sep-line"></div>
      <div class="item-view-content">
        <div class="order-location">
          <div class="order-location-tag from">提</div>
          <div class="order-location-text">{{ itemData.pickTotalAddress }}</div>
        </div>
        <div class="order-location">
          <div class="order-location-tag to">送</div>
          <div class="order-location-text">{{ itemData.receiptTotalAddress }}</div>
        </div>
        <div class="order-info-tag-box">
          <div v-for="(item, index) in itemData.orderInfoTags" :key="index" class="order-info-tag-item">{{ item }}</div>
        </div>
        <div class="detail-item-phone-box">
          <div class="phone-box" @click.stop="makePhoneCallToPicker">
            <div class="phone-icon">
              <img src="../../../assets/common/icon-phone-theme.png" mode="aspectFit"></img>
            </div>
            <div>发货人{{ itemData.picker }}</div>
          </div>
          <div class="phone-box" @click.stop="makePhoneCallToReceipter">
            <div class="phone-icon">
              <img src="../../../assets/common/icon-phone-orange.png" mode="aspectFit"></img>
            </div>
            <div>收货人{{ itemData.receipter }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: ''
    },
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
    makePhoneCallToPicker () {
      this.$native.postMessage({
        data: {
          action: 'makePhoneCall',
          params: {
            phoneNumber: this.itemData.pickerPhone
          }
        }
      })
    },
    makePhoneCallToReceipter () {
      this.$native.postMessage({
        data: {
          action: 'makePhoneCall',
          params: {
            phoneNumber: this.itemData.receipterPhone
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
	.task-detail-map-info-view-container {
		padding: 0px 30px;

		.location-search-view {
			height: 80px;
			background-color: $color-bg;
			border-radius: 40px;
			padding: 0px 30px;
			display: flex;
			align-items: center;

			.location-search-icon {
				width: 32px;
				height: 32px;
				margin-right: 20px;
			}

			.location-search-text {
				flex: 1;
				color: $color-gray;
				font-size: $font-12;
			}
		}

		.item-view-title {
			padding: 40px 30px 30px;
			color: $color-black;
			font-size: $font-15;
			font-weight: bold;
		}

		.item-view {
			background-color: $color-lightbg;
			border-radius: 16px;
			padding: 0px 30px;

			.item-view-header {
				height: 120px;
				padding: 30px 0px;
				display: flex;
				flex-direction: column;

				.order-number {
					color: $color-text-black;
					font-size: $font-13;
					font-weight: bold;
				}

				.order-time {
					margin-top: 16px;
					color: $color-text-gray;
					font-size: $font-11;
				}
			}

			.item-view-sep-line {
				height: 1px;
				background-color: $color-bg;
			}

			.item-view-content {
				padding-bottom: 30px;

				.order-location {
					margin-top: 20px;
					display: flex;
					align-items: center;

					.order-location-tag {
						width: 36px;
						height: 36px;
						font-size: $font-11;
						text-align: center;
						line-height: 36px;
						color: $color-white;
						border-radius: 4px;
					}

					.order-location-tag.from {
						background-color: $color-theme;
					}

					.order-location-tag.to {
						background-color: $color-orange;
					}

					.order-location-text {
						margin-left: 14px;
						font-size: $font-12;
						color: $color-text-darkgray;
					}
				}

				.order-info-tag-box {
					margin-top: 36px;
					display: flex;
					flex-wrap: wrap;

					.order-info-tag-item {
						text-align: center;
						padding: 0px 10px;
						background-color: #E5F3F8;
						color: $color-theme;
						font-size: $font-11;
						height: 44px;
						line-height: 44px;
						margin-bottom: 18px;
						margin-right: 18px;
						border-radius: 4px;
					}
				}

				.detail-item-phone-box {
					height: 180px;
					display: flex;
					justify-content: space-around;
					align-items: center;

					.phone-box {
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;
						font-size: $font-13;
						color: $color-text-black;

						.phone-icon {
							width: 80px;
							height: 80px;
							margin-bottom: 18px;
						}
					}
				}
			}
		}
	}
</style>
