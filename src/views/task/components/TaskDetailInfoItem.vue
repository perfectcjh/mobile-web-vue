<template>
  <div class="order-detail-info-item-container">
    <div class="item-view">
      <div class="item-view-content">
        <div class="order-info-tag-box">
          <div v-for="(item, index) in itemData.orderInfoTags" :key="index" class="order-info-tag-item">{{ item }}</div>
        </div>
      </div>
      <div v-if="itemData.logisticsStatus === 'take_order'" class="item-info-location-view">
        <div class="header-item-view">
          <div class="header-item-icon">
            <img src="../../../static/driver/order/icon-task-get-goods.png" />
          </div>
          <div class="header-item-info-view">
            <div class="item-info-city">{{ itemData.pickProvince }} {{ itemData.pickCity }}</div>
            <div class="item-info-address">{{ itemData.pickArea }}{{ itemData.pickAddress }}</div>
            <div class="item-info-time">{{ itemData.pickDateTime }}</div>
          </div>
          <div class="header-item-phone" @click.stop="makePhoneCallToPicker">
            <img src="../../../static/driver/order/icon-task-phone-theme.png" />
          </div>
        </div>
        <div class="item-view-sep-line"></div>
        <div class="item-view-other-view">
          <div class="item-view-other-title">送货地址：</div>
          <div class="item-view-other-des">{{ itemData.receiptTotalAddress }}</div>
        </div>
      </div>
      <div v-else-if="itemData.logisticsStatus === 'pickup'" class="item-info-location-view">
        <div class="item-view-other-view">
          <div class="item-view-other-title">提货地址：</div>
          <div class="item-view-other-des">{{ itemData.pickTotalAddress }}</div>
        </div>
        <div class="item-view-sep-line"></div>
        <div class="header-item-view">
          <div class="header-item-icon">
            <img src="../../../static/driver/order/icon-task-finish-goods.png" />
          </div>
          <div class="header-item-info-view">
            <div class="item-info-city">{{ itemData.receiptProvince }} {{ itemData.receiptCity }}</div>
            <div class="item-info-address">{{ itemData.receiptArea }}{{ itemData.receiptAddress }}</div>
            <div class="item-info-time">{{ itemData.receiptDateTime }}</div>
          </div>
          <div class="header-item-phone" @click.stop="makePhoneCallToReceipter">
            <img src="../../../static/driver/order/icon-task-phone-theme.png" />
          </div>
        </div>
      </div>
      <div v-else class="item-info-location-view">
        <div class="item-view-other-view">
          <div class="item-view-other-title">提货地址：</div>
          <div class="item-view-other-des">{{ itemData.pickTotalAddress }}</div>
        </div>
        <div class="item-view-sep-line"></div>
        <div class="item-view-other-view">
          <div class="item-view-other-title">送货地址：</div>
          <div class="item-view-other-des">{{ itemData.receiptTotalAddress }}</div>
        </div>
      </div>
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
    makePhoneCallToPicker () {
      this.$native.makePhoneCall({
        phoneNumber: this.itemData.pickerPhone
      })
    },
    makePhoneCallToReceipter () {
      this.$native.makePhoneCall({
        phoneNumber: this.itemData.receipterPhone
      })
    }
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
				background-color: $color-sepline;
			}

			.item-info-location-view {
				padding: 0px 30px;
				border-radius: 16px;
				background-color: $color-bg;

				.item-view-other-view {
					padding: 30px 0px;
					display: flex;

					.item-view-other-title {
						color: $color-text-gray;
						font-size: $font-13;
					}

					.item-view-other-des {
						flex: 1;
						color: $color-text-black;
						font-size: $font-13;
					}
				}

				.header-item-view {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.header-item-icon {
						width: 70px;
						height: 70px;
					}

					.header-item-info-view {
						flex: 1;
						padding: 36px 30px;

						.item-info-city {
							color: $color-text-black;
							font-size: $font-15;
							font-weight: bold;
						}

						.item-info-address {
							margin-top: 36px;
							color: $color-text-black;
							font-size: $font-13;
						}

						.item-info-person {
							margin-top: 30px;
							color: $color-text-black;;
							font-size: $font-13;
						}

						.item-info-phone {
							margin-left: 30px;
							color: $color-text-gray;
							font-size: $font-13;
						}

						.item-info-time {
							margin-top: 30px;
							color: $color-text-gray;
							font-size: $font-13;
						}
					}

					.header-item-phone {
						width: 35px;
						height: 35px;
					}
				}
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
