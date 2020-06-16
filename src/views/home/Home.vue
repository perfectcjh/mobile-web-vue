<template>
  <div class="home-container">
    <!-- <navbar-normal title="首页" :isRoot="true"/> -->
    <div class="list-view-container">
      <div class="list-view">
        <div>
          <home-top-view
            :feeTotal="feeTotal"
          />
        </div>
        <div style="margin-top: 30px;">
          <home-message-cell
            :inviteList="inviteListData"
            @click="handleMessageClick"
          />
        </div>
        <div v-for="(item, index) in listData" :key="index" @click.stop="handleItemClick(item)" class="list-view-item">
          <home-header
            v-if="item.componentType === 'header'"
            :title="item.title"
          />
          <home-list-item-order
            v-else
            :itemData="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeListItemOrder from './components/HomeListItemOrder.vue'
import HomeHeader from './components/HomeHeader.vue'
import HomeTopView from './components/HomeTopView.vue'
import HomeMessageCell from './components/HomeMessageCell.vue'
import { OrderListModel } from '@/model/order-model.js'
import { formatFloat } from '@/module/formatter/data-formatter.js'

export default {
  components: { HomeListItemOrder, HomeHeader, HomeTopView, HomeMessageCell },
  data () {
    return {
      feeTotal: {},
      inviteListData: [],
      transportListData: [],
      createListData: []
    }
  },
  computed: {
    listData () {
      const listData = []
      if (this.transportListData.length) {
        const headerObj = {
          componentType: 'header',
          title: '运输中'
        }
        listData.push(headerObj)
        this.transportListData.forEach(el => {
          el.componentType = 'homeOrderItem'
          listData.push(el)
        })
      }
      if (this.createListData.length) {
        const headerObj = {
          componentType: 'header',
          title: '待接单'
        }
        listData.push(headerObj)
        this.createListData.forEach(el => {
          el.componentType = 'homeOrderItem'
          listData.push(el)
        })
      }
      return listData
    }
  },
  mounted () {
    this.handlePageShow()
  },
  methods: {
    handlePageShow () {
      this.loadData()
    },
    async loadFeeTotal () {
      const { code, data } = await this.$api.getDriverFeeTotal()
      if (code === 200) {
        this.feeTotal = {
          waitReceivedFee: formatFloat(data.waitReceivedFee, 2),
          receivedFee: formatFloat(data.receivedFee, 2),
          expectedReceivedFee: formatFloat(data.expectedReceivedFee, 2)
        }
      }
    },
    async loadInviteData () {
      const params = {
        page: 1,
        size: 100,
        invitationStatus: 'invitation_continue'
      }
      const { code, data } = await this.$api.getCustomerList(params)
      if (code === 200) {
        this.inviteListData = data
      }
    },
    async loadTransportData () {
      const params = {
        page: 1,
        size: 100,
        departStatus: ['2', '3']
      }
      const { code, data } = await this.$api.getOrderList(params)
      if (code === 200) {
        this.transportListData = OrderListModel(data)
      }
    },
    async loadData () {
      this.loadFeeTotal()
      this.loadInviteData()
      this.loadTransportData()
      console.log('loadData', 1)
      const params = {
        page: 1,
        size: 10,
        departStatuses: ['1']
      }
      const { code, data } = await this.$api.getOrderList(params)
      if (code === 200) {
        this.createListData = OrderListModel(data)
        // this.mescroll.endBySize(this.createListData.length, totalData.total)
      } else {
        // this.mescroll.endSuccess()
      }
    },
    async loadMoreData (page) {
      console.log('loadMoreData', page.num + 1)
      const params = {
        page: page.num + 1,
        size: 10,
        departStatus: '1'
      }
      const { code, data } = await this.$api.getOrderList(params)
      if (code === 200) {
        this.createListData = this.createListData.concat(OrderListModel(data))
        // this.mescroll.endBySize(this.createListData.length, totalData.total)
      } else {
        // this.mescroll.endSuccess()
      }
    },
    handleItemClick (item) {
      // if (item.orderStatus === '1') {
      //   uni.navigateTo({
      //     url: `/pages/driver/order/OrderDetail?id=${item.orderId}`
      //   })
      // } else {
      //   uni.navigateTo({
      //     url: `/pages/driver/task/TaskDetail?id=${item.orderId}`
      //   })
      // }
    },
    handleMessageClick () {
      // uni.navigateTo({
      //   url: '/pages/driver/customer/CustomerInviteList'
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
	.home-container {
		position: relative;

		.list-view-container {
			position: absolute;
			z-index: 1;
			left: 0px;
			right: 0px;
			top: 0px;
			bottom: 0px;
		}

		.list-view {

			.list-view-item {
				margin-top: 20px;
			}

			.list-view-item:nth-last-child(1) {
				margin-bottom: 20px;
			}
		}
	}
</style>
