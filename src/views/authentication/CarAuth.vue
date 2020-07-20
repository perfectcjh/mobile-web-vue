<template>
  <div class="car-auth-container">
    <div class="info-container">
      <car-auth-info
        :infoData="authInfo"
        :bizCode="bizCode"
        @change="handleAuthInfoChange"
        @nextClick="handleNextClick"
      />
    </div>
  </div>
</template>

<script>
import UserModel from '@/model/user-model.js'
import CarAuthInfo from './components/CarAuthInfo'

export default {
  components: { CarAuthInfo },
  data () {
    return {
      bizCode: '',
      authInfo: {
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
  mounted () {
    this.$native.setNavigationBar({ title: '车辆管理' })

    this.initUserInfo()
  },
  methods: {
    handleNextClick () {
      this.handleFinish()
    },
    handleAuthInfoChange (value, bizCode) {
      this.authInfo = value
      if (bizCode) {
        this.bizCode = bizCode
      }
    },
    handleFinish () {
      const { carLicense, carPhoto, businessLisense, carModel, carColor, carPlateNo, carType, carLength, carLoad, dgtCertificateNo, frameNumber, remark } = this.authInfo
      if (!carLicense.bizCode || !carPhoto.bizCode || !businessLisense.bizCode || !carModel || !carColor || !carPlateNo || !dgtCertificateNo || !frameNumber) {
        this.$toast('请完善信息')
        return
      }

      const params = {
        auditStatus: 'WAIT',
        vehicleModel: carModel,
        vtlPlateColor: carColor,
        vtlPlateNo: carPlateNo,
        vtlType: carType,
        vtlVehicleSizeLength: carLength,
        vtlQuasiTractionWeight: carLoad,
        licenseBeforeCode: carLicense.bizCode,
        vehicleBeforeCode: carPhoto.bizCode,
        transportLicenseCode: businessLisense.bizCode,
        dgtCertificateNo: dgtCertificateNo,
        vin: frameNumber,
        remark: remark
        // 临时处理必填项
        // vehicleQualification: false,
        // vciFlag: false,
        // tciFlag: false,
        // vtlOwner: 'Y'
      }
      const userInfo = UserModel.getUserInfo()
      params.userId = userInfo.id
      if (userInfo.userAuthInfo) {
        params.driverId = userInfo.userAuthInfo.id
        params.driverName = userInfo.userAuthInfo.driverName
      }
      // if (userInfo.userCarInfo) {
      // 	params.id = userInfo.userCarInfo.id
      // 	this.requestUpdate(params)
      // } else {
      this.requestAdd(params)
      // }
    },
    async requestAdd (params) {
      this.$toast.loading()
      const { code } = await this.$api.addCar(params)
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
      const { code } = await this.$api.updateCar(params)
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
	.car-auth-container {

		.info-container {

		}
	}
</style>
