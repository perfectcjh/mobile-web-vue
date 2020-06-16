<template>
  <div class="order-item-container">
    <div class="item-view">
      <!-- <div class="order-status" :class="{ 'finish': itemData.orderStatus === '4', 'accept': itemData.orderStatus === '1' }">{{ itemData.orderStatusText }}</div> -->
      <div class="item-view-header">
        <div class="order-number">订单号：{{ itemData.orderNo }}</div>
        <div class="order-price">￥{{ itemData.moneyAmountShow }}</div>
      </div>
      <div class="item-view-sep-line"></div>
      <div class="item-view-content">
        <div class="order-location-view">
          <div class="order-location">
            <div class="order-location-tag">
              <img src="../../../static/common/icon-location-green.png" mode="aspectFit" />
            </div>
            <div class="order-location-text">{{ itemData.locationFrom }}</div>
          </div>
          <div class="order-location-arrow">
            <img src="../../../static/common/icon-location-line.png" mode="aspectFit" />
          </div>
          <div class="order-location right">
            <div class="order-location-tag">
              <img src="../../../static/common/icon-location-orange.png" mode="aspectFit" />
            </div>
            <div class="order-location-text">{{ itemData.locationTo }}</div>
          </div>
        </div>
        <div class="order-location-des">
          <div class="order-location-des-text">{{ itemData.pickAddress }}</div>
          <div class="order-location-des-text">{{ itemData.receiptAddress }}</div>
        </div>
        <div class="order-info">
          <div class="order-info-left">
            <div class="order-info-box">
              <div class="order-info-icon">提</div>
              <div class="order-info-text">{{ itemData.pickDateTime }}</div>
            </div>
            <div class="order-info-box" style="margin-top: 10px;">
              <div class="order-info-icon receipt">送</div>
              <div class="order-info-text">{{ itemData.receiptDateTime }}</div>
            </div>
          </div>
          <div class="order-info-right">
            <!-- <div v-if="itemData.orderStatus === '2' || itemData.orderStatus === '3'" class="order-action-btn border" style="margin-right: 20px;">异常上报</div> -->
            <div v-if="itemData.orderStatus === '1'" class="order-action-btn normal">接单</div>
            <div v-if="itemData.orderStatus === '2'" class="order-action-btn normal" @click.stop="handleFinishClick">提货完成</div>
            <div v-if="itemData.orderStatus === '3'" class="order-action-btn normal" @click.stop="handleFinishClick">送货完成</div>
          </div>
        </div>
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
    handleFinishClick () {
      // #ifdef MP
      // uni.navigateTo({
      //   url: `/pages/driver/task/TaskDetailMapWx?id=${this.itemData.orderId}`
      // })
      // #endif
      // #ifndef MP
      // uni.navigateTo({
      //   url: `/pages/driver/task/TaskDetailMapWeb?id=${this.itemData.orderId}`
      // })
      // #endif
    }
  }
}
</script>

<style lang="stylus" scoped>
	.order-item-container {
		padding: 0px 30px;

		.item-view {
			background-color: $color-white;
			border-radius: 16px;
			padding: 0px 30px;

			.item-view-header {
				height: 90px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.order-number {
					color: $color-text-darkgray;
					font-size: $font-13;
				}

				.order-price {
					color: $color-text-red;
					font-size: $font-16;
					font-weight: bold;
				}
			}

			.order-status {
				padding-top: 30px;
				color: $color-theme;
				font-size: $font-13;
				font-weight: bold;
			}

			.order-status.finish {
				color: $color-text-black;
			}

			.order-status.accept {
				color: $color-text-red;
			}

			.item-view-sep-line {
				height: 1px;
				background-color: $color-sepline;
			}

			.item-view-content {
				padding: 30px 0px;

				.order-location-view {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.order-location {
						max-width: 250px;
						display: flex;
						align-items: center;

						.order-location-tag {
							width: 20px;
							height: 26px;
						}

						.order-location-text {
							flex: 1;
							margin-left: 12px;
							font-size: $font-16;
							color: $color-text-black;
							font-weight: bold;
							text-over(1);
						}
					}

					.order-location.right {
						justify-content: flex-end;
					}

					.order-location-arrow {
						width: 80px;
						height: 14px;
					}
				}

				.order-location-des {
					margin-top: 28px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: $color-text-darkgray;
					font-size: $font-13;

					.order-location-des-text {
						max-width: 250px;
						text-over(1);
					}
				}

				.order-info {
					margin-top: 44px;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.order-info-left {
						flex: 1;

						.order-info-box {
							display: flex;
							align-items: center;

							.order-info-icon {
								width: 30px;
								height: 30px;
								line-height: 30px;
								text-align: center;
								border-radius: 8px;
								background-color: $color-theme;
								color: $color-white;
								font-size: $font-10;
							}

							.order-info-icon.receipt {
								background-color: #FF7473;
							}

							.order-info-text {
								margin-left: 20px;
								color: $color-text-gray;
								font-size: $font-12;
							}
						}

						.order-info-des {
							color: $color-text-darkgray;
							font-size: $font-12;
							height: 24px;
						}

						.order-info-time {
							margin-top: 16px;
							height: 24px;
							color: $color-text-gray;
							font-size: $font-12;
						}
					}

					.order-info-right {
						display: flex;
						align-items: center;

						.order-action-btn {
							width: 140px;
							height: 62px;
							text-align: center;
							font-size: $font-12;
							line-height: 58px;
							border-radius: 12px;
						}

						.order-action-btn.normal {
							background-color: $color-theme;
							color: $color-white;
							border: 1px solid $color-theme;
						}

						.order-action-btn.border {
							background-color: $color-white;
							color: $color-theme;
							border: 1px solid $color-theme;
						}
					}
				}
			}
		}
	}
</style>
