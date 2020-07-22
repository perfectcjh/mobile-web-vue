<template>
  <div class="task-detail-map-container">
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
    <div class="task-detail-map-info-container" :style="detailInfoStyle" @touchstart.stop="handleTouchStart" @touchmove.stop="handleTouchMove" @touchend.stop="handleTouchEnd">
      <div class="task-detail-map-info-button" @click.stop="handleInfoClick">
        <div class="task-detail-map-info-button-img">
          <img v-if="!isShowDetailInfo" src="../../assets/common/icon-view-show.png" />
          <img v-if="isShowDetailInfo" src="../../assets/common/icon-view-hide.png" />
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
import MapView from '@/components/map/MapView.vue'
import { OrderDetailModel } from '@/model/order-model.js'

export default {
  components: { TaskDetailMapTopView, TaskDetailMapInfoView, MapView },
  data () {
    return {
      isShowDetailInfo: false,
      detailInfoStyle: '',
      orderId: '',
      fileCode: '',
      pageData: {},
      currentAddress: '',
      locationObj: {
        longitude: '',
        latitude: ''
      },
      touchObj: {
        isTouch: false,
        startY: 0,
        currentY: 0,
        moveY: 0,
        detailHeight: 0
      }
    }
  },
  mounted () {
    this.$native.setNavigationBar({ title: '任务详情' })

    this.setDetailInfoStyle()

    this.orderId = this.$route.query.orderId || this.$route.query.id
    this.loadData()
  },
  methods: {
    setDetailInfoStyle () {
      if (this.touchObj.isTouch) {
        this.detailInfoStyle = `height: ${this.touchObj.detailHeight}px`
      } else {
        this.detailInfoStyle = this.isShowDetailInfo ? 'height: 95%;' : 'height: 35%;'
      }
    },
    handleTouchStart (event) {
      event.preventDefault()
      if (event.touches.length === 1) {
        this.touchObj.isTouch = true
        const touch = event.touches[0]

        this.touchObj.startY = touch.clientY
      }
    },
    handleTouchMove (event) {
      event.preventDefault()
      if (event.touches.length === 1) {
        const touch = event.touches[0]

        this.touchObj.currentY = touch.clientY
        this.touchObj.moveY = this.touchObj.currentY - this.touchObj.startY

        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        const startHeight = this.isShowDetailInfo ? windowHeight * 0.95 : windowHeight * 0.35
        let detailHeight = startHeight - this.touchObj.moveY
        if (detailHeight >= windowHeight * 0.95) {
          detailHeight = windowHeight * 0.95
        }
        if (detailHeight <= windowHeight * 0.35) {
          detailHeight = windowHeight * 0.35
        }
        this.touchObj.detailHeight = detailHeight
      }
      this.setDetailInfoStyle()
    },
    handleTouchEnd () {
      this.touchObj.isTouch = false

      if (this.isShowDetailInfo && this.touchObj.moveY > 100) {
        this.isShowDetailInfo = false
      }
      if (!this.isShowDetailInfo && this.touchObj.moveY < -100) {
        this.isShowDetailInfo = true
      }
      this.setDetailInfoStyle()
    },
    getLocation () {
      this.$refs.mapView.getCurrentLocation()
    },
    checkLocation () {
      if (this.locationObj) {
        if (this.locationObj.latitude && this.locationObj.longitude) {
          return true
        }
      }
      this.$alert.show({
        message: '未能获取位置信息，请点击获取位置后重试。如未授权，请到 设置 中打开定位权限后重试'
      })
      return false
    },
    async loadData () {
      const params = {
        id: this.orderId
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
    async reloadData () {
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
    handleAddressChange (address) {
      this.currentAddress = address.address
    },
    handleLocationChange (location) {
      this.locationObj = location
    },
    handleInfoClick () {
      this.isShowDetailInfo = !this.isShowDetailInfo
      this.setDetailInfoStyle()
    },
    handleBackClick () {
      this.$uniNative.navigateBack()
    },
    handleSignatureClick () {
      if (!this.checkLocation()) { return }
      this.$native.navigateTo({
        url: '/taskCheckFinish',
        params: {
          orderId: this.pageData.orderId,
          longitude: `${this.locationObj.longitude}`,
          latitude: `${this.locationObj.latitude}`,
          location: this.currentAddress
        }
      })
    },
    handleUploadClick () {
      if (!this.checkLocation()) { return }
      this.$native.navigateTo({
        url: '/taskUploadPhoto',
        params: {
          orderId: this.pageData.orderId,
          longitude: `${this.locationObj.longitude}`,
          latitude: `${this.locationObj.latitude}`,
          location: this.currentAddress
        }
      })
    },
    handleFinishClick () {
      if (!this.checkLocation()) { return }
      if (this.pageData.logisticsStatus === 'take_order') {
        this.$alert.show({
          message: '确认提货完成？',
          isConfirm: true,
          onConfirm: () => {
            this.requestPickupFinsh()
          }
        })
      }
      if (this.pageData.logisticsStatus === 'pickup') {
        this.$alert.show({
          message: '确认卸货完成？',
          isConfirm: true,
          onConfirm: () => {
            this.requestReceiptFinsh()
          }
        })
      }
    },
    async requestPickupFinsh () {
      const params = {
        departId: this.pageData.orderId,
        waybillDetailIds: this.pageData.detailList.map(el => el.orderId),
        latitude: this.locationObj.latitude,
        longitude: this.locationObj.longitude,
        location: this.currentAddress,
        fileCode: this.fileCode
      }
      this.$toast.loading()
      const { code } = await this.$api.orderPickupCompleted(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('提货成功')
        this.reloadData()
        setTimeout(() => {
          this.$native.navigateBackToRoot()
        }, 1500)
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
        fileCode: this.fileCode
      }
      this.$toast.loading()
      const { code } = await this.$api.orderReceiptCompleted(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('卸货成功')
        this.reloadData()
        setTimeout(() => {
          this.handleSignatureClick()
        }, 1500)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .task-detail-map-container {
    position: fixed;
    top: 0px;
    bottom: 0rx;
    left: 0px;
    right: 0px;
    padding: 0px;

    .map-container {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 1;
    }

    .task-detail-map-top {
      position: fixed;
      top: 30px;
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
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;

        .task-detail-map-info-button-img {
          width: 70px;
          height: 15px;
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
					height: 88px;
					line-height: 88px;
				}
			}
		}
  }
</style>
