<template>
  <div class="home-top-view-container">
    <div class="home-top-view-bg">
      <img src="../../../static/driver/home/bg-home-top.png" mode="scaleToFill" />
    </div>
    <div class="home-top-view-content">
      <div class="content-fee-box">
        <div class="content-fee-box-top">
          <div class="fee-name">已到账运费(元)</div>
          <div class="fee-show-price" @click.stop="handleSeePriceClick">
            <img v-if="isShowPrice" src="../../../static/common/icon-can-see.png" mode="aspectFit" />
            <img v-else src="../../../static/common/icon-not-see.png" mode="aspectFit" />
          </div>
        </div>
        <div v-if="isShowPrice" class="fee-money">{{ feeTotal.receivedFee || "0.00" }}</div>
        <div v-else class="fee-money">***</div>
      </div>
      <div class="content-fee-detail-box">
        <div class="fee-detail-box">
          <div class="fee-detail-name">预计到账运费</div>
          <div v-if="isShowPrice" class="fee-detail-money">{{ feeTotal.expectedReceivedFee || "0.00" }}</div>
          <div v-else class="fee-detail-money">***</div>
        </div>
        <div class="fee-detail-sep-line"></div>
        <div class="fee-detail-box">
          <div class="fee-detail-name">等待到账运费</div>
          <div v-if="isShowPrice" class="fee-detail-money">{{ feeTotal.waitReceivedFee || "0.00" }}</div>
          <div v-else class="fee-detail-money">***</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    feeTotal: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isShowPrice: true
    }
  },
  methods: {
    handleSeePriceClick () {
      this.isShowPrice = !this.isShowPrice
    }
  }
}
</script>

<style lang="stylus" scoped>
	.home-top-view-container {
		position: relative;
		height: 500px;

		.home-top-view-bg {
			width: 100%;
			height: 480px;
		}

		.home-top-view-content {
			position: absolute;
			z-index: 1;
			bottom: 0px;
			left: 0px;
			right: 0px;
			padding: 0px 30px;

			.content-fee-box {
				padding: 0px 50px;
				padding-bottom: 30px;

				.content-fee-box-top {
					display: flex;
					align-items: center;
				}

				.fee-name {
					font-size: $font-14;
					color: $color-white;
				}

				.fee-show-price {
					margin-left: 30px;
					width: 60px;
					height: 30px;
				}

				.fee-money {
					margin-top: 20px;
					font-size: $font-32;
					font-weight: bold;
					color: $color-white;
				}
			}

			.content-fee-detail-box {
				height: 140px;
				background-color: $color-white;
				border-radius: 16px;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.fee-detail-sep-line {
					background-color: $color-sepline;
					width: 1px;
					height: 80px;
				}

				.fee-detail-box {
					display: flex;
					flex-direction: column;
					justify-content: center;
					width: 49%;
					padding: 0px 50px;

					.fee-detail-name {
						color: $color-text-gray;
						font-size: $font-12
					}

					.fee-detail-money {
						color: $color-text-black;
						margin-top: 8px;
						font-size: $font-20;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>
