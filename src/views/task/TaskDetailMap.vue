<template>
  <div class="task-detail-map-container">
    <div class="map-container">
      <MapView />
    </div>
    <div class="task-detail-map-top">
      <task-detail-map-top-view />
    </div>
    <div class="task-detail-map-info-container" :style="detailInfoStyle">
      <div class="task-detail-map-info-button" @click.stop="handleInfoClick">
        <div class="task-detail-map-info-button-img">
          <img v-if="!isShowDetailInfo" src="../../assets/common/icon-view-show.png" mode="aspectFit" />
          <img v-if="isShowDetailInfo" src="../../assets/common/icon-view-hide.png" mode="aspectFit" />
        </div>
      </div>
      <task-detail-map-info-view />
    </div>
    <div class="task-detail-map-action-view">
      <div class="task-detail-map-btn-container">
        <div class="detail-btn upload" @click.stop="handleUploadClick">上传照片</div>
        <div class="detail-btn finish" @click.stop="handleFinishClick">提货完成</div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskDetailMapTopView from './components/TaskDetailMapTopView.vue'
import TaskDetailMapInfoView from './components/TaskDetailMapInfoView.vue'
import MapView from '@/components/Map/MapView.vue'

export default {
  components: { TaskDetailMapTopView, TaskDetailMapInfoView, MapView },
  data () {
    return {
      isShowDetailInfo: false
    }
  },
  computed: {
    detailInfoStyle () {
      return this.isShowDetailInfo ? 'height: 80%;' : 'height: 35%;'
    }
  },
  methods: {
    handleInfoClick () {
      this.isShowDetailInfo = !this.isShowDetailInfo
    },
    handleUploadClick () {
      console.log('handleUploadClick')
    },
    handleFinishClick () {
      console.log('handleFinishClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .task-detail-map-container {
    position relative
    height 100%

    .map-container {
      position absolute
      top 0px
      left 0px
      right 0px
      bottom 0px
      z-index 1
    }

    .task-detail-map-top {
      position: fixed;
      top 30px
			left: 0px;
			right: 0px;
			height: 132px;
			z-index: 8;
    }

    .task-detail-map-info-container {
			position: fixed;
			left: 0px;
			right: 0px;
			bottom: 0px;
			z-index: 8;
			background-color: $color-white;
			border-radius: 32px;

      .task-detail-map-info-button {
        height 60px
        display flex
        justify-content center
        align-items center

        .task-detail-map-info-button-img {
          width 70px
          height 15px
        }
      }
		}

		.task-detail-map-action-view {
			position: fixed;
			left: 0px;
			bottom: 0px;
			right: 0px;
			height: 160px;
			z-index: 9;
			padding-bottom: 20px;
			background-color: $color-white;

			.task-detail-map-btn-container {
				padding: 20px 30px;
				display: flex;
				justify-content: center;

				.detail-btn {
					width: 330px;
					height: 90px;
					font-size: $font-13;
					line-height: 90px;
					text-align: center;
					border-radius: 8px;
				}

				.upload {
					color: $color-theme;
					border-radius: $color-theme;
					background-color: $color-white;
					border: 1px solid $color-theme;
					height: 88px;
					line-height: 88px;
				}

				.finish {
					margin-left: 24px;
					color: $color-white;
					border-radius: $color-theme;
					background: $linear-gradient-button-theme;
				}
			}
		}
  }
</style>>
