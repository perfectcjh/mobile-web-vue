<template>
  <div class="upload-info-container">
    <div class="steps-container">
      <steps-diy
        ref="steps"
        :defaultIndex="selectIndex"
        :data="stepsData"
        textColor="#FFFFFF"
        lineColor="#FFFFFF"
        background="linear-gradient(90deg,rgba(17,192,219,1) 0%,rgba(70,189,234,1) 100%)"
        @change="handleStepsChange"
      />
    </div>
    <div class="info-container">
      <user-auth-info
        v-if="selectIndex===0"
        :infoData="authInfo"
        :bizCode="bizCode"
        @change="handleAuthInfoChange"
        @nextClick="handleNextClick"
      />
      <user-auth-other-info
        v-if="selectIndex===1"
        :infoData="authOtherInfo"
        :bizCode="bizCode"
        @change="handleAuthOtherInfoChange"
        @nextClick="handleNextClick"
      />
    </div>
  </div>
</template>

<script>
import UserModel from '@/model/user-model.js'
import StepsDiy from '@/components/steps/StepsDiy'
import UserAuthInfo from './components/UserAuthInfo'
import UserAuthOtherInfo from './components/UserAuthOtherInfo'

export default {
  components: { StepsDiy, UserAuthInfo, UserAuthOtherInfo },
  data () {
    return {
      selectIndex: 0,
      stepsData: [
        {
          title: '个人信息',
          normalIcon: require('../../static/driver/authentication/icon-step-1-normal.png'),
          selectIcon: require('../../static/driver/authentication/icon-step-1-select.png')
        },
        {
          title: '个人资料',
          normalIcon: require('../../static/driver/authentication/icon-step-2-normal.png'),
          selectIcon: require('../../static/driver/authentication/icon-step-2-select.png')
        }
      ],
      bizCode: '',
      authInfo: {
        idcard: {},
        idcardFan: {},
        name: '',
        idcardNumber: '',
        bankName: '',
        bankNumber: ''
      },
      authOtherInfo: {
        driverLicense: {},
        professionalLicense: {}
      }
    }
  },
  mounted () {
    this.$native.setNavigationBar({ title: '个人认证' })

    this.initUserInfo()
  },
  methods: {
    handleStepsChange (index) {
      this.selectIndex = index
    },
    handleNextClick () {
      if (this.selectIndex === 1) {
        this.handleFinish()
      } else {
        this.selectIndex = this.selectIndex + 1
        this.$refs.steps.setSelectIndex(this.selectIndex)
      }
    },
    handleAuthInfoChange (value, bizCode) {
      this.authInfo = value
      if (bizCode) {
        this.bizCode = bizCode
      }
      console.log(value, bizCode)
    },
    handleAuthOtherInfoChange (value, bizCode) {
      this.authOtherInfo = value
      if (bizCode) {
        this.bizCode = bizCode
      }
      console.log(value, bizCode)
    },
    handleFinish () {
      const { idcard, idcardFan, name, idcardNumber, bankName, bankNumber } = this.authInfo
      const { driverLicense, professionalLicense } = this.authOtherInfo
      if (!idcard.bizCode || !idcardFan.bizCode || !name || !idcardNumber || !bankName || !bankNumber) {
        this.$toast('请完善个人信息')
        this.selectIndex = 0
        this.$refs.steps.setSelectIndex(0)
        return
      }
      if (!driverLicense.bizCode || !professionalLicense.bizCode) {
        this.$toast('请完善个人资料')
        this.selectIndex = 1
        this.$refs.steps.setSelectIndex(1)
        return
      }
      const params = {
        auditStatus: 'WAIT',
        driverName: name,
        idCard: idcardNumber,
        idCardBeforeCode: idcard.bizCode,
        idCardBehindCode: idcardFan.bizCode,
        drivingLicenceCode: driverLicense.bizCode,
        qualificationCertificateCode: professionalLicense.bizCode,
        depositBank: bankName,
        bankAccount: bankNumber
      }
      const userInfo = UserModel.getUserInfo()
      params.userId = userInfo.id
      params.driverPhone = userInfo.phone
      if (userInfo.userAuthInfo) {
        params.id = userInfo.userAuthInfo.id
        this.requestUpdate(params)
      } else {
        this.requestAdd(params)
      }
    },
    async requestAdd (params) {
      this.$toast.loading()
      const { code } = await this.$api.addDriver(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('提交成功')
        setTimeout(() => {
          this.$native.navigateBack()
        }, 1500)
      }
    },
    async requestUpdate (params) {
      this.$toast.loading()
      const { code } = await this.$api.updateDriver(params)
      this.$toast.clear()
      if (code === 200) {
        this.$toast('提交成功')
        setTimeout(() => {
          this.$native.navigateBack()
        }, 1500)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
	.upload-info-container {

		.steps-container {
			z-index: 9;
			position: fixed;
			left: 0px;
			right: 0px;
			height: 160px;
		}

		.info-container {
			padding-top: 160px;
		}
	}
</style>
