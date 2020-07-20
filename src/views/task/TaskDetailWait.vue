<template>
  <div class="order-detail-container">
    <div class="order-detail-container-body">
      <div class="detail-header">
        <div class="detail-header-bg"></div>
        <div class="detail-header-content">
          <div class="detail-header-top">
            <div class="detail-header-top-icon">
              <img src="../../static/driver/order/icon-order-get.png" />
            </div>
            <div class="detail-header-top-title">待接单</div>
          </div>
          <div class="detail-header-card">
            <div class="header-item-view">
              <div class="header-item-icon">
                <img src="../../static/driver/order/icon-task-get-goods.png" />
              </div>
              <div class="header-item-info-view">
                <div class="item-info-city">{{ pageData.pickProvince }} {{ pageData.pickCity }}</div>
                <div class="item-info-address">{{ pageData.pickArea }}{{ pageData.pickAddress }}</div>
                <div class="item-info-person">{{ pageData.picker }}<span class="item-info-phone">{{ pageData.pickerPhone }}</span></div>
                <div class="item-info-time">{{ pageData.pickDateTime }}</div>
              </div>
              <div class="header-item-phone" @click.stop="makePhoneCallToPicker">
                <img src="../../static/driver/order/icon-task-phone-theme.png" />
              </div>
            </div>
            <div class="header-item-sep-line"></div>
            <div class="header-item-view">
              <div class="header-item-icon">
                <img src="../../static/driver/order/icon-task-finish-goods.png" />
              </div>
              <div class="header-item-info-view">
                <div class="item-info-city">{{ pageData.receiptProvince }} {{ pageData.receiptCity }}</div>
                <div class="item-info-address">{{ pageData.receiptArea }}{{ pageData.receiptAddress }}</div>
                <div class="item-info-person">{{ pageData.receipter }}<span class="item-info-phone">{{ pageData.receipterPhone }}</span></div>
                <div class="item-info-time">{{ pageData.receiptDateTime }}</div>
              </div>
              <div class="header-item-phone" @click.stop="makePhoneCallToReceipter">
                <img src="../../static/driver/order/icon-task-phone-theme.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-header">订单信息</div>
      <div v-for="(item, index) in pageData.detailList" :key="index">
        <div style="margin-top: 20px;">
          <task-detail-wait-info-item
            :itemData="item"
          />
        </div>
      </div>
    </div>
    <div class="order-detail-action-view">
      <div class="action-info-box">
        <div class="action-info-item">
          <div class="action-info-title">付费方式</div>
          <div class="action-info-des">现结</div>
        </div>
        <div class="action-info-item right">
          <div class="action-info-title">运输费用</div>
          <div class="action-info-des price">¥ {{ pageData.moneyAmountShow }}</div>
        </div>
      </div>
      <div class="normal-theme-btn action-btn" @click.stop="handleBtnClick">接单</div>
    </div>
  </div>
</template>

<script>
import TaskDetailWaitInfoItem from './components/TaskDetailWaitInfoItem.vue'
import { OrderDetailModel } from '@/model/order-model.js'

export default {
  components: { TaskDetailWaitInfoItem },
  data () {
    return {
      orderId: '',
      pageData: {}
    }
  },
  mounted () {
    this.$native.setNavigationBar({ title: '任务详情' })

    this.orderId = this.$route.query.orderId || ''
    this.loadData()
  },
  methods: {
    async loadData () {
      const params = {
        id: this.orderId
      }
      this.$toast.loading()
      const { code, data } = await this.$api.getOrderDetail(params)
      this.$toast.clear()
      if (code === 200) {
        this.pageData = OrderDetailModel(data)
      }
    },
    async handleBtnClick () {
      const params = {
        departId: this.pageData.orderId,
        waybillDetailIds: this.pageData.detailList.map(el => el.orderId)
      }
      this.$toast.loading()
      const { code } = await this.$api.taskOrder(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('接单成功')
        setTimeout(() => {
          this.$native.navigateBack()
        }, 1500)
      }
    },
    makePhoneCallToPicker () {
      this.$native.makePhoneCall({
        phoneNumber: this.pageData.pickerPhone
      })
    },
    makePhoneCallToReceipter () {
      this.$native.makePhoneCall({
        phoneNumber: this.pageData.receipterPhone
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
	.order-detail-container {
		position: relative;

		.order-detail-container-body {
			padding-bottom: 180px;
		}

		.detail-header {
			position: relative;
			height: 780px;

			.detail-header-bg {
				position: absolute;
				top: 0px;
				left: 0px;
				right: 0px;
				height: 300px;
				z-index: 1;
				background: $linear-gradient-theme;
			}

			.detail-header-top {
				display: flex;
				align-items: center;
				padding: 0px 30px;
				height: 120px;

				.detail-header-top-icon {
					width: 30px;
					height: 40px;
				}

				.detail-header-top-title {
					margin-left: 16px;
					color: $color-white;
					font-size: $font-22;
					font-weight: bold;
				}
			}

			.detail-header-content {
				position: absolute;
				top: 0px;
				left: 0px;
				right: 0px;
				z-index: 2;
				padding: 0px 30px;

				.detail-header-card {
					border-radius: 16px;
					background-color: $color-white;
					padding: 0px 30px;
				}

				.header-item-sep-line {
					height: 1px;
					background-color: $color-sepline;
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
						padding: 30px 30px;

						.item-info-city {
							color: $color-text-black;
							font-size: $font-15;
							font-weight: bold;
						}

						.item-info-address {
							margin-top: 32px;
							height: 70px;
							color: $color-text-black;
							font-size: $font-13;
							text-over(2);
						}

						.item-info-person {
							margin-top: 24px;
							color: $color-text-black;;
							font-size: $font-13;
						}

						.item-info-phone {
							margin-left: 24px;
							color: $color-text-gray;
							font-size: $font-13;
						}

						.item-info-time {
							margin-top: 24px;
							color: $color-text-gray;
							font-size: $font-13;
						}
					}

					.header-item-phone {
						width: 70px;
						height: 35px;
					}
				}
			}
		}

		.list-header {
			font-size: $font-15;
			color: $color-text-black;
			font-weight: bold;
			height: 60px;
			line-height: 60px;
			padding: 0px 60px;
		}

		.order-detail-action-view {
			position: fixed;
			left: 0px;
			bottom: 0px;
			right: 0px;
			height: 160px;
			z-index: 9;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0px 30px;
			padding-bottom: 30px;
			background-color: $color-white;

      .action-btn {
        width: 160px;
        height: 90px;
      }

			.action-info-box {
				flex: 1;
				margin-right: 60px;
				display: flex;

				.action-info-item {
					display: flex;
					justify-content: center;
					flex-direction: column;

					.action-info-title {
						height: 20px;
						font-weight: bold;
						font-size: $font-12;
						color: $color-text-darkgray;
					}

					.action-info-des {
						height: 40px;
						line-height: 40px;
						margin-top: 28px;
						font-weight: bold;
						font-size: $font-13;
						color: $color-text-black;
					}

					.action-info-des.price {
						font-size: $font-20;
						color: $color-text-darkorange;
					}
				}

        .action-info-item.right {
          margin-left: 120px;
        }
			}
		}
	}
</style>
