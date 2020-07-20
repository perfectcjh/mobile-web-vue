<template>
  <div class="signature-container">
    <div class="signature-body">
      <div class="body-left">
        <div class="signature-btn-container">
          <div class="signature-btn reset" @click.stop="handleResetClick">重写</div>
          <div class="signature-btn finish" @click.stop="handleFinishClick">保存</div>
        </div>
      </div>
      <div class="body-right">
        <div class="input-view">
          <div class="input-view-pad" ref="writingPadContainer">
            <canvas
              ref="writingPad"
              canvas-id="writingPad"
              class="writing-pad__canvas"
              :disable-scroll="true"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import WritingPad from '@/qncomponents/writing-pad/writing-pad.js'
import FileConvert from '@/module/utils/file-convert.js'

export default {
  data () {
    return {
      fileCode: '',
      signatureImg: '',
      signatureFile: null,
      canvasCtx: null,
      stageInfo: '',
      points: [],
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      isDown: false
    }
  },
  mounted () {
    this.$native.setNavigationBar({ title: '签名' })

    this.fileCode = this.$route.query.fileCode

    const canvas = this.$refs.writingPad
    canvas.width = this.$refs.writingPadContainer.offsetWidth
    canvas.height = this.$refs.writingPadContainer.offsetHeight
    this.canvasCtx = canvas.getContext('2d')
    this.canvasCtx.lineWidth = 4
    this.canvasCtx.strokeStyle = '#333333'
    this.stageInfo = canvas.getBoundingClientRect()
  },
  methods: {
    handleResetClick () {
      this.canvasCtx.clearRect(0, 0, this.$refs.writingPad.width, this.$refs.writingPad.height)
      this.points = []
    },
    handleFinishClick () {
      this.signatureImg = this.$refs.writingPad.toDataURL()
      this.signatureFile = FileConvert.base64ToFile(this.signatureImg, 'file.png')
      this.uploadFile()
    },
    handleTouchStart (event) {
      event.preventDefault()
      if (event.touches.length === 1) {
        const obj = {
          x: event.targetTouches[0].clienX - this.stageInfo.x,
          y: event.targetTouches[0].clientY - this.stageInfo.y
        }
        this.startX = obj.x
        this.startY = obj.y
        this.canvasCtx.beginPath()
        this.canvasCtx.moveTo(this.startX, this.startY)
        this.canvasCtx.lineTo(obj.x, obj.y)
        this.canvasCtx.stroke()
        this.canvasCtx.closePath()
        this.points.push(obj)
      }
    },
    handleTouchMove (event) {
      event.preventDefault()
      if (event.touches.length === 1) {
        const obj = {
          x: event.targetTouches[0].clientX - this.stageInfo.x,
          y: event.targetTouches[0].clientY - this.stageInfo.y
        }
        if (!obj.x || !obj.y) { return }
        this.moveY = obj.y
        this.moveX = obj.x
        this.canvasCtx.beginPath()
        this.canvasCtx.moveTo(this.startX, this.startY)
        this.canvasCtx.lineTo(obj.x, obj.y)
        this.canvasCtx.stroke()
        this.canvasCtx.closePath()
        this.startY = obj.y
        this.startX = obj.x
        this.points.push(obj)
      }
    },
    handleTouchEnd (event) {
      event.preventDefault()
      if (event.touches.length === 1) {
        const obj = {
          x: event.targetTouches[0].clientX - this.stageInfo.x,
          y: event.targetTouches[0].clientY - this.stageInfo.y
        }
        if (!obj.x || !obj.y) { return }
        this.canvasCtx.beginPath()
        this.canvasCtx.moveTo(this.startX, this.startY)
        this.canvasCtx.lineTo(obj.x, obj.y)
        this.canvasCtx.stroke()
        this.canvasCtx.closePath()
        this.points.push(obj)
      }
    },
    async uploadFile () {
      const params = {
        bizCode: this.fileCode,
        file: this.signatureFile
      }
      this.$toast.loading()
      const { code, data } = await this.$api.uploadFile(params)
      this.$toast.clear()
      if (code === 200) {
        const callBackData = {
          imageUrl: data.filePath,
          fileCode: data.bizCode
        }
        this.$native.postNotification({ name: 'signatureDidFinish', value: callBackData })
        this.$native.navigateBack()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
	.signature-container {
		height: 100%;

		.signature-body {
			position: absolute;
			top: 0px;
			left: 0px;
			bottom: 0px;
			right: 0px;
			display: flex;
			align-items: center;

			.body-left {
				width: 120px;
				height: 80%;
			}

			.body-right {
				flex: 1;
				width: 100px;
				height: 80%;
			}
		}

		.input-view {
			height: 100%;
			width: 100%;
			padding: 30px 30px;
			display: flex;
			align-items: center;
			justify-content: center;

			.input-view-pad {
				flex: 1;
				background-color: $color-white;
				border: 2px dashed #e9e9e9;
				width: 100%;
				height: 100%;
			}

			.writing-pad__canvas {
				overflow: hidden;
				box-sizing: border-box;
				width: 100%;
				height: 100%;
			}
		}

		.signature-btn-container {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.signature-btn {
				width: 320px;
				height: 80px;
				font-size: $font-13;
				line-height: 80px;
				text-align: center;
				border-radius: 8px;
				transform: translateX(-100px) rotate(90deg);
			}

			.reset {
				color: $color-theme;
				border-radius: $color-theme;
				background-color: $color-white;
				border: 1px solid $color-theme;
				height: 78px;
				line-height: 78px;
			}

			.finish {
				color: $color-white;
				border-radius: $color-theme;
				background: $linear-gradient-button-theme;
			}
		}
	}
</style>
