<template>
  <div class="home-container">
    <div class="map-container">
      <MapView />
    </div>
    <div class="map-detail-info-view">

    </div>
  </div>
</template>

<script>
import MapView from '@/components/Map/MapView.vue'

export default {
  components: { MapView }
}
</script>

<style lang="stylus" scoped>
  .home-container {
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

    .map-detail-info-view {
      position absolute
      top 100px
      left 0px
      right 0px
      height 300px
      z-index 2
      background-color #ffffff
    }
  }
</style>>
