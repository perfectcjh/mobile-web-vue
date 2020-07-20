<template>
  <div class="task-detail-map-top-view-container">
    <div class="top-view-card">
      <div class="top-view-back-button">
        <!-- <image src="/static/common/icon-arrow-left-black.png"></image> -->
      </div>
      <div class="top-view-info-container">
        <div class="top-view-info-title">100</div>
        <div class="top-view-info-des">距离到货点(公里)</div>
      </div>
      <div class="top-view-info-container">
        <div class="top-view-info-title">明日</div>
        <div class="top-view-info-des">预计到达时间</div>
      </div>
      <div class="top-view-back-button"></div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="stylus" scoped>
	.task-detail-map-top-view-container {
		box-sizing: border-box;
		width: 100%;
		padding: 0px 30px;

		.top-view-card {
			border-radius: 16px;
			height: 132px;
			background-color: $color-white;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0px 30px;

			.top-view-back-button {
				width: 23px;
				height: 38px;
			}

			.top-view-info-container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;

				.top-view-info-title {
					color: $color-black;
					font-size: $font-18;
					font-weight: bold;
				}

				.top-view-info-des {
					margin-top: 12px;
					color: $color-text-darkgray;
					font-size: $font-12;
				}
			}
		}
	}
</style>
