<template>
  <div class="auth-user-info-container">
    <div style="margin-top: 20px;">
      <card>
        <div class="auth-photo-item-box">
          <auth-photo-item
            title="驾驶证"
            subTitle="请拍本人驾驶证"
            :photo="infoData.driverLicense.filePath"
            demoType="6"
            @click="handleDriverLicenseClick"
          />
        </div>
      </card>
      <card>
        <div class="auth-photo-item-box">
          <auth-photo-item
            title="从业资格证"
            subTitle="请拍本人从业资格证"
            :photo="infoData.professionalLicense.filePath"
            demoType="7"
            @click="handleProfessionalLicenseClick"
          />
        </div>
      </card>
    </div>
    <div class="normal-theme-btn" style="margin: 60px 30px;" @click.stop="handleBtnClick">提交</div>
  </div>
</template>

<script>
import Card from '@/components/card/Card.vue'
import AuthPhotoItem from './AuthPhotoItem.vue'
import FileConvert from '@/module/utils/file-convert.js'

export default {
  components: { Card, AuthPhotoItem },
  props: {
    infoData: {
      type: Object,
      default: () => {
        return {
          driverLicense: {},
          professionalLicense: {}
        }
      }
    },
    bizCode: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleDriverLicenseClick () {
      this.$native.chooseImage({ count: 1 }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        const file = FileConvert.base64ToFile(images[0], 'file.png')
        const params = {
          bizCode: this.bizCode,
          bizExtraValue: 'drivingLicence',
          file: file
        }
        this.$toast.loading()
        const { code, data } = await this.$api.uploadFile(params)
        this.$toast.clear()
        if (code === 200) {
          const infoData = Object.assign({}, this.infoData, {
            driverLicense: data
          })
          this.$emit('change', infoData, data.bizCode)
        }
      })
    },
    handleProfessionalLicenseClick () {
      this.$native.chooseImage({ count: 1 }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        const file = FileConvert.base64ToFile(images[0], 'file.png')
        const params = {
          bizCode: this.bizCode,
          bizExtraValue: 'qualification',
          file: file
        }
        this.$toast.loading()
        const { code, data } = await this.$api.uploadFile(params)
        this.$toast.clear()
        if (code === 200) {
          const infoData = Object.assign({}, this.infoData, {
            professionalLicense: data
          })
          this.$emit('change', infoData, data.bizCode)
        }
      })
    },
    handleBtnClick () {
      this.$emit('nextClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
	.auth-user-info-container {

		.auth-photo-item-box {
			margin-top: 1px;
		}
	}
</style>
