<template>
  <div class="detail-car-info-container">
    <div class="order-info-view">
      <div class="order-info-left">
        <div class="order-status-text">{{ itemData.orderStatusText }}</div>
        <div class="order-location-view">
          <div class="order-location">
            <div class="order-location-text">{{ itemData.locationFrom }}</div>
          </div>
          <div class="order-location-arrow">
            <img src="../../../static/common/icon-location-line-white.png" />
          </div>
          <div class="order-location right">
            <div class="order-location-text">{{ itemData.locationTo }}</div>
          </div>
        </div>
      </div>
      <div class="order-info-right">
        <div class="order-info-img">
          <img src="../../../static/driver/order/img-task-get-goods.png" />
        </div>
      </div>
    </div>
    <div class="detail-item-card-container">
      <div class="detail-item-card-bg"></div>
      <div class="detail-item-card">
        <div class="detail-item-content">
          <div class="content-left">
            <div class="content-left-icon">
              <img src="../../../static/driver/order/icon-task-car.png" />
            </div>
            <div class="content-text-view">
              <div class="content-text-title">车辆信息：</div>
              <div class="content-text-des">{{ itemData.carPlateNo || '' }}</div>
            </div>
          </div>
          <div class="content-right">
            <div class="content-right-line">
              <!-- <div class="content-right-text">距离目的地：</div>
							<div class="content-right-text">100公里</div> -->
            </div>
            <div class="content-right-line" style="margin-top: 20px;">
              <!-- <div class="content-right-text">预计到货时间：</div>
							<div class="content-right-text">明日送达</div> -->
            </div>
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
  }
}
</script>

<style lang="stylus" scoped>
	.detail-car-info-container {

		.order-info-view {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-image: $linear-gradient-bg-theme;
			padding: 30px 30px;

			.order-info-left {
				padding: 0px 30px;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.order-status-text {
					padding-top: 30px;
					font-size: $font-22;
					color: $color-white;
					font-weight: bold;
				}
			}

			.order-info-right {

				.order-info-img {
					width: 260px;
					height: 128px;
				}
			}
		}

		.order-location-view {
			margin-top: 30px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.order-location {

				.order-location-text {
					width: 160px;
					font-size: $font-14;
					color: $color-white;
					font-weight: bold;
					text-over(2);
				}
			}

			.order-location.right {
				justify-content: flex-end;
			}

			.order-location-arrow {
				width: 50px;
				height: 8px;
			}
		}

		.detail-item-card-container {
			position: relative;
			height: 180px;

			.detail-item-card-bg {
				position: absolute;
				top: 0px;
				left: 0px;
				right: 0px;
				height: 100px;
				z-index: 1;
				background-image: $linear-gradient-bg-theme;
			}

			.detail-item-card {
				position: absolute;
				top: 0px;
				left: 0px;
				right: 0px;
				height: 180px;
				z-index: 2;
				border-radius: 16px;
				background-color: $color-white;
				margin: 0px 30px;

				.bottom-card-sep-line {
					margin: 20px 0px;
					height: 1px;
				}

				.detail-item-content {
					height: 100%;
					display: flex;
					align-items: center;

					.content-left {
						width: 49%;
						height: 100%;
						display: flex;
						align-items: center;
						padding: 0px 30px;

						.content-text-view {
							margin-left: 30px;

							.content-text-title {
								color: $color-text-darkgray;
								font-size: $font-14;
								font-weight: bold;
							}

							.content-text-des {
								margin-top: 24px;
								color: $color-text-black;
								font-size: $font-14;
								font-weight: bold;
							}
						}

						.content-left-icon {
							width: 80px;
							height: 80px;
						}
					}

					.content-right {
						width: 49%;
						display: flex;
						flex-direction: column;
						justify-content: center;

						.content-right-line {
							color: $color-text-darkgray;
							font-size: $font-12;
							display: flex;;

							.content-right-text {
								min-width: 120px;
							}
						}
					}
				}
			}
		}
	}
</style>
