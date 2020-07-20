<template>
  <div class="card__container">
    <div class="card__view" :style="backgroundColor">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  computed: {
    cardViewStyle () {
      return `backgroundColor: ${this.backgroundColor};`
    }
  }
}
</script>

<style lang="stylus" scoped>
	.card__container {
		width: 100%;
		padding: 0px 30px;

		.card__view {
			width: 100%;
			border-radius: 16px;
			overflow: hidden;
			box-sizing: border-box;
		}
	}
</style>
