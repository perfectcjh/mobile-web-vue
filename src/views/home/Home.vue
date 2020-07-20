<template>
  <div class="home-container">
    <!-- <navbar-normal title="首页" :isRoot="true"/> -->
    <div class="list-view-container">
      <van-pull-refresh v-model="isRefresh" @refresh="loadData">
        <van-list
          v-model="isLoadMore"
          :finished="isNoMoreData"
          finished-text="没有更多了"
          @load="loadMoreData"
        >
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
        </van-list>
      </van-pull-refresh>
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
      isRefresh: false,
      isLoadMore: false,
      isNoMoreData: false,
      page: 1,
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
        departStatuses: ['2', '3']
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
      this.isRefresh = false
      if (code === 200) {
        this.page = 1
        this.createListData = OrderListModel(data)
      }
    },
    async loadMoreData () {
      if (this.isLoadMore) { return }
      console.log('loadMoreData', this.page + 1)
      const params = {
        page: this.page + 1,
        size: 10,
        departStatuses: ['1']
      }
      const { code, data } = await this.$api.getOrderList(params)
      this.isLoadMore = false
      if (code === 200) {
        this.createListData = this.createListData.concat(OrderListModel(data))

        this.page = this.page + 1
        if (this.createListData.length > data.pageNum) {
          this.isNoMoreData = false
        }
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
    width: 100%;
		position: relative;

		.list-view-container {
      width: 100%;
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
