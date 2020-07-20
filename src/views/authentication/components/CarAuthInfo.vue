<template>
  <div class="auth-car-info-container">
    <div style="margin-top: 20px;">
      <card>
        <div class="auth-photo-item-box">
          <auth-photo-item
            title="行驶证"
            subTitle="请拍摄本人行驶证"
            :photo="infoData.carLicense.filePath"
            demoType="3"
            @click="handleCarLicenseClick"
          />
        </div>
        <div class="auth-photo-item-box">
          <auth-photo-item
            title="机动车车头照"
            subTitle="请拍摄车头45度角照片"
            :photo="infoData.carPhoto.filePath"
            demoType="4"
            @click="handleCarPhotoClick"
          />
        </div>
        <div class="auth-photo-item-box">
          <auth-photo-item
            title="运输经营许可证"
            subTitle="请拍摄道路运输经营许可证"
            :photo="infoData.businessLisense.filePath"
            demoType="5"
            @click="handleBusinessLisenseClick"
          />
        </div>
      </card>
    </div>
    <div style="margin-top: 20px;">
      <card>
        <div class="text-input-box" @click="handleSelectCarModelClick">
          <div class="input-title"><span class="input-title-span">*</span><div>车型：</div></div>
          <div v-if="carModelName" class="uni-input">{{ carModelName }}</div>
          <van-field
            v-else
            disabled
            type="text"
            @input="handleInputChange"
            class="input-text"
            placeholder="请选择" />
        </div>
        <div class="text-input-box">
          <div class="input-title"><span class="input-title-span">*</span><div>车牌号：</div></div>
          <van-field
            type="text"
            v-model="bindData.carPlateNo"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入" />
        </div>
        <div class="text-input-box">
          <div class="input-title"><span class="input-title-span">*</span><div>车架号：</div></div>
          <van-field
            type="text"
            v-model="bindData.frameNumber"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入" />
        </div>
      </card>
    </div>
    <div style="margin-top: 20px;">
      <card>
        <div class="text-input-box" @click="handleSelectCarColorClick">
          <div class="input-title"><span class="input-title-span">*</span><div>牌照颜色：</div></div>
          <div v-if="carColorName" class="uni-input">{{ carColorName }}</div>
          <van-field
            v-else
            disabled
            type="text"
            @input="handleInputChange"
            class="input-text"
            placeholder="请选择" />
        </div>

        <div class="text-input-box">
          <div class="input-title"><span class="input-title-span"></span><div>车辆类型：</div></div>
          <van-field
            type="text"
            v-model="bindData.carType"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入" />
        </div>
        <div class="text-input-box">
          <div class="input-title"><span class="input-title-span"></span><div>车长(米)：</div></div>
          <van-field
            type="number"
            v-model="bindData.carLength"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入" />
        </div>
        <div class="text-input-box">
          <div class="input-title"><span class="input-title-span"></span><div>载重(KG)：</div></div>
          <van-field
            type="number"
            v-model="bindData.carLoad"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入" />
        </div>
        <div class="text-input-box">
          <div class="input-title"><span class="input-title-span">*</span><div>运输经营许可证号：</div></div>
          <van-field
            type="text"
            v-model="bindData.dgtCertificateNo"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入" />
        </div>
      </card>
    </div>
    <div style="margin-top: 20px;">
      <card>
        <div class="text-area-box">
          <div class="textarea-title">备注：</div>
          <van-field
            type="textarea"
            v-model="bindData.remark"
            @input="handleInputChange"
            class="textarea-text"
            placeholder="请输入" />
        </div>
      </card>
    </div>
    <div class="normal-theme-btn" style="margin: 60px 30px;" @click.stop="handleBtnClick">提交</div>
    <picker-normal ref="carModelPicker" />
    <picker-normal ref="carColorPicker" />
  </div>
</template>

<script>
import Constants from '@/constants/index.js'
import Card from '@/components/card/Card.vue'
import AuthPhotoItem from './AuthPhotoItem.vue'
import FileConvert from '@/module/utils/file-convert.js'
import PickerNormal from '@/components/picker/PickerNormal'

export default {
  components: { Card, AuthPhotoItem, PickerNormal },
  props: {
    infoData: {
      type: Object,
      default: () => {
        return {
          carLicense: {},
          carPhoto: {},
          businessLisense: {},
          carModel: '',
          carColor: '',
          carPlateNo: '',
          carType: '',
          carLength: '',
          carLoad: '',
          dgtCertificateNo: '',
          frameNumber: '',
          remark: ''
        }
      }
    },
    bizCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      carModelOptions: Constants.AUTH_CAR_MODEL_TYPE,
      carColorOptions: Constants.AUTH_CAR_COLOR_TYPE,
      bindData: this.infoData
    }
  },
  computed: {
    carModelName () {
      return Constants.codeToName(this.bindData.carModel, this.carModelOptions)
    },
    carColorName () {
      return Constants.codeToName(this.bindData.carColor, this.carColorOptions)
    }
  },
  methods: {
    handleBtnClick () {
      this.$emit('nextClick')
    },
    handleCarLicenseClick () {
      this.$native.chooseImage({ count: 1 }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        const file = FileConvert.base64ToFile(images[0], 'file.png')
        const params = {
          bizCode: this.bizCode,
          bizExtraValue: 'vehicleLicense',
          file: file
        }
        this.$toast.loading()
        const { code, data } = await this.$api.uploadFile(params)
        this.$toast.clear()
        if (code === 200) {
          this.bindData.carLicense = data
          this.$emit('change', this.bindData, data.bizCode)

          this.$toast.loading()
          const ocrRes = await this.$api.ocrVehicleLicense({ imgUrl: data.filePath })
          this.$toast.clear()
          if (ocrRes.code === 200) {
            this.bindData.carPlateNo = ocrRes.data.plateNumber
            this.bindData.carType = ocrRes.data.vehicleType
            this.bindData.frameNumber = ocrRes.data.identifyCode
            this.$emit('change', this.bindData)
          }
        }
      })
    },
    handleCarPhotoClick () {
      this.$native.chooseImage({ count: 1 }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        const file = FileConvert.base64ToFile(images[0], 'file.png')
        const params = {
          bizCode: this.bizCode,
          bizExtraValue: 'vehicleBefore',
          file: file
        }
        this.$toast.loading()
        const { code, data } = await this.$api.uploadFile(params)
        this.$toast.clear()
        if (code === 200) {
          this.bindData.carPhoto = data
          this.$emit('change', this.bindData, data.bizCode)
        }
      })
    },
    handleBusinessLisenseClick () {
      this.$native.chooseImage({ count: 1 }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        const file = FileConvert.base64ToFile(images[0], 'file.png')
        const params = {
          bizCode: this.bizCode,
          bizExtraValue: 'transport',
          file: file
        }
        this.$toast.loading()
        const { code, data } = await this.$api.uploadFile(params)
        this.$toast.clear()
        if (code === 200) {
          this.bindData.businessLisense = data
          this.$emit('change', this.bindData, data.bizCode)
        }
      })
    },
    handleSelectCarModelClick () {
      const data = this.carModelOptions.map(el => {
        return el.name
      })
      const callback = (value, index) => {
        this.bindData.carModel = this.carModelOptions[index].code
        this.$emit('change', this.bindData)
      }
      const params = {
        data: data,
        callback: callback
      }
      this.$refs.carModelPicker.show(params)
    },
    handleSelectCarColorClick () {
      const data = this.carColorOptions.map(el => {
        return el.name
      })
      const callback = (value, index) => {
        this.bindData.carColor = this.carColorOptions[index].code
        this.$emit('change', this.bindData)
      }
      const params = {
        data: data,
        callback: callback
      }
      this.$refs.carColorPicker.show(params)
    },
    handleInputChange () {
      this.$emit('change', this.bindData)
    }
  }
}
</script>

<style lang="stylus" scoped>
	.auth-car-info-container {

		.auth-photo-item-box {
			margin-top: 1px;
		}

		.text-input-box {
			display: flex;
			margin-top: 1px;
			height: 100px;
			background-color: $color-white;
			align-items: center;
			padding: 0px 32px;

			.input-title {
				min-width: 200px;
				font-size: $font-14;
				color: $color-text-black;
				display: flex;
				align-items: center;

				.input-title-span {
					width: 20px;
					color: $color-red;
				}
			}

			.input-text {
				font-size: $font-14;
				color: $color-text-black;
			}
		}

		.text-area-box {
			padding: 0px 32px;
			height: 280px;
			background-color: $color-white;
			box-sizing: border-box;

			.textarea-title {
				height: 100px;
				line-height: 100px;
				font-size: $font-14;
				font-weight: bold;
				color: $color-text-black;
			}

			.textarea-text {
				height: 150px;
				font-size: $font-14;
				color: $color-text-black;
			}
		}
	}
</style>
