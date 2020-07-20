<template>
  <div class="task-detail-container">
    <div class="task-detail-container-body">
      <div>
        <task-detail-car-info
          :itemData="pageData"
        />
      </div>
      <div v-for="(item, index) in pageData.detailList" :key="index">
        <div style="margin-top: 20px;">
          <task-detail-info-item
            :itemData="item"
          />
        </div>
      </div>
    </div>
    <div class="task-detail-action-view" v-if="pageData.buttonTitle">
      <div class="normal-theme-btn action-btn" @click.stop="handleBtnClick">{{ pageData.buttonTitle }}</div>
    </div>
  </div>
</template>

<script>
import TaskDetailInfoItem from './components/TaskDetailInfoItem.vue'
import TaskDetailCarInfo from './components/TaskDetailCarInfo.vue'
import { OrderDetailModel } from '@/model/order-model.js'

export default {
  components: { TaskDetailInfoItem, TaskDetailCarInfo },
  data () {
    return {
      orderId: '',
      pageData: {}
    }
  },
  mounted () {
    this.$native.setNavigationBar({ title: '任务详情' })

    this.orderId = this.$route.query.orderId || ''
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
      }
    },
    handleBtnClick () {
      this.$native.navigateTo({
        url: '/taskDetailMapApp',
        params: { orderId: this.pageData.orderId }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
	.task-detail-container {

		.task-detail-container-body {
			padding-bottom: 180px;
		}

		.task-detail-action-view {
			position: fixed;
			left: 0px;
			bottom: 0px;
			right: 0px;
			height: 160px;
			z-index: 9;
			padding-bottom: 20px;
			background-color: $color-white;

      .action-btn {
        margin: 20px 30px;
      }
		}
	}
</style>
