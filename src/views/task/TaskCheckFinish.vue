<template>
  <div class="task-check-finish-container">
    <div class="task-check-finish-body">
      <div class="task-check-card">
        <div class="task-check-title">签收单</div>
        <div v-for="(item, index) in pageData.detailList" :key="index" class="task-check-content">
          <div class="task-check-order-info">
            <div class="order-text-item">
              <div class="order-number">订单号：{{ item.orderNo }}</div>
            </div>
            <div class="order-info-sep-line"></div>
            <div class="order-text-item">
              <div class="order-text-row">
                <div class="order-text-title">货物名称：</div>
                <div class="order-text-subtitle">{{ item.goodsName }}</div>
              </div>
              <div class="order-text-row">
                <div class="order-text-title">货品件数：</div>
                <div class="order-text-subtitle">{{ item.goodsQuantityShow }}</div>
                <div class="order-text-title">货物重量：</div>
                <div class="order-text-subtitle">{{ item.goodsWeightShow }}</div>
              </div>
            </div>
            <div class="order-info-sep-line"></div>
            <div class="order-text-item">
              <div class="order-text-row">
                <div class="order-text-title">收件人：</div>
                <div class="order-text-subtitle">{{ item.receipter }}</div>
                <div class="order-text-title">电话：</div>
                <div class="order-text-subtitle">{{ item.receipterPhone }}</div>
              </div>
            </div>
            <div class="order-info-sep-line"></div>
            <div class="order-text-item">
              <div class="order-text-row">
                <div class="order-text-title">承运商：</div>
                <div class="order-text-subtitle">{{ pageData.transportCompany || '' }}</div>
              </div>
            </div>
            <div class="order-info-sep-line"></div>
            <div class="order-text-item">
              <div class="order-text-row">
                <div class="order-text-title">提货日期：</div>
                <div class="order-text-subtitle">{{ item.pickDateTime }}</div>
                <div class="order-text-title">卸货日期：</div>
                <div class="order-text-subtitle">{{ item.receiptDateTime }}</div>
              </div>
              <div class="order-text-row">
                <div class="order-text-title">装货地址：</div>
                <div class="order-text-subtitle">{{ item.pickTotalAddress }}</div>
              </div>
              <div class="order-text-row">
                <div class="order-text-title">卸货地址：</div>
                <div class="order-text-subtitle">{{ item.receiptTotalAddress }}</div>
              </div>
            </div>
            <div class="order-info-sep-line"></div>
            <div class="order-text-item">
              <div class="order-text-row">
                <div class="order-text-title">货品备注：</div>
                <div class="order-text-subtitle">{{ item.remark || '' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="task-check-card" style="margin-top: 20px;">
        <div class="task-check-title">上传回单</div>
        <div class="task-check-content">
          <div class="task-receipt-container" @click.stop="handleReceiptClick">
            <img v-if="receitImg" :src="receitImg" />
            <div v-else class="task-receipt-btn">点击上传回单</div>
          </div>
        </div>
      </div>
      <div class="task-check-card" style="margin-top: 20px;">
        <div class="task-check-title">签收人签名</div>
        <div class="task-check-content">
          <div class="task-check-signature-container" @click.stop="handleSignatureClick">
            <div v-if="signatureImg" class="task-check-signature-img">
              <img :src="signatureImg" />
            </div>
            <div v-else class="task-check-signature-btn">点击签名</div>
          </div>
        </div>
      </div>
    </div>
    <div class="task-detail-action-view">
      <div class="normal-theme-btn" style="margin: 20px 30px;" @click.stop="handleConfirm">确认签收</div>
    </div>
  </div>
</template>

<script>
import { OrderDetailModel } from '@/model/order-model.js'
import FileConvert from '@/module/utils/file-convert.js'

export default {
  data () {
    return {
      orderId: '',
      selectId: [],
      signatureImg: null,
      receitImg: null,
      fileCode: '',
      pageData: '',
      latitude: '',
      longitude: '',
      location: ''
    }
  },
  mounted () {
    this.$native.setNavigationBar({ title: '确认签收' })

    window.didReceiveNotification = (value) => {
      if (value.name === 'signatureDidFinish') {
        this.signatureImg = value.value.imageUrl
        this.fileCode = value.value.fileCode
      }
    }

    this.orderId = this.$route.query.orderId || ''
    this.latitude = this.$route.query.latitude || ''
    this.longitude = this.$route.query.longitude || ''
    this.location = this.$route.query.location || ''
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
    async handleConfirm () {
      if (!this.signatureImg) {
        this.$toast.show('请先点击签名')
        return
      }
      const params = {
        departId: this.pageData.orderId,
        waybillDetailIds: this.pageData.detailList.map(el => el.orderId),
        fileCode: this.fileCode,
        latitude: this.latitude,
        longitude: this.longitude,
        location: this.location
      }
      this.$toast.loading()
      const { code } = await this.$api.orderSignCompleted(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('签收成功')
        // TransportSDK.stop({
        //   orderNumber: this.pageData.orderNo,
        //   startAddress: this.pageData.pickTotalAddress,
        //   endAddress: this.pageData.receiptTotalAddress
        // })
        setTimeout(() => {
          this.$native.navigateBackToRoot()
        }, 1500)
      }
    },
    handleReceiptClick () {
      this.$native.chooseImage({ count: 1 }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        const file = FileConvert.base64ToFile(images[0], 'file.png')
        const params = {
          bizCode: this.fileCode,
          file: file
        }
        this.$toast.loading()
        const { code, data } = await this.$api.uploadFile(params)
        this.$toast.clear()
        if (code === 200) {
          this.fileCode = data.bizCode
          this.receitImg = images[0]
        }
      })
    },
    handleSignatureClick () {
      this.$native.navigateTo({
        url: '/signature',
        params: {
          fileCode: this.fileCode || ''
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
	.task-check-finish-container {

		.task-check-finish-body {
			padding-bottom: 180px;
		}

		.task-detail-action-view {
			position: fixed;
			left: 0px;
			bottom: 0px;
			right: 0px;
			height: 160px;
			z-index: 9;
			padding-bottom: 20px;
			background-color: $color-white;
		}

		.task-check-card {
			background-color: $color-white;
			padding: 20px 30px;

			.task-check-title {
				height: 80px;
				line-height: 80px;
				color: $color-text-black;
				font-size: $font-16;
				font-weight: bold;
			}

			.task-check-content {
				border: 1px solid $color-bg;
				background-color: $color-lightbg;

				.task-check-signature-container {
					height: 300px;

					.task-check-signature-btn {
						line-height: 300px;
						color: $color-text-darkgray;
						text-align: center;
					}

					.task-check-signature-img {
						width: 600px;
						height: 300px;
						transform: rotate(-90deg);
					}
				}

				.task-receipt-container {
					height: 300px;

					.task-receipt-btn {
						line-height: 300px;
						color: $color-text-darkgray;
						text-align: center;
					}
				}

				.task-check-order-info {
					background-color: $color-white;

					.order-info-sep-line {
						height: 1px;
						background-color: $color-bg;
					}

					.order-text-item {
						padding: 20px 30px;
						display: flex;
						flex-direction: column;
						justify-content: center;

						.order-number {
							color: $color-text-black;
							font-size: $font-14;
							font-weight: bold;
							line-height: 50px;
						}

						.order-text-row {
							display: flex;
							// align-items: center;

							.order-text-title {
								min-width: 22%;
								line-height: 48px;
								font-size: $font-12;
								color: $color-text-gray;
							}

							.order-text-subtitle {
								min-width: 30%;
								line-height: 48px;
								font-size: $font-12;
								color: $color-text-black;
							}
						}
					}
				}
			}
		}
	}
</style>
