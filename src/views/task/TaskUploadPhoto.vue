<template>
  <div class="update-task-photo-container">
    <div class="photo-select-container">
      <div class="photo-select-card">
        <div class="photo-select-des">请拍摄/上传清晰的照片，以便核实货物数量，可传6张货物信息</div>
        <div class="photo-select-grid-container">
          <!-- <photo-select-grid
            v-model="imageData"
            :limit="6"
            :showUploadProgress="false"
          /> -->
          <van-grid :column-num="3" :gutter="1" :square="true" :border="false">
            <van-grid-item v-for="(item, index) in imageData" :key="index">
              <div class="image-item" @click.stop="handleImageClick(index)">
                <div class="image-item-close" @click.stop="handleImageDelClick(index)">X</div>
                <div class="image-item-img">
                  <img :src="item" />
                </div>
              </div>
            </van-grid-item>
            <van-grid-item v-if="imageData.length < 6">
              <div class="image-item add" @click.stop="handleImageAddClick">
                <div class="image-item-add">
                  <img src="../../static/common/icon-add.png" />
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
    <div class="normal-theme-btn" style="margin: 60px 30px;" @click.stop="handleUploadClick">{{ finishBtnTitle }}</div>
  </div>
</template>

<script>
// import PhotoSelectGrid from '@/qncomponents/photo-select/photo-select-grid.vue'
import FileConvert from '@/module/utils/file-convert.js'
import { OrderDetailModel } from '@/model/order-model.js'

export default {
  // components: { PhotoSelectGrid },
  data () {
    return {
      imageData: [],
      imageFile: [],
      bizCode: '',
      orderId: '',
      pageData: {},
      logisticsStatus: '',
      subIds: [],
      latitude: '',
      longitude: '',
      location: ''
    }
  },
  computed: {
    finishBtnTitle () {
      if (this.logisticsStatus === 'take_order') {
        return '上传并完成提货'
      }
      if (this.logisticsStatus === 'pickup') {
        return '上传并完成卸货'
      }
      return ''
    }
  },
  mounted () {
    this.$native.setNavigationBar({ title: '上传货物照片' })

    this.orderId = this.$route.query.orderId
    this.latitude = this.$route.query.latitude
    this.longitude = this.$route.query.longitude
    this.location = this.$route.query.location
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
        const subIds = this.pageData.detailList.map(el => el.orderId)
        this.subIds = subIds.join(',')
        this.logisticsStatus = this.pageData.logisticsStatus
      }
    },
    handleImageClick () {

    },
    handleImageAddClick () {
      const count = 6 - this.imageData.length
      this.$native.chooseImage({ count: count }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        this.$toast.loading()
        images.forEach(el => {
          const file = FileConvert.base64ToFile(el, 'file.png')
          this.imageFile.push(file)
          this.imageData.push(el)
        })
        this.$toast.clear()
      })
    },
    handleImageDelClick (index) {
      this.imageFile.splice(index, 1)
      this.imageData.splice(index, 1)
    },
    handleUploadClick () {
      if (!this.imageData.length) {
        this.$toast('请上传照片')
        return
      }
      if (this.logisticsStatus === 'take_order') {
        this.$alert.show({
          message: '确认上传并完成提货？',
          isConfirm: true,
          onConfirm: () => {
            this.uploadFiles()
          }
        })
      }
      if (this.logisticsStatus === 'pickup') {
        this.$alert.show({
          message: '确认上传并完成卸货？',
          isConfirm: true,
          onConfirm: () => {
            this.uploadFiles()
          }
        })
      }
    },
    handleFinishClick () {
      if (this.logisticsStatus === 'take_order') {
        this.requestPickupFinsh()
      }
      if (this.logisticsStatus === 'pickup') {
        this.requestReceiptFinsh()
      }
    },
    async uploadFiles () {
      const params = {
        files: this.imageFile
      }
      this.$toast.loading()
      const { code, data } = await this.$api.uploadFiles(params)
      this.$toast.clear()
      if (code === 200) {
        this.bizCode = data.bizCode
        this.handleFinishClick()
      }
    },
    async requestPickupFinsh () {
      const params = {
        departId: this.orderId,
        waybillDetailIds: this.subIds,
        latitude: this.latitude,
        longitude: this.longitude,
        fileCode: this.bizCode,
        location: this.location
      }
      this.$toast.loading()
      const { code } = await this.$api.orderPickupCompleted(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('提货成功')
        setTimeout(() => {
          this.$native.navigateBackToRoot()
        }, 1500)
      }
    },
    // 卸货完成
    async requestReceiptFinsh () {
      const params = {
        departId: this.orderId,
        waybillDetailIds: this.subIds,
        latitude: this.latitude,
        longitude: this.longitude,
        fileCode: this.bizCode,
        location: this.location
      }
      this.$toast.loading()
      const { code } = await this.$api.orderReceiptCompleted(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('卸货成功')
        setTimeout(() => {
          this.$native.navigateBackToRoot()
        }, 1500)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
	.update-task-photo-container {

		.photo-select-container {
			padding: 20px 30px;

			.photo-select-card {
				background-color: $color-white;
				border-radius: 16px;
				padding: 20px 30px;

				.photo-select-grid-container {
					padding: 0px 0px;

          .image-item {
            position relative
            width: 100%;
            height: 100%;
            display: flex;
            justify-content center
            align-items center

            .image-item-img {
              width: 100%;
              height: 100%;
            }

            .image-item-close {
              position absolute
              width 40px
              height 40px
              top 0px
              right 0px
              color $color-white
              background-color $color-gray
              border-radius 50%
              line-height 44px
              text-align center
              font-size $font-11
            }

            .image-item-add {
              width 50px
              height 50px
            }
          }

          .image-item.add {
            border 1px solid $color-lightgray
          }
				}

				.photo-select-des {
          padding: 0px 10px;
					padding-bottom: 16px;
					font-size: $font-13;
					color: $color-text-darkgray;
          line-height: 1.5;
				}
			}
		}
	}
</style>
