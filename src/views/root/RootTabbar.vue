<template>
  <div class="tabbar-container">
    <tabbar
      ref="tabbar"
      :data="tabbarData"
      selectColor="#262235"
      @change="handleTabbarChange"
      @tabClick="handleTabbarClick"
    />
    <div class="page-container">
      <home
        ref="tab0"
        v-if="selectIndex===0"
      />
      <home
        ref="tab1"
        v-if="selectIndex===1"
      />
      <home
        ref="tab2"
        v-if="selectIndex===2"
      />
      <home
        ref="tab3"
        v-if="selectIndex===3"
      />
      <home
        ref="tab4"
        v-if="selectIndex===4"
      />
      <!-- <order-list
        ref="tab1"
        v-if="selectIndex===1"
      />
      <customer
        ref="tab2"
        v-if="selectIndex===2"
      />
      <wallet
        ref="tab3"
        v-if="selectIndex===3"
      />
      <user-center
        ref="tab4"
        v-if="selectIndex===4"
      /> -->
    </div>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar/Tabbar.vue'
import Home from '@/views/home/Home.vue'
// import OrderList from '@/pages/driver/order/OrderList.vue'
// import Customer from '@/pages/driver/customer/Customer.vue'
// import Wallet from '@/pages/driver/wallet/Wallet.vue'
// import UserCenter from '@/pages/driver/user/UserCenter.vue'
export default {
  // components: { Tabbar, Home, OrderList, Customer, Wallet, UserCenter },
  components: { Tabbar, Home },
  data () {
    return {
      tabbarData: [{
        title: '首页',
        normalIcon: '../../static/tabbar/icon-driver-home-normal.png',
        selectIcon: '../../static/tabbar/icon-driver-home-select.png'
      }, {
        title: '任务',
        normalIcon: '../../static/tabbar/icon-driver-task-normal.png',
        selectIcon: '../../static/tabbar/icon-driver-task-select.png'
      }, {
        title: '客户',
        normalIcon: '../../static/tabbar/icon-driver-customer-normal.png',
        selectIcon: '../../static/tabbar/icon-driver-customer-select.png'
      }, {
        title: '钱包',
        normalIcon: '../../static/tabbar/icon-driver-wallet-normal.png',
        selectIcon: '../../static/tabbar/icon-driver-wallet-select.png'
      }, {
        title: '我的',
        normalIcon: '../../static/tabbar/icon-driver-my-normal.png',
        selectIcon: '../../static/tabbar/icon-driver-my-select.png'
      }],
      selectIndex: 0
    }
  },
  mounted () {
    // uni.$on('RootTabbarSetIndex', res => {
    //   this.$refs.tabbar.setTabbarIndex(res.index || 0)
    // })
    this.handlePageShow()
  },
  destroyed () {
    // uni.$off('RootTabbarSetIndex')
  },
  onShow () {
    this.handlePageShow()
  },
  methods: {
    handleTabbarChange (index) {
      this.selectIndex = index
    },
    handleTabbarClick (index) {
      if (this.selectIndex === index) {
        // this.handlePageShow()
      }
    },
    handlePageShow () {
      if (this.$refs.tab0) {
        this.$refs.tab0.handlePageShow()
      }
      if (this.$refs.tab1) {
        this.$refs.tab1.handlePageShow()
      }
      if (this.$refs.tab2) {
        this.$refs.tab2.handlePageShow()
      }
      if (this.$refs.tab3) {
        this.$refs.tab3.handlePageShow()
      }
      if (this.$refs.tab4) {
        this.$refs.tab4.handlePageShow()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

	.tabbar-container {

	}
</style>
