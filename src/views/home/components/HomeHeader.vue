<template>
  <div class="home-header-container">
    <div class="home-header-title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
	.home-header-container {
		padding: 24px 60px 12px;

		.home-header-title {
			color:  $color-text-black;
			font-size: $font-15;
			font-weight: bold;
		}
	}
</style>
