import UserModel from '@/model/user-model.js'

const mixinUserInfo = {
  data () {
    return {
      appInfo: {
        isNative: false,
        platform: ''
      }
    }
  },
  created () {
    this.parseAppInfo()
  },
  methods: {
    parseAppInfo () {
      if (this.$route && this.$route.query) {
        UserModel.setToken(this.$route.query.token || '')
        this.appInfo.isNative = this.$route.query.isNative === '1'
        this.appInfo.platform = this.$route.query.platform || ''
      }
    },
    async initUserInfo () {
      await UserModel.requestUserInfo()
      return Promise.resolve()
    }
  }
}

export default mixinUserInfo
