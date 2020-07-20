<template>
  <div class="car-list-container">
    <div class="list-view">
      <div v-for="(item, index) in listData" :key="index" @click.stop="handleItemClick(item)" class="list-view-item">
        <div class="list-car-item">
          <div class="car-icon">
            <img src="../../static/driver/car/icon-car-carbig.png" />
          </div>
          <div class="car-info">
            <div v-if="item.isDefault" class="car-tag">有效车辆</div>
            <div v-else class="car-set-default" @click.stop="handleSetDefalutClick(item)">设为有效车辆</div>
            <div class="car-info-bottom">
              <div class="car-platno">{{ item.vtlPlateNo }}</div>
              <div class="car-icon-two">
                <img src="../../static/driver/car/icon-car-carsmall.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="car-add-view" style="margin-top: 20px;">
      <div class="car-add-card">
        <div class="car-add-btn" @click.stop="handleAddClick">添加车辆</div>
      </div>
    </div>
  </div>
</template>

<script>
import UserModel from '@/model/user-model.js'

export default {
  data () {
    return {
      listData: []
    }
  },
  mounted () {
    this.$native.setNavigationBar({ title: '车辆列表' })

    this.initUserInfo().then(() => {
      this.loadData()
    })
    window.viewDidAppear = () => {
      this.loadData()
    }
  },
  methods: {
    handleAddClick () {
      this.$native.navigateTo({
        url: '/carAuth'
      })
    },
    handleItemClick () {

    },
    handleSetDefalutClick (item) {
      this.$alert.show({
        message: '确认设为有效车辆？',
        isConfirm: true,
        onConfirm: async () => {
          const params = {
            vehicleId: item.id,
            isDefault: true,
            userId: UserModel.getUserInfo().id,
            driverId: UserModel.getUserInfo().userAuthInfo.id
          }
          const { code } = await this.$api.setDefaultCar(params)
          if (code === 200) {
            this.$toast('设置成功')
            this.loadData()
          }
        }
      })
    },
    async loadData () {
      const params = {
        page: 1,
        size: 100,
        driverId: UserModel.getUserInfo().userAuthInfo.id
      }
      const { code, data } = await this.$api.getCarList(params)
      if (code === 200) {
        this.listData = data
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
	.car-list-container {

    .list-view {
      padding: 20px 0px;

      .list-view-item {
        margin-bottom: 20px;
        padding: 0px 30px;

        .list-car-item {
          height: 200px;
          background-color: $color-white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 16px;
          padding: 30px;

          .car-icon {
            width: 200px;
            height: 100px;
          }

          .car-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .car-tag {
              width: 140px;
              height: 40px;
              line-height: 40px;
              color: $color-white;
              background-color: $color-theme;
              border-radius: 20px;
              text-align: center;
              font-size: $font-12;
            }

            .car-set-default {
              color: $color-theme;
              font-size: $font-12;
              text-align: right;
              height: 40px;
              line-height: 40px;
            }

            .car-info-bottom {
              display: flex;
              align-items: center;
              margin-top: 30px;

              .car-platno {
                color: $color-text-black;
                font-weight: bold;
                margin-right: 20px;
                font-size: $font-15;
              }

              .car-icon-two {
                width: 50px;
                height: 50px;
              }
            }
          }
        }
      }

      .list-view-item:nth-last-child(1) {
        margin-bottom: 20px;
      }
    }

    .car-add-view {
      padding: 0px 30px;

      .car-add-card {
        height: 200px;
        border-radius: 16px;
        background-color: $color-white;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .car-add-btn {
          width: 380px;
          height: 84px;
          line-height: 84px;
          color: $color-white;
          background-color: $color-theme;
          border-radius: 8px;
          font-size: $font-16;
          font-weight: bold;
          text-align: center;
        }
      }
    }
	}
</style>
