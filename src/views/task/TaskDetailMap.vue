<template>
  <div class="task-detail-map-container">
    <div class="nav-bar">
      <van-nav-bar
        title="任务详情"
        left-arrow
        fixed
        :z-index="998"
        @click-left="handleBackClick"
      />
    </div>
    <div class="map-container">
      <MapView
        ref="mapView"
        @addressChange="handleAddressChange"
        @locationChange="handleLocationChange"
      />
    </div>
    <!-- <div class="task-detail-map-top"> -->
    <!-- <task-detail-map-top-view /> -->
    <!-- </div> -->
    <div class="task-detail-map-info-container" :style="detailInfoStyle">
      <div class="task-detail-map-info-button" @click.stop="handleInfoClick">
        <div class="task-detail-map-info-button-img">
          <img v-if="!isShowDetailInfo" src="../../assets/common/icon-view-show.png" mode="aspectFit" />
          <img v-if="isShowDetailInfo" src="../../assets/common/icon-view-hide.png" mode="aspectFit" />
        </div>
      </div>
      <task-detail-map-info-view
        :address="currentAddress"
        :itemData="pageData"
        @locationClick="getLocation"
      />
    </div>
    <div class="task-detail-map-action-view">
      <div class="task-detail-map-btn-container" v-if="pageData.buttonFinishTitle">
        <div v-if="pageData.logisticsStatus!=='arrived'" class="detail-btn upload" @click.stop="handleUploadClick">上传照片</div>
        <div v-if="pageData.logisticsStatus!=='arrived'" class="detail-btn finish" @click.stop="handleFinishClick">{{ pageData.buttonFinishTitle }}</div>
        <div v-if="pageData.logisticsStatus==='arrived'" class="detail-btn signature" @click.stop="handleSignatureClick">{{ pageData.buttonFinishTitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskDetailMapTopView from './components/TaskDetailMapTopView.vue'
import TaskDetailMapInfoView from './components/TaskDetailMapInfoView.vue'
import MapView from '@/components/Map/MapView.vue'
import { OrderDetailModel } from '@/model/order-model.js'

export default {
  components: { TaskDetailMapTopView, TaskDetailMapInfoView, MapView },
  data () {
    return {
      isShowDetailInfo: false,
      orderId: '',
      fileCode: '',
      token: '',
      pageData: {},
      currentAddress: '',
      locationObj: {
        longitude: '',
        latitude: ''
      }
    }
  },
  computed: {
    detailInfoStyle () {
      return this.isShowDetailInfo ? 'height: 85%;' : 'height: 42%;'
    }
  },
  created () {
    this.$native.getEnv((res) => {
      console.log('UniAppJSBridgeReady', res)
    })
    this.orderId = this.$route.query.id
    this.token = this.$route.query.token
    console.log(JSON.stringify(this.$route.query))
    this.loadData()
  },
  methods: {
    getLocation () {
      this.$refs.mapView.getCurrentLocation()
    },
    checkLocation () {
      if (!this.locationObj.latitude || !this.locationObj.longitude) {
        this.$native.postMessage({
          data: {
            action: 'showModal',
            params: {
              title: '提示',
              content: '未能获取位置信息，请点击获取位置后重试。如未授权，请到 设置 中打开定位权限后重试',
              showCancel: false
            }
          }
        })
        // this.$dialog.alert({
        //   message: '未能获取位置信息，请点击获取位置后重试。如未授权，请到 设置 中打开定位权限后重试'
        // })
        return false
      }
      return true
    },
    async loadData () {
      const params = {
        id: this.orderId,
        token: this.token || ''
      }
      this.$toast.loading()
      const { code, data } = await this.$api.getOrderDetail(params)
      this.$toast.clear()
      if (code === 200) {
        this.pageData = OrderDetailModel(data)
        const startData = {
          title: this.pageData.locationFrom,
          address: this.pageData.pickTotalAddress
        }
        const endData = {
          title: this.pageData.locationTo,
          address: this.pageData.receiptTotalAddress
        }
        this.$refs.mapView.initData({
          startData: startData,
          endData: endData
        })
      }
    },
    handleAddressChange (address) {
      this.currentAddress = address.address
    },
    handleLocationChange (location) {
      this.locationObj = location
    },
    handleInfoClick () {
      this.isShowDetailInfo = !this.isShowDetailInfo
    },
    handleBackClick () {
      this.$native.navigateBack()
    },
    handleSignatureClick () {
      if (!this.checkLocation()) { return }
      this.$native.navigateTo({
        url: `/pages/driver/task/TaskCheckFinish?id=${this.pageData.orderId}&longitude=${this.locationObj.longitude}&latitude=${this.locationObj.latitude}&location=${this.currentAddress}`
      })
    },
    handleUploadClick () {
      if (!this.checkLocation()) { return }
      const subIds = this.pageData.detailList.map(el => el.orderId)
      this.$native.navigateTo({
        url: `/pages/driver/task/UploadTaskPhoto?id=${this.pageData.orderId}&subIds=${subIds.join(',')}&logisticsStatus=${this.pageData.logisticsStatus}&longitude=${this.locationObj.longitude}&latitude=${this.locationObj.latitude}&location=${this.currentAddress}`
      })
    },
    handleFinishClick () {
      if (!this.checkLocation()) { return }
      if (this.pageData.logisticsStatus === 'take_order') {
        this.requestPickupFinsh()
      }
      if (this.pageData.logisticsStatus === 'pickup') {
        this.requestReceiptFinsh()
      }
    },
    async requestPickupFinsh () {
      const params = {
        departId: this.pageData.orderId,
        waybillDetailIds: this.pageData.detailList.map(el => el.orderId),
        latitude: this.locationObj.latitude,
        longitude: this.locationObj.longitude,
        location: this.currentAddress,
        fileCode: this.fileCode,
        token: this.token
      }
      this.$toast.loading()
      const { code } = await this.$api.orderPickupCompleted(params)
      this.$toast.clear()
      if (code === 200) {
        this.$native.toast('提货成功')
        this.handleSuccess()
      }
    },
    // 卸货完成
    async requestReceiptFinsh () {
      const params = {
        departId: this.pageData.orderId,
        waybillDetailIds: this.pageData.detailList.map(el => el.orderId),
        latitude: this.locationObj.latitude,
        longitude: this.locationObj.longitude,
        location: this.currentAddress,
        fileCode: this.fileCode,
        token: this.token
      }
      this.$toast.loading()
      const { code } = await this.$api.orderReceiptCompleted(params)
      this.$toast.clear()
      if (code === 200) {
        this.$native.toast('卸货成功')
        this.handleSuccess()
      }
    },
    handleSuccess () {
      setTimeout(() => {
        this.$native.notification({
          name: 'taskNeedRefresh'
        })
        this.$native.navigateBack()
      }, 1500)
    }
  }
}
</script>

<style lang="stylus">
.van-nav-bar {
  height 92px
  line-height 92px
  // background $linear-gradient-bg-theme
  background-color $color-white
}
.van-nav-bar .van-icon {
  color: $color-text-black;
  font-size: 32px;
}
.van-nav-bar__title {
  color: $color-text-black;
  font-size: 32px;
  font-weight: bold;
}
</style>>

<style lang="stylus" scoped>
  .task-detail-map-container {
    position fixed
    top 0px
    bottom  0rx
    left 0px
    right 0px
    padding 0px

    .nav-bar {
      position fixed
      top 0px
      left 0px
      right 0px
      z-index 998
    }

    .map-container {
      position absolute
      top 0px
      left 0px
      right 0px
      bottom 0px
      z-index 1
    }

    .task-detail-map-top {
      position: fixed;
      top 30px
			left: 0px;
			right: 0px;
			height: 132px;
			z-index: 8;
    }

    .task-detail-map-info-container {
			position: fixed;
			left: 0px;
			right: 0px;
			bottom: 0px;
			z-index: 8;
			background-color: $color-white;
			border-radius: 32px;

      .task-detail-map-info-button {
        height 60px
        display flex
        justify-content center
        align-items center

        .task-detail-map-info-button-img {
          width 70px
          height 15px
        }
      }
		}

		.task-detail-map-action-view {
			position: fixed;
			left: 0px;
			bottom: 0px;
			right: 0px;
			height: 160px;
			z-index: 9;
			padding-bottom: 20px;
			background-color: $color-white;

			.task-detail-map-btn-container {
				padding: 20px 30px;
				display: flex;
				justify-content: center;

				.detail-btn {
					width: 330px;
					height: 90px;
					font-size: $font-13;
					line-height: 90px;
					text-align: center;
					border-radius: 8px;
				}

				.upload {
					color: $color-theme;
					border-radius: $color-theme;
					background-color: $color-white;
					border: 1px solid $color-theme;
					height: 88px;
					line-height: 88px;
				}

				.finish {
					margin-left: 24px;
					color: $color-white;
					border-radius: $color-theme;
					background: $linear-gradient-button-theme;
				}

        .signature {
					width: 100%;
					color: $color-white;
					border-radius: $color-theme;
					background: $linear-gradient-button-theme;
					height: 88rpx;
					line-height: 88rpx;
				}
			}
		}
  }
</style>>
