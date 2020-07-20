<template>
  <div class="picker-normal__container">
    <van-popup
      v-model="isShow"
      position="bottom"
      @close="onCancel">
      <van-picker
        :title="title"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      columns: [],
      callback: null
    }
  },
  methods: {
    // option  { title data callback }
    show (option) {
      this.isShow = true
      this.title = option.title || ''
      this.columns = option.data || []
      this.callback = option.callback
    },
    onConfirm (value, index) {
      if (this.callback) {
        this.callback(value, index)
      }
      this.isShow = false
    },
    onChange (picker, value, index) {

    },
    onCancel () {
      this.isShow = false
    }
  }
}
</script>

<style lang="stylus" scoped>
	.picker-normal__container {

	}
</style>
