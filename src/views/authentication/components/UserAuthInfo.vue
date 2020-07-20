<template>
  <div class="auth-user-info-container">
    <div style="margin-top: 20px;">
      <card>
        <div class="auth-photo-item-box">
          <auth-photo-item
            title="身份证正面"
            subTitle="请拍摄本人身份证正面照"
            :photo="infoData.idcard.filePath"
            demoType="1"
            @click="handleIdCardClick"
          />
        </div>
        <div class="auth-photo-item-box">
          <auth-photo-item
            title="身份证反面"
            subTitle="请拍摄本人身份证反面照"
            :photo="infoData.idcardFan.filePath"
            demoType="2"
            @click="handleIdCardFanClick"
          />
        </div>
      </card>
    </div>
    <div style="margin-top: 20px;">
      <card>
        <div class="text-input-box">
          <div class="input-title"><span style="color:#E81F2A;">*</span>姓名：</div>
          <van-field
            type="text"
            v-model="bindData.name"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入姓名" />
        </div>
        <div class="text-input-box">
          <div class="input-title"><span style="color:#E81F2A;">*</span>身份证号：</div>
          <van-field
            type="text"
            v-model="bindData.idcardNumber"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入身份证号" />
        </div>
        <div class="text-input-box">
          <div class="input-title"><span style="color:#E81F2A;">*</span>银行名称：</div>
          <van-field
            type="text"
            v-model="bindData.bankName"
            :disabled="true"
            @click.stop="handleSelectBank"
            class="input-text"
            placeholder="点击选择银行" />
        </div>
        <div class="text-input-box">
          <div class="input-title"><span style="color:#E81F2A;">*</span>银行卡号：</div>
          <van-field
            type="number"
            v-model="bindData.bankNumber"
            @input="handleInputChange"
            class="input-text"
            placeholder="请输入银行卡号" />
        </div>
      </card>
    </div>
    <div class="normal-theme-btn" style="margin: 60px 30px;" @click.stop="handleBtnClick">下一步</div>
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
          idcard: {},
          idcardFan: {},
          name: '',
          idcardNumber: '',
          bankName: '',
          bankNumber: ''
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
      bindData: {
        idcard: {},
        idcardFan: {},
        name: this.infoData.name,
        idcardNumber: this.infoData.idcardNumber,
        bankName: this.infoData.bankName,
        bankNumber: this.infoData.bankNumber
      }
    }
  },
  mounted () {
    window.didReceiveNotification = (value) => {
      if (value.name === 'UserAuthDidSelectBank') {
        this.bindData.bankName = value.value.bankName
        this.$emit('change', this.bindData)
      }
    }
  },
  methods: {
    handleSelectBank () {
      this.$native.navigateTo({
        url: '/searchBank'
      })
    },
    handleIdCardClick () {
      this.$native.chooseImage({ count: 1 }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        const file = FileConvert.base64ToFile(images[0], 'file.png')
        const params = {
          bizCode: this.bizCode,
          bizExtraValue: 'idFront',
          file: file
        }
        this.$toast.loading()
        const { code, data } = await this.$api.uploadFile(params)
        this.$toast.clear()
        if (code === 200) {
          this.bindData.idcard = data
          this.$emit('change', this.bindData, data.bizCode)

          this.$toast.loading()
          const ocrRes = await this.$api.ocrIdCard({ idCardReverseUrl: data.filePath })
          this.$toast.clear()
          if (ocrRes.code === 200) {
            this.bindData.name = ocrRes.data.name
            this.bindData.idcardNumber = ocrRes.data.id
            this.$emit('change', this.bindData)
          }
        }
      })
    },
    async handleIdCardFanClick () {
      this.$native.chooseImage({ count: 1 }, async (images) => {
        if (!images || images && images.length <= 0) { return }
        const file = FileConvert.base64ToFile(images[0], 'file.png')
        const params = {
          bizCode: this.bizCode,
          bizExtraValue: 'idBack',
          file: file
        }
        this.$toast.loading()
        const { code, data } = await this.$api.uploadFile(params)
        this.$toast.clear()
        if (code === 200) {
          this.bindData.idcardFan = data
          this.$emit('change', this.bindData, data.bizCode)
        }
      })
    },
    handleInputChange () {
      this.$emit('change', this.bindData)
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

		.text-input-box {
			display: flex;
			margin-top: 1px;
			height: 100px;
			background-color: $color-white;
			align-items: center;
			padding: 0px 32px;

			.input-title {
				width: 170px;
				font-size: $font-14;
				color: $color-text-black;
			}

			.input-text {
				flex: 1;
        height: 50px;
        line-height: 50px;
				font-size: $font-14;
				color: $color-text-black;
        padding: 0rpx;
			}
		}
	}
</style>
