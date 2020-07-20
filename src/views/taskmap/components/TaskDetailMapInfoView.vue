<template>
  <div class="task-detail-map-info-view-container">
    <div class="location-search-view">
      <div class="location-search-icon">
        <img src="../../../assets/common/icon-location-gray.png" />
      </div>
      <div class="location-search-text">{{ address || '点击获取位置信息' }}</div>
    </div>
    <div class="item-view-title">货物信息</div>
    <div v-for="(item, index) in itemData.detailList" :key="index" class="item-view">
      <div class="item-view-content">
        <div class="order-info-tag-box">
          <div v-for="(tag, tagindex) in item.orderInfoTags" :key="tagindex" class="order-info-tag-item">{{ tag }}</div>
        </div>
      </div>
      <div v-if="item.logisticsStatus === 'take_order'" class="item-info-location-view">
        <div class="header-item-view">
          <div class="header-item-icon">
            <img src="../../../assets/common/icon-task-get-goods.png" />
          </div>
          <div class="header-item-info-view">
            <div class="item-info-city">{{ item.pickProvince }} {{ item.pickCity }}</div>
            <div class="item-info-address">{{ item.pickArea }}{{ item.pickAddress }}</div>
            <div class="item-info-time">{{ item.pickDateTime }}</div>
          </div>
          <div class="header-item-phone" @click.stop="makePhoneCallToPicker">
            <img src="../../../assets/common/icon-task-phone-theme.png" />
          </div>
        </div>
        <div class="item-view-sep-line"></div>
        <div class="item-view-other-view">
          <div class="item-view-other-title">送货地址：</div>
          <div class="item-view-other-des">{{ item.receiptTotalAddress }}</div>
        </div>
      </div>
      <div v-else-if="item.logisticsStatus === 'pickup'" class="item-info-location-view">
        <div class="item-view-other-view">
          <div class="item-view-other-title">提货地址：</div>
          <div class="item-view-other-des">{{ item.pickTotalAddress }}</div>
        </div>
        <div class="item-view-sep-line"></div>
        <div class="header-item-view">
          <div class="header-item-icon">
            <img src="../../../assets/common/icon-task-finish-goods.png" />
          </div>
          <div class="header-item-info-view">
            <div class="item-info-city">{{ item.receiptProvince }} {{ item.receiptCity }}</div>
            <div class="item-info-address">{{ item.receiptArea }}{{ item.receiptAddress }}</div>
            <div class="item-info-time">{{ item.receiptDateTime }}</div>
          </div>
          <div class="header-item-phone" @click.stop="makePhoneCallToReceipter">
            <img src="../../../assets/common/icon-task-phone-theme.png" />
          </div>
        </div>
      </div>
      <div v-else class="item-info-location-view">
        <div class="item-view-other-view">
          <div class="item-view-other-title">提货地址：</div>
          <div class="item-view-other-des">{{ item.pickTotalAddress }}</div>
        </div>
        <div class="item-view-sep-line"></div>
        <div class="item-view-other-view">
          <div class="item-view-other-title">送货地址：</div>
          <div class="item-view-other-des">{{ item.receiptTotalAddress }}</div>
        </div>
      </div>
      <div class="item-view-header">
        <div class="order-number">订单号：{{ item.orderNo }}</div>
        <div class="order-time">{{ item.pickDateTime }}</div>
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
  mounted () {
  },
  methods: {
    handleLocationClick () {
      this.$emit('locationClick')
    },
    makePhoneCallToPicker () {
      this.$uniNative.postMessage({
        action: 'makePhoneCall',
        params: {
          phoneNumber: this.itemData.pickerPhone
        }
      })
    },
    makePhoneCallToReceipter () {
      this.$uniNative.postMessage({
        action: 'makePhoneCall',
        params: {
          phoneNumber: this.itemData.receipterPhone
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
				line-height: 1.5;
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
			padding-top: 30px;

			.item-view-header {
				padding: 30px 0px;
				display: flex;
				flex-direction: column;

				.order-number {
					color: $color-text-black;
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

			.item-info-location-view {
				padding: 0px 30px;
				border-radius: 16px;
				background-color: $color-white;

				.item-view-other-view {
					padding: 30px 0px;
					display: flex;

					.item-view-other-title {
						color: $color-text-gray;
						font-size: $font-13;
						line-height: 1.5;
					}

					.item-view-other-des {
						flex: 1;
						color: $color-text-black;
						font-size: $font-13;
						line-height: 1.5;
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
							line-height: 30px;
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
