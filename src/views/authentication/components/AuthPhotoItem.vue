<template>
  <div class="auth-photo-item-container">
    <div class="auth-photo-item-info">
      <div class="auth-photo-item-title">{{ title }}</div>
      <div class="auth-photo-item-subtitle">{{ subTitle }}</div>
    </div>
    <div class="auth-photo-item-content">
      <div class="item-photo-container" @click.stop="handlePhotoClick">
        <div v-if="photo" class="item-photo">
          <img :src="photo" />
        </div>
        <div v-else class="item-photo-add">
          <div class="item-photo-add-bg">
            <img :src="demoPhotoPath" />
          </div>
          <div class="item-photo-add-content">
            <div class="item-photo-add-icon">
              <img src="../../../static/driver/authentication/icon-auth-select-photo.png" />
            </div>
            <div class="item-photo-add-text">点击拍照</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    photo: {
      type: String,
      default: ''
    },
    demoPhoto: {
      type: String,
      default: ''
    },
    demoType: {
      type: String, // '1' 身份证  '2' 身份证反  '3' 行驶证  '4' 车头照片  '5' 运输经营许可证  '6' 驾驶证  '7' 从业资格证
      default: ''
    }
  },
  computed: {
    demoPhotoPath () {
      if (this.demoType === '1') {
        return require('../../../static/driver/authentication/icon-idcard.png')
      } else if (this.demoType === '2') {
        return require('../../../static/driver/authentication/icon-idcard-fan.png')
      } else if (this.demoType === '3') {
        return require('../../../static/driver/authentication/icon-car-license.png')
      } else if (this.demoType === '4') {
        return require('../../../static/driver/authentication/icon-car-photo.png')
      } else if (this.demoType === '5') {
        return require('../../../static/driver/authentication/icon-business-license.png')
      } else if (this.demoType === '6') {
        return require('../../../static/driver/authentication/icon-driver-license.png')
      } else if (this.demoType === '7') {
        return require('../../../static/driver/authentication/icon-driver-license.png')
      }
      return ''
    }
  },
  methods: {
    handlePhotoClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="stylus" scoped>
	.auth-photo-item-container {
		background-color: $color-white;
		padding: 20px 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.auth-photo-item-info {

			.auth-photo-item-title {
				height: 40px;
				line-height: 40px;
				color: $color-text-black;
				font-size: $font-16;
				font-weight: bold;
			}

			.auth-photo-item-subtitle {
				margin-top: 16px;
				height: 40px;
				line-height: 40px;
				color: $color-text-gray;
				font-size: $font-13;
			}
		}

		.auth-photo-item-content {

			.item-photo-container {
				width: 300px;
				height: 180px;

				.item-photo {
					width: 100%;
					height: 100%;
				}

				.item-photo-add {
					width: 100%;
					height: 100%;
					position: relative;

					.item-photo-add-bg {
						position: absolute;
						top: 0px;
						bottom: 0px;
						left: 0px;
						right: 0px;
					}

					.item-photo-add-content {
						position: absolute;
						top: 0px;
						bottom: 0px;
						left: 0px;
						right: 0px;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.item-photo-add-icon {
							width: 54px;
							height: 54px;
						}

						.item-photo-add-text {
							margin-top: 16px;
							font-size: $font-10;
							color: $color-text-gray;
						}
					}
				}
			}
		}
	}
</style>
